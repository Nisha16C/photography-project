# LensLink Photography Project

## Overview

LensLink is a photography portfolio website that showcases photography services, galleries, testimonials, and provides a contact form for potential clients. The project is built with React, Vite, and Node.js.

## Features

- Photo gallery with category filtering
- Photography services showcase
- Client testimonials
- Contact form with validation
- Responsive design

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Node.js HTTP server
- **Styling**: CSS/SCSS
- **Deployment**: Vercel

## Live Demo

The project is deployed and accessible at:

[https://photography-project-3nubq9pe6-nishas-projects-e36fea60.vercel.app](https://photography-project-3nubq9pe6-nishas-projects-e36fea60.vercel.app)

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository (if using Git)
# git clone <repository-url>

# Navigate to project directory
cd LensLink

# Install dependencies
npm install
# or
yarn install
```

### Running the Development Server

```bash
# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5000

## Deployment

This project is deployed on Vercel. For detailed deployment instructions, please refer to the [DEPLOYMENT.md](./DEPLOYMENT.md) file.

## Project Structure

```
├── client/               # Frontend code
│   ├── src/              # React source files
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and API clients
│   │   └── assets/       # Static assets
│   └── index.html        # HTML entry point
├── server/               # Backend code
│   ├── index.ts          # Server entry point
│   └── storage.ts        # Data storage implementation
├── shared/               # Shared code between frontend and backend
├── vercel.json           # Vercel deployment configuration
└── package.json          # Project dependencies and scripts
```

## License

This project is licensed under the terms specified in the project's license file.