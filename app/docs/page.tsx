import { redirect } from 'next/navigation';

export default function DocsPage() {
  // Redirect to homepage - API docs are not available for end users
  redirect('/');
}


