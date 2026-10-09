// src/config.js
import fotoUltah from './assets/pfp.webp'

export const BIRTHDAY_CONFIG = {
    name: "Aurelia",
    birthMonth: 10, // Catatan: Jika bulan Juli = 7, jika Oktober = 10 (Sesuaikan dengan logika codingmu)
    birthDate: 12,
    birthYear: 2005,
    passkey: 'aureljelek',
    // Daftar nama panggilan atau sebutan elegan untuk efek Typewriter berganti-ganti
    typewriterNames: [
        '<span style="color: #F48FB1;">Aurelia Putri Cantika.</span>',
        '<span style="color: #f159ff;">Aurel Jelek.</span>',
        '<span style="color: #fbcaff;">Kak Aurel</span>',
        '<span style="color: #FFE082;">The brightest star.</span>',
        '<span style="color: #F8BBD0;">A beautiful soul with a kind heart.</span>',
        '<span style="color: #F48FB1;">An independent and graceful soul.</span>',
        '<span style="color: #FFE082;">The owner of the prettiest smile.</span>'
    ],

    // File gambar utama di tengah
    imagePath: fotoUltah,
    wishesData: [
        {
            "id": 1,
            "wish": "Semoga di umur yang baru ini kamu selalu diberikan kebahagiaan, kekuatan untuk meraih semua mimpi, dan tetap menjadi jiwa yang seindah bintang di langit.",
            "sender": "March7th"
        },
        {
            "id": 2,
            "wish": "Selamat ulang tahun! Terima kasih telah lahir ke dunia dan membawa banyak warna cerah ke orang-orang di sekitarmu. Wish you all the best!",
            "sender": "Denny Jelek"
        },
        {
            "id": 3,
            "wish": "HBD Aurelia! Semoga harimu menyenangkan, sehat selalu, panjang umur, dan dilancarkan segala urusannya yaaa ✨",
            "sender": "The person you hate"
        },
        {
            "id": 4,
            "wish": "Semangat terus yaaa, jangan bandel.\nYang Lalu biarlah berlalu, semoga kamu dapat apa yang kamu impikan.",
            "sender": "Janexmgd"
        }
    ]
};