/**
 * English / Indonesian for the website. English pages live at "/" and
 * "/careers", Indonesian at "/id" and "/id/careers".
 *
 * Text written on the website is in `ui`. Text that comes from Company
 * Details in RGS ONE (lib/cms.ts) is English; `cmsIndonesian` holds its
 * Indonesian, matched on the exact English sentence. A sentence changed in
 * Company Details shows in English on the Indonesian pages until its
 * Indonesian is added here.
 */

export type Lang = "en" | "id";

export const LANGS: { value: Lang; short: string; name: string }[] = [
  { value: "en", short: "EN", name: "English" },
  { value: "id", short: "ID", name: "Bahasa Indonesia" },
];

export type Page = "home" | "careers";

export function pagePath(lang: Lang, page: Page): string {
  const base = lang === "id" ? "/id" : "";
  return page === "home" ? base || "/" : `${base}/careers`;
}

/** Link to a section of the home page, from any page. */
export function sectionHref(lang: Lang, id: string): string {
  return `${lang === "id" ? "/id" : "/"}#${id}`;
}

export const RECRUITMENT_EMAIL = "recruitment@rgs.co.id";

const en = {
  nav: {
    clients: "Clients",
    services: "Services",
    industries: "Industries",
    rgsOne: "RGS ONE",
    whyRgs: "Why RGS",
    contact: "Contact",
    careers: "Careers",
    clientLogin: "Client Login",
    rgsOneClientLogin: "RGS ONE Client Login",
    requestProposal: "Request Proposal",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "RGS – back to the home page",
    language: "Language",
  },
  whatsapp: {
    label: "WhatsApp",
    chat: "Chat with us",
    panelTitle: "How may we assist you?",
    panelLead: "Please choose the purpose of your message so we can connect you with the right team.",
    close: "Close",
    inquiries: "Business Inquiries",
    inquiriesHint: "Services, proposals and general questions",
    careers: "Career Inquiries",
    careersHint: "Jobs and applications at RGS",
    adminMessage: "Hello RGS, I would like to ask about your services.",
  },
  hero: {
    companyProfile: "Company Profile",
  },
  clients: {
    eyebrow: "Client Experience",
    title: "Trusted by respected brands and destinations.",
    lead: "RGS has supported organisations across commercial property, banking, healthcare, hospitality, retail, residential, transport and public facilities.",
    listLabel: "Selected clients",
  },
  services: {
    request: "Request this service",
  },
  industries: {
    eyebrow: "Industries We Serve",
    title: "Supporting every environment that matters.",
    lead: "From office towers to hospitals, hotels, logistics sites and schools, RGS tailors its facility services to how each kind of building runs.",
    names: [
      "Corporate Offices",
      "Commercial Buildings",
      "Shopping Centres",
      "Hospitals",
      "Hotels",
      "Industrial Facilities",
      "Warehouses",
      "Educational Institutions",
    ],
  },
  rgsOne: {
    eyebrow: "One Platform. Complete Visibility.",
    title: "Your sites, your staff and your reports in one place.",
    lead: "RGS ONE is the platform RGS runs its operations on. Through the client portal you follow your sites as the work happens, not weeks later.",
    features: [
      { title: "Sites & projects", text: "Every site and location you have with RGS, in one list." },
      { title: "Attendance", text: "Staff check in on site, so you can see who is working where." },
      { title: "Daily progress", text: "Progress reports with photos from the field, every day." },
      { title: "Monthly reports", text: "Reports and approvals ready for you in the client portal." },
    ],
    portalLogin: "Client Portal Login",
    talkToUs: "Talk to our team",
  },
  why: {
    highlights: [
      "Staff attendance & on-site check-in",
      "Daily progress with photos",
      "Monthly reports & approvals",
    ],
    learnMore: "Learn more",
  },
  contact: {
    title: "Request a consultation",
    intro: "Tell us about your facility, its location and what it needs. Our team will prepare a proposal tailored to you.",
    company: "Company name",
    name: "Contact person",
    phone: "Phone number",
    email: "Email address",
    service: "Service needed",
    chooseService: "Choose a service",
    message: "Your requirements",
    messagePlaceholder: "Building type, location, size, working hours…",
    success: "Thank you. Your inquiry has been sent and our team will contact you soon.",
    errorBefore: "Something went wrong. Please email us directly at",
    allRequired: "All fields are required.",
    send: "Send inquiry",
    sending: "Sending…",
    callUs: "Call us",
    emailLabel: "Email",
    office: "Office",
    serviceOptions: [
      { value: "Cleaning Service", label: "Cleaning Service" },
      { value: "Security Service", label: "Security Service" },
      { value: "Parking Management", label: "Parking Management" },
      { value: "Integrated Facility Management", label: "Integrated Facility Management" },
    ],
  },
  footer: {
    company: "Company",
    services: "Services",
    contact: "Contact",
    companyProfile: "Company Profile",
    rights: "All rights reserved.",
    portal: "RGS ONE Client Portal",
    serviceLinks: ["Cleaning Services", "Security Services", "Parking Management", "Integrated Facility Management"],
  },
  careers: {
    metaTitle: "Careers",
    metaDescription:
      "Work with PT Relasi Global Solusi (RGS): cleaning, security, parking and facility roles across Indonesia.",
    eyebrow: "Careers at RGS",
    title: "Build your career with RGS.",
    lead: "RGS looks after offices, hospitals, hotels, malls and industrial sites across Indonesia, and we are always looking for reliable, hard-working people to join our teams.",
    applyWhatsapp: "Apply via WhatsApp",
    stripEyebrow: "Careers at RGS",
    stripTitle: "Want to work with us?",
    stripText: "We are always looking for reliable people for our sites across Indonesia.",
    viewCareers: "View Careers",
    emailUs: "Email our recruitment team",
    whyEyebrow: "Why Work With RGS",
    whyTitle: "A workplace that looks after its people.",
    benefits: [
      { title: "Room to grow", text: "Reliable people can grow into team leader and supervisor roles." },
      { title: "Work near home", text: "Where we can, we place you at a site close to where you live." },
      { title: "Training & supervision", text: "Training before you start, and a supervisor on your site." },
      { title: "Your pay in RGS ONE", text: "Check your attendance and payslips yourself, anytime." },
    ],
    rolesEyebrow: "Roles We Hire For",
    rolesTitle: "Find the role that suits you.",
    rolesLead: "These are the roles we hire for most often. Message us with the role you want and the area you live in, and we will tell you what is open near you.",
    roles: [
      { title: "Cleaning Staff", text: "Keep offices, hospitals, malls and public areas clean and healthy." },
      { title: "Security Officer", text: "Guard sites, control access and patrol with discipline." },
      { title: "Parking Attendant", text: "Run parking areas and help visitors in and out smoothly." },
      { title: "Gardener & Landscaping", text: "Care for gardens, plants and outdoor areas of our sites." },
      { title: "Team Leader & Supervisor", text: "Lead a site team, check the work and report to Head Office." },
      { title: "Head Office", text: "Administration, finance, HR and operations roles in Jakarta." },
    ],
    applyFor: "Apply",
    stepsEyebrow: "How To Apply",
    stepsTitle: "Three simple steps.",
    steps: [
      { title: "Get in touch", text: "Message our recruitment team with your name, the role you want and the area you live in." },
      { title: "Share your documents", text: "Send your CV and a copy of your KTP when our team asks for them." },
      { title: "Interview & training", text: "Meet our team, then get trained before your first day on site." },
    ],
    noFeeTitle: "Recruitment at RGS is free",
    noFeeText: "RGS never asks for money at any stage of recruitment. If someone asks you to pay in the name of RGS, do not pay and report it to us.",
    contactTitle: "Ready to join us?",
    contactLead: "Send us a message and our recruitment team will reply.",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    whatsappMessage: "Hello RGS, I would like to apply for a job.\nName:\nRole:\nArea I live in:",
    whatsappRoleMessage: (role: string) =>
      `Hello RGS, I would like to apply for ${role}.\nName:\nArea I live in:`,
  },
};

export type Dictionary = typeof en;

const id: Dictionary = {
  nav: {
    clients: "Klien",
    services: "Layanan",
    industries: "Industri",
    rgsOne: "RGS ONE",
    whyRgs: "Mengapa RGS",
    contact: "Kontak",
    careers: "Karier",
    clientLogin: "Login Klien",
    rgsOneClientLogin: "Login Klien RGS ONE",
    requestProposal: "Minta Proposal",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    backToTop: "RGS – kembali ke beranda",
    language: "Bahasa",
  },
  whatsapp: {
    label: "WhatsApp",
    chat: "Chat dengan kami",
    panelTitle: "Ada yang bisa kami bantu?",
    panelLead: "Silakan pilih tujuan pesan Anda agar kami dapat menghubungkan Anda dengan tim yang tepat.",
    close: "Tutup",
    inquiries: "Pertanyaan Bisnis",
    inquiriesHint: "Layanan, proposal, dan pertanyaan umum",
    careers: "Pertanyaan Karier",
    careersHint: "Lowongan dan lamaran kerja di RGS",
    adminMessage: "Halo RGS, saya ingin bertanya tentang layanan Anda.",
  },
  hero: {
    companyProfile: "Profil Perusahaan",
  },
  clients: {
    eyebrow: "Pengalaman Klien",
    title: "Dipercaya oleh merek dan destinasi terkemuka.",
    lead: "RGS telah mendukung berbagai organisasi di bidang properti komersial, perbankan, kesehatan, perhotelan, ritel, hunian, transportasi, dan fasilitas publik.",
    listLabel: "Klien terpilih",
  },
  services: {
    request: "Minta layanan ini",
  },
  industries: {
    eyebrow: "Industri yang Kami Layani",
    title: "Mendukung setiap lingkungan yang penting.",
    lead: "Dari gedung perkantoran hingga rumah sakit, hotel, fasilitas logistik, dan sekolah, RGS menyesuaikan layanannya dengan cara kerja setiap jenis gedung.",
    names: [
      "Perkantoran",
      "Gedung Komersial",
      "Pusat Perbelanjaan",
      "Rumah Sakit",
      "Hotel",
      "Fasilitas Industri",
      "Gudang",
      "Institusi Pendidikan",
    ],
  },
  rgsOne: {
    eyebrow: "Satu Platform. Visibilitas Penuh.",
    title: "Lokasi, staf, dan laporan Anda dalam satu tempat.",
    lead: "RGS ONE adalah platform yang digunakan RGS untuk menjalankan operasionalnya. Melalui portal klien, Anda memantau lokasi Anda saat pekerjaan berlangsung, bukan berminggu-minggu kemudian.",
    features: [
      { title: "Lokasi & proyek", text: "Semua lokasi Anda bersama RGS dalam satu daftar." },
      { title: "Absensi", text: "Staf check-in di lokasi, sehingga Anda tahu siapa bekerja di mana." },
      { title: "Progres harian", text: "Laporan progres dengan foto dari lapangan, setiap hari." },
      { title: "Laporan bulanan", text: "Laporan dan persetujuan siap untuk Anda di portal klien." },
    ],
    portalLogin: "Login Portal Klien",
    talkToUs: "Bicara dengan tim kami",
  },
  why: {
    highlights: [
      "Absensi & check-in staf di lokasi",
      "Progres harian dengan foto",
      "Laporan & persetujuan bulanan",
    ],
    learnMore: "Selengkapnya",
  },
  contact: {
    title: "Ajukan konsultasi",
    intro: "Ceritakan tentang fasilitas Anda, lokasinya, dan kebutuhannya. Tim kami akan menyiapkan proposal yang sesuai untuk Anda.",
    company: "Nama perusahaan",
    name: "Nama kontak",
    phone: "Nomor telepon",
    email: "Alamat email",
    service: "Layanan yang dibutuhkan",
    chooseService: "Pilih layanan",
    message: "Kebutuhan Anda",
    messagePlaceholder: "Jenis gedung, lokasi, luas, jam kerja…",
    success: "Terima kasih. Permintaan Anda telah terkirim dan tim kami akan segera menghubungi Anda.",
    errorBefore: "Terjadi kesalahan. Silakan kirim email langsung ke",
    allRequired: "Semua kolom wajib diisi.",
    send: "Kirim permintaan",
    sending: "Mengirim…",
    callUs: "Telepon",
    emailLabel: "Email",
    office: "Kantor",
    serviceOptions: [
      { value: "Cleaning Service", label: "Layanan Kebersihan" },
      { value: "Security Service", label: "Layanan Keamanan" },
      { value: "Parking Management", label: "Manajemen Parkir" },
      { value: "Integrated Facility Management", label: "Manajemen Fasilitas Terpadu" },
    ],
  },
  footer: {
    company: "Perusahaan",
    services: "Layanan",
    contact: "Kontak",
    companyProfile: "Profil Perusahaan",
    rights: "Hak cipta dilindungi.",
    portal: "Portal Klien RGS ONE",
    serviceLinks: ["Layanan Kebersihan", "Layanan Keamanan", "Manajemen Parkir", "Manajemen Fasilitas Terpadu"],
  },
  careers: {
    metaTitle: "Karier",
    metaDescription:
      "Bekerja bersama PT Relasi Global Solusi (RGS): posisi kebersihan, keamanan, parkir, dan fasilitas di seluruh Indonesia.",
    eyebrow: "Karier di RGS",
    title: "Bangun karier Anda bersama RGS.",
    lead: "RGS mengelola perkantoran, rumah sakit, hotel, pusat perbelanjaan, dan kawasan industri di seluruh Indonesia, dan kami selalu mencari orang-orang yang andal dan pekerja keras untuk bergabung dengan tim kami.",
    applyWhatsapp: "Lamar via WhatsApp",
    stripEyebrow: "Karier di RGS",
    stripTitle: "Ingin bekerja bersama kami?",
    stripText: "Kami selalu mencari orang-orang yang andal untuk lokasi kami di seluruh Indonesia.",
    viewCareers: "Lihat Karier",
    emailUs: "Email tim rekrutmen kami",
    whyEyebrow: "Mengapa Bekerja di RGS",
    whyTitle: "Tempat kerja yang peduli pada karyawannya.",
    benefits: [
      { title: "Kesempatan berkembang", text: "Karyawan yang andal dapat berkembang menjadi team leader dan supervisor." },
      { title: "Bekerja dekat rumah", text: "Jika memungkinkan, kami menempatkan Anda di lokasi yang dekat dengan tempat tinggal Anda." },
      { title: "Pelatihan & pengawasan", text: "Pelatihan sebelum mulai bekerja, dan supervisor di lokasi Anda." },
      { title: "Gaji Anda di RGS ONE", text: "Cek absensi dan slip gaji Anda sendiri, kapan saja." },
    ],
    rolesEyebrow: "Posisi yang Kami Cari",
    rolesTitle: "Temukan posisi yang cocok untuk Anda.",
    rolesLead: "Berikut posisi yang paling sering kami rekrut. Kirim pesan kepada kami dengan posisi yang Anda inginkan dan domisili Anda, dan kami akan memberi tahu lowongan di dekat Anda.",
    roles: [
      { title: "Petugas Kebersihan", text: "Menjaga perkantoran, rumah sakit, mal, dan area publik tetap bersih dan sehat." },
      { title: "Petugas Keamanan", text: "Menjaga lokasi, mengatur akses, dan berpatroli dengan disiplin." },
      { title: "Petugas Parkir", text: "Mengelola area parkir dan membantu pengunjung keluar masuk dengan lancar." },
      { title: "Tukang Kebun & Lanskap", text: "Merawat taman, tanaman, dan area luar lokasi kami." },
      { title: "Team Leader & Supervisor", text: "Memimpin tim di lokasi, memeriksa pekerjaan, dan melapor ke kantor pusat." },
      { title: "Kantor Pusat", text: "Posisi administrasi, keuangan, HR, dan operasional di Jakarta." },
    ],
    applyFor: "Lamar",
    stepsEyebrow: "Cara Melamar",
    stepsTitle: "Tiga langkah mudah.",
    steps: [
      { title: "Hubungi kami", text: "Kirim pesan ke tim rekrutmen kami dengan nama Anda, posisi yang Anda inginkan, dan domisili Anda." },
      { title: "Kirim dokumen", text: "Kirim CV dan fotokopi KTP Anda saat diminta oleh tim kami." },
      { title: "Wawancara & pelatihan", text: "Bertemu tim kami, lalu ikuti pelatihan sebelum hari pertama di lokasi." },
    ],
    noFeeTitle: "Rekrutmen di RGS tidak dipungut biaya",
    noFeeText: "RGS tidak pernah meminta uang dalam tahap rekrutmen apa pun. Jika ada yang meminta Anda membayar atas nama RGS, jangan membayar dan laporkan kepada kami.",
    contactTitle: "Siap bergabung bersama kami?",
    contactLead: "Kirim pesan kepada kami dan tim rekrutmen kami akan membalas.",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
    whatsappMessage: "Halo RGS, saya ingin melamar pekerjaan.\nNama:\nPosisi:\nDomisili:",
    whatsappRoleMessage: (role: string) =>
      `Halo RGS, saya ingin melamar sebagai ${role}.\nNama:\nDomisili:`,
  },
};

export const dictionaries: Record<Lang, Dictionary> = { en, id };

/** Indonesian for the English text that comes from Company Details. */
const cmsIndonesian: Record<string, string> = {
  // Hero
  Creating: "Menciptakan",
  Better: "Lingkungan",
  Environments: "yang Lebih Baik",
  "Relasi Global Solusi delivers professional cleaning, security, parking management, and integrated facility support for businesses that require dependable daily operations.":
    "Relasi Global Solusi menghadirkan layanan kebersihan, keamanan, manajemen parkir, dan dukungan fasilitas terpadu yang profesional bagi bisnis yang membutuhkan operasional harian yang andal.",
  Cleaning: "Kebersihan",
  Security: "Keamanan",
  Parking: "Parkir",
  "Facility Support": "Dukungan Fasilitas",
  "Professional Personnel": "Personel Profesional",
  "Corporate Clients": "Klien Korporat",
  "Operational Support": "Dukungan Operasional",
  "Request Proposal": "Minta Proposal",
  "Explore Services": "Lihat Layanan",
  // Services
  "Our Services": "Layanan Kami",
  "Integrated services for better facility operations.": "Layanan terpadu untuk operasional fasilitas yang lebih baik.",
  "RGS provides essential facility services that help businesses maintain cleaner, safer, and more efficient environments every day.":
    "RGS menyediakan layanan fasilitas penting yang membantu bisnis menjaga lingkungan yang lebih bersih, aman, dan efisien setiap hari.",
  "Cleaning Services": "Layanan Kebersihan",
  "Clean & Healthy Workplaces": "Tempat Kerja Bersih & Sehat",
  "Professional cleaning solutions for offices, commercial buildings, restaurants, hospitals, industrial facilities, and public environments.":
    "Solusi kebersihan profesional untuk perkantoran, gedung komersial, restoran, rumah sakit, fasilitas industri, dan area publik.",
  "Security Services": "Layanan Keamanan",
  "Safe & Controlled Facilities": "Fasilitas Aman & Terkendali",
  "Reliable security personnel, access control, patrol operations, and facility protection delivered with discipline and professionalism.":
    "Personel keamanan yang andal, kontrol akses, patroli, dan perlindungan fasilitas yang dijalankan dengan disiplin dan profesional.",
  "Parking Management": "Manajemen Parkir",
  "Efficient Parking Operations": "Operasional Parkir yang Efisien",
  "Structured parking management designed to improve traffic flow, visitor experience, site control, and operational efficiency.":
    "Manajemen parkir yang terstruktur untuk memperlancar arus kendaraan, meningkatkan pengalaman pengunjung, pengendalian area, dan efisiensi operasional.",
  // Numbers
  "RGS By The Numbers": "RGS dalam Angka",
  "Scale, reliability, and operational discipline.": "Skala, keandalan, dan disiplin operasional.",
  "Trusted Operations": "Operasional Terpercaya",
  "RGS supports demanding facilities with trained personnel, responsive management, and consistent daily execution across commercial offices, hospitals, hotels, retail centres, residential developments, and industrial facilities.":
    "RGS mendukung fasilitas dengan tuntutan tinggi melalui personel terlatih, manajemen yang responsif, dan pelaksanaan harian yang konsisten di perkantoran, rumah sakit, hotel, pusat ritel, kawasan hunian, dan fasilitas industri.",
  "Highly trained personnel supporting cleaning, security, parking, and integrated facility management operations throughout Indonesia.":
    "Personel terlatih yang mendukung operasional kebersihan, keamanan, parkir, dan manajemen fasilitas terpadu di seluruh Indonesia.",
  "Trusted by commercial, healthcare, hospitality, retail, and industrial organizations.":
    "Dipercaya oleh organisasi di bidang komersial, kesehatan, perhotelan, ritel, dan industri.",
  "Client Satisfaction": "Kepuasan Klien",
  "Built through consistent supervision, reporting, and dependable service delivery.":
    "Dibangun melalui pengawasan, pelaporan, dan layanan yang konsisten dan andal.",
  "Responsive coordination to keep facilities running smoothly every day.":
    "Koordinasi yang responsif agar fasilitas berjalan lancar setiap hari.",
  // Contact (CTA)
  "Let's Work Together": "Mari Bekerja Sama",
  "Ready to strengthen your facility operations?": "Siap memperkuat operasional fasilitas Anda?",
  "Whether you need cleaning, security, parking management, or a fully integrated facility solution, RGS is ready to support your daily operations with dependable service teams.":
    "Baik Anda membutuhkan layanan kebersihan, keamanan, manajemen parkir, maupun solusi fasilitas terpadu, RGS siap mendukung operasional harian Anda dengan tim layanan yang andal.",
  "Integrated Services": "Layanan Terpadu",
  "Responsive Support": "Dukungan Responsif",
  "Reliable Execution": "Pelaksanaan Andal",
  "Offices, hospitals, hotels, retail destinations, residences, logistics facilities, and industrial sites.":
    "Perkantoran, rumah sakit, hotel, pusat ritel, hunian, fasilitas logistik, dan kawasan industri.",
  // Why RGS
  "Why Choose RGS": "Mengapa Memilih RGS",
  "A trusted partner for modern facility management.": "Mitra terpercaya untuk manajemen fasilitas modern.",
  "We combine experienced professionals, standardized operating procedures, and integrated service management to help clients maintain safe, clean, and efficient facilities.":
    "Kami memadukan tenaga profesional berpengalaman, prosedur operasional standar, dan manajemen layanan terpadu untuk membantu klien menjaga fasilitas yang aman, bersih, dan efisien.",
  "Operational Excellence": "Keunggulan Operasional",
  "Reliable people, clear standards, and consistent execution.": "Orang-orang andal, standar yang jelas, dan pelaksanaan yang konsisten.",
  "Delivering dependable facility management through experienced personnel, structured supervision, and measurable service quality.":
    "Menghadirkan manajemen fasilitas yang andal melalui personel berpengalaman, pengawasan terstruktur, dan kualitas layanan yang terukur.",
  "Integrated Facility Management": "Manajemen Fasilitas Terpadu",
  "One trusted partner for cleaning, security, parking, and daily facility support.":
    "Satu mitra terpercaya untuk kebersihan, keamanan, parkir, dan dukungan fasilitas harian.",
  "One partner for cleaning, security, parking, and daily facility support.":
    "Satu mitra untuk kebersihan, keamanan, parkir, dan dukungan fasilitas harian.",
  "Experienced Professional Team": "Tim Profesional Berpengalaman",
  "Trained personnel with discipline, supervision, and clear operational standards.":
    "Personel terlatih dengan disiplin, pengawasan, dan standar operasional yang jelas.",
  "Trained personnel with discipline, supervision, and clear standards.":
    "Personel terlatih dengan disiplin, pengawasan, dan standar yang jelas.",
  "Customized Service Solutions": "Solusi Layanan yang Disesuaikan",
  "Every facility receives a practical solution based on its site, risk, and operating needs.":
    "Setiap fasilitas mendapatkan solusi praktis sesuai lokasi, risiko, dan kebutuhan operasionalnya.",
  "Consistent Quality Assurance": "Jaminan Mutu yang Konsisten",
  "Routine inspections, reporting, and evaluations help maintain reliable service quality.":
    "Inspeksi, pelaporan, dan evaluasi rutin menjaga kualitas layanan yang andal.",
  "Routine inspections and reporting to maintain reliable service quality.":
    "Inspeksi dan pelaporan rutin untuk menjaga kualitas layanan yang andal.",
  "Responsive Operations": "Operasional yang Responsif",
  "Fast support from supervisors and management when urgent operational needs arise.":
    "Dukungan cepat dari supervisor dan manajemen saat ada kebutuhan operasional yang mendesak.",
  "Fast support from supervisors when urgent operational needs arise.":
    "Dukungan cepat dari supervisor saat ada kebutuhan operasional yang mendesak.",
  "Trusted Client Experience": "Pengalaman Klien Terpercaya",
  "Supporting offices, hospitals, hotels, retail destinations, residences, and industrial sites.":
    "Mendukung perkantoran, rumah sakit, hotel, pusat ritel, hunian, dan kawasan industri.",
  "RGS ONE Platform": "Platform RGS ONE",
  "Real-time project visibility, client portal access, and transparent reporting in one portal.":
    "Visibilitas proyek secara real-time, akses portal klien, dan pelaporan yang transparan dalam satu portal.",
  // Footer
  "Built for cleaner, safer, better-managed environments.":
    "Untuk lingkungan yang lebih bersih, aman, dan terkelola dengan baik.",
};

/** The text in the reader's language (Company Details text and fallbacks). */
function tr(lang: Lang, text: string): string {
  return lang === "id" ? cmsIndonesian[text.trim()] ?? text : text;
}

/** Every string of a Company Details object in the reader's language. */
export function localize<T>(lang: Lang, value: T): T {
  if (lang === "en") return value;
  if (typeof value === "string") return tr(lang, value) as T;
  if (Array.isArray(value)) return value.map((item) => localize(lang, item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, localize(lang, item)])
    ) as T;
  }
  return value;
}
