import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../utils/api"; // Import api dengan interceptor

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');  // Menyimpan nomor telepon

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchStorePhoto = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan");

        const { data } = await api.get('/api/store/getstores', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fotoseller = data.data[0]; // Ambil item pertama dari array
        const backendUrl = "http://localhost:5000"; // URL backend
        setImageUrl(`${backendUrl}${fotoseller.imageUrl}`);
      } catch (error) {
        console.error("Failed to fetch store photo:", error);
        setImageUrl('/default-imageUrl.png'); // Fallback ke default image jika gagal
      }
    };

    fetchStorePhoto();
  }, []);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan");

        const response = await api.get(`api/products/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(response.data);
        setPhoneNumber(response.data.phoneNumber);
      } catch (error) {
        console.error("Gagal mengambil detail produk:", error.response?.data || error.message);
      }
    };

    fetchProductDetail();
  }, [productId]);
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan");
  
      // Periksa apakah item sudah ada di keranjang
      const existingCartItem = cartItems.find((item) => item.productId === product.id);
  
      const newQuantity = existingCartItem ? existingCartItem.quantity + quantity : quantity;
  
      // Kirim permintaan ke API addToCart
      const response = await api.post(
        "/api/cart/add",
        {
          productId: product.id,
          quantity: newQuantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log(response.data.message); // Debug pesan sukses
      setIsPopupVisible(true);
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 3000);
  
      // Update state cartItems
      if (existingCartItem) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId === product.id ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        setCartItems((prevItems) => [...prevItems, { productId: product.id, quantity: newQuantity }]);
      }
    } catch (error) {
      console.error("Gagal menambahkan ke keranjang:", error.response?.data || error.message);
    }
  };
  
  
  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) throw new Error("Token tidak ditemukan");
  
  //       const response = await api.get("/api/cart", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  
  //       setCartItems(response.data.cartItems);
  //     } catch (error) {
  //       console.error("Gagal mengambil keranjang:", error.response?.data || error.message);
  //     }
  //   };
  
  //   fetchCartItems();
  // }, []);
  

  const handleChatNow = () => {
    if (phoneNumber) {
      window.location.href = `https://wa.me/${phoneNumber}`;
    } else {
      console.error("Nomor telepon tidak ditemukan");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 p-6 min-h-fit flex justify-center items-center relative">
      {isPopupVisible && (
        <div className="fixed top-4 transform -translate-x-1/2 p-4 w-80 bg-white shadow-lg rounded-lg flex flex-col items-center transition-transform duration-500 ease-out z-50">
          <p className="text-center mb-2">
            Produk yang Anda pilih sudah ditambahkan ke halaman keranjang
          </p>
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-md w-1/2">
            Keranjang
          </button>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row w-full md:max-w-4xl">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img
            src={`http://localhost:5000/${product.imageUrl}`}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="md:w-1/2 md:pl-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
          <div className="text-yellow-500 text-sm mb-2 flex items-center">
            ★★★★★ <span className="text-black">({product.rating} Rating)</span>
          </div>
          <div className="text-2xl font-bold text-green-600 mb-4">
            Rp. {product.price}
          </div>
          
            
          <div className="flex items-center mb-4">
            <span className="font-semibold mr-2">Kuantitas:</span>
            <div className="flex items-center">
            <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 bg-transparent text-gray-700 rounded-l"
                >
                  
                </button>
                <span className="px-4 border-t border-b border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 bg-transparent text-gray-700 rounded-r"
                >
                  
                </button>
              </div>

            </div>
            <span className="ml-4 text-gray-500">Stok: {product.stock}</span>
          </div>

          <div className="flex gap-4">
            <button
              className="w-full bg-green-600 text-white py-2 rounded-md"
              onClick={handleAddToCart}
            >
              Tambah ke Keranjang
            </button>
          </div>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg">
          <img src={imageUrl || '/default-imageUrl.png'} alt="Profile" className="w-10 h-10 rounded-full mb-2" />
          <h3 className="text-black font-semibold">Toko: {product.storeName}</h3>
              <div className="flex gap-2 mt-2">
                              <button
                className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                onClick={handleChatNow}
              >
                Chat Sekarang
              </button>

                <button className="bg-white border border-green-500 text-green-500 px-3 py-1 rounded-lg text-sm">
                  Kunjungi Toko
                </button>
              </div>
              </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
