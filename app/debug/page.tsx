'use client';

import { useState } from 'react';

export default function DebugPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      setTestResults({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data
      });
    } catch (error) {
      setTestResults({
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    setLoading(false);
  };

  const testUploadAPI = async () => {
    setLoading(true);
    try {
      // Create a small test file
      const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const formData = new FormData();
      formData.append('file', testFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { rawResponse: responseText };
      }

      setUploadResult({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data,
        rawResponse: responseText
      });
    } catch (error) {
      setUploadResult({
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">API Debug Page</h1>
      
      <div className="space-y-6">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Test API Endpoint</h2>
          <button 
            onClick={testAPI}
            disabled={loading}
            className="bg-brand-orange text-white px-4 py-2 rounded hover:bg-brand-orange/90 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test /api/test'}
          </button>
          
          {testResults && (
            <div className="mt-4">
              <h3 className="font-semibold">Results:</h3>
              <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto text-sm">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Test Upload API Endpoint</h2>
          <button 
            onClick={testUploadAPI}
            disabled={loading}
            className="bg-brand-blue-gray text-white px-4 py-2 rounded hover:bg-brand-blue-gray/90 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test /api/upload'}
          </button>
          
          {uploadResult && (
            <div className="mt-4">
              <h3 className="font-semibold">Results:</h3>
              <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto text-sm">
                {JSON.stringify(uploadResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
          <div className="text-sm">
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
            <p><strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
