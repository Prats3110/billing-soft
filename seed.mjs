import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize Supabase Client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
);

async function seedDatabase() {
    console.log('🌱 Starting Database Seeding...');
     console.log(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const mockCashierId = '63521cef-1ba8-4832-a18b-b229b6a71744'; // Replace with a valid UUID for the cashier

    // 1. Create the dummy profile first to satisfy the Foreign Key constraint
    const { error: profileError } = await supabase.from('profiles').upsert([
        { id: mockCashierId, full_name: 'Demo Cashier', role: 'cashier' }
    ]);

    if (profileError) {
        console.error('Error creating dummy profile:', profileError);
        return;
    }
    // Create mock customers
    const { data: customers, error: custError } = await supabase.from('customers').insert([
        { name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@example.com', address: 'Mumbai, MH', gstin: '27AAAAA0000A1Z5' },
        { name: 'Priya Patel', phone: '9123456789', email: 'priya@example.com', address: 'Pune, MH' },
    ]).select();

    if (custError) {
        console.error('Error creating customers:', custError);
        return;
    }
    console.log(`✅ Created ${customers.length} Customers`);

    // Generate 30 days of mock invoices
    const invoicesData = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const subtotal = Math.floor(Math.random() * 5000) + 500;
        const cgst = subtotal * 0.09;
        const sgst = subtotal * 0.09;

        invoicesData.push({
            cashier_id: mockCashierId,
            customer_id: customers[i % 2].id,
            subtotal: subtotal,
            cgst: cgst,
            sgst: sgst,
            total: subtotal + cgst + sgst,
            payment_status: Math.random() > 0.3 ? 'Paid via UPI' : 'Pending',
            created_at: date.toISOString(),
        });
    }

    const { error: invError } = await supabase.from('invoices').insert(invoicesData);
    
    if (invError) {
        console.error('Error creating invoices (Check RLS policies):', invError);
        return;
    }
    
    console.log('✅ Generated 30 Days of Invoice History');
    console.log('🚀 Seeding Complete!');
}

seedDatabase();