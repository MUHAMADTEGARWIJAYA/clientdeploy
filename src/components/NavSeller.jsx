import { useEffect, useState } from "react";
import api from "../utils/api";
const Navbar = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchStorePhoto = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan");

        const { data } = await api.get("/api/store/getstores", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fotoseller = data.data[0]; // Ambil item pertama dari array
        const backendUrl = "http://localhost:5000"; // URL backend
        setImageUrl(`${backendUrl}${fotoseller.imageUrl}`);
      } catch (error) {
        console.error("Failed to fetch store photo:", error);
        setImageUrl(
          "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg"
        ); // Fallback ke default image jika gagal
      }
    };

    fetchStorePhoto();
  }, []);

  return (
    <nav className="bg-[#1C464F] px-6 py-4 flex items-center justify-between">
      {/* Logo and Title */}
      <div className="text-white font-bold text-lg flex items-center">
        KambingFresh <span className="text-sm text-gray-300 ml-1">Seller</span>
      </div>

      {/* Search Bar */}
      <div className="flex-grow mx-8 relative">
        <input
          type="text"
          placeholder="Pencarian"
          className="w-full px-4 py-2 rounded-md focus:outline-none"
        />
        <span className="absolute right-3 top-2.5 text-gray-500">
          🔍 {/* Ikon Pencarian */}
        </span>
      </div>

      {/* User Profile and Notification */}
      <div className="flex items-center space-x-4">
        <button className="text-white">🔔</button>
        <div className="flex items-center text-white">
          <img
            src={imageUrl || "/default-imageUrl.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full mb-2"
          />
          <span>Giana</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
