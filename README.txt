DAFZZ TOOLS — PAKET PEMBARUAN AI BROWSER

ISI
- index.html: halaman utama (dipertahankan)
- style.css: tampilan (dipertahankan)
- script.js: navigasi dan mesin tool
- tools.json: katalog 300 tool (dipertahankan)
- manifest.webmanifest dan sw.js: dukungan PWA

MENJALANKAN
Untuk pengujian lokal, jalankan server di folder ini:
  python -m http.server 8000
Lalu buka http://localhost:8000
Atau unggah folder ke hosting HTTPS. Jangan membuka index.html langsung melalui file:// karena browser dapat memblokir fetch tools.json.

FITUR AI / QR YANG DIINTEGRASIKAN
- QR URL Generator: membuat QR dari teks/URL memakai QRCode.js.
- QR ke File: membaca QR dari gambar memakai jsQR.
- Hapus Latar: @imgly/background-removal, berjalan di browser.
- OCR Gambar: Tesseract.js, bahasa Indonesia dan Inggris.
- Deteksi Wajah: MediaPipe Tasks Vision, model BlazeFace.
- Hapus Objek / Orang / Teks / Watermark: pengguna menandai area dengan kuas, lalu model LaMa ONNX melakukan inpainting.
- Upscale AI 2x: Swin2SR lightweight x2 melalui Transformers.js.
- Upscale AI 4x: Swin2SR classical x4 melalui Transformers.js.
- Pertajam Foto / Pulihkan Foto: Swin2SR real-world x4 melalui Transformers.js.
- Warnai Foto: DDColor-tiny ONNX melalui ONNX Runtime Web.

MODEL DAN KONEKSI
- Model AI dimuat otomatis dari CDN / Hugging Face saat fitur pertama kali dipakai; pengguna tidak perlu mengunduh atau memasang file model secara manual.
- Model akan disimpan di cache browser bila browser mengizinkan. Penggunaan pertama dapat memerlukan unduhan besar: sekitar 44 MB untuk Swin2SR x2, sekitar 130 MB untuk DDColor, dan sekitar 200 MB untuk LaMa; model x4 dan IMG.LY juga dapat berukuran besar.
- Semua pemrosesan AI gambar yang disebut di atas berjalan di perangkat pengguna setelah model dimuat; file gambar tidak dikirim ke backend DAFZZ-TOOLS.
- Koneksi internet dibutuhkan untuk mengambil library/model. Perangkat ponsel dengan RAM terbatas dapat lambat, menutup tab, atau kehabisan memori saat memproses foto besar. Coba gambar yang lebih kecil jika gagal.
- Hapus Objek/Orang/Teks/Watermark menggunakan mask manual: tandai area yang akan dihapus sebelum menekan proses. Model tidak otomatis menemukan target.
- Pertajam/Pulihkan menggunakan model super-resolution real-world; hasilnya dapat memperbesar resolusi sekaligus memperbaiki detail, tetapi bukan jaminan restorasi sempurna untuk semua foto.

BATASAN DAN PENGUJIAN
- Paket ini telah diperiksa sintaks JavaScript dan integritas ZIP. Pengujian runtime model AI di perangkat/browser nyata belum dilakukan dalam sesi ini. Karena itu keberhasilan unduhan model, performa, dan hasil tiap model perlu diuji setelah deployment.
- Katalog 300 tool dan tampilan tidak diubah. Tidak semua 300 tool memiliki implementasi penuh; status masing-masing tetap ditampilkan di aplikasi.
- Sejumlah tool lain yang memerlukan API server atau konverter dokumen khusus tetap membutuhkan layanan tambahan.

Privasi: gambar diproses lokal di browser oleh model AI setelah aset model diunduh. Library/model diambil dari layanan CDN/Hugging Face. File gambar tidak dikirim ke server aplikasi ini.

Batas upload: tidak dipatok 10 MB oleh aplikasi ini; batas praktis mengikuti memori browser dan kemampuan perangkat. Hindari file sangat besar di ponsel.
