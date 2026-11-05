# Matriks Perangkat - Tracking Build (Pertemuan 4)

Isi berdasarkan uji nyata. Tulis "belum diuji" jika tidak diuji. Jangan menyimpulkan kompatibilitas umum dari satu perangkat.

| Perangkat (model) | OS | Browser + versi | Jenis tracking | Izin kamera berhasil? | Target terdeteksi? | Objek stabil? | Kendala | Kesimpulan |
|---|---|---|---|---|---|---|---|---|
| Laptop | Windows 11 | Microsoft Edge Version 156.0.4314.58 (Official build) (64-bit) | Image | Ya | Ya | Ya | Saat pengujian dalam kondisi pencahayaan redup, terdapat kendala pada proses deteksi gambar target yang ditampilkan melalui layar handphone. Agar gambar target dapat dikenali oleh kamera dengan baik, diperlukan penyesuaian tingkat kecerahan dan kontras layar handphone sehingga target tetap terlihat jelas meskipun berada dalam kondisi pencahayaan yang kurang optimal. | Pengujian berhasil. Image Tracking mampu mendeteksi gambar target dan menampilkan objek 3D secara stabil. Namun, kualitas pencahayaan lingkungan masih memengaruhi proses deteksi, sehingga diperlukan pencahayaan yang cukup agar tracking berjalan optimal. |
| Laptop | Windows 11 | Microsoft Edge Version 156.0.4314.58 (Official build) (64-bit) | Face | Ya | Ya | Ya | Tidak ditemukan kendala selama pengujian. | Berhasil. Face Tracking berjalan dengan baik dan stabil mengikuti gambar target. |
| Handphone | Android | Chrome | Image | Ya | Ya | Ya | Tidak ditemukan kendala selama pengujian. Izin akses kamera berhasil diberikan, gambar target dapat terdeteksi, dan objek 3D dapat ditampilkan dengan stabil. | Pengujian berhasil. Image Tracking dapat dijalankan pada perangkat Android melalui browser Chrome. Kamera berhasil mendeteksi gambar target dan menampilkan objek 3D secara stabil. |
| Handphone | Android | Chrome | Face | Ya | Ya | Ya | Tidak ditemukan kendala selama pengujian. Kamera berhasil mendeteksi wajah dan efek kacamata dapat mengikuti pergerakan wajah dengan stabil. | Pengujian berhasil. Face Tracking dapat dijalankan pada perangkat Android melalui browser Chrome. Wajah berhasil terdeteksi dan efek kacamata dapat ditampilkan serta mengikuti pergerakan wajah dengan baik. |
| | iOS | Safari | Image | belum diuji | belum diuji | belum diuji | | |
| | iOS | Safari | Face | belum diuji | belum diuji | belum diuji | | |
