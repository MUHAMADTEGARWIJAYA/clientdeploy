import { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Ambil token dari localStorage atau Cookie

  useEffect(() => {
    // Ambil data keranjang dari server
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart/getcart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
        console.log(response.data); // Periksa respons API untuk memastikan gambar ada
      } catch (err) {
        setError('Gagal mengambil data keranjang');
        console.error(err);
      }
    };

    fetchCart();
  }, [token]);

  // Update jumlah produk
  const updateCartItem = async (productId, operation) => {
    try {
      await axios.put(
        'http://localhost:5000/api/cart/update',
        { productId, operation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update ulang keranjang setelah perubahan
      const response = await axios.get('http://localhost:5000/api/cart/getcart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
    } catch (err) {
      setError('Gagal memperbarui keranjang');
      console.error(err);
    }
  };

  // Hapus produk dari keranjang
  const removeFromCart = async (productId) => {
    try {
      await axios.delete('http://localhost:5000/api/cart/remove', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId },
      });
      // Update ulang keranjang setelah penghapusan
      const response = await axios.get('http://localhost:5000/api/cart/getcart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
    } catch (err) {
      setError('Gagal menghapus produk dari keranjang');
      console.error(err);
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className="container mx-auto max-w-screen-2xl bg-gray-100 p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Keranjang</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-12  gap-4">
        <div className="col-span-8 p-6 bg-white rounded-lg shadow-md">
          {cartItems.length === 0 ? (
            <p>Keranjang Anda kosong.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-4"
                  />
                  <img
                    src={`http://localhost:5000/${item.imageUrl}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-500">{`Rp ${item.price.toLocaleString()}`}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateCartItem(item.productId, 'decrement')}
                    className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md"
                  >
                    -
                  </button>
                  <span className="mx-3">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItem(item.productId, 'increment')}
                    className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md"
                  >
                    +
                  </button>
                  <p className="ml-6">{`Rp ${item.totalPrice.toLocaleString()}`}</p>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="ml-6 text-red-500 font-semibold"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-span-4 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Ringkasan Transaksi</h3>
          <p className="flex justify-between mb-2">
            <span>Total Produk</span>
            <span>({totalItems})</span>
          </p>
          <p className="flex justify-between font-semibold text-lg mb-6">
            <span>Total Harga</span>
            <span>{`Rp ${totalPrice.toLocaleString()}`}</span>
          </p>
          <button className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold">
            Beli
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
