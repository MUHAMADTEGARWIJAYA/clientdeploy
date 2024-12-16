import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook untuk navigasi

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan");
        const response = await api.get("/api/products/getseller", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Belum ada produk");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await api.delete(`/api/products/delete/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.filter(product => product.id !== productId)); // Menghapus produk dari state setelah berhasil dihapus
        alert("Produk berhasil dihapus");
      } catch (err) {
        console.error("Error deleting product:", err);
        setError("Failed to delete product");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen max-w-screen-lg py-4 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
      

        {/* Product Cards */}
                    {products.length === 0 ? (
              <div className="text-center text-gray-600 py-10">
                <p className="text-lg">Belum ada produk yang ditambahkan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border rounded-lg shadow-md p-4"
                  >
                    <img
                      src={
                        product.imageUrl
                          ? `http://localhost:5000/${product.imageUrl}`
                          : "/path/to/default-image.jpg"
                      }
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        e.target.src = "/path/to/default-image.jpg";
                      }}
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-green-600 font-bold">{product.price}</p>
                    <p className="text-gray-500 text-sm">Toko: {product.storeName}</p>
                    <div className="flex justify-between items-center mt-4">
                      {/* Tombol Edit */}
                      <button
                        onClick={() => navigate(`/editproduk/${product.id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      {/* Tombol Hapus */}
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                        onClick={() => handleDelete(product.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

      </div>
    </div>
  );
};

export default ProductPage;
