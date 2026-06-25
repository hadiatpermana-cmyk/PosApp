// Konfigurasi Inti Supabase
const SUPABASE_URL = "https://fwmeuhqimqccjweabubx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3bWV1aHFpbXFjY2p3ZWFidWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNTE5MDUsImV4cCI6MjA5NjcyNzkwNX0.og_qhG-b2Lv1lx1Rvq3k0BvdgfdIbqG_XDWUuBCeIno";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const storeId = localStorage.getItem('session_store_id');
const userName = localStorage.getItem('session_user_name');

// Proteksi Keamanan Sesi Login
if(!storeId) window.location.href = 'login.html';

// Utilitas Formatter Rupiah & Input Pintar Separator Ribuan
const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
};

function formatFocus(input) { let val = input.value.replace(/\D/g, ''); if (val === '0') input.value = ''; }
function formatBlur(input) { let val = input.value.replace(/\D/g, ''); input.value = val === '' ? '0' : new Intl.NumberFormat('id-ID').format(val); }
function formatInput(input) { let val = input.value.replace(/\D/g, ''); input.value = new Intl.NumberFormat('id-ID').format(val); }

// Kontrol Navigasi & UI Dasar
function toggleSidebar() { document.getElementById('mainSidebar').classList.toggle('collapsed'); }
function handleLogout() { localStorage.clear(); window.location.href = 'login.html'; }

// Sinkronisasi Pengaturan Operasional & Tema Utama Toko
async function fetchStoreSettings() {
    if(!storeId) return;
    const { data: store, error } = await supabaseClient.from('stores').select('*').eq('id', storeId).single();
    if (error) return console.error("Gagal mengambil data toko:", error);

    // Amankan Info Header Utama
    const txtName = document.getElementById('txtStoreName');
    const txtTagline = document.getElementById('txtStoreTagline');
    if(txtName) txtName.innerText = store.name;
    if(txtTagline) txtTagline.innerText = "System Administrator";
    
    // Terapkan Logo Dinamis
    const logoArea = document.getElementById('headerLogoArea');
    if(store.logo_url && logoArea) {
        logoArea.innerHTML = `<img src="${store.logo_url}" alt="Logo" style="width:100%; height:100%; object-fit:cover;">`;
    }

    // Terapkan Warna Utama Toko
    if(store.theme_color) {
        document.documentElement.style.setProperty('--primary-color', store.theme_color);
    }

    // Terapkan Gaya Tipografi Font
    if(store.font_family) {
        document.documentElement.style.setProperty('--font-family', store.font_family);
    }
}

// Inisialisasi Akun Profil Pengguna Saat Halaman Siap
document.addEventListener('DOMContentLoaded', () => {
    const txtUser = document.getElementById('txtUserName');
    if(userName && txtUser) txtUser.innerText = userName;
    fetchStoreSettings();
});
