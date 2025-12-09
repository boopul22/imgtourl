interface RateLimitData {
  count: number;
  lastReset: number;
}

const rateLimitMap = new Map<string, RateLimitData>();

export function checkRateLimit(identifier: string): boolean {
  const limit = parseInt(process.env.RATE_LIMIT_MAX || '10');
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000');
  
  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, {
      count: 1,
      lastReset: Date.now(),
    });
    return true;
  }

  const data = rateLimitMap.get(identifier)!;
  
  // Reset if window has passed
  if (Date.now() - data.lastReset > windowMs) {
    data.count = 1;
    data.lastReset = Date.now();
    return true;
  }

  // Check if under limit
  if (data.count < limit) {
    data.count += 1;
    return true;
  }

  return false;
}