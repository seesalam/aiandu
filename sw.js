// Nama cache unik
const CACHE_NAME = 'asn-master-v1';

// Daftar aset internal yang ingin kita simpan agar web bisa dibuka tanpa internet
// CATATAN: File model AI otomatis disimpan library di IndexedDB, bukan di sini.
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './sw.js',
  // Jika Pak Nata punya logo, tambahkan di sini, misal: './icon-192.png'
];

// Tahap 1: Instalasi (Simpan file UI ke cache)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Menyimpan UI ke Cache...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Langsung aktifkan SW baru
});

// Tahap 2: Fetching (Ambil dari cache jika internet mati)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Jika ada di cache, berikan file cache. Jika tidak, ambil dari network.
      return response || fetch(event.request);
    })
  );
});