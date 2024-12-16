import { useState, useEffect } from "react";
import api from "../../../utils/api"; // pastikan api sudah dikonfigurasi
import { useNavigate } from "react-router-dom";
const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Untuk handling loading state
    const [error, setError] = useState(null); // Untuk menangani error
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Token tidak ditemukan");

                const response = await api.get("api/products/random", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    setProducts(response.data.data);
                } else {
                    throw new Error("Data produk tidak ditemukan");
                }

                setLoading(false); // Selesai mengambil data
            } catch (error) {
                setError(error.message || "Terjadi kesalahan saat mengambil data");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>; // Tampilkan loading jika data masih diambil
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>; // Tampilkan pesan error jika ada masalah
    }

    const handleProductClick = (productId) => {
        navigate(`/detailproduk/${productId}`); // Mengarahkan ke halaman detail produk dengan ID produk
      };
    return (
        <div className="flex justify-center  py-10">
            {/* Wrapper untuk memusatkan komponen */}
            <section className=" max-w-7xl w-full">
                <h2 className="bg-[#1C464F] text-white text-center py-2 rounded-ss-3xl rounded-se-3xl text-lg font-bold">
                    Best Seller
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-gray-100 rounded-b-3xl shadow-md p-4 pb-10 flex flex-col items-center cursor-pointer"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <img
                                    src={
                                        product.imageUrl
                                            ? `http://localhost:5000/${product.imageUrl}`
                                            : '/path/to/default-image.jpg'
                                    }
                                    alt={product.name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                    onError={(e) => {
                                        e.target.src = '/path/to/default-image.jpg';
                                    }} // Gunakan fallback jika gambar tidak ditemukan
                                />
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-green-600 font-bold">Rp. {product.price}</p>
                                <p className="text-gray-500 text-sm">{product.storeName}</p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-4 text-center text-gray-500">Tidak ada produk tersedia</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProductSection;
