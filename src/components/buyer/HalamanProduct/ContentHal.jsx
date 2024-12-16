import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../../../utils/api"; // Import api dengan interceptor yang sudah Anda buat

function Content() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const navigate = useNavigate(); // Hook navigate untuk navigasi

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan");

        const response = await api.get("api/products/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error.response?.data || error.message);
      }
    };

    fetchProducts();
  }, []);

  // Hitung total halaman
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Dapatkan produk yang ditampilkan berdasarkan halaman
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Fungsi untuk mengubah halaman
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fungsi untuk menangani klik produk dan pergi ke halaman detail
  const handleProductClick = (productId) => {
    navigate(`/detailproduk/${productId}`); // Mengarahkan ke halaman detail produk dengan ID produk
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-6xl flex-1">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 rounded-lg p-4 shadow-md cursor-pointer" // Menambahkan cursor-pointer agar terlihat klik-able
            onClick={() => handleProductClick(product.id)} // Menambahkan event handler untuk klik
          >
            <img
              src={`http://localhost:5000/${product.imageUrl}`} // Sesuaikan jika URL-nya berbeda
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-green-600 font-bold">Rp. {product.price}</p>
            <p className="text-gray-500 text-sm">{product.storeName}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="ml-1 text-gray-700">{product.rating}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Content;
