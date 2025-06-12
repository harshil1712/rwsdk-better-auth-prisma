"use client";

import { RequestInfo } from "rwsdk/worker";

function WelcomeCard({ user }: { user: any }) {
  return (
    <div className="card fade-in" style={{ marginBottom: '2rem' }}>
      <div className="flex items-center gap-4 mb-4">
        {user?.image && (
          <img 
            src={user.image} 
            alt={user.name || user.username || 'User'} 
            style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              border: '2px solid var(--border-color)'
            }}
          />
        )}
        <div>
          <h2 style={{ marginBottom: '0.25rem', fontSize: '1.5rem', fontWeight: '600' }}>
            Welcome{user?.name ? `, ${user.name}` : user?.username ? `, ${user.username}` : ''}!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {user?.email || 'Authenticated user'}
          </p>
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)' }}>
        You're successfully authenticated with your GitHub account. 
        This demo showcases RedwoodJS SDK with Better Auth and Prisma on Cloudflare Workers.
      </p>
    </div>
  );
}

function LoginPrompt() {
  return (
    <div className="card fade-in" style={{ 
      textAlign: 'center', 
      padding: '4rem 3rem'
    }}>
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          width: '5rem',
          height: '5rem',
          background: 'var(--gradient-primary)',
          borderRadius: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '2rem',
          boxShadow: 'var(--shadow-xl)'
        }}>
          🔐
        </div>
        <h2 style={{ 
          marginBottom: '1rem', 
          fontSize: '2.5rem', 
          fontWeight: '700',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Welcome to RWSDK Better Auth
        </h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          maxWidth: '32rem', 
          margin: '0 auto',
          fontSize: '1.125rem',
          lineHeight: '1.7'
        }}>
          Experience modern authentication with GitHub OAuth, powered by Better Auth, 
          Prisma ORM, and deployed on Cloudflare Workers.
        </p>
      </div>
      <a href="/user/login" className="btn btn-primary" style={{ 
        fontSize: '1.125rem', 
        padding: '1.25rem 2.5rem',
        background: 'var(--gradient-primary)',
        border: 'none',
        boxShadow: 'var(--shadow-lg)',
        transform: 'translateY(0)',
        transition: 'all 0.3s ease'
      }}>
        Sign in with GitHub
      </a>
    </div>
  );
}

function FeatureGrid() {
  const features = [
    {
      icon: '⚡',
      title: 'Cloudflare Workers',
      description: 'Lightning-fast edge computing with global distribution'
    },
    {
      icon: '🔒',
      title: 'Better Auth',
      description: 'Secure authentication with OAuth providers'
    },
    {
      icon: '🗄️',
      title: 'Prisma + D1',
      description: 'Type-safe database operations with SQLite on the edge'
    },
    {
      icon: '⚛️',
      title: 'React SSR',
      description: 'Server-side rendering with React Server Components'
    }
  ];

  return (
    <div style={{ marginTop: '3rem' }}>
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem', 
        fontSize: '1.5rem', 
        fontWeight: '600',
        color: 'var(--purple-accent)'
      }}>
        Built with Modern Stack
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {features.map((feature, index) => (
          <div key={index} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              {feature.icon}
            </div>
            <h4 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>
              {feature.title}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Home({ ctx }: RequestInfo) {
  const isAuthenticated = ctx.session && ctx.user;

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        background: 'var(--surface)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '1.5rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              background: 'var(--gradient-primary)',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              🚀
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              RWSDK Better Auth
            </h1>
          </div>
          {isAuthenticated && (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <a href="/user/profile" className="btn btn-secondary">
                Profile
              </a>
              <a href="/user/logout" className="btn btn-secondary">
                Sign Out
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container" style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {isAuthenticated ? (
            <>
              <WelcomeCard user={ctx.user} />
              <FeatureGrid />
            </>
          ) : (
            <>
              <LoginPrompt />
              <FeatureGrid />
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        background: 'var(--surface)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--border-color)',
        padding: '3rem 0',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.875rem'
      }}>
        <div className="container">
          <p style={{ 
            fontSize: '1rem',
            fontWeight: '500',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Built with ❤️ using RedwoodJS SDK, Better Auth, Prisma, and Cloudflare Workers
          </p>
          <div style={{ 
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>⚡ Edge Computing</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>🔒 Secure Auth</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>🗄️ Type-safe ORM</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>⚛️ React SSR</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
