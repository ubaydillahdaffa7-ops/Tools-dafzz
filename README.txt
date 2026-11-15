DAFZZ-TOOLS — DARK BLUE / ELECTRIC BLUE
=======================================

ISI PAKET
---------
index.html           Halaman utama.
style.css            Tema dark/electric blue dan bola wireframe.
script.js            Mesin utama dan implementasi tools.
tools.json           Katalog 300 tools.
qrcode-local.js      Encoder QR lokal (tidak membutuhkan CDN).
QR-LICENSE.txt       Catatan lisensi encoder QR lokal.
sw.js                Service worker dan cache offline.
manifest.webmanifest Metadata PWA.
QA-REPORT.txt        Catatan pengujian dan batasan yang diketahui.

CARA MEMASANG
-------------
1. Ekstrak ZIP.
2. Upload SEMUA file di folder TOOLS 300 ke root/publish directory hosting.
3. Gunakan Render Static Site, GitHub Pages, atau Vercel.
4. Tidak perlu API key, environment variable, atau backend.
5. Akses melalui HTTPS. Untuk pengujian lokal gunakan localhost, bukan file://.

FITUR YANG DIPERTAHANKAN / DIBANGUN
-----------------------------------
- Katalog 300 tools, enam kategori x 50, nama dan slug dipertahankan.
- Tema dark + electric blue dan bola wireframe biru.
- QR teks/link memakai encoder lokal qrcode-local.js.
- QR dari foto kecil dapat dimasukkan sebagai data QR; foto normal sebaiknya
  menggunakan URL publik karena kapasitas QR sangat terbatas.
- Pembaca QR dari foto mencoba BarcodeDetector bawaan browser. jsQR menjadi
  fallback untuk browser yang tidak menyediakan BarcodeDetector.
- Hapus Objek/Orang/Teks/Watermark memakai clone brush manual. Hapus Teks hanya
  mengubah area yang disapukan. Hapus Latar memakai eraser transparan manual.
- Meme dan Sticker dirender dengan HTML Canvas; tersedia teks, mode sticker,
  outline, dan unduh PNG. Kolase dan palet warna juga memakai Canvas.
- Sejumlah konverter, kalkulator, operasi PDF, DOCX, keamanan, TOTP, hash,
  checksum, dan utilitas web memakai implementasi browser.
- Fitur AI diganti alur manual/filter non-AI; tidak ada model AI besar.

BATASAN PENTING
---------------
- Belum semua 300 tools lulus uji klik end-to-end di perangkat Android.
- Scan QR offline lintas semua browser belum dijamin: Chrome terbaru pada HTTPS
  dapat memakai BarcodeDetector; browser tanpa API itu memerlukan jsQR dari CDN.
- QR tidak dapat menyimpan foto resolusi normal. Gunakan URL foto publik untuk
  QR yang harus membuka foto berukuran biasa.
- GIF animasi belum dapat dibuat karena encoder GIF tidak dibundel.
- PDF Protect/Unlock password belum didukung oleh library PDF browser yang ada.
- PowerPoint ke PDF menghasilkan PDF teks per slide, bukan reproduksi tata letak,
  gambar, animasi, dan desain asli.
- PDF ke Excel adalah CSV teks sederhana; PDF ke Word adalah DOCX sederhana dari
  teks yang dapat diekstrak. Hasilnya bukan konversi layout sempurna.
- PDF compress menyimpan ulang struktur PDF dan tidak menjamin ukuran mengecil.
- AVIF bergantung kemampuan encoder browser.
- Clone brush bukan content-aware fill; penghapusan background manual bukan
  segmentasi otomatis. Hasil edit harus diperiksa pengguna.
- OCR/deteksi wajah otomatis tidak tersedia; mode yang ada bersifat manual.
- Pemeriksaan DNS/SSL/WHOIS/reputasi live memerlukan layanan eksternal. Tool
  alternatif lokal tidak mengklaim melakukan pemeriksaan live.

Baca QA-REPORT.txt sebelum menganggap seluruh fitur sudah lulus pengujian.
