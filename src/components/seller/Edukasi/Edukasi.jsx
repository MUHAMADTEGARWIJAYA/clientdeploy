import { useEffect, useState } from "react";
const faqs = [
  {
    question:
      "[Akun Saya] Bagaimana cara mendaftar dan mengelola akun di KambingFresh?",
    answer:
      "Untuk mendaftar, klik tombol 'Daftar' di halaman utama dan isi data yang diminta. Anda bisa mengelola akun melalui menu 'Pengaturan Akun'.",
  },
  {
    question:
      "[Lupa Kata Sandi] Apa yang harus dilakukan jika saya lupa kata sandi akun saya?",
    answer:
      "Klik 'Lupa Kata Sandi' di halaman login, lalu ikuti petunjuk untuk mengatur ulang kata sandi melalui email yang terdaftar.",
  },
  {
    question:
      "[Pembelian Produk] Bagaimana cara mencari dan membeli produk yang saya inginkan?",
    answer:
      "Gunakan fitur pencarian atau jelajahi kategori untuk menemukan produk. Setelah itu, tambahkan produk ke keranjang dan lanjutkan ke checkout untuk membeli.",
  },
  {
    question:
      "[Pembayaran] Metode pembayaran apa saja yang tersedia di KambingFresh?",
    answer:
      "Kami menerima pembayaran melalui transfer bank, kartu kredit, dan e-wallet seperti OVO dan GoPay.",
  },
  {
    question: "[Transaksi Aman] Apakah transaksi di KambingFresh dijamin aman?",
    answer:
      "Ya, transaksi di KambingFresh dilindungi oleh sistem keamanan yang teruji untuk menjaga kerahasiaan data Anda.",
  },
  {
    question:
      "[Pengiriman] Bagaimana cara melacak status pengiriman pesanan saya?",
    answer:
      "Anda bisa melacak status pengiriman melalui menu 'Pesanan Saya' atau dengan nomor resi yang dikirimkan setelah produk dikirim.",
  },
  {
    question:
      "[Pengembalian Produk] Bagaimana cara mengajukan pengembalian produk yang tidak sesuai?",
    answer:
      "Ajukan pengembalian melalui menu 'Pesanan Saya' dengan memilih produk yang ingin dikembalikan dan alasan pengembalian.",
  },
  {
    question:
      "[Ulasan Produk] Bagaimana cara memberikan ulasan untuk produk yang telah saya beli?",
    answer:
      "Setelah produk diterima, masuk ke 'Pesanan Saya' dan pilih produk yang ingin Anda ulas untuk memberikan feedback.",
  },
  {
    question:
      "[Promo & Diskon] Bagaimana cara menggunakan kode promo saat checkout?",
    answer:
      "Masukkan kode promo di halaman checkout pada kolom 'Kode Promo' dan klik 'Terapkan'. Diskon akan otomatis diterapkan.",
  },
  {
    question:
      "[Layanan Pelanggan] Bagaimana cara menghubungi layanan pelanggan KambingFresh untuk bantuan lebih lanjut?",
    answer:
      "Anda bisa menghubungi layanan pelanggan melalui menu 'Bantuan' atau melalui chat di aplikasi KambingFresh.",
  },
];

const articles = [
  {
    title: "Maksimalkan Strategi untuk Optimalkan Orderan Saat Momen Lebaran",
    category: "Manajemen Toko",
    date: "2 Oktober 2024",
    readTime: "5 Menit",
    imageUrl: "artikel1.jpg", // Ganti dengan URL gambar Anda
  },
  {
    title:
      "5 Strategi Pemasaran untuk Tingkatkan Penjualan Kambing di KambingFresh",
    category: "Manajemen Toko",
    date: "5 November 2024",
    readTime: "6 Menit",
    imageUrl: "artikel2.jpg", // Ganti dengan URL gambar Anda
  },
  {
    title: "Panduan Menentukan Harga Jual yang Kompetitif untuk Produk Kambing",
    category: "Pengaturan Harga",
    date: "3 November 2024",
    readTime: "7 Menit",
    imageUrl: "artikel3.jpg", // Ganti dengan URL gambar Anda
  },
  {
    title: "Tips Membuat Foto Produk Kambing yang Menarik Pembeli",
    category: "Konten Visual",
    date: "28 Oktober 2024",
    readTime: "5 Menit",
    imageUrl: "artikel4.jpg", // Ganti dengan URL gambar Anda
  },
];

const use = [
  {
    title: "Penggunaan Lengkap cara buka toko",
    category: "Manajemen Toko",
    date: "2 Oktober 2024",
    readTime: "5 Menit",
    imageUrl: "edukasi1.jpg", // Ganti dengan URL gambar Anda
  },
  {
    title: "Cara mengelola pesanan dan pengiriman di kambingfresh",
    category: "Manajemen Toko",
    date: "5 November 2024",
    readTime: "6 Menit",
    imageUrl: "edukasi2.jpg", // Ganti dengan URL gambar Anda
  },
  {
    title: "Tips keamaan Akun, Jaga akun dan data di kambingfresh",
    category: "Pengaturan Harga",
    date: "3 November 2024",
    readTime: "7 Menit",
    imageUrl: "edukasi3.jpg", // Ganti dengan URL gambar Anda
  },
  {
    title: "cara memaksimalkan penggunaan filter di kambingfresh",
    category: "Konten Visual",
    date: "28 Oktober 2024",
    readTime: "5 Menit",
    imageUrl: "edukasi4.jpeg", // Ganti dengan URL gambar Anda
  },
];

const ArticlesSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [images, setImages] = useState({});

  useEffect(() => {
    // Mengimpor semua gambar secara asinkron
    const loadImages = async () => {
      const importedImages = import.meta.glob(
        "../../../assets/imgs/*.{png,jpg,jpeg,svg}"
      );
      const imageEntries = await Promise.all(
        Object.entries(importedImages).map(async ([path, importFunc]) => {
          const module = await importFunc();
          const fileName = path.replace("../../../assets/imgs/", ""); // Ambil nama file
          return [fileName, module.default]; // module.default adalah URL gambar
        })
      );
      setImages(Object.fromEntries(imageEntries)); // Simpan gambar dalam bentuk objek
    };

    loadImages();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center relative">
      {/* Back Button */}
      <a href="/home">
        <button className="absolute top-4 left-4 text-blue-500 text-xl z-20">
          &larr; Kembali
        </button>
      </a>

      {/* Header Section */}
      <div className="bg-pink-100 min-h-96 mb-5 w-screen">
        <div className="relative">
          <img
            src={images["bgedu.jpeg"]} // Ganti dengan URL gambar kambing yang sesuai
            alt="Background"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start px-8">
            <h1 className="text-4xl max-w-2xl md:text-4xl font-bold text-white mb-4">
              Kembangkan Bisnis Ternak Anda dengan KambingFresh!
            </h1>
            <p className="text-white text-lg md:text-1xl max-w-2xl">
              Manfaatkan platform digital untuk memperluas pasar, menjual produk
              lebih cepat, dan memastikan transaksi yang aman. Raih lebih banyak
              peluang hanya dengan KambingFresh!
            </p>
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="bg-white w-full max-w-7xl p-6 rounded-lg shadow-lg mt-4">
        <h2 className="text-xl font-semibold mb-4">
          Berbagai topik edukasi pilihan untukmu
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className=" bg-[#1C464F] text-white py-2 px-4 rounded-full hover:bg-teal-800">
            Mulai Berbisnis Digital
          </button>
          <button className=" bg-[#1C464F] text-white py-2 px-4 rounded-full hover:bg-teal-800">
            Manajemen Toko
          </button>
          <button className=" bg-[#1C464F] text-white py-2 px-4 rounded-full hover:bg-teal-800">
            Pengembangan Toko
          </button>
          <button className=" bg-[#1C464F] text-white py-2 px-4 rounded-full hover:bg-teal-800">
            Keuangan/Finansial
          </button>
          <button className=" bg-[#1C464F] text-white py-2 px-4 rounded-full hover:bg-teal-800">
            Dukungan & Kebijakan KambingFresh
          </button>
          <button className=" bg-[#1C464F] text-white py-2 px-4 rounded-full hover:bg-teal-800">
            Edukasi Pengguna
          </button>
        </div>
        <div className="text-right mt-4">
          <button className="text-teal-700 hover:underline">Semua Topik</button>
        </div>
      </div>

      {/* Articles Section */}
      <div className="max-w-screen-xl  px-4 bg-white py-8 shadow-lg mt-8">
        <a href="/artikel">
          {" "}
          <h2 className="text-2xl font-bold mb-6">
            Artikel untuk kembangkan bisnis anda
          </h2>
        </a>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-[#1C464F] rounded-lg shadow-md overflow-hidden hover:shadow transition-shadow duration-200"
            >
              <img
                src={images[article.imageUrl]}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg text-white font-semibold mb-2 truncate">
                  {article.title}
                </h3>
                <p className="text-sm text-white mb-2">
                  {article.category} • {article.date}
                </p>
                <p className="text-sm text-white">Baca {article.readTime}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-right mt-4">
          <a href="#" className="text-blue-500 hover:underline font-medium">
            Lihat Semuanya
          </a>
        </div>
      </div>

      {/* Articles Section 2 */}
      <div className="max-w-screen-xl  px-4 bg-white py-8 shadow-lg mt-8">
        <h2 className="text-2xl font-bold mb-6">Edukasi Penggunaan Platform</h2>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {use.map((use, index) => (
            <div
              key={index}
              className="bg-[#1C464F] rounded-lg shadow-md overflow-hidden hover:shadow transition-shadow duration-200"
            >
              <img
                src={images[use.imageUrl]}
                alt={use.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg text-white font-semibold mb-2 truncate">
                  {use.title}
                </h3>
                <p className="text-sm text-white mb-2">
                  {use.category} • {use.date}
                </p>
                <p className="text-sm text-white">Baca {use.readTime}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-right mt-4">
          <a href="#" className="text-blue-500 hover:underline font-medium">
            Lihat Semuanya
          </a>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full mt-8 max-w-7xl">
        {/* FAQ Section */}
        <div className="w-full mt-8">
          <h2 className="text-xl font-bold mb-4">Hal Yang Sering Ditanyakan</h2>
          <div className="border rounded-lg">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b">
                <div
                  className="p-4 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span>{openIndex === index ? "-" : "+"}</span>
                </div>
                {openIndex === index && (
                  <div className="p-4 bg-gray-50 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesSection;
