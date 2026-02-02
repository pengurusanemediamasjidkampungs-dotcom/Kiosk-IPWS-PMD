# 🖥️ Kiosk-IPWS-PMD
> **Sistem Paparan Pintar: Info Paparan Waktu Solat, Program & Makluman Dakwah**
> *Masjid Kampung Sungai Lang Baru (MKSLB) - Sesi 2026/2030*

![Status](https://img.shields.io/badge/Status-Aktif-brightgreen?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Web--Based-blue?style=for-the-badge)
![License](https://img.shields.io/badge/Owner-Unit_E--Media_MKSLB-gold?style=for-the-badge)

## 🌟 Pengenalan
**Kiosk-IPWS-PMD** adalah sistem paparan digital (*Digital Signage*) mandiri yang dibina khas untuk menggantikan sistem pihak ketiga di MKSLB. Sistem ini berfungsi sebagai pusat penyampaian maklumat visual yang dinamik di dewan solat dan perkarangan masjid menggunakan teknologi awan (GitHub Pages).

---

## 🚀 Ciri-Ciri Utama
* **⌚ Real-Time Prayer Times:** Integrasi automatik dengan `api-takwim-solat-selangor-2026`.
* **🖼️ Dynamic Slide:** Paparan poster program, aktiviti masjid, dan infografik dakwah yang boleh dikemaskini dari jauh.
* **📜 Running Text (Marquee):** Makluman segera atau hadis pilihan yang bergerak di bahagian bawah skrin.
* **💎 Apple Liquid Glass UI:** Antaramuka moden yang bersih dan premium, sesuai untuk paparan TV bersaiz besar (HD/4K).
* **⚡ Zero Cost:** Berjalan sepenuhnya di atas infrastruktur GitHub tanpa yuran langganan bulanan/tahunan.

---

## 🛠️ Arsitektur Sistem

```mermaid
graph LR
    A[📦 GitHub Repo] -- Deploy --> B[🌐 GitHub Pages]
    C[📅 API Takwim] -- Fetch Data --> B
    D[📱 E-Media Admin] -- Push Image/Text --> A
    B -- Display --> E[🖥️ Mini PC / Smart TV Masjid]

### 📁 Struktur Kandungan
* `index.html` : Enjin utama paparan kiosk (Logic & UI).
* `assets/` : Folder simpanan imej poster program, pengumuman, dan grafik dakwah.
* `README.md` : Dokumentasi teknikal dan panduan pengurusan.

---

## ⚙️ Cara Kemaskini Kandungan
Untuk mengemaskini maklumat yang terpapar pada TV di dewan solat, pentadbir hanya perlu melakukan langkah berikut:

1.  **Iklan/Poster:** Muat naik fail imej baharu ke dalam folder `assets/` dan kemaskini pautan imej di dalam fail `index.html`.
2.  **Teks Bergerak:** Tukar teks pengumuman di dalam tag `<marquee>` pada fail `index.html`.
3.  **Commit & Push:** Simpan perubahan (Commit) dan hantar (Push) ke GitHub. Paparan TV akan dikemaskini secara automatik dalam masa 1-2 minit.

---

## 📅 Pelan Pembangunan (Roadmap)
- [x] **Fasa 1:** Integrasi API Waktu Solat Selangor (Zon 3).
- [x] **Fasa 2:** Pembangunan antaramuka (UI) bertema *Apple Liquid Glass*.
- [ ] **Fasa 3:** Integrasi kandungan video dakwah pendek (Format MP4/YouTube).
- [ ] **Fasa 4:** Paparan automatik jumlah kutipan tabung mingguan masjid.

---

## 👨‍💻 Pembangun Sistem
**Unit E-Media & Digital MKSLB** *Menerajui Transformasi Digital Institusi Masjid demi keredhaan-Nya.*

---
© 2026 **Masjid Kampung Sungai Lang Baru**. Semua Hak Terpelihara.
