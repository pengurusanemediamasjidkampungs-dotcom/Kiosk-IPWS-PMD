/**
 * Kiosk-IPWS-PMD Core Script
 * Fungsi: Jam Digital, Tarikh Hijri, & Integrasi API Waktu Solat Zon 3
 */

// 1. Fungsi Utama: Update Jam dan Tarikh
function updateClock() {
    const now = new Date();
    
    // Format Jam (HH:mm:ss)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Papar Jam
    const clockElement = document.getElementById('digital-clock');
    if(clockElement) clockElement.innerText = timeString;

    // Format Tarikh Masihi (Contoh: Isnin, 2 Februari 2026)
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dateString = now.toLocaleDateString('ms-MY', options);
    
    // Format Tarikh Hijri (Automatis)
    const hijriOptions = { day: 'numeric', month: 'long', year: 'numeric', calendar: 'islamic-uma' };
    const hijriString = new Intl.DateTimeFormat('ms-MY-u-ca-islamic-uma', hijriOptions).format(now);

    const dateElement = document.getElementById('current-date');
    if(dateElement) dateElement.innerText = `${dateString} | ${hijriString}`;
}

// 2. Fungsi Utama: Tarik Data Waktu Solat (Zon 3)
async function kemaskiniWaktuSolat() {
    const url = 'https://raw.githubusercontent.com/pengurusanemediamasjidkampungs-dotcom/api-takwim-solat-selangor-2026/main/selangor-zon3.json';

    try {
        const respon = await fetch(url);
        if (!respon.ok) throw new Error('Gagal akses API');
        const data = await respon.json();

        // Padankan format tarikh dengan JSON (Contoh: 02-Feb-2026)
        const hariIni = new Date();
        const tarikhFormat = hariIni.toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        }).replace(/ /g, '-');

        const jadual = data[tarikhFormat];

        if (jadual) {
            document.getElementById('waktu-subuh').innerText = jadual.subuh;
            document.getElementById('waktu-syuruk').innerText = jadual.syuruk;
            document.getElementById('waktu-zohor').innerText = jadual.zohor;
            document.getElementById('waktu-asar').innerText = jadual.asar;
            document.getElementById('waktu-maghrib').innerText = jadual.maghrib;
            document.getElementById('waktu-isyak').innerText = jadual.isyak;
            console.log(`Waktu solat dikemaskini: ${tarikhFormat}`);
        }
    } catch (ralat) {
        console.error("Ralat API:", ralat);
        // Jika gagal, biarkan --:-- atau papar mesej ralat
    }
}

// 3. Kawalan Atur Cara (Initialization)
// Jalankan jam setiap saat
setInterval(updateClock, 1000);
updateClock();

// Jalankan API Solat
kemaskiniWaktuSolat();
// Update waktu solat setiap 6 jam untuk memastikan data sentiasa segar
setInterval(kemaskiniWaktuSolat, 21600000);
