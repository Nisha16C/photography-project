# Photographer Portfolio & Booking Website

## Overview

This is a full-stack photographer portfolio and booking website designed for professional photographers to showcase their work, promote services, and handle client inquiries. The application targets couples, families, event planners, and brand managers in India, featuring an elegant, modern, and artistic design with minimal UI and bold imagery.

The website includes comprehensive portfolio galleries with category filtering, service packages, testimonials, and a contact system for booking inquiries. It's built to handle various photography services including weddings, pre-wedding shoots, engagement ceremonies, haldi, mehndi, baby showers, maternity, and family photography.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Typography**: Custom font stack using Playfair Display (serif) and Inter (sans-serif)
- **Animations**: Framer Motion for smooth page transitions and interactive elements
- **State Management**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Component Structure
The frontend follows a component-based architecture with:
- Reusable UI components in `/components/ui/`
- Feature-specific components for gallery, navigation, testimonials
- Page components for each major route (Home, About, Portfolio, Services, Contact)
- Custom hooks for mobile detection and toast notifications

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API endpoints for categories, photos, services, testimonials, and contact forms
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Development Setup**: Vite integration for hot module replacement in development
- **Error Handling**: Centralized error handling middleware with structured error responses

### Data Management
- **Schema Definition**: Shared TypeScript types and Zod schemas between frontend and backend
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Validation**: Zod schemas for runtime type checking and form validation
- **Type Safety**: Full TypeScript integration across the entire stack

### External Dependencies

#### Database & Storage
- **PostgreSQL**: Primary database using Drizzle ORM for type-safe database operations
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)
- **Media Storage**: Prepared for S3-compatible storage (AWS S3/MinIO) integration

#### UI & Design System
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon set for social media icons

#### Data Fetching & Forms
- **TanStack React Query**: Powerful data synchronization for server state
- **React Hook Form**: Performant forms with easy validation
- **Zod**: TypeScript-first schema validation library

#### Development Tools
- **Vite**: Fast build tool with hot module replacement
- **ESBuild**: Fast JavaScript bundler for production builds
- **TypeScript**: Static type checking across the entire codebase
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

#### External Services (Prepared for Integration)
- **WhatsApp Integration**: Deep link integration for client communication
- **Email Services**: SMTP/SendGrid for contact form submissions
- **Payment Processing**: Razorpay integration for booking deposits
- **Analytics**: Google Analytics 4 integration ready

The architecture prioritizes type safety, developer experience, and scalability while maintaining a clean separation of concerns between frontend presentation, backend logic, and data persistence layers.