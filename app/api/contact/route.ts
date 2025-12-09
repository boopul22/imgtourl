import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Contact form validation schema
const contactSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().trim().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.string().trim().email('Invalid email address'),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject too long'),
  category: z.string().optional().default(''),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message too long'),
  newsletter: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validatedData = contactSchema.parse(body);
    
    // Since we don't have email service, we'll create a mailto link
    // and return the contact information for the user to send manually
    const emailContent = {
      to: 'blog.boopul@gmail.com',
      subject: `Contact Form: ${validatedData.subject}`,
      body: `
Name: ${validatedData.firstName} ${validatedData.lastName}
Email: ${validatedData.email}
Category: ${validatedData.category || 'Not specified'}
Subject: ${validatedData.subject}

Message:
${validatedData.message}

Newsletter Subscription: ${validatedData.newsletter ? 'Yes' : 'No'}

---
Sent from ImageURL Contact Form
`.trim()
    };
    
    // Create Gmail compose URL - opens Gmail in new tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailContent.to)}&su=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`;
    
    // Create mailto URL as fallback
    const mailtoUrl = `mailto:${emailContent.to}?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`;
    
    // Log the contact attempt (in a real app, you might store this in a database)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      from: validatedData.email,
      subject: validatedData.subject,
      category: validatedData.category,
    });
    
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      gmailUrl,
      mailtoUrl,
      fallbackEmail: 'blog.boopul@gmail.com'
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      console.error('Validation errors:', error.errors);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error', 
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit contact form' 
      },
      { status: 500 }
    );
  }
}
