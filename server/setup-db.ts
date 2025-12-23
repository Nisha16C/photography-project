import 'dotenv/config';
import pkg from 'pg';
const { Client } = pkg;
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as schema from '../shared/schema.js';

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function setupDatabase() {
    try {
        console.log('🔌 Connecting to PostgreSQL...');
        await client.connect();
        console.log('✅ Connected to PostgreSQL');

        const db = drizzle(client, { schema });

        // Migrations are already handled by drizzle-kit push
        // console.log('📊 Running migrations...');
        // await migrate(db, { migrationsFolder: './drizzle' });
        // console.log('✅ Migrations completed');

        console.log('🌱 Seeding database...');
        await seedDatabase(db);
        console.log('✅ Database seeded successfully');

        await client.end();
        console.log('✨ Database setup complete!');
    } catch (error) {
        console.error('❌ Database setup failed:', error);
        process.exit(1);
    }
}

async function seedDatabase(db: any) {
    const { categories, services, testimonials } = schema;

    // Seed categories
    const categoryData = [
        { name: "Wedding", slug: "wedding", description: "Complete wedding photography", order: 1 },
        { name: "Pre-Wedding", slug: "pre-wedding", description: "Romantic pre-wedding shoots", order: 2 },
        { name: "Engagement", slug: "engagement", description: "Engagement ceremonies", order: 3 },
        { name: "Haldi", slug: "haldi", description: "Traditional haldi ceremonies", order: 4 },
        { name: "Mehndi", slug: "mehndi", description: "Beautiful mehndi celebrations", order: 5 },
        { name: "Baby Shower", slug: "baby-shower", description: "Joyful baby shower moments", order: 6 },
        { name: "Maternity", slug: "maternity", description: "Elegant maternity photography", order: 7 },
        { name: "Family", slug: "family", description: "Cherished family portraits", order: 8 },
        { name: "Corporate", slug: "corporate", description: "Professional corporate events", order: 9 },
    ];

    await db.insert(categories).values(categoryData).onConflictDoNothing();

    // Seed services
    const serviceData = [
        {
            title: "Complete Wedding",
            slug: "complete-wedding",
            description: "Full wedding coverage from pre-wedding to reception",
            basePrice: 50000,
            features: [
                "Pre-wedding shoot",
                "Haldi & Mehndi coverage",
                "Wedding ceremony & reception",
                "300+ edited photos",
                "Online gallery & USB drive"
            ],
            isPopular: true,
            order: 1
        },
        {
            title: "Pre-Wedding Shoot",
            slug: "pre-wedding-shoot",
            description: "Romantic couple photography session",
            basePrice: 20000,
            features: [
                "4-6 hour photo session",
                "Multiple location options",
                "100+ edited photos",
                "Online gallery access",
                "High-resolution downloads"
            ],
            order: 2
        },
        {
            title: "Family & Events",
            slug: "family-events",
            description: "Family portraits and special events",
            basePrice: 15000,
            features: [
                "Baby shower coverage",
                "Maternity shoots",
                "Family portraits",
                "Corporate events",
                "Flexible packages"
            ],
            order: 3
        }
    ];

    await db.insert(services).values(serviceData).onConflictDoNothing();

    // Seed testimonials
    const testimonialData = [
        {
            clientName: "Priya & Rahul",
            eventType: "Wedding",
            rating: 5,
            body: "Himanshu captured our wedding beautifully! Every photo tells a story and the emotions are so genuine. His professionalism and attention to detail made our special day even more memorable.",
            clientImage: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
            isApproved: true
        },
        {
            clientName: "Sneha Sharma",
            eventType: "Baby Shower",
            rating: 5,
            body: "Amazing work on our baby shower! Himanshu made everyone feel comfortable and captured such natural, beautiful moments. The photos are absolutely perfect and we'll treasure them forever.",
            clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
            isApproved: true
        },
        {
            clientName: "Anjali & Vikash",
            eventType: "Pre-Wedding",
            rating: 5,
            body: "Our pre-wedding shoot was absolutely magical! Himanshu's creative vision and guidance helped us feel relaxed and natural. The locations and lighting were perfect.",
            clientImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
            isApproved: true
        }
    ];

    await db.insert(testimonials).values(testimonialData).onConflictDoNothing();
}

setupDatabase();
