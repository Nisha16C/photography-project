import pkg from 'pg';
const { Client } = pkg;

async function createDatabase() {
    // Connect to postgres database to create lenslink database
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'linux',
        database: 'postgres', // Connect to default postgres database
    });

    try {
        await client.connect();
        console.log('✅ Connected to PostgreSQL');

        // Check if database exists
        const result = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = 'lenslink'"
        );

        if (result.rows.length === 0) {
            console.log('📊 Creating lenslink database...');
            await client.query('CREATE DATABASE lenslink');
            console.log('✅ Database created successfully');
        } else {
            console.log('ℹ️  Database already exists');
        }

        await client.end();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

createDatabase();
