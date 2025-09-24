import React, { useState } from "react";
import Layout from "../layouts/Main";

// Environment configurations
const environments = {
  dev: {
    name: "Development",
    baseUrl: "https://dev.pier39.tech",
    color: "#28a745", // green
  },
  staging: {
    name: "Staging", 
    baseUrl: "https://staging.pier39.tech",
    color: "#ffc107", // yellow
  },
  prod: {
    name: "Production",
    baseUrl: "https://pier39.tech",
    color: "#dc3545", // red
  }
};

interface ApiResponse {
  data?: any;
  error?: string;
  status?: number;
}

const DomainCheckPage = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<{ [key: string]: ApiResponse }>({});

  const callApi = async (envKey: string) => {
    const env = environments[envKey as keyof typeof environments];
    setLoading(envKey);
    
    try {
      const response = await fetch(`${env.baseUrl}/publishers/store/all-stores/list`, {
        method: 'GET',
        headers: {
          'Cookie': 'GAESA=CqYBMDA2OWM3YTk4ODVjYmE5MGRlZDkwMTFjNmI3MTE5ZDU1MzdjOTcxNDljNTVlNDFjYmNkMWViMTdmNzlhOTk0OTExMjExZmU3MjFmOWM0M2ViODAzZDJlMGU0MGRjMTIwNDQ5NmMyYjk5Y2I5YmI5OTIxMzFmZTYyMDU2Y2E4M2Y2Y2IzYjhhODA2NjI1OGYwNDFjMzhhMTgyN2RkOTZiYTFkOTFkOBDPtJ_rlzM; visitor_id=55a08c9d-7d0d-493d-9980-5dc814128c05'
        },
      });

      const data = await response.json();
      
      setResults(prev => ({
        ...prev,
        [envKey]: {
          data,
          status: response.status,
        }
      }));
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [envKey]: {
          error: error instanceof Error ? error.message : 'An error occurred',
          status: 0,
        }
      }));
    } finally {
      setLoading(null);
    }
  };

  const clearResults = () => {
    setResults({});
  };

  return (
    <Layout title="Domain Check - Next.js Ecommerce">
      <div className="domain-check-page">
        <div className="container">
          <div className="domain-check-header">
            <h1>Domain Environment Checker</h1>
            <p>Test the API across different environments</p>
          </div>

          <div className="environment-buttons">
            {Object.entries(environments).map(([key, env]) => (
              <button
                key={key}
                className={`env-button env-button--${key}`}
                onClick={() => callApi(key)}
                disabled={loading !== null}
                style={{
                  backgroundColor: loading === key ? '#6c757d' : env.color,
                  borderColor: env.color,
                }}
              >
                {loading === key ? (
                  <>
                    <span className="spinner"></span>
                    Testing {env.name}...
                  </>
                ) : (
                  `Test ${env.name}`
                )}
              </button>
            ))}
          </div>

          {Object.keys(results).length > 0 && (
            <div className="results-section">
              <div className="results-header">
                <h2>API Results</h2>
                <button className="clear-button" onClick={clearResults}>
                  Clear Results
                </button>
              </div>
              
              {Object.entries(results).map(([envKey, result]) => {
                const env = environments[envKey as keyof typeof environments];
                return (
                  <div key={envKey} className="result-item">
                    <div className="result-header">
                      <h3 style={{ color: env.color }}>
                        {env.name} Environment
                      </h3>
                      <span className={`status-badge ${result.error ? 'status-error' : 'status-success'}`}>
                        {result.error ? 'ERROR' : `${result.status} OK`}
                      </span>
                    </div>
                    
                    <div className="result-content">
                      {result.error ? (
                        <div className="error-message">
                          <strong>Error:</strong> {result.error}
                        </div>
                      ) : (
                        <pre className="json-response">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .domain-check-page {
          min-height: 80vh;
          padding: 2rem 0;
        }

        .domain-check-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .domain-check-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .domain-check-header p {
          font-size: 1.1rem;
          color: #666;
        }

        .environment-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .env-button {
          padding: 1rem 2rem;
          border: 2px solid;
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 180px;
          justify-content: center;
        }

        .env-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .env-button:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .results-section {
          margin-top: 2rem;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .results-header h2 {
          margin: 0;
          color: #333;
        }

        .clear-button {
          padding: 0.5rem 1rem;
          background: #6c757d;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .clear-button:hover {
          background: #5a6268;
        }

        .result-item {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          overflow: hidden;
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: white;
          border-bottom: 1px solid #e9ecef;
        }

        .result-header h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .status-success {
          background: #d4edda;
          color: #155724;
        }

        .status-error {
          background: #f8d7da;
          color: #721c24;
        }

        .result-content {
          padding: 1rem;
        }

        .error-message {
          color: #721c24;
          background: #f8d7da;
          padding: 1rem;
          border-radius: 4px;
          border: 1px solid #f5c6cb;
        }

        .json-response {
          background: #f1f3f4;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
          font-size: 0.9rem;
          line-height: 1.4;
          max-height: 400px;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .environment-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .results-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
          
          .domain-check-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default DomainCheckPage;
