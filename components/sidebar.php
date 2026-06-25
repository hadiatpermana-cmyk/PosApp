<?php 
  // Mendapatkan nama file yang sedang dibuka (misal: index.php atau barang.php)
  $current_page = basename($_SERVER['PHP_SELF']); 
?>
<aside class="sidebar" id="mainSidebar">
    <div class="sidebar-header">
        <i class="fa-solid fa-store" style="font-size: 24px;"></i> Point of Sale
    </div>
    <ul class="sidebar-menu">
        <li class="sidebar-item <?= ($current_page == 'index.php') ? 'active' : ''; ?>" onclick="window.location.href='index.php'">
            <i class="fa-solid fa-chart-pie" style="color: #3b82f6;"></i> <span>Dashboard</span>
        </li>
        <li class="sidebar-item <?= ($current_page == 'barang.php') ? 'active' : ''; ?>" onclick="window.location.href='barang.php'">
            <i class="fa-solid fa-box-open" style="color: #f59e0b;"></i> <span>Master Barang</span>
        </li>
        <li class="sidebar-item <?= ($current_page == 'supplier.php') ? 'active' : ''; ?>" onclick="window.location.href='supplier.php'">
            <i class="fa-solid fa-truck-fast" style="color: #8b5cf6;"></i> <span>Data Supplier</span>
        </li>
        <li class="sidebar-item <?= ($current_page == 'agen.php') ? 'active' : ''; ?>" onclick="window.location.href='agen.php'">
            <i class="fa-solid fa-users" style="color: #10b981;"></i> <span>Agen / Konsumen</span>
        </li>
        <li class="sidebar-item <?= ($current_page == 'harga.php') ? 'active' : ''; ?>" onclick="window.location.href='harga.php'">
            <i class="fa-solid fa-tags" style="color: #ec4899;"></i> <span>Harga Khusus</span>
        </li>
        
        <li class="sidebar-item" style="margin-top: 15px; border-top: 1px solid var(--border-color); padding-top: 15px;" onclick="window.location.href='settings.php'">
            <i class="fa-solid fa-gear" style="color: #64748b;"></i> <span>Pengaturan Toko</span>
        </li>
        <li class="sidebar-item" onclick="handleLogout()">
            <i class="fa-solid fa-right-from-bracket" style="color: #ef4444;"></i> <span style="color: #ef4444;">Logout</span>
        </li>
    </ul>
</aside>
