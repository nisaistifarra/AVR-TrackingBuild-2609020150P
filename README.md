Nama    : Nisa Istifarra
NIM     : 2609020150P

1. Cara Menjalankan Project

A. Persiapan
Pastikan perangkat sudah memiliki:
1. Visual Studio Code.
2. Browser Microsoft Edge atau Google Chrome.
3. Ekstensi Live Server pada Visual Studio Code.
4. Kamera yang dapat digunakan.
5. Koneksi internet untuk memuat library yang diperlukan.

B. Menjalankan Project secara Lokal
1. Buka folder project menggunakan Visual Studio Code.
2. Klik kanan pada file index.html.
3. Pilih Open with Live Server.
4. Browser akan membuka halaman utama project.
5. Pilih fitur Image Tracking atau Face Tracking.
6. Klik tombol Mulai untuk menjalankan fitur yang dipilih.
7. Izinkan akses kamera apabila muncul permintaan izin.

C. Menjalankan Image Tracking
1. Buka halaman Image Tracking.
2. Klik tombol Mulai.
3. Arahkan kamera ke gambar target target-card.png.
4. Tunggu hingga gambar target terdeteksi.
5. Objek 3D akan muncul di atas gambar target.
6. Geser, miringkan, atau putar gambar target untuk melihat respons pergerakan objek 3D.

D. Menjalankan Face Tracking
1. Buka halaman Face Tracking.
2. Klik tombol Mulai.
3. Hadapkan wajah ke kamera.
4. Tunggu hingga wajah terdeteksi.
5. Efek kacamata akan muncul pada wajah.
6. Gerakkan kepala ke kanan, kiri, atas, bawah, dan miring untuk melihat respons efek kacamata.

E. Menjalankan melalui GitHub Pages
Project juga dapat dijalankan secara online melalui GitHub Pages.
1. Buka link GitHub Pages project.
2. Pastikan halaman utama berhasil dimuat.
3. Pilih fitur Image Tracking atau Face Tracking.
4. Klik tombol Mulai.
5. Izinkan akses kamera.
6. Lakukan pengujian sesuai fitur yang dipilih.

2. Hasil Pengujian
Pengujian dilakukan berdasarkan 12 test case, yaitu TC-01 sampai TC-12.

TC-01 – Halaman terbuka tanpa error fatal: Ketiga halaman, yaitu index.html, image-tracking.html, dan face-tracking.html berhasil dibuka. Pada Console terdapat warning Multiple instances of Three.js being imported, tetapi tidak menghentikan aplikasi.

TC-02 – Izin kamera diberikan: Kamera berhasil diakses. Izin kamera langsung aktif karena sebelumnya sudah tersimpan di browser.

TC-03 – Image target terdeteksi: Gambar target target-card.png berhasil dideteksi oleh kamera. Status berubah menjadi "Target terdeteksi" dan objek 3D muncul di atas gambar.

TC-04 – Objek mengikuti posisi dan orientasi target: Objek 3D mengikuti pergerakan dan perubahan orientasi gambar target ketika digeser, dimiringkan, dan diputar.

TC-05 – Target hilang: Ketika gambar target dijauhkan dari kamera, objek 3D menghilang dan status berubah menjadi "Target hilang - mencari target".

TC-10 – Pengujian jarak target: Pengujian dilakukan pada jarak 20 cm, 40 cm, dan 60 cm. Pada ketiga jarak tersebut, kamera berhasil mendeteksi gambar target dan menampilkan objek 3D.

TC-06 – Wajah terdeteksi: Wajah berhasil dideteksi oleh kamera dan efek kacamata muncul pada wajah.

TC-07 – Aksesori mengikuti gerakan wajah: Efek kacamata mengikuti pergerakan wajah ketika kepala menoleh, mengangguk, dan dimiringkan.

TC-08 – Wajah tidak terdeteksi: Ketika wajah ditutup atau keluar dari bingkai kamera, efek kacamata menghilang dari tampilan.

TC-09 – Dua kondisi pencahayaan: Pengujian dilakukan pada kondisi pencahayaan terang dan redup. Pada kondisi redup, terdapat kendala pada deteksi gambar target yang ditampilkan melalui layar handphone. Diperlukan penyesuaian kecerahan dan kontras layar agar gambar target dapat dikenali dengan lebih baik.

TC-11 – Perangkat HP: Project berhasil dijalankan melalui handphone Android menggunakan browser Chrome. Kamera dapat diakses, gambar target dan wajah berhasil dideteksi, serta objek 3D dan efek kacamata dapat ditampilkan dengan stabil.

TC-12 – Deployment HTTPS: Project berhasil diakses melalui GitHub Pages menggunakan HTTPS. Halaman dapat dibuka, izin kamera berhasil diberikan, dan fitur tracking dapat dijalankan. 

Pengujian perangkat dilakukan pada laptop dengan sistem operasi Windows 11 menggunakan Microsoft Edge versi 156.0.4314.58 (Official build) (64-bit), serta perangkat Android menggunakan Chrome. Pengujian pada perangkat iOS menggunakan Safari belum dilakukan sehingga kompatibilitas pada perangkat tersebut belum dapat disimpulkan.

3. Keterbatasan

Beberapa keterbatasan yang ditemukan selama pengujian project adalah:
1. Proses Image Tracking membutuhkan pencahayaan yang cukup agar gambar target dapat dikenali oleh kamera.
2. Penggunaan layar handphone sebagai media untuk menampilkan gambar target memerlukan penyesuaian tingkat kecerahan dan kontras layar.
3. Pencahayaan yang redup dapat mengurangi keberhasilan deteksi gambar target.
4. Kualitas kamera dan kondisi lingkungan dapat memengaruhi proses tracking.
5. Pengujian pada perangkat iOS belum dilakukan sehingga hasil kompatibilitas pada perangkat tersebut belum diketahui.
6. Pada Console browser terdapat warning Multiple instances of Three.js being imported pada halaman demo Image Tracking dan Face Tracking. Warning tersebut tidak menghentikan aplikasi selama pengujian.

4. Masalah dan Investigasi

A. Kendala pada Pencahayaan Redup
Masalah:
Saat pengujian dalam kondisi pencahayaan redup, terdapat kendala pada proses deteksi gambar target yang ditampilkan melalui layar handphone.

Investigasi:
Gambar target yang digunakan ditampilkan melalui layar handphone. Ketika pencahayaan lingkungan redup, kamera mengalami kesulitan mengenali gambar target secara optimal. Hal ini berkaitan dengan tingkat kecerahan dan kontras layar handphone serta kondisi pencahayaan di sekitar objek pengujian.

Penanganan:
Beberapa penyesuaian yang diperlukan untuk mengatasi kendala tersebut adalah:
1. Meningkatkan tingkat kecerahan layar handphone.
2. Menyesuaikan kontras layar agar gambar target terlihat lebih jelas.
3. Memastikan posisi kamera sesuai saat melakukan pemindaian.
4. Menggunakan pencahayaan lingkungan yang cukup selama proses pengujian.

B. Warning Multiple Instances of Three.js
Masalah:
Pada Console browser, halaman demo Image Tracking dan Face Tracking menampilkan warning: Multiple instances of Three.js being imported

Investigasi:
Warning tersebut menunjukkan adanya beberapa instance library Three.js yang dimuat dalam aplikasi. Meskipun warning muncul, halaman dan fitur tracking tetap dapat berjalan selama pengujian.

Hasil:
Warning tidak menyebabkan aplikasi berhenti atau menghalangi proses Image Tracking dan Face Tracking. Namun, pemuatan library tetap perlu diperiksa agar penggunaan Three.js lebih konsisten.