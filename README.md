# Task Forge

A slick todo list application built with modern web technologies, demonstrating full-stack development best practices and contemporary UI/UX design patterns.

## ✨ Features

- **TypeScript** - Full type safety and enhanced developer experience
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **User Authentication** - Secure login and registration with Supabase Auth
- **Theme Support** - Light and dark mode with Material-UI theming
- **Real-time Sync** - Efficient data synchronization using React Query
- **Modern UI** - Clean, intuitive interface built with Material-UI components

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Material-UI, React Query
- **Backend**: Supabase (Database, Authentication, Real-time subscriptions)
- **State Management**: React Query for server state, React hooks for local state
- **Styling**: Material-UI theme system with custom theming support
- **Build Tools**: Vite, TypeScript compiler, ESLint

## 🚀 Live Demo

[View Live Application](https://taskforge.jplante.dev)

# Getting Started

You are free to run the app yourself, or even deploy it! The instructions below should get you started

> [!NOTE]
> You can run this app in two ways: using a dev container (easier), or in your local environment.

## Option 1: Dev Container

The easiest way to get started is using the provided dev container, which includes all dependencies pre-configured.

### Prerequisites

- Docker
- A way to run Dev Containers, the directions below are for VSCode

### Setup

1. **Clone the repository**

   ```bash
   git clone git@github.com:jplante01/task_forge.git
   cd task_forge
   ```

2. **Open in VS Code**

   ```bash
   code .
   ```

3. **Reopen in Container**
   - VS Code will prompt you to "Reopen in Container"
   - Or use Command Palette: `Dev Containers: Reopen in Container`

> [!NOTE]
> The first time you start the container it will download the Supabse docker images, which can take a long time(~15 minutes or more). Subsequent starts will be faster

4. **Start the app**
   Once the container is ready:

   ```bash
   npm run dev
   # starts the vite server and the supabase local dev environment in one command
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## Option 2: Local Environment

### Prerequisites

- Node.js 18+ and npm
- Docker
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)

### Setup

1. **Clone the repository**

   ```bash
   git clone git@github.com:jplante01/task_forge.git
   cd task_forge
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the app**
   Once the container is ready:

   ```bash
   npm run dev
   // starts the vite server and the supabase local dev environment in one command
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

# Production/Deployment

Once you have the app running (either method), you can:

## Production Build

### For Local Testing

```bash
npm run build
npm run preview
```

### For Deployment

#### Backend

1. **Set up your production environment**
   ```bash
   cp .env.production.example .env.production
   ```
2. **Add your production Supabase credentials** to `.env.production`:
   - Get your project URL and anon key from [Supabase Dashboard](https://supabase.com/dashboard)
   - Update the values in `.env.production`
   - Link and push your supabase project with supabase CLI(Read the Supabase docs for details)

#### Frontend

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Deploy the `dist/` folder** to your hosting platform

## 🚀 Automated Front-End Deployment with AWS CLI

This project includes automated deployment of the front-end application to AWS S3 + CloudFront.

### Prerequisites

- AWS CLI installed and configured with appropriate permissions
- S3 bucket with static website hosting enabled
- CloudFront distribution pointing to your S3 bucket (optional but recommended)

### Setup

1. Copy the deployment environment template:
   ```bash
   cp deployment/.env.deploy.example deployment/.env.deploy
   ```
2. Fill in your AWS resource details in `deployment/.env.deploy`:
   - `S3_BUCKET_NAME`: Your S3 bucket name
   - `AWS_REGION`: The AWS region where your S3 bucket is located
   - `CLOUDFRONT_DISTRIBUTION_ID`: Found in AWS Console > CloudFront > Distributions
   - `CLOUDFRONT_URL`: Your CloudFront distribution URL or custom domain

### Deploy

```bash
# Run the script from the `deployment` folder
# NOTE: This command will not have access to aws-cli inside the development container
cd deployment
./deploy.sh
```

The script will:

- Prompt for a deployment comment
- Build the application
- Upload files to S3 with optimized caching headers
- Invalidate CloudFront cache (if configured)
- Log the deployment with version and git commit information

Deployment logs are stored in `deployment/deployment.log` for audit purposes.

## Available Scripts

- `npm run dev` - Starts the local full stack
- `npm run frontend` - Start the application vite local dev server
- `npm run backend` - Start the required Supabase services locally
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run stop` - Stop local Supabase services
- `npm run preview` - Serve production build locally

## Environment Configuration

- **Local development**: Uses `.env.development` (already configured)
- **Production**: Create `.env.production` from the example template
- **Local overrides**: Create `.env.development.local` if needed (gitignored)

## Troubleshooting

- **Supabase connection issues**: Make sure supabase is running with `npm run backend`
- **Port conflicts**: Check if port 54321 is available for Supabase
- **Build errors**: Clear `node_modules` and reinstall dependencies
