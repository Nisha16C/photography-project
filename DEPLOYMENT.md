# LensLink Photography Project Deployment Guide

## Deployment Information

This project has been successfully deployed to Vercel. Below are the details of the deployment:

- **Production URL**: https://photography-project-3nubq9pe6-nishas-projects-e36fea60.vercel.app
- **Deployment Platform**: Vercel
- **Repository Branch**: without-backend

## Project Structure

The project is a full-stack application with:

- **Frontend**: React with Vite
- **Backend**: Node.js HTTP server
- **Data Storage**: In-memory storage (MemStorage)

## Deployment Configuration

The following files were created/modified for deployment:

1. `vercel.json` - Configuration for Vercel deployment
2. `tsconfig.server.json` - TypeScript configuration for server-side code
3. `package.json` - Updated with Vercel build scripts
4. `server/index.ts` - Modified to handle production environment on Vercel

## How to Update the Deployment

To update the deployed application, follow these steps:

1. Make your changes to the codebase
2. Commit the changes to Git
3. Run `vercel` to create a preview deployment
4. Test the preview deployment
5. Run `vercel --prod` to update the production deployment

## Custom Domain Setup (Optional)

To set up a custom domain for your project:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (photography-project)
3. Go to "Settings" > "Domains"
4. Add your custom domain and follow the instructions to configure DNS settings

## Environment Variables

If you need to add environment variables to your project:

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" > "Environment Variables"
4. Add your environment variables

## Troubleshooting

If you encounter issues with your deployment:

1. Check the Vercel deployment logs in the dashboard
2. Ensure all required environment variables are set
3. Verify that the build process completes successfully
4. Check for any API errors in the browser console

## Local Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at http://localhost:5000