<!DOCTYPE html>
<html lang="id" data-theme="light">
<head>
    <?php include 'components/head.php'; ?>
    <title>Dashboard - Multi Store</title>
</head>
<body>

    <?php include 'components/sidebar.php'; ?>

    <main class="main-wrapper">
        
        <?php include 'components/header.php'; ?>

        <div class="content-scroll">
            
            <div id="page-dashboard" class="page-section active">
                <div class="stat-grid">
                    <div class="stat-card bg-blue"><div><h3>Total Barang</h3><div class="value" id="dashTotalBarang">0</div></div><i class="fa-solid fa-box bg-icon"></i></div>
                    <div class="stat-card bg-red"><div><h3>Stok Krisis</h3><div class="value" id="dashStokKrisis">0</div></div><i class="fa-solid fa-triangle-exclamation bg-icon"></i></div>
                    <div class="stat-card bg-green"><div><h3>Total Agen</h3><div class="value" id="dashTotalCustomers">0</div></div><i class="fa-solid fa-users bg-icon"></i></div>
                </div>
                
                <h3 class="section-title"><i class="fa-solid fa-wrench"></i> Menu Utama</h3>
                <div class="menu-grid">
                    <div class="menu-card" onclick="window.location.href='barang.php'"><div class="menu-icon" style="background: #fef3c7; color: #f59e0b;"><i class="fa-solid fa-box-open"></i></div><div class="menu-text"><h4>Master Barang</h4><p>Kelola stok & harga modal</p></div></div>
                    <div class="menu-card" onclick="window.location.href='penerimaan.php'"><div class="menu-icon" style="background: #e0f2fe; color: #0ea5e9;"><i class="fa-solid fa-download"></i></div><div class="menu-text"><h4>Stok Masuk</h4><p>Input barang dari supplier</p></div></div>
                    <div class="menu-card" onclick="window.location.href='supplier.php'"><div class="menu-icon" style="background: #e0e7ff; color: #6366f1;"><i class="fa-solid fa-truck-fast"></i></div><div class="menu-text"><h4>Data Supplier</h4><p>Kelola daftar relasi pemasok</p></div></div>
                    <div class="menu-card" onclick="window.location.href='agen.php'"><div class="menu-icon" style="background: #d1fae5; color: #10b981;"><i class="fa-solid fa-user-group"></i></div><div class="menu-text"><h4>Agen / Konsumen</h4><p>Atur klasifikasi pelanggan</p></div></div>
                    <div class="menu-card" onclick="window.location.href='harga.php'"><div class="menu-icon" style="background: #fce7f3; color: #ec4899;"><i class="fa-solid fa-tags"></i></div><div class="menu-text"><h4>Harga Khusus</h4><p>Set matriks harga kemasan</p></div></div>
                    <div class="menu-card" onclick="window.location.href='laporan.php'"><div class="menu-icon" style="background: #e0e7ff; color: #6366f1;"><i class="fa-solid fa-chart-bar"></i></div><div class="menu-text"><h4>Laporan</h4><p>Analisis keuntungan & omset</p></div></div>
                </div>
            </div>

        </div>
    </main>

    <script src="js/script.js"></script>
    <script>
        // Logika Pengumpul Angka Statistik Khusus Halaman Dashboard Utama
        async function fetchDashboardCounters() {
            // Ambil Total Baris Produk
            const { data: products } = await supabaseClient.from('products').select('stock, min_stock');
            if(products) {
                document.getElementById('dashTotalBarang').innerText = products.length;
                const krisis = products.filter(item => item.stock <= item.min_stock).length;
                document.getElementById('dashStokKrisis').innerText = krisis;
            }
            
            // Ambil Total Baris Pelanggan (Agen/Reseller)
            const { data: custs } = await supabaseClient.from('customers').select('id');
            if(custs) document.getElementById('dashTotalCustomers').innerText = custs.length;
        }

        document.addEventListener('DOMContentLoaded', () => {
            fetchDashboardCounters();
        });
    </script>
</body>
</html>
