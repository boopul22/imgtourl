'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

const faqData: FAQItem[] = [
  {
    question: "How do I turn my photo into a URL for free?",
    answer: "Turning photos into URLs is completely free and easy! Just drag your picture into our upload area or click to choose a file from your computer. Our image to URL converter will give you a web link in seconds. No need to sign up or create an account.",
    keywords: ["turn photo into url", "image to url converter", "free photo to url", "convert image to url"]
  },
  {
    question: "What's the best way to get a link for my image?",
    answer: "Our free image to URL tool is the easiest way to get links for your pictures. You can upload any photo type (JPG, PNG, GIF, etc.) and get a permanent web link that works everywhere. Just upload and copy your link - it's that simple!",
    keywords: ["best way to get image link", "image to url tool", "permanent web link", "upload photo get link"]
  },
  {
    question: "Can I share my photos online without creating an account?",
    answer: "Yes! You can upload and share photos without any account. Just upload your picture (up to 10MB), get your web link instantly, and share it anywhere you want. Perfect for social media, messaging, or showing photos to friends and family.",
    keywords: ["share photos without account", "upload photos online", "instant web link", "share photos anywhere"]
  },
  {
    question: "How can I add images to my blog without signing up?",
    answer: "You can easily add images to your blog without any signup! Upload your photos, get permanent web links, and paste them directly into your blog posts. The links work forever and load fast for your readers.",
    keywords: ["add images to blog", "no signup needed", "permanent web links", "blog images"]
  },
  {
    question: "How do I upload my artwork and get a link to share?",
    answer: "Upload your artwork or photos and get a shareable link right away! Our tool keeps your image quality perfect and gives you a web link you can share on social media, in messages, or anywhere online. Great for artists showing their work!",
    keywords: ["upload artwork get link", "share artwork online", "image quality preserved", "social media sharing"]
  },
  {
    question: "Can I upload large photos for free?",
    answer: "Yes! You can upload photos up to 10MB each, completely free. Upload as many large photos as you want. We'll make sure they load quickly while keeping them looking great. Perfect for high-quality photos and detailed pictures.",
    keywords: ["upload large photos free", "10MB photos", "unlimited uploads", "high quality photos"]
  },
  {
    question: "How do I get image links for forum posts?",
    answer: "Getting image links for forums is super easy! Upload your picture, copy the web link we give you, and paste it into your forum post. The links work in any forum and never expire. No ads or annoying stuff - just clean, simple links.",
    keywords: ["image links for forums", "forum posts", "copy paste links", "no ads"]
  },
  {
    question: "What's the easiest way to upload multiple images at once?",
    answer: "You can drag and drop multiple photos at the same time! Just select all your pictures and drop them into our upload area. You'll get individual web links for each photo. Perfect when you have lots of pictures to share.",
    keywords: ["upload multiple images", "drag drop photos", "bulk upload", "multiple photo links"]
  },
  {
    question: "How do I turn a JPG into a web link?",
    answer: "Turning a JPG into a web link is instant! Just upload your JPG photo and we'll give you a shareable web link in seconds. Your photo will look great and load fast wherever you share it.",
    keywords: ["jpg to web link", "convert jpg to url", "instant jpg links", "shareable jpg"]
  },
  {
    question: "How do I turn a PNG into a URL for free?",
    answer: "Turning PNG files into URLs is totally free! Upload your PNG picture and get an instant web link. We keep the clear backgrounds and quality perfect. Your PNG will look exactly the same when people view it online.",
    keywords: ["png to url free", "convert png to url", "clear backgrounds", "perfect quality"]
  },
  {
    question: "What's the best way to create photo links?",
    answer: "Our image to URL tool is the best way to create photo links! Just upload any photo and get a web link instantly. Works with all photo types, gives you easy sharing options, and even creates QR codes if you need them.",
    keywords: ["create photo links", "image to url tool", "instant photo links", "QR codes"]
  },
  {
    question: "Where can I upload images without seeing ads?",
    answer: "Right here! Our image to URL service is completely ad-free. No annoying pop-ups, banners, or distractions. Just upload your photo, get your link, and you're done. Clean and simple, the way it should be.",
    keywords: ["upload images no ads", "ad-free image upload", "clean simple upload", "no distractions"]
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Common Questions About Image to URL</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about turning your photos into web links you can share anywhere.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-3">
          {faqData.map((item, index) => (
            <Card key={index} className="overflow-hidden border border-brand-beige/50 hover:bg-brand-beige/20 transition-colors duration-200">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 md:p-8 text-left flex items-center justify-between hover:bg-muted/30 transition-colors touch-target"
              >
                <h3 className="text-lg md:text-xl font-semibold pr-4 leading-snug">{item.question}</h3>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-4 h-4 text-primary" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-primary" />
                  )}
                </div>
              </button>

              {openItems.includes(index) && (
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <div className="pt-4 border-t border-muted">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Still have questions?
              <a href="#contact" className="text-primary hover:underline font-medium ml-1">Contact us</a>
              and we'll help you turn your photos into web links.
            </p>
          </div>

          {/* SEO content optimized for "image to url" */}
          <p className="text-sm text-muted-foreground mt-8 max-w-3xl mx-auto">
            Free image to URL converter FAQ covering how to turn photos into web links,
            upload images online, and create shareable picture links instantly.
          </p>
        </div>
      </div>
    </section>
  );
}
