import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  locale?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export interface LocalBusinessSchema {
  name: string;
  description: string;
  url: string;
  logo: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude?: number;
    longitude?: number;
  };
  openingHours?: {
    dayOfWeek: string;
    opens: string;
    closes: string;
  }[];
  priceRange?: string;
  paymentAccepted?: string[];
  currenciesAccepted?: string[];
}

export const generateMetadata = (config: SEOConfig): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  const defaultImage = '/og-image.jpg';
  
  const metadata: Metadata = {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: config.author ? [{ name: config.author }] : [{ name: 'ImageURL Team' }],
    creator: 'ImageURL',
    publisher: 'ImageURL',
    robots: {
      index: !config.noIndex,
      follow: !config.noFollow,
      googleBot: {
        index: !config.noIndex,
        follow: !config.noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: config.ogType || 'website',
      locale: config.locale || 'en_US',
      url: config.canonical || '/',
      siteName: 'Free Image to URL Converter',
      title: config.title,
      description: config.description,
      images: [
        {
          url: config.ogImage || defaultImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      ...(config.ogType === 'article' && {
        publishedTime: config.publishedTime,
        modifiedTime: config.modifiedTime,
        authors: [config.author || 'ImageURL Team'],
        section: config.section,
        tags: config.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      creator: '@imageurl',
      site: '@imageurl',
      images: [config.ogImage || defaultImage],
    },
    alternates: {
      canonical: config.canonical || '/',
    },
    verification: {
      google: 'xquwz1jK5sqIiFN7vc0o5sYsBLBLyAa-1VwUBXV4wDo',
    },
    other: {
      'theme-color': '#3b82f6',
      'color-scheme': 'light dark',
    },
  };

  return metadata;
};

export const generateLocalBusinessSchema = (business: LocalBusinessSchema) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    url: business.url,
    logo: business.logo,
    image: business.logo,
    telephone: business.telephone,
    email: business.email,
    address: business.address ? {
      '@type': 'PostalAddress',
      ...business.address,
    } : undefined,
    geo: business.geo ? {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    } : undefined,
    openingHours: business.openingHours,
    priceRange: business.priceRange,
    paymentAccepted: business.paymentAccepted?.join(', '),
    currenciesAccepted: business.currenciesAccepted?.join(', '),
    areaServed: 'Worldwide',
    availableLanguage: ['English'],
  };
};

export const generateImageObjectSchema = (imageUrl: string, name: string, description?: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imageUrl,
    name: name,
    description: description || name,
    uploadDate: new Date().toISOString(),
    representationOfPage: true,
  };
};

export const generateHreflangTags = (currentPage: string, availableLocales: string[] = ['en']) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  
  return availableLocales.map(locale => ({
    rel: 'alternate',
    hrefLang: locale === 'en' ? 'en-US' : locale,
    href: `${baseUrl}${currentPage}`,
  }));
};

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

export const generateBlogPostMetadata = (post: any): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  const defaultImage = post.featuredImage || '/og-image.jpg';
  
  // Generate dynamic keywords based on post content
  const dynamicKeywords = [
    ...SEO_KEYWORDS.BLOG_GENERAL,
    ...(post.category ? [post.category.toLowerCase()] : []),
    ...(post.tags || []).map((tag: string) => tag.toLowerCase()),
    ...(post.keywords || [])
  ];

  // Extract additional keywords from title and excerpt
  const titleWords = post.title.toLowerCase().split(' ').filter((word: string) => word.length > 3);
  const excerptWords = (post.excerpt || '').toLowerCase().split(' ').filter((word: string) => word.length > 3);
  
  const allKeywords = Array.from(new Set([
    ...dynamicKeywords,
    ...titleWords,
    ...excerptWords
  ]));

  return {
    title: `${post.title} | ImageURL Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: allKeywords,
    authors: [{ name: post.author || 'ImageURL Team' }],
    creator: 'ImageURL',
    publisher: 'ImageURL',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `/blog/${post.slug}`,
      siteName: 'Free Image to URL Converter',
      title: post.title,
      description: post.metaDescription || post.excerpt,
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author || 'ImageURL Team'],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription || post.excerpt,
      creator: '@imageurl',
      images: [defaultImage],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    verification: {
      google: 'xquwz1jK5sqIiFN7vc0o5sYsBLBLyAa-1VwUBXV4wDo',
    },
    other: {
      'theme-color': '#3b82f6',
      'color-scheme': 'light dark',
    },
  };
};

export const generateCategoryMetadata = (category: string, count: number): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  
  return {
    title: `${category} Articles | ImageURL Blog`,
    description: `Explore ${count} articles about ${category} in image hosting, optimization, and web performance.`,
    keywords: [
      category.toLowerCase(),
      'image hosting',
      'blog',
      'tutorials',
      'web development',
      'image optimization'
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `/blog/category/${category.toLowerCase()}`,
      siteName: 'Free Image to URL Converter',
      title: `${category} Articles | ImageURL Blog`,
      description: `Explore ${count} articles about ${category} in image hosting and optimization.`,
    },
    alternates: {
      canonical: `/blog/category/${category.toLowerCase()}`,
    },
  };
};

export const generateSitemapEntry = (path: string, lastModified: string, priority: number = 0.7) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  return {
    loc: `${baseUrl}${path}`,
    lastmod: lastModified,
    changefreq: priority > 0.8 ? 'daily' : priority > 0.5 ? 'weekly' : 'monthly',
    priority: priority,
  };
};

export const analyzeContentForSEO = (content: string, title: string, excerpt: string) => {
  const text = `${title} ${excerpt} ${content}`.toLowerCase();
  const wordCount = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Extract potential keywords
  const words = text.match(/\b\w+\b/g) || [];
  const wordFreq: { [key: string]: number } = {};
  
  words.forEach(word => {
    if (word.length > 3 && !isStopWord(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  
  // Sort by frequency and get top keywords
  const keywords = Object.entries(wordFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
  
  return {
    wordCount,
    sentenceCount: sentences.length,
    readabilityScore: calculateReadabilityScore(sentences.length, wordCount),
    suggestedKeywords: keywords,
    metaDescriptionLength: excerpt.length,
    titleLength: title.length,
    seoScore: calculateSEOScore(wordCount, title.length, excerpt.length),
  };
};

const isStopWord = (word: string) => {
  const stopWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'who', 'boy', 'did', 'she', 'use', 'her', 'way', 'many', 'oil', 'sit', 'set', 'run', 'eat', 'far', 'sea', 'eye', 'never', 'last', 'let', 'thought', 'city', 'tree', 'cross', 'farm', 'hard', 'start', 'might', 'story', 'saw', 'far', 'sea', 'draw', 'left', 'late', 'run', 'don\'t', 'while', 'press', 'close', 'night', 'real', 'life', 'few', 'north', 'open', 'seem', 'together', 'next', 'white', 'children', 'begin', 'got', 'walk', 'example', 'ease', 'paper', 'group', 'always', 'music', 'those', 'both', 'mark', 'often', 'letter', 'until', 'mile', 'river', 'car', 'feet', 'care', 'second', 'enough', 'plain', 'girl', 'usual', 'young', 'ready', 'above', 'ever', 'red', 'list', 'though', 'feel', 'talk', 'bird', 'soon', 'body', 'dog', 'family', 'direct', 'pose', 'leave', 'song', 'measure', 'door', 'product', 'black', 'short', 'numeral', 'class', 'wind', 'question', 'happen', 'complete', 'ship', 'area', 'half', 'rock', 'order', 'fire', 'south', 'problem', 'piece', 'told', 'knew', 'pass', 'since', 'top', 'whole', 'king', 'space', 'heard', 'best', 'hour', 'better', 'during', 'hundred', 'five', 'remember', 'step', 'early', 'hold', 'west', 'ground', 'interest', 'reach', 'fast', 'verb', 'sing', 'listen', 'six', 'table', 'travel', 'less', 'morning', 'ten', 'simple', 'several', 'vowel', 'toward', 'war', 'lay', 'against', 'pattern', 'slow', 'center', 'love', 'person', 'money', 'serve', 'appear', 'road', 'map', 'rain', 'rule', 'govern', 'pull', 'cold', 'notice', 'voice', 'unit', 'power', 'town', 'fine', 'certain', 'fly', 'fall', 'lead', 'cry', 'dark', 'machine', 'note', 'wait', 'plan', 'figure', 'star', 'box', 'noun', 'field', 'rest', 'correct', 'able', 'pound', 'done', 'beauty', 'drive', 'stood', 'contain', 'front', 'teach', 'week', 'final', 'gave', 'green', 'quick', 'develop', 'ocean', 'warm', 'free', 'minute', 'strong', 'special', 'mind', 'behind', 'clear', 'tail', 'produce', 'fact', 'street', 'inch', 'multiply', 'nothing', 'course', 'stay', 'wheel', 'full', 'force', 'blue', 'object', 'decide', 'surface', 'deep', 'moon', 'island', 'foot', 'system', 'busy', 'test', 'record', 'boat', 'common', 'gold', 'possible', 'plane', 'stead', 'dry', 'wonder', 'laugh', 'thousands', 'ago', 'ran', 'check', 'game', 'shape', 'equate', 'hot', 'miss', 'brought', 'heat', 'snow', 'tire', 'bring', 'yes', 'distant', 'fill', 'east', 'paint', 'language', 'among', 'grand', 'ball', 'yet', 'wave', 'drop', 'heart', 'am', 'present', 'heavy', 'dance', 'engine', 'position', 'arm', 'wide', 'sail', 'material', 'size', 'vary', 'settle', 'speak', 'weight', 'general', 'ice', 'matter', 'circle', 'pair', 'include', 'divide', 'syllable', 'felt', 'perhaps', 'pick', 'sudden', 'count', 'square', 'reason', 'length', 'represent', 'art', 'subject', 'region', 'energy', 'hunt', 'probable', 'bed', 'brother', 'egg', 'ride', 'cell', 'believe', 'fraction', 'forest', 'sit', 'race', 'window', 'store', 'summer', 'train', 'sleep', 'prove', 'lone', 'leg', 'exercise', 'wall', 'catch', 'mount', 'wish', 'sky', 'board', 'joy', 'winter', 'sat', 'written', 'wild', 'instrument', 'kept', 'glass', 'grass', 'cow', 'job', 'edge', 'sign', 'visit', 'past', 'soft', 'fun', 'bright', 'gas', 'weather', 'month', 'million', 'bear', 'finish', 'happy', 'hope', 'flower', 'clothe', 'strange', 'gone', 'jump', 'baby', 'eight', 'village', 'meet', 'root', 'buy', 'raise', 'solve', 'metal', 'whether', 'push', 'seven', 'paragraph', 'third', 'shall', 'held', 'hair', 'describe', 'cook', 'floor', 'either', 'result', 'burn', 'hill', 'safe', 'cat', 'century', 'consider', 'type', 'law', 'bit', 'coast', 'copy', 'phrase', 'silent', 'tall', 'sand', 'soil', 'roll', 'temperature', 'finger', 'industry', 'value', 'fight', 'lie', 'beat', 'excite', 'natural', 'view', 'sense', 'ear', 'else', 'quite', 'broke', 'case', 'middle', 'kill', 'son', 'lake', 'moment', 'scale', 'loud', 'spring', 'observe', 'child', 'straight', 'consonant', 'nation', 'dictionary', 'milk', 'speed', 'method', 'organ', 'pay', 'age', 'section', 'dress', 'cloud', 'surprise', 'quiet', 'stone', 'tiny', 'climb', 'bad', 'oil', 'blood', 'touch', 'grew', 'cent', 'mix', 'team', 'wire', 'cost', 'lost', 'brown', 'wear', 'garden', 'equal', 'sent', 'choose', 'fell', 'fit', 'flow', 'fair', 'bank', 'collect', 'save', 'control', 'decimal', 'gentle', 'woman', 'captain', 'practice', 'separate', 'difficult', 'doctor', 'please', 'protect', 'noon', 'whose', 'locate', 'ring', 'character', 'insect', 'caught', 'period', 'indicate', 'radio', 'spoke', 'atom', 'human', 'history', 'effect', 'electric', 'expect', 'crop', 'modern', 'element', 'hit', 'student', 'corner', 'party', 'supply', 'bone', 'rail', 'imagine', 'provide', 'agree', 'thus', 'capital', 'won\'t', 'chair', 'danger', 'fruit', 'rich', 'thick', 'soldier', 'process', 'operate', 'guess', 'necessary', 'sharp', 'wing', 'create', 'neighbor', 'wash', 'bat', 'rather', 'crowd', 'corn', 'compare', 'poem', 'string', 'bell', 'depend', 'meat', 'rub', 'tube', 'famous', 'dollar', 'stream', 'fear', 'sight', 'thin', 'triangle', 'planet', 'hurry', 'chief', 'colony', 'clock', 'mine', 'tie', 'enter', 'major', 'fresh', 'search', 'send', 'yellow', 'gun', 'allow', 'print', 'dead', 'spot', 'desert', 'suit', 'current', 'lift', 'rose', 'continue', 'block', 'chart', 'hat', 'sell', 'success', 'company', 'subtract', 'event', 'particular', 'deal', 'swim', 'term', 'opposite', 'wife', 'shoe', 'shoulder', 'spread', 'arrange', 'camp', 'invent', 'cotton', 'born', 'determine', 'quart', 'nine', 'truck', 'noise', 'level', 'chance', 'gather', 'shop', 'stretch', 'throw', 'shine', 'property', 'column', 'molecule', 'select', 'wrong', 'gray', 'repeat', 'require', 'broad', 'prepare', 'salt', 'nose', 'plural', 'anger', 'claim', 'continent', 'oxygen', 'sugar', 'death', 'pretty', 'skill', 'women', 'season', 'solution', 'magnet', 'silver', 'thank', 'branch', 'match', 'suffix', 'especially', 'fig', 'afraid', 'huge', 'sister', 'steel', 'discuss', 'forward', 'similar', 'guide', 'experience', 'score', 'apple', 'bought', 'led', 'pitch', 'coat', 'mass', 'card', 'band', 'rope', 'slip', 'win', 'dream', 'evening', 'condition', 'feed', 'tool', 'total', 'basic', 'smell', 'valley', 'nor', 'double', 'seat', 'arrive', 'master', 'track', 'parent', 'shore', 'division', 'sheet', 'substance', 'favor', 'connect', 'post', 'spend', 'chord', 'fat', 'glad', 'original', 'share', 'station', 'dad', 'bread', 'charge', 'proper', 'bar', 'offer', 'segment', 'slave', 'duck', 'instant', 'market', 'degree', 'populate', 'chick', 'dear', 'enemy', 'reply', 'drink', 'occur', 'support', 'speech', 'nature', 'range', 'steam', 'motion', 'path', 'liquid', 'log', 'meant', 'quotient', 'teeth', 'shell', 'neck'];
  return stopWords.includes(word);
};

const calculateReadabilityScore = (sentenceCount: number, wordCount: number) => {
  if (sentenceCount === 0) return 0;
  const avgWordsPerSentence = wordCount / sentenceCount;
  return Math.min(100, Math.max(0, 100 - (avgWordsPerSentence - 15) * 2));
};

const calculateSEOScore = (wordCount: number, titleLength: number, descriptionLength: number) => {
  let score = 0;
  
  // Word count scoring
  if (wordCount >= 300) score += 20;
  else if (wordCount >= 150) score += 10;
  
  // Title length scoring
  if (titleLength >= 30 && titleLength <= 60) score += 30;
  else if (titleLength >= 20 && titleLength <= 70) score += 15;
  
  // Description length scoring
  if (descriptionLength >= 120 && descriptionLength <= 160) score += 30;
  else if (descriptionLength >= 100 && descriptionLength <= 180) score += 15;
  
  // Additional bonus points
  if (wordCount >= 500) score += 10;
  if (titleLength >= 40 && titleLength <= 50) score += 10;
  
  return Math.min(100, score);
};

export const SEO_KEYWORDS = {
  MAIN: [
    'image to url',
    'image to url converter',
    'convert image to url',
    'photo to url',
    'picture to link',
    'free image to url',
    'turn image into link',
    'image link generator',
    'photo link creator',
    'upload image get url',
    'image to web link',
    'convert photo to url',
    'free image converter',
    'image url maker',
    'picture url generator',
    'photo to web link',
    'image hosting',
    'free image hosting',
    'upload photos online',
    'share images online',
    'image sharing tool',
    'photo sharing service',
    'web image links',
    'online image converter',
    'instant image links',
    'permanent image links',
    'shareable photo links',
    'easy image sharing',
    'embed image url free',
    'high quality image sharing',
    'anonymous image uploader',
    'quick image hosting free',
    'jpg to url converter',
    'png to url online',
    'photo url generator tool',
    'easy online image hosting',
    'no signup image upload',
    'instant image url sharing',
    'ad-free image uploader',
    'one click image sharing'
  ],
  BLOG_GENERAL: [
    'image hosting blog',
    'image optimization tips',
    'url generation guide',
    'web performance',
    'image sharing best practices',
    'digital asset management',
    'image hosting tutorials',
    'web development tips',
    'photography blog',
    'image compression',
    'web optimization',
    'cdn optimization',
    'image formats',
    'web design',
    'performance optimization',
    'seo for images',
    'image seo',
    'visual content',
    'media optimization'
  ],
  FREE_HOSTING: [
    'free image hosting',
    'unlimited image hosting',
    'no signup image hosting',
    'permanent image hosting',
    'ad-free image hosting',
    'direct image links',
    'image hosting no registration',
    'free photo storage',
    'unlimited photo upload',
    'image hosting service',
    'host images for free',
    'free image storage',
    'online photo hosting',
    'image hosting no limits',
    'free image sharing',
    'host your images',
    'image hosting website',
    'free image upload site',
    'no account image hosting',
    'direct link images',
    'free image server',
    'photo hosting service',
    'image hosting platform'
  ],
  BULK_UPLOAD: [
    'bulk image upload',
    'multiple image upload',
    'batch image upload',
    'upload multiple images',
    'bulk photo upload',
    'mass image upload',
    'simultaneous image upload',
    'multi image upload',
    'bulk file upload',
    'upload many images',
    'batch photo upload',
    'multiple file upload',
    'bulk image hosting',
    'upload images in bulk',
    'mass photo upload',
    'simultaneous photo upload',
    'multi photo upload',
    'bulk image sharing',
    'upload many photos',
    'batch image sharing',
    'multiple image hosting'
  ],
  URL_GENERATOR: [
    'image url generator',
    'photo url generator',
    'picture url generator',
    'image link generator',
    'photo link generator',
    'create image url',
    'generate image link',
    'make image url',
    'image url creator',
    'photo url creator',
    'url from image',
    'link from photo',
    'generate image urls',
    'create image links',
    'image url maker',
    'photo url maker',
    'url generator tool',
    'image link creator',
    'photo link creator',
    'url from image',
    'link from photo',
    'generate photo urls',
    'create photo links'
  ]
};