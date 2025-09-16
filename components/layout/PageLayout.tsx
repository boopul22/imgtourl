import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  showLastUpdated?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl';
}

export default function PageLayout({ 
  children, 
  title, 
  description, 
  showLastUpdated = false,
  maxWidth = '4xl' 
}: PageLayoutProps) {
  const maxWidthClass = {
    'sm': 'max-w-sm',
    'md': 'max-w-md', 
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl'
  }[maxWidth];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className={`${maxWidthClass} mx-auto`}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {description}
              </p>
            )}
            {showLastUpdated && (
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            )}
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}