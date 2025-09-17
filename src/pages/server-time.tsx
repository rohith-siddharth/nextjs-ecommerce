import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../layouts/Main';

interface ServerTimeProps {
  serverTimestamp: number;
  serverDate: string;
}

const ServerTimePage = ({ serverTimestamp, serverDate }: ServerTimeProps) => {
  const [clientTimestamp, setClientTimestamp] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    // Set client timestamp on mount
    const clientTime = Date.now();
    setClientTimestamp(clientTime);
    setCurrentTime(clientTime);

    // Update current time every second
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout title="Server Time - Next.js Ecommerce">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Server vs Client Timestamps</h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Server Timestamp */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">🖥️ Server Side</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Raw Timestamp</h3>
                  <p className="text-xl font-mono bg-white p-3 rounded border text-blue-600 font-bold">
                    {serverTimestamp}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Formatted Date</h3>
                  <p className="text-sm bg-white p-3 rounded border">
                    {serverDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Client Timestamp */}
            <div className="bg-green-50 p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h2 className="text-2xl font-bold text-green-700 mb-4">💻 Client Side</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Initial Timestamp</h3>
                  <p className="text-xl font-mono bg-white p-3 rounded border text-green-600 font-bold">
                    {clientTimestamp || 'Loading...'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Live Timestamp</h3>
                  <p className="text-xl font-mono bg-white p-3 rounded border text-green-600 font-bold">
                    {currentTime || 'Loading...'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Live Date</h3>
                  <p className="text-sm bg-white p-3 rounded border">
                    {currentTime ? new Date(currentTime).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      timeZoneName: 'short'
                    }) : 'Loading...'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison */}
          {clientTimestamp && (
            <div className="mt-8 bg-yellow-50 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h2 className="text-xl font-bold text-yellow-700 mb-4">📊 Comparison</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Time Difference</h3>
                  <p className="text-lg font-mono bg-white p-2 rounded">
                    {Math.abs(clientTimestamp - serverTimestamp)} ms
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Server was {clientTimestamp > serverTimestamp ? 'earlier' : 'later'}</h3>
                  <p className="text-sm text-gray-600">
                    This difference represents the time between server rendering and client hydration.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded border">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> The server timestamp is generated during SSR and remains constant. 
              The client timestamps are generated in the browser and update in real-time.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<ServerTimeProps> = async () => {
  // Generate timestamp on server
  const serverTimestamp = Date.now();
  
  // Log to server console
  console.log('Server timestamp generated:', serverTimestamp);
  console.log('Server date:', new Date(serverTimestamp).toISOString());
  
  // Format date for display
  const serverDate = new Date(serverTimestamp).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });

  return {
    props: {
      serverTimestamp,
      serverDate,
    },
  };
};

export default ServerTimePage;
