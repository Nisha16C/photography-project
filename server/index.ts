import 'dotenv/config';
import { createServer } from 'http';
import { createServer as createViteServer } from 'vite';
import { storage } from './storage';
import { insertContactSchema, insertTestimonialSchema } from '@shared/schema';
import { ZodError } from 'zod';
import path from 'path';
import fs from 'fs';
import viteConfig from '../vite.config';
import { nanoid } from 'nanoid';

// Logger function
function log(message: string, source = 'server') {
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// Create HTTP server
const httpServer = createServer();

// API route handlers
const apiHandlers: Record<string, (req: Request) => Promise<Response>> = {
  // Categories
  'GET /api/categories': async () => {
    try {
      const categories = await storage.getCategories();
      return new Response(JSON.stringify(categories), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Failed to fetch categories' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },

  // Photos
  'GET /api/photos': async (req) => {
    try {
      const url = new URL(req.url);
      const category = url.searchParams.get('category') || undefined;
      const featured = url.searchParams.has('featured')
        ? url.searchParams.get('featured') === 'true'
        : undefined;

      const photos = await storage.getPhotos(category, featured);
      return new Response(JSON.stringify(photos), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Failed to fetch photos' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },

  // Services
  'GET /api/services': async () => {
    try {
      const services = await storage.getServices();
      return new Response(JSON.stringify(services), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Failed to fetch services' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },

  // Testimonials
  'GET /api/testimonials': async () => {
    try {
      const testimonials = await storage.getTestimonials(true);
      return new Response(JSON.stringify(testimonials), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Failed to fetch testimonials' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },

  'POST /api/testimonials': async (req) => {
    try {
      const data = await req.json();

      // Validate required fields
      if (!data.name || !data.review) {
        return new Response(JSON.stringify({ message: 'Name and review are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Create testimonial with isApproved set to true for immediate visibility
      const testimonialData = {
        clientName: String(data.name),
        eventType: String(data.eventType || 'General'),
        rating: Number(data.rating) || 5,
        body: String(data.review),
        isApproved: true,
      };

      const testimonial = await storage.createTestimonial(testimonialData);

      return new Response(JSON.stringify({
        message: 'Thank you for your review! It will be published after moderation.',
        testimonialId: testimonial.id
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('[POST /api/testimonials] Error:', error);
      return new Response(JSON.stringify({ message: 'Failed to submit review' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },

  // Contact form submission
  'POST /api/contact': async (req) => {
    try {
      const data = await req.json();

      // Check honeypot field
      if (data.website) {
        return new Response(JSON.stringify({ message: 'Thank you for your message' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const validatedData = insertContactSchema.parse(data);
      const contact = await storage.createContact(validatedData);

      // Fire-and-forget email notifications
      try {
        const { sendContactEmails } = await import('./email');
        sendContactEmails(validatedData).catch(err => console.error('[email] Sending failed:', err));
      } catch (emailErr) {
        console.error('[email] Failed to load email service:', emailErr);
      }

      return new Response(JSON.stringify({
        message: "Thank you for your inquiry! We'll get back to you within 24 hours.",
        contactId: contact.id
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('[POST /api/contact] Error:', error);
      if (error instanceof ZodError) {
        return new Response(JSON.stringify({
          message: 'Validation failed',
          errors: error.errors
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ message: 'Failed to submit contact form' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};

// Start the server
(async () => {
  // Create Vite server
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: {
      middlewareMode: true,
      hmr: { server: httpServer },
      allowedHosts: true,
    },
    appType: 'custom',
  });

  // Handle requests
  httpServer.on('request', async (req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const method = req.method || 'GET';
    const pathname = url.pathname;

    // Log API requests
    if (pathname.startsWith('/api')) {
      const start = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - start;
        let logLine = `${method} ${pathname} ${res.statusCode} in ${duration}ms`;
        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + '…';
        }
        log(logLine);
      });
    }

    // Handle API requests
    if (pathname.startsWith('/api')) {
      const handler = apiHandlers[`${method} ${pathname}`];
      if (handler) {
        try {
          // Convert Node.js request to fetch API Request
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(Buffer.from(chunk));
          }
          const body = Buffer.concat(chunks).toString('utf-8');

          const request = new Request(url.toString(), {
            method,
            headers: req.headers as any,
            body: body.length > 0 ? body : undefined,
          });

          const response = await handler(request);

          // Convert fetch API Response to Node.js response
          res.statusCode = response.status;
          response.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });

          const responseBody = await response.text();
          res.end(responseBody);
        } catch (error) {
          console.error('Error handling API request:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Internal Server Error' }));
        }
        return;
      }
    }

    // Let Vite handle all other requests (static files, SPA routes, etc.)
    try {
      // Use Vite's middleware to handle the request
      const viteMiddleware = vite.middlewares as any;
      viteMiddleware(req, res, async () => {
        // If Vite doesn't handle it, serve the SPA index.html
        try {
          const isDev = process.env.NODE_ENV === 'development';

          if (isDev) {
            // In development, use the client template and transform it
            const clientTemplate = path.resolve(
              import.meta.dirname,
              '..',
              'client',
              'index.html',
            );

            let template = await fs.promises.readFile(clientTemplate, 'utf-8');
            template = template.replace(
              `src="/src/main.tsx"`,
              `src="/src/main.tsx?v=${nanoid()}"`,
            );
            const page = await vite.transformIndexHtml(url.pathname, template);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(page);
          } else {
            // In production, serve the built index.html
            const distPath = path.resolve(import.meta.dirname, '..', 'dist', 'public');
            const indexPath = path.resolve(distPath, 'index.html');

            if (fs.existsSync(indexPath)) {
              const content = await fs.promises.readFile(indexPath, 'utf-8');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/html');
              res.end(content);
            } else {
              throw new Error(`Could not find the build file: ${indexPath}`);
            }
          }
        } catch (e) {
          vite.ssrFixStacktrace(e as Error);
          console.error(e);
          res.statusCode = 500;
          res.end('Internal Server Error');
        }
      });
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  // For local development, use port from env or default to 5000
  // For Vercel deployment, this part will only run during development
  if (process.env.NODE_ENV !== 'production') {
    const port = parseInt(process.env.PORT || '5000', 10);
    const initialHost = process.env.HOST || '0.0.0.0';

    // Helper to start listening
    const startListening = (host: string) => {
      httpServer.listen({ port, host }, () => {
        log(`Server listening on ${host}:${port} (NODE_ENV=${process.env.NODE_ENV})`);
      });
    };

    // Handle errors and fallback if binding 0.0.0.0 is not supported (ENOTSUP)
    httpServer.on('error', (err: NodeJS.ErrnoException) => {
      if (err && err.code === 'ENOTSUP' && initialHost === '0.0.0.0') {
        log('ENOTSUP when binding 0.0.0.0 — falling back to 127.0.0.1');
        // try localhost instead
        startListening('127.0.0.1');
        return;
      } else if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        process.exit(1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });

    // Initial attempt
    startListening(initialHost);
  } else {
    // In production on Vercel, we don't need to listen on a port
    // as Vercel handles the serverless function execution
    log('Running in production mode');
  }
})();
