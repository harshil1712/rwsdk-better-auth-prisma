"use client";

import { useState, useTransition, useEffect } from "react";
import { authClient } from "../../../lib/auth-client";

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LoadingSpinner() {
  return <div className="loading" />;
}

export function Login() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleGitHubLogin = async () => {
    setError(""); // Clear previous errors

    try {
      // Use Better Auth's GitHub OAuth flow
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/", // Redirect to home after successful login
      });
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
    }
  };

  const performGitHubLogin = () => {
    startTransition(() => {
      void handleGitHubLogin();
    });
  };

  const isLoading = isPending;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        className="card fade-in"
        style={{
          width: "100%",
          maxWidth: "450px",
          textAlign: "center",
          padding: "4rem 3rem"
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            width: "5rem",
            height: "5rem",
            background: "var(--gradient-primary)",
            borderRadius: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 2rem",
            fontSize: "2rem",
            boxShadow: "var(--shadow-xl)"
          }}
        >
          🚀
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
            marginBottom: "0.75rem",
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "2.5rem",
            lineHeight: "1.6",
            fontSize: "1.125rem"
          }}
        >
          Sign in to your account using GitHub OAuth to access your personalized
          dashboard.
        </p>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* GitHub Login Button */}
        <button
          onClick={performGitHubLogin}
          disabled={isLoading}
          className="btn btn-primary"
          style={{
            width: "100%",
            fontSize: "1.125rem",
            padding: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            background: "#24292e",
            marginBottom: "2rem",
            transition: "all 0.3s ease",
            borderRadius: "0.75rem",
            boxShadow: "var(--shadow-lg)",
            fontWeight: "600"
          }}
          onMouseOver={(e) =>
            !isLoading && (e.currentTarget.style.background = "#1a1e22")
          }
          onMouseOut={(e) =>
            !isLoading && (e.currentTarget.style.background = "#24292e")
          }
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              Signing in...
            </>
          ) : (
            <>
              <GitHubIcon />
              Continue with GitHub
            </>
          )}
        </button>

        {/* Back to Home Link */}
        <a
          href="/"
          style={{
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "0.875rem",
            transition: "color 0.2s ease",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLElement).style.color = "var(--primary-color)")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLElement).style.color = "var(--text-secondary)")
          }
        >
          ← Back to Home
        </a>

        {/* Info Section */}
        <div
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            background: "var(--surface-hover)",
            borderRadius: "var(--border-radius)",
            border: "1px solid var(--border-color)",
          }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
              color: "var(--text-primary)",
            }}
          >
            Secure Authentication
          </h3>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              lineHeight: "1.4",
            }}
          >
            Powered by Better Auth with GitHub OAuth. Your data is secure and we
            only access basic profile information.
          </p>
        </div>
      </div>
    </div>
  );
}
