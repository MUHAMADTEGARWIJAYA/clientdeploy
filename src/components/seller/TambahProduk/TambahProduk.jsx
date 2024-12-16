import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function AddProductPage() {
  const [formData, setFormData] = useState({
    productName: "",
    productImage: null,
    price: "",
    weight: "",
    description: "",
    phoneNumber: "",
    document: null, // Tambahkan state untuk dokumen
  });
  const [popupVisible, setPopupVisible] = useState(false); // Popup state
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Membuat FormData untuk mengirim file gambar dan dokumen
    const form = new FormData();
    form.append("name", formData.productName);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("weight", formData.weight);
    form.append("imageUrl", formData.productImage);
    form.append("phoneNumber", formData.phoneNumber);
    form.append("document", formData.document);

    try {
      const response = await axios.post("http://localhost:5000/api/products/products", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Pastikan token ada di localStorage
        },
      });

      // Menampilkan popup berhasil
      setPopupVisible(true);

      // Arahkan setelah beberapa detik
      setTimeout(() => {
        setPopupVisible(false); // Menyembunyikan popup
        navigate("/produk"); // Arahkan ke halaman produk
      }, 2000); // Popup muncul selama 2 detik

      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Gagal menambahkan produk.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Tambah Produk</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form input */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">Nama Produk</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Masukkan nama produk"
              className="w-full border border-gray-300 rounded-md p-3"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Gambar Produk</label>
            <input
              type="file"
              name="productImage"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2"
              accept="image/*"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Harga</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Masukkan harga produk"
              className="w-full border border-gray-300 rounded-md p-3"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Masukkan nomor Wa"
              className="w-full border border-gray-300 rounded-md p-3"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Berat (gram)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Masukkan berat produk"
              className="w-full border border-gray-300 rounded-md p-3"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Deskripsi Produk</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Masukkan deskripsi produk"
              className="w-full border border-gray-300 rounded-md p-3"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Dokumen Kesehatan Produk</label>
            <input
              type="file"
              name="document"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2"
              accept=".pdf,.doc,.docx"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white font-semibold py-3 rounded-md hover:bg-green-700"
          >
            Tambah Produk
          </button>
        </form>
      </div>

      {/* Popup untuk konfirmasi */}
      {popupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-center text-xl font-semibold">Produk Berhasil Ditambahkan!</h3>
            <p className="text-center mt-4">Akan diarahkan ke halaman produk...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProductPage;
