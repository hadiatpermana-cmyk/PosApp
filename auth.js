// auth.js - Menangani Login & Sesi

// Inisialisasi Supabase (Sesuaikan dengan kredensial Anda)
const SUPABASE_URL = "https://fwmeuhqimqccjweabubx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3bWV1aHFpbXFjY2p3ZWFidWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNTE5MDUsImV4cCI6MjA5NjcyNzkwNX0.og_qhG-b2Lv1lx1Rvq3k0BvdgfdIbqG_XDWUuBCeIno';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Event Listener untuk Form Login (Hanya berjalan jika di halaman login.html)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btnLogin = document.getElementById('btnLogin');
        const errorMsg = document.getElementById('loginError');

        // Ubah state tombol saat loading
        btnLogin.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
        btnLogin.disabled = true;
        errorMsg.style.display = 'none';

        try {
            // Proses otentikasi ke Supabase Auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            // Jika berhasil, simpan data ke localStorage untuk digunakan oleh app.js
            // Data ini bisa ditarik dari tabel 'profiles' di database Anda nantinya
            localStorage.setItem('user_name', 'Hadiat'); 
            localStorage.setItem('user_role', 'System Administrator');
            localStorage.setItem('store_name', 'SBR Putra Food');
            
            // Simpan token otentikasi
            localStorage.setItem('is_logged_in', 'true');

            // Alihkan ke Dashboard
            window.location.href = 'index.html';

        } catch (error) {
            console.error(error);
            errorMsg.innerText = "Gagal login. Periksa kembali email dan password.";
            errorMsg.style.display = 'block';
        } finally {
            // Kembalikan state tombol
            btnLogin.innerHTML = 'Masuk <i class="fa-solid fa-arrow-right"></i>';
            btnLogin.disabled = false;
        }
    });
}
