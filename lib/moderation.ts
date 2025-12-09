export type ModerationResult = {
  isAllowed: boolean;
  reason?: string;
  details?: any;
};

type SafeSearchLikelihood =
  | 'UNKNOWN'
  | 'VERY_UNLIKELY'
  | 'UNLIKELY'
  | 'POSSIBLE'
  | 'LIKELY'
  | 'VERY_LIKELY';

function likelihoodToScore(value: SafeSearchLikelihood): number {
  switch (value) {
    case 'VERY_UNLIKELY':
      return 0;
    case 'UNLIKELY':
      return 1;
    case 'POSSIBLE':
      return 2;
    case 'LIKELY':
      return 3;
    case 'VERY_LIKELY':
      return 4;
    default:
      return 0;
  }
}

function shouldBlock(
  value: SafeSearchLikelihood,
  threshold: SafeSearchLikelihood
): boolean {
  return likelihoodToScore(value) >= likelihoodToScore(threshold);
}

async function buildModerationImageContent(buffer: Buffer): Promise<string> {
  try {
    // Attempt to create a small thumbnail to reduce payload for Vision API
    const sharpModule: any = await import('sharp');
    const sharp = sharpModule.default || sharpModule;
    const thumb = await sharp(buffer)
      .resize({ width: 512, height: 512, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 75 })
      .toBuffer();
    return thumb.toString('base64');
  } catch {
    // Fallback: use original buffer (may be larger)
    return buffer.toString('base64');
  }
}

export async function moderateImageBuffer(buffer: Buffer): Promise<ModerationResult> {
  try {
    const enabled = process.env.ENABLE_SAFESEARCH_MODERATION === 'true';
    const apiKey = process.env.GOOGLE_VISION_API_KEY;
    if (!enabled || !apiKey) {
      return { isAllowed: true };
    }

    const adultThreshold = (process.env.SAFESEARCH_BLOCK_ADULT as SafeSearchLikelihood) || 'LIKELY';
    const violenceThreshold = (process.env.SAFESEARCH_BLOCK_VIOLENCE as SafeSearchLikelihood) || 'LIKELY';
    const racyThreshold = (process.env.SAFESEARCH_BLOCK_RACY as SafeSearchLikelihood) || 'LIKELY';

    const contentB64 = await buildModerationImageContent(buffer);

    const body = {
      requests: [
        {
          image: { content: contentB64 },
          features: [{ type: 'SAFE_SEARCH_DETECTION' }],
        },
      ],
    };

    const res = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}` as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      // If Vision fails, fail open to avoid blocking uploads unexpectedly
      return { isAllowed: true };
    }
    const data = await res.json();
    const annotation = data?.responses?.[0]?.safeSearchAnnotation;
    if (!annotation) return { isAllowed: true };

    const { adult, violence, racy } = annotation as {
      adult: SafeSearchLikelihood;
      violence: SafeSearchLikelihood;
      racy: SafeSearchLikelihood;
    };

    if (shouldBlock(adult, adultThreshold)) {
      return {
        isAllowed: false,
        reason: `Blocked by moderation: adult content (${adult})`,
        details: annotation,
      };
    }
    if (shouldBlock(violence, violenceThreshold)) {
      return {
        isAllowed: false,
        reason: `Blocked by moderation: violent content (${violence})`,
        details: annotation,
      };
    }
    if (shouldBlock(racy, racyThreshold)) {
      return {
        isAllowed: false,
        reason: `Blocked by moderation: racy content (${racy})`,
        details: annotation,
      };
    }

    return { isAllowed: true };
  } catch (err) {
    // On error, allow but log upstream
    return { isAllowed: true };
  }
}


