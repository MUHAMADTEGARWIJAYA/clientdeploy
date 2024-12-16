import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import api from '../utils/api';
import {
  IoHomeOutline,
  // IoChatbubbleOutline,
  IoStatsChartOutline,
  IoBookOutline,
  IoHelpCircleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoReceiptOutline,
  IoCubeOutline
} from 'react-icons/io5';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col items-center p-6">
      <div className="text-2xl font-bold mb-6">KambingFresh</div>
      <div className="flex flex-col items-center mb-8">
        <img src={imageUrl || '/default-imageUrl.png'} alt="Profile" className="w-20 h-20 rounded-full mb-2" />
        <h2 className="text-lg font-semibold">Hijau Mandala</h2>
      </div>
      <nav className="flex flex-col gap-4">
        <SidebarItem icon={<IoHomeOutline />} label="Home" path="/home" isActive={location.pathname === "/home"} onClick={() => handleItemClick("/home")} />
        <SidebarItem icon={<IoReceiptOutline />} label="Pesanan" path="/semua" isActive={location.pathname === "/semua"} onClick={() => handleItemClick("/semua")} />
        <SidebarItem icon={<IoStatsChartOutline />} label="Statistik" isActive={location.pathname === "/statistik"} onClick={() => handleItemClick("/statistik")} />
        {/* <SidebarItem icon={<IoChatbubbleOutline />} label="Chat" path="/chat" isActive={location.pathname === "/chat"} onClick={() => handleItemClick("/chat")} /> */}
        <SidebarItem icon={<IoCubeOutline />} label="Produk" path="/produk" isActive={location.pathname === "/produk"} onClick={() => handleItemClick("/produk")} />
        <hr className="w-full border-gray-300 my-2" />
        <SidebarItem icon={<IoBookOutline />} label="Edukasi" path="/edukasi" isActive={location.pathname === "/edukasi"} onClick={() => handleItemClick("/edukasi")} />
        <SidebarItem icon={<IoHelpCircleOutline />} label="Bantuan" path="/bantuan" isActive={location.pathname === "/bantuan"} onClick={() => handleItemClick("/bantuan")} />
        <SidebarItem icon={<IoSettingsOutline />} label="Pengaturan" path="/pengaturan" isActive={location.pathname === "/pengaturan"} onClick={() => handleItemClick("/pengaturan")} />
        <hr className="w-full border-gray-300 my-2" />
        <SidebarItem icon={<IoLogOutOutline />} label="Keluar" path="/utama" isActive={location.pathname === "/utama"} onClick={() => handleItemClick("/utama")} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, label, isActive, onClick }) => (
  <div
    className={`flex items-center gap-4 cursor-pointer text-lg 
      ${isActive ? "text-green-600 font-semibold" : "text-gray-700 hover:text-green-600"}`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </div>
);

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Sidebar;
