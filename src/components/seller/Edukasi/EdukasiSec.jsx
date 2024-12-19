import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const PricingStrategyArticle = () => {
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

  return (
    <div className="max-w-3xl bg-white mx-auto p-16 shadow-2xl">
      {/* Header */}
      <a href="/edukasi">
        <div className="flex items-center mb-4">
          <IoArrowBackOutline className="text-2xl cursor-pointer mr-2" />
          <h1 className="text-lg font-semibold">Kembali</h1>
        </div>
      </a>

      {/* Title Section */}
      <h2 className="text-3xl font-bold mb-2">
        Panduan Menentukan Harga Jual yang Kompetitif untuk Produk-Produk
        Kambing
      </h2>
      <p className="text-gray-600 mb-4">
        Simak strategi cerdas untuk penentuan harga yang Menguntungkan yuk,
        seller!
      </p>

      {/* Metadata */}
      <p className="text-gray-500 mb-6">
        Pengaturan Harga. 3 November 2024. Baca 7 Menit
      </p>

      {/* Image Section */}
      <div className="mb-6">
        <img
          src={images["artikel1.jpg"]} // Ganti dengan path gambar Anda
          alt="Pricing Strategy"
          className="w-full rounded-md"
        />
      </div>

      {/* Content Section */}
      <div className="text-gray-800 leading-relaxed">
        <p className="mb-4">
          Menentukan harga jual yang kompetitif merupakan langkah penting untuk
          menjamin kelangsungan bisnis peternakan kambing. Dengan pendekatan
          yang tepat, peternak dapat mengoptimalkan keuntungan, memperluas
          jangkauan pasar, dan meningkatkan loyalitas pelanggan. Berikut ini
          adalah panduan praktis untuk menentukan harga jual yang efektif:
        </p>

        <h3 className="font-bold mb-2">1. Analisis Biaya Produksi</h3>
        <p className="mb-4">
          Hitung seluruh biaya yang terlibat dalam produksi, termasuk pakan,
          perawatan kesehatan, tenaga kerja, dan pengelolaan kandang. Pastikan
          semua biaya variabel, seperti obat-obatan dan pakan khusus, serta
          biaya tetap seperti pemeliharaan kandang, dicatat dengan detail untuk
          menentukan harga dasar. Memahami biaya produksi akan membantu Anda
          menghindari penetapan harga yang merugikan.
        </p>

        <h3 className="font-bold mb-2">2. Studi Kompetitor dan Riset Pasar</h3>
        <p className="mb-4">
          Lakukan riset pasar secara mendalam dengan mempelajari harga jual
          kambing dari peternak lain di pasar lokal maupun online. Bandingkan
          kualitas, ukuran, dan jenis kambing untuk lebih memahami posisi Anda
          di pasar.
        </p>

        <h3 className="font-bold mb-2">3. Penentuan Margin Keuntungan</h3>
        <p className="mb-4">
          Tentukan margin keuntungan yang realistis dan sesuai dengan industri.
          Margin keuntungan umumnya berkisar antara 10-30% dari total biaya
          produksi. Selalu pertimbangkan aspek persaingan harga serta daya beli
          konsumen. Terlalu tinggi bisa membuat produk tidak laku, sementara
          terlalu rendah bisa merugikan usaha Anda.
        </p>

        <h3 className="font-bold mb-2">
          4. Pertimbangkan Kualitas dan Nilai Tambah Produk
        </h3>
        <p className="mb-4">
          Jika produk kambing Anda memiliki keunggulan tertentu, seperti
          kualitas pakan organik, kesehatan yang terjaga, atau keberagaman jenis
          kambing, faktor ini sebaiknya diperhitungkan dalam penetapan harga.
          Pelanggan seringkali lebih bersedia membayar lebih untuk produk yang
          memiliki kualitas tinggi atau memiliki sertifikasi tertentu.
        </p>

        <h3 className="font-bold mb-2">
          5. Fleksibilitas dalam Strategi Harga
        </h3>
        <p className="mb-4">
          Gunakan strategi harga yang fleksibel, seperti penawaran diskon untuk
          pembelian dalam jumlah besar, paket bundling, atau program loyalitas
          untuk menarik lebih banyak pembeli. Penyesuaian harga berdasarkan
          musim atau permintaan juga dapat membantu menjaga daya saing, misalnya
          memberikan diskon saat musim panen atau saat permintaan meningkat.
        </p>

        <h3 className="font-bold mb-2">
          6. Evaluasi Berkala dan Penyesuaian Harga
        </h3>
        <p className="mb-4">
          Harga bahan baku seperti pakan, biaya transportasi, dan fluktuasi
          pasar harus dievaluasi secara berkala. Dengan memantau biaya dan
          perkembangan pasar, Anda dapat melakukan penyesuaian harga yang
          diperlukan untuk tetap mempertahankan margin keuntungan tanpa
          kehilangan pelanggan. Menggunakan software akuntansi atau tools
          analisis bisnis dapat mempermudah proses ini.
        </p>

        <p className="mb-4">
          Mengatur harga jual yang kompetitif membutuhkan pemahaman menyeluruh
          tentang biaya, nilai tambah produk, serta kondisi pasar. Dengan
          pendekatan yang terstruktur, peternak dapat menjaga profitabilitas dan
          daya saing dalam industri peternakan kambing. Harga yang tepat tidak
          hanya memastikan kelangsungan usaha, tetapi juga memperkuat reputasi
          di pasar.
        </p>

        {/* Quote Section */}
        <div className="mt-6 p-4 bg-gray-100 rounded-md border-l-4 border-green-500">
          <p className="text-gray-700 italic">
            Temukan tips lainnya dan cara terbaik dalam mengelola bisnis
            peternakan Anda hanya di KambingFresh.Tingkatkan pengetahuan Anda,
            tingkatkan keuntungan!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingStrategyArticle;
