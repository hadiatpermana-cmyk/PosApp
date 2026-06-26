// app.js
const SUPABASE_URL = "https://fwmeuhqimqccjweabubx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3bWV1aHFpbXFjY2p3ZWFidWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNTE5MDUsImV4cCI6MjA5NjcyNzkwNX0.og_qhG-b2Lv1lx1Rvq3k0BvdgfdIbqG_XDWUuBCeIno";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const storeId = localStorage.getItem('session_store_id');
const userName = localStorage.getItem('session_user_name');

if (!storeId && !window.location.href.includes('login.html')) {
    window.location.href = 'login.html';
}

const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
};

// Fungsi ini akan berjalan di SETIAP halaman untuk menyamakan tema & header
async function initGlobalLayout() {
    if (userName) document.getElementById('txtUserName').innerText = userName;

    const { data: store, error } = await supabaseClient.from('stores').select('*').eq('id', storeId).single();
    if (error) return console.error("Gagal mengambil data toko:", error);

    // Update Header
    const storeNameEl = document.getElementById('txtStoreName');
    if (storeNameEl) storeNameEl.innerText = store.name;
    
    const logoArea = document.getElementById('headerLogoArea');
    if (logoArea && store.logo_url) {
        logoArea.innerHTML = `<img src="${store.logo_url}" alt="Logo" style="width:100%; height:100%; object-fit:cover;">`;
    }

    // Terapkan Tema Warna & Font
    if (store.theme_color) document.documentElement.style.setProperty('--primary-color', store.theme_color);
    if (store.font_family) document.documentElement.style.setProperty('--font-family', store.font_family);
    
    // Terapkan Mode Gelap/Terang
    const savedTheme = localStorage.getItem('themeMode') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleSidebar() { document.getElementById('mainSidebar').classList.toggle('collapsed'); }
function handleLogout() { localStorage.clear(); window.location.href = 'login.html'; }

document.addEventListener('DOMContentLoaded', initGlobalLayout);
