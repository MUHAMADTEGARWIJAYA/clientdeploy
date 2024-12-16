import { useState, useEffect } from "react";
import api from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

function EditProductPage() {
  const { id } = useParams(); // Tangkap ID dari URL
  const [formData, setFormData] = useState({
    productName: "",
    productImage: null,
    price: "",
    weight: "",
    description: "",
    phoneNumber: "", // Tambahkan phoneNumber
  });
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Untuk preview gambar
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan");

        const response = await api.get(`/api/products/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Data produk dari API:", response.data); // Pastikan data produk ada di sini

        const product = response.data;  // Anggap respons langsung berisi data produk
        if (!product) {
          throw new Error("Produk tidak ditemukan");
        }

        setFormData({
          productName: product.name || '',
          productImage: product.imageUrl || null,
          price: product.price || 0,
          weight: product.weight || 0,
          description: product.description || '',
          phoneNumber: product.phoneNumber || '', // Ambil phoneNumber jika ada
        });

        // Set preview gambar saat ini jika ada
        if (product.imageUrl) {
          setImagePreview(product.imageUrl);
        }

      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || err.message || "Gagal memuat data produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, productImage: file }));

    // Set preview gambar baru jika ada
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.productName);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("weight", formData.weight);
    form.append("phoneNumber", formData.phoneNumber); // Tambahkan phoneNumber
    if (formData.productImage) {
      form.append("imageUrl", formData.productImage);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan");

      await api.put(`/api/products/update/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
        navigate("/produk");
      }, 2000);
    } catch (err) {
      console.error("Error updating product:", err);
      alert(err.response?.data?.message || "Gagal mengupdate produk.");
    }
  };

  // Fungsi untuk menampilkan Loading Spinner
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader border-t-4 border-green-400 rounded-full w-16 h-16"></div>
    </div>
  );

  // Fungsi untuk menampilkan Popup
  const Popup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-center text-xl font-semibold">Produk Berhasil Diperbarui</h3>
        <p className="text-center mt-4">Akan diarahkan ke halaman produk...</p>
      </div>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Edit Produk</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border-2 border-gray-400"
                />
              </div>
            )}
            <input
              type="file"
              name="productImage"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-md p-2"
              accept="image/*"
            />
            <button
              type="button"
              onClick={() => setImagePreview(null)}
              className="mt-2 text-blue-600"
            >
              Ubah Foto
            </button>
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
            <label className="block text-gray-600 font-medium mb-2">Nomor Telepon</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Masukkan nomor telepon"
              className="w-full border border-gray-300 rounded-md p-3"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white font-semibold py-3 rounded-md hover:bg-green-700"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
      {popupVisible && <Popup />}
    </div>
  );
}

export default EditProductPage;
