import { generateHreflangTags } from '@/lib/seo-utils';

interface InternationalizationLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  availableLocales?: string[];
  title?: string;
  description?: string;
}

export default function InternationalizationLayout({ 
  children, 
  currentPath, 
  availableLocales = ['en'],
  title,
  description 
}: InternationalizationLayoutProps) {
  return (
    <>
      {/* Hreflang tags for international SEO */}
      {generateHreflangTags(currentPath, availableLocales).map((tag, index) => (
        <link
          key={index}
          rel={tag.rel}
          hrefLang={tag.hrefLang}
          href={tag.href}
        />
      ))}
      
      {/* Default fallback */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://imagetourl.cloud'}${currentPath}`}
      />
      
      {/* International meta tags */}
      {title && (
        <meta name="intl:title" content={title} />
      )}
      {description && (
        <meta name="intl:description" content={description} />
      )}
      
      {children}
    </>
  );
}