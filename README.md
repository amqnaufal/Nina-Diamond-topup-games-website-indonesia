# Nina Diamond - Top Up Games Website Indonesia
> Website Top Up Game Termurah Dan Tercepat Se-Indonesia

<img src="[URL_GAMBAR_DARI_GITHUB](https://github.com/amqnaufal/Nina-Diamond-topup-games-website-indonesia/blob/main/Full%20Page%20Preview.png?raw=true)" alt="Website Fullpage Preview" width="100%">

---

##  Fitur Utama

* **Pencarian Cepat:** Fitur pencarian produk (*Cari Game atau Voucher*) di bagian *header* untuk mempermudah navigasi pengguna.
* **Trending Section:** Menampilkan produk atau game yang paling populer saat ini secara dinamis untuk menarik perhatian pelanggan.
* **Kategori Produk Teratur:** Pembagian produk yang jelas mulai dari *Top Up Games*, *Game Baru*, hingga *Voucher*.
* **Sistem Riwayat Transaksi:** Fitur *Cek Transaksi* yang intuitif untuk melacak status pembelian pengguna menggunakan ID transaksi.
* **Integrasi Live Chat (Chat CS):** Tombol *floating chat* Customer Service yang selalu siap membantu pengguna jika mengalami kendala.
* **Komponen UI Kustom:** Halaman top up Mobile Legends dilengkapi dengan kontainer abu-abu elegan dan aksen tab samping berwarna oranye agar sesuai dengan tema visual *brand*.

---

##  Arsitektur & Struktur Proyek

Proyek ini dibangun menggunakan **React** dan **TypeScript** dengan struktur komponen yang modular:

```text
src/
├── components/
│   └── ChatCS.tsx          # Komponen tombol dan sistem interaksi Customer Service
├── MobileLegends.tsx       # Halaman utama alur top up Mobile Legends (Integrasi form & detail)
├── App.tsx                 # Entry point utama aplikasi dan routing halaman
└── index.tsx               # Render DOM utama
