"use client";
import { RequestInfo } from "rwsdk/worker";
import { useActionState } from "react";
import { updateUserProfile } from "./actions/profileActions";

export function Profile({ ctx }: RequestInfo) {
  const { user } = ctx;

  const [state, submitAction, isPending] = useActionState(
    updateUserProfile,
    null,
    "/user/profile"
  );

  if (!user) {
    return (
      <div className="container" style={{ padding: "2rem" }}>
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <h2 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>
            Access Denied
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
            You need to be logged in to view your profile.
          </p>
          <a href="/user/login" className="btn btn-primary">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      {/* Header */}
      <header
        style={{
          background: "var(--surface)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--border-color)",
          padding: "1.5rem 0",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                background: "var(--gradient-primary)",
                borderRadius: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                boxShadow: "var(--shadow-md)",
              }}
            >
              👤
            </div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--text-primary)",
              }}
            >
              User Profile
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a href="/" className="btn btn-secondary">
              Home
            </a>
            <a href="/user/logout" className="btn btn-secondary">
              Sign Out
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container" style={{ padding: "4rem 1rem" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Profile Header */}
          <div
            className="card fade-in"
            style={{ marginBottom: "2rem", textAlign: "center" }}
          >
            <div style={{ marginBottom: "2rem" }}>
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  style={{
                    width: "5rem",
                    height: "5rem",
                    borderRadius: "50%",
                    border: "3px solid var(--border-color)",
                    margin: "0 auto 1rem",
                    display: "block",
                  }}
                />
              )}
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  marginBottom: "0.5rem",
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {user.name || "User"}
              </h2>
              <p
                style={{ color: "var(--text-secondary)", fontSize: "1.125rem" }}
              >
                {user.email}
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  background: "var(--surface-hover)",
                  borderRadius: "2rem",
                  border: "1px solid var(--border-color)",
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                }}
              >
                <span style={{ color: "var(--green-accent)" }}>●</span>
                {user.emailVerified ? "Email Verified" : "Email Not Verified"}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="card fade-in">
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "2rem",
                color: "var(--text-primary)",
              }}
            >
              Edit Profile
            </h3>

            {/* Success Message */}
            {state?.success && (
              <div
                style={{
                  background: "var(--green-bg)",
                  color: "var(--green-accent)",
                  padding: "1rem",
                  borderRadius: "var(--border-radius)",
                  border: "1px solid var(--green-accent)",
                  marginBottom: "1.5rem",
                  fontSize: "0.875rem",
                }}
              >
                Profile updated successfully!
              </div>
            )}

            {/* Error Message */}
            {state?.error && (
              <div className="error-message" style={{ marginBottom: "1.5rem" }}>
                {state.error}
              </div>
            )}

            <form action={submitAction}>
              {/* Hidden user ID field */}
              <input type="hidden" name="userId" value={user.id} />

              {/* Name Field */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "var(--text-primary)",
                  }}
                >
                  Display Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={user.name || ""}
                  placeholder="Enter your display name"
                  maxLength={100}
                  pattern="[^<>]*"
                  title="Name cannot contain < or > characters"
                  disabled={isPending}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--border-radius)",
                    background: isPending
                      ? "var(--surface-hover)"
                      : "var(--surface)",
                    color: "var(--text-primary)",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    opacity: isPending ? 0.7 : 1,
                  }}
                />
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    marginTop: "0.5rem",
                  }}
                >
                  This will be displayed as your public name throughout the
                  application.
                </p>
              </div>

              {/* Image URL Field */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  htmlFor="image"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "var(--text-primary)",
                  }}
                >
                  Profile Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  defaultValue={user.image || ""}
                  placeholder="https://example.com/your-image.jpg"
                  maxLength={2000}
                  pattern="https?://.*"
                  title="Please enter a valid HTTP or HTTPS URL"
                  disabled={isPending}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--border-radius)",
                    background: isPending
                      ? "var(--surface-hover)"
                      : "var(--surface)",
                    color: "var(--text-primary)",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    opacity: isPending ? 0.7 : 1,
                  }}
                />
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    marginTop: "0.5rem",
                  }}
                >
                  Leave empty to use your GitHub profile image.
                </p>
              </div>

              {/* Email Field (Read-only) */}
              <div style={{ marginBottom: "2rem" }}>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "var(--text-primary)",
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  disabled
                  style={{
                    width: "100%",
                    padding: "1rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--border-radius)",
                    background: "var(--surface-hover)",
                    color: "var(--text-secondary)",
                    fontSize: "1rem",
                    cursor: "not-allowed",
                  }}
                />
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    marginTop: "0.5rem",
                  }}
                >
                  Email is managed through your GitHub account and cannot be
                  changed here.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  fontSize: "1.125rem",
                  padding: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  background: isPending
                    ? "var(--surface-hover)"
                    : "var(--gradient-primary)",
                  transition: "all 0.3s ease",
                  borderRadius: "0.75rem",
                  boxShadow: "var(--shadow-lg)",
                  fontWeight: "600",
                  opacity: isPending ? 0.7 : 1,
                  cursor: isPending ? "not-allowed" : "pointer",
                }}
              >
                {isPending ? (
                  <>
                    <div className="loading" />
                    Updating Profile...
                  </>
                ) : (
                  <>💾 Save Changes</>
                )}
              </button>
            </form>
          </div>

          {/* Account Info */}
          <div className="card fade-in" style={{ marginTop: "2rem" }}>
            <h4
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--text-primary)",
              }}
            >
              Account Information
            </h4>
            <div style={{ display: "grid", gap: "1rem", fontSize: "0.875rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>User ID:</span>
                <span
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "monospace",
                  }}
                >
                  {user.id}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>
                  Account Created:
                </span>
                <span style={{ color: "var(--text-primary)" }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>
                  Last Updated:
                </span>
                <span style={{ color: "var(--text-primary)" }}>
                  {new Date(user.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
