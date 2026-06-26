const SUPABASE_URL = "https://fwmeuhqimqccjweabubx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3bWV1aHFpbXFjY2p3ZWFidWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNTE5MDUsImV4cCI6MjA5NjcyNzkwNX0.og_qhG-b2Lv1lx1Rvq3k0BvdgfdIbqG_XDWUuBCeIno";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fungsi dasar untuk load data di dashboard
async function loadStats() {
    const { data: b } = await supabaseClient.from('products').select('*');
    const { data: c } = await supabaseClient.from('customers').select('*');
    if(b) {
        document.getElementById('dashTotalBarang').innerText = b.length;
        document.getElementById('dashStokKrisis').innerText = b.filter(i => i.stock <= i.min_stock).length;
    }
    if(c) document.getElementById('dashTotalCustomers').innerText = c.length;
}

document.addEventListener('DOMContentLoaded', loadStats);
