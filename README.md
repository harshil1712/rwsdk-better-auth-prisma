# RWSDK Better Auth Example

A modern authentication demo built with **RedwoodJS SDK (RWSDK)**, **Better Auth**, and **Prisma ORM**, deployed on **Cloudflare Workers** with **D1 Database**.

## ✨ Features

- 🔒 **GitHub OAuth Authentication** with Better Auth
- ⚡ **Edge Computing** with Cloudflare Workers
- 🗄️ **Type-safe Database** operations with Prisma + D1
- ⚛️ **React Server Components** with server-side rendering
- 🎨 **Modern UI** with RWSDK brand colors and dark mode support
- 📱 **Responsive Design** with glassmorphism effects

## 🛠️ Tech Stack

- **[RedwoodJS SDK](https://rwsdk.com)** - Modern full-stack framework
- **[Better Auth](https://better-auth.com)** - Secure authentication library
- **[Prisma](https://prisma.io)** - Type-safe ORM with D1 adapter
- **[Cloudflare Workers](https://workers.cloudflare.com)** - Edge computing platform
- **[D1 Database](https://developers.cloudflare.com/d1/)** - SQLite at the edge

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Cloudflare account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rwsdk-better-auth-prisma
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following variables:
   ```env
   BETTER_AUTH_URL=http://localhost:5173
   OAUTH_GITHUB_CLIENT_ID=your_github_client_id
   OAUTH_GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. **Generate Prisma client and apply migrations**
   ```bash
   npm run generate
   npm run migrate:dev
   ```

5. **Generate Better Auth schema**
   ```bash
   npx @better-auth/cli generate
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:5173` to see the application!

## 📝 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run types` - Run type checking

### Database
- `npm run generate` - Generate Prisma client and Wrangler types
- `npm run migrate:dev` - Apply migrations to local database
- `npm run migrate:prd` - Apply migrations to production D1 database
- `npm run migrate:new` - Create new migration
- `npm run check` - Run type checking after generation

### Deployment
- `npm run release` - Deploy to Cloudflare Workers

## 🗄️ Database Setup

This project uses **Prisma** with the **D1 adapter** for Cloudflare Workers:

1. **Local Development**: Uses SQLite file database
2. **Production**: Uses Cloudflare D1 database

### Migration Workflow

1. **Create migration**:
   ```bash
   npm run migrate:new
   ```

2. **Apply to local database**:
   ```bash
   npm run migrate:dev
   ```

3. **Deploy to production**:
   ```bash
   npm run migrate:prd
   ```

## 🔑 Authentication Setup

### GitHub OAuth Configuration

1. **Create GitHub OAuth App**:
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create a new OAuth App
   - Set Authorization callback URL to: `http://localhost:5173/api/auth/callback/github`

2. **Configure Environment Variables**:
   ```env
   OAUTH_GITHUB_CLIENT_ID=your_client_id
   OAUTH_GITHUB_CLIENT_SECRET=your_client_secret
   ```

3. **Better Auth Integration**:
   - Better Auth handles OAuth flows automatically
   - Session management integrated with Prisma
   - Type-safe user authentication throughout the app

## 🎨 UI Features

- **RWSDK Brand Colors**: Official orange color scheme (`#F37337`)
- **Dark Mode Support**: True black theme with high contrast
- **Modern Design**: Glassmorphism effects and smooth animations
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Interactive Elements**: Hover effects and transitions

## 📁 Project Structure

```
src/
├── app/
│   ├── Document.tsx          # HTML document with styling
│   ├── pages/
│   │   ├── Home.tsx          # Main landing page
│   │   └── user/
│   │       ├── Login.tsx     # Authentication page
│   │       └── routes.ts     # User route definitions
│   └── shared/
├── lib/
│   ├── auth.ts              # Better Auth configuration
│   └── auth-client.ts       # Client-side auth utilities
├── worker.tsx               # Main application entry point
└── db.ts                    # Database configuration

prisma/
└── schema.prisma           # Database schema

migrations/
└── 0001_better_auth.sql    # Database migrations
```

## 🚀 Deployment

### Cloudflare Workers Deployment

1. **Configure Wrangler**:
   ```bash
   npx wrangler login
   ```

2. **Set up D1 Database**:
   ```bash
   npx wrangler d1 create your-database-name
   ```

3. **Update wrangler.jsonc** with your D1 database ID

4. **Deploy**:
   ```bash
   npm run release
   ```

### Environment Variables for Production

Set these in Cloudflare Workers dashboard:
- `BETTER_AUTH_URL` - Your production domain
- `OAUTH_GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `OAUTH_GITHUB_CLIENT_SECRET` - GitHub OAuth client secret

## 🛟 Troubleshooting

### Common Issues

1. **Better Auth CLI Error**: 
   - Ensure auth configuration doesn't use Cloudflare Workers imports during CLI execution
   - The project includes runtime-compatible auth setup

2. **Migration Errors**:
   - Check database connection string
   - Ensure Prisma client is generated: `npm run generate`

3. **Type Errors**:
   - Run `npm run types` to check for issues
   - Regenerate types: `npm run generate`

## 📚 Learn More

- [RedwoodJS SDK Documentation](https://docs.rwsdk.com)
- [Better Auth Documentation](https://docs.better-auth.com)
- [Prisma D1 Documentation](https://www.prisma.io/docs/orm/overview/databases/cloudflare-d1)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using RedwoodJS SDK, Better Auth, Prisma, and Cloudflare Workers