export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>RWSDK Better Auth - Modern Authentication</title>
      <link rel="modulepreload" href="/src/client.tsx" />
      <style>{`
        :root {
          --primary-color: #F37337;
          --primary-hover: #e55d23;
          --secondary-color: #6b7280;
          --accent-color: #FFAD48;
          --purple-accent: #8b5cf6;
          --background: #fafafa;
          --surface: #ffffff;
          --surface-hover: #f9fafb;
          --text-primary: #1b1b1b;
          --text-secondary: #6b7280;
          --border-color: #e5e7eb;
          --border-radius: 0.75rem;
          --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
          --gradient-primary: linear-gradient(135deg, #F37337 0%, #FFAD48 100%);
          --gradient-accent: linear-gradient(135deg, #FFAD48 0%, #F37337 100%);
          --gradient-bg: linear-gradient(135deg, #fafafa 0%, #f3f4f6 100%);
        }
        
        @media (prefers-color-scheme: dark) {
          :root {
            --primary-color: #F37337;
            --primary-hover: #ff8c5a;
            --accent-color: #FFAD48;
            --purple-accent: #a78bfa;
            --background: #000000;
            --surface: rgba(10, 10, 10, 0.9);
            --surface-hover: rgba(20, 20, 20, 0.9);
            --text-primary: #ffffff;
            --text-secondary: #a1a1aa;
            --border-color: rgba(39, 39, 42, 0.8);
            --gradient-bg: linear-gradient(135deg, #000000 0%, #0a0a0a 100%);
            --gradient-primary: linear-gradient(135deg, #F37337 0%, #FFAD48 100%);
            --gradient-accent: linear-gradient(135deg, #FFAD48 0%, #F37337 100%);
          }
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        html {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          background: var(--gradient-bg);
          color: var(--text-primary);
          line-height: 1.6;
          min-height: 100vh;
        }
        
        #root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: var(--border-radius);
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: var(--primary-color);
          color: white;
        }
        
        .btn-primary:hover {
          background: var(--primary-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }
        
        .btn-secondary {
          background: var(--surface);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }
        
        .btn-secondary:hover {
          background: var(--surface-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        
        .card {
          background: var(--surface);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          padding: 2rem;
          box-shadow: var(--shadow-lg);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .card:hover {
          box-shadow: var(--shadow-xl);
          transform: translateY(-2px);
        }
        
        @media (prefers-color-scheme: dark) {
          .card {
            background: var(--surface);
            border: 1px solid var(--border-color);
          }
        }
        
        .loading {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 0 0.75rem;
          }
          
          .btn {
            padding: 0.625rem 1.25rem;
            font-size: 0.8125rem;
          }
          
          .card {
            padding: 1.25rem;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 0 0.5rem;
          }
          
          .btn {
            width: 100%;
            justify-content: center;
          }
          
          .card {
            padding: 1rem;
          }
        }
        
        /* Error Message Styling */
        .error-message {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 0.75rem;
          border-radius: var(--border-radius);
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }
        
        @media (prefers-color-scheme: dark) {
          .error-message {
            background: rgba(220, 38, 38, 0.1);
            border: 1px solid rgba(220, 38, 38, 0.3);
            color: #fca5a5;
          }
        }
        
        /* Utility Classes */
        .text-center { text-align: center; }
        .text-left { text-align: left; }
        .text-right { text-align: right; }
        
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .flex-row { flex-direction: row; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .justify-between { justify-content: space-between; }
        
        .gap-1 { gap: 0.25rem; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        
        .mb-0 { margin-bottom: 0; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        
        .mt-0 { margin-top: 0; }
        .mt-1 { margin-top: 0.25rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-3 { margin-top: 0.75rem; }
        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }
        .mt-8 { margin-top: 2rem; }
      `}</style>
    </head>
    <body>
      <div id="root">{children}</div>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);
