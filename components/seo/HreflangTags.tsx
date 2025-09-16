import { generateHreflangTags } from '@/lib/seo-utils';

interface HreflangTagsProps {
  currentPath: string;
  availableLocales?: string[];
}

export default function HreflangTags({ currentPath, availableLocales = ['en'] }: HreflangTagsProps) {
  const hreflangTags = generateHreflangTags(currentPath, availableLocales);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud';
  
  return (
    <>
      {hreflangTags.map((tag, index) => (
        <link
          key={index}
          rel={tag.rel}
          hrefLang={tag.hrefLang}
          href={tag.href}
        />
      ))}
      {/* Self-referencing hreflang annotation */}
      <link
        rel="alternate"
        hrefLang="en-US"
        href={`${baseUrl}${currentPath}`}
      />
      {/* Default fallback */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}${currentPath}`}
      />
    </>
  );
}