/**
 * Kiosk-IPWS-PMD Core Script
 * Fungsi: Jam Digital, Tarikh Hijri, & Integrasi API Waktu Solat Zon 3 (SGR03)
 */

// 1. Fungsi Utama: Kemaskini Jam, Tarikh Masihi & Hijri
function updateClock() {
    const now = new Date();
    
    // Format Jam Digital (HH:mm:ss)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Papar Jam ke Elemen ID: digital-clock
    const clockElement = document.getElementById('digital-clock');
    if(clockElement) clockElement.innerText = timeString;

    // Format Tarikh Masihi (Contoh: Isnin, 2 Februari 2026)
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dateString = now.toLocaleDateString('ms-MY', options);
    
    // Format Tarikh Hijri Secara Automatik (Kalendar Umm al-Qura)
    const hijriOptions = { day: 'numeric', month: 'long', year: 'numeric', calendar: 'islamic-uma' };
    const hijriString = new Intl.DateTimeFormat('ms-MY-u-ca-islamic-uma', hijriOptions).format(now);

    // Papar Tarikh ke Elemen ID: current-date
    const dateElement = document.getElementById('current-date');
    if(dateElement) dateElement.innerText = `${dateString} | ${hijriString}`;
}

// 2. Fungsi Utama: Tarik Data Waktu Solat (Zon 3 - SGR03)
async function kemaskiniWaktuSolat() {
    // URL API JSON anda di GitHub
    const url = 'https://raw.githubusercontent.com/pengurusanemediamasjidkampungs-dotcom/api-takwim-solat-selangor-2026/main/selangor-zon3.json';

    try {
        const respon = await fetch(url);
        if (!respon.ok) throw new Error('Gagal mengakses fail API');
        const data = await respon.json();

        // Padankan format tarikh dengan kunci JSON anda (Contoh format: 02-Feb-2026)
        const hariIni = new Date();
        const tarikhFormat = hariIni.toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        }).replace(/ /g, '-');

        const jadual = data[tarikhFormat];

        if (jadual) {
            // Memasukkan data ke dalam elemen HTML berdasarkan ID
            if(document.getElementById('waktu-imsak'))   document.getElementById('waktu-imsak').innerText = jadual.imsak;
            if(document.getElementById('waktu-subuh'))   document.getElementById('waktu-subuh').innerText = jadual.subuh;
            if(document.getElementById('waktu-syuruk'))  document.getElementById('waktu-syuruk').innerText = jadual.syuruk;
            if(document.getElementById('waktu-zohor'))   document.getElementById('waktu-zohor').innerText = jadual.zohor;
            if(document.getElementById('waktu-asar'))    document.getElementById('waktu-asar').innerText = jadual.asar;
            if(document.getElementById('waktu-maghrib')) document.getElementById('waktu-maghrib').innerText = jadual.maghrib;
            if(document.getElementById('waktu-isyak'))   document.getElementById('waktu-isyak').innerText = jadual.isyak;
            
            console.log(`Berjaya dikemaskini untuk: ${tarikhFormat}`);
        } else {
            console.warn(`Data untuk tarikh ${tarikhFormat} tidak dijumpai dalam JSON.`);
        }
    } catch (ralat) {
        console.error("Ralat Teknikal API:", ralat);
    }
}

// 3. Kawalan Atur Cara (Initialization)
// Jalankan fungsi jam serta-merta dan setiap saat
setInterval(updateClock, 1000);
updateClock();

// Jalankan fungsi waktu solat serta-merta
kemaskiniWaktuSolat();

// Kemaskini data solat setiap 6 jam untuk memastikan ketepatan tarikh jika kiosk dibiarkan terbuka
setInterval(kemaskiniWaktuSolat, 21600000);
