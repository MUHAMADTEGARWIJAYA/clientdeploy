import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout"; // Layout untuk halaman login
import BuyerLayout from "./layout/BuyerLayout";
import Login from "./pages/buyer/LoginPage"; // Halaman login
import SingupPage from "./pages/buyer/SignupPage";
// import Header from './components/buyer/Home/Header'
import HalLayout from './layout/HalLayout'
import Universal from './layout/Universal';
import Keranjang from './pages/buyer/Keranjang'
import PendaftaranToko from './pages/seller/PendaftaranToko'
import Verifikasi from './pages/seller/Verifikasi'
import HomeLayout from './layout/Seller/HomeLayout'
import PesananLayout from './layout/Seller/PesananLayout'
import Semua from './components/seller/Pesanan/Semua'
import NotBayar from './components/seller/Pesanan/NotBayar'
import Dibatalkan from './components/seller/Pesanan/Dibatalkan'
import PerluDikirim from './components/seller/Pesanan/PerluDikirim'
import Dikirim from './components/seller/Pesanan/Dikirim'
import Selesai from './components/seller/Pesanan/Selesai'
import DetailPesanan from './components/seller/Pesanan/DetailPesanan'
import ArtikelLay from './layout/Seller/ArtikelLay'
import ProdukLayout from './layout/Seller/ProdukLayout';
import ChatLayout from './layout/Seller/ChatLayout'
import PengaturanLayout from './layout/Seller/PengaturanLayout'
import InformasiToko from './components/seller/Pengaturan/InformasiToko'
import Rekening from './components/seller/Pengaturan/Rekening'
import BantuanLayout from './layout/Seller/BantuanLayout';
import TambahProdukLayout from './layout/Seller/TambahProdukLayout'
import EdukasiLayout from './layout/Seller/EdukasiLayout';
import BelumBayar from "./pages/buyer/BelumBayar";
import BerhasilBayar from "./pages/buyer/BerhasilBayar";
import DetailPembayaran from "./pages/buyer/DetailPembayaran";
import ProfileBuyyer from './layout/ProfileBuyyer/ProfileBuyyerLay'
import DetailProdukLay from './layout/DetailProdukLay'
import Succes from './pages/seller/Succes'
import Pemesanan from './layout/PemesananLay'
import AlamatBuyyerLay from './layout/ProfileBuyyer/AlamatBuyyerLay'
import PesananBuyyerLay from './layout/ProfileBuyyer/PesananBuyyerLay'
import PesananBuyyer from './components/buyer/ProfileBuyyer/PesananBuyyer'
import Editproduk from "./layout/Seller/EditProduk"
import StatistikLay from './layout/Seller/StatistikLay'

function App() {
    return (
   
            <Routes>
                {/* Rute untuk halaman login dengan AuthLayout */}
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/singup" element={<SingupPage />} />
                </Route>
                {/* Rute BuyerLayout */}
                <Route element={<BuyerLayout />}>
                    <Route path="/utama" element={<div   />}/>
                </Route>
                {/* Route HalLayout */}
                <Route element={<HalLayout />}>
                    <Route path="/halamanproduk" element={<div />}/>
                </Route>


                <Route element={<ArtikelLay />}>
                    <Route path="/artikel" element={<div   />}/>
                </Route>

                {/* SidebarBuyyerProfile */}
                <Route element={<ProfileBuyyer />}>
                    <Route path="/profilebuyyer" element={<div />}/>
                </Route>

                {/* AlamatBuyyer */}
                <Route element={<AlamatBuyyerLay />}>
                    <Route path="/alamatprofile" element={<div />}/>
                </Route>

                {/* Pesanan Buyyer */}
                <Route element={<PesananBuyyerLay />}>
                    <Route path="/pesananbuyyer" element={<PesananBuyyer />}/>
                </Route>

                <Route element={<StatistikLay />}>
                    <Route path="/statistik" element={<div />}/>
                </Route>




                {/* Ini pemesanan */}
                <Route element={<Pemesanan />}>
                    <Route path="/pemesanan" element={<div />}/>
                </Route>
                
                {/* Universal Layout */}
                <Route element={<Universal />}>
                    <Route path="/keranjang" element={<Keranjang />}/>
                    <Route path="/pendaftarantoko" element={<PendaftaranToko />}/>
                    <Route path="/verifikasi" element={<Verifikasi />}/>
                    <Route path="/detailpesanan" element={<DetailPesanan />}/>
                    <Route path="/detailpembayaran" element={<DetailPembayaran />} />
                    <Route path="/belumbayar" element={<BelumBayar />} />
                    <Route path="/berhasilbayar" element={<BerhasilBayar />} />
                    <Route path="/sukses" element={<Succes />} />    
                </Route>
           
                {/* Home sidebarSeller*/}
                <Route element={<HomeLayout />}>
                  <Route path="/home" element={<div />}/>
                </Route>

                <Route element={<DetailProdukLay />}>
                  <Route path="/detailproduk/:productId" element={<div />}/>
                </Route>


               {/* Produk Sidebar Seller */}
               <Route element={<PesananLayout />}>
                 <Route path="/semua" element={<Semua />}/>
                 <Route path="/notbayar" element={<NotBayar />}/>
                 <Route path="/dibatalkan" element={<Dibatalkan />}/>
                 <Route path="/perludikirim" element={<PerluDikirim />}/>
                 <Route path="/dikirim" element={<Dikirim />}/>
                 <Route path="/selesai" element={<Selesai/>}/>
                </Route>

                {/* Produk Seller */}
                <Route element={<ProdukLayout />}>
                  <Route path="/produk" element={<div />}/>
                </Route>

                {/* ChatLayoutseller */}
                <Route element={<ChatLayout />}>
                  <Route path="/chat" element={<div />}/>
                </Route>
                
                {/*Rekening Layou*/}
                <Route element={<PengaturanLayout />}>
                  <Route path="/pengaturan" element={<InformasiToko />}/>
                  <Route path="/rekening" element={<Rekening />}/>
                </Route>

                <Route element={<BantuanLayout />}>
                  <Route path="/bantuan" element={<div />}/>
                 
                </Route>

                <Route element={<TambahProdukLayout />}>
                  <Route path="/tambahproduk" element={<div />}/>
                </Route>

                <Route element={<Editproduk />}>
                  <Route path="/editproduk/:id" element={<div />}/>
                </Route>

                <Route element={<EdukasiLayout />}>
                  <Route path="/edukasi" element={<div />}/>
                </Route>
            </Routes>
           
    );
  }



export default App;


// import { Route, Routes } from "react-router-dom";
// import React, { Suspense } from 'react';

// // Layouts
// const AuthLayout = React.lazy(() => import("./layout/AuthLayout"));
// const BuyerLayout = React.lazy(() => import("./layout/BuyerLayout"));
// const HalLayout = React.lazy(() => import('./layout/HalLayout'));
// const Universal = React.lazy(() => import('./layout/Universal'));
// const HomeLayout = React.lazy(() => import('./layout/Seller/HomeLayout'));
// const PesananLayout = React.lazy(() => import('./layout/Seller/PesananLayout'));
// const ProdukLayout = React.lazy(() => import('./layout/Seller/ProdukLayout'));
// const ChatLayout = React.lazy(() => import('./layout/Seller/ChatLayout'));
// const PengaturanLayout = React.lazy(() => import('./layout/Seller/PengaturanLayout'));
// const BantuanLayout = React.lazy(() => import('./layout/Seller/BantuanLayout'));
// const TambahProdukLayout = React.lazy(() => import('./layout/Seller/TambahProdukLayout'));
// const EdukasiLayout = React.lazy(() => import('./layout/Seller/EdukasiLayout'));

// // Pages
// const Login = React.lazy(() => import("./pages/buyer/LoginPage"));
// const SingupPage = React.lazy(() => import("./pages/buyer/SignupPage"));
// const Keranjang = React.lazy(() => import('./pages/buyer/Keranjang'));
// const PendaftaranToko = React.lazy(() => import('./pages/seller/PendaftaranToko'));
// const Verifikasi = React.lazy(() => import('./pages/seller/Verifikasi'));
// const Semua = React.lazy(() => import('./components/seller/Pesanan/Semua'));
// const NotBayar = React.lazy(() => import('./components/seller/Pesanan/NotBayar'));
// const Dibatalkan = React.lazy(() => import('./components/seller/Pesanan/Dibatalkan'));
// const PerluDikirim = React.lazy(() => import('./components/seller/Pesanan/PerluDikirim'));
// const Dikirim = React.lazy(() => import('./components/seller/Pesanan/Dikirim'));
// const Selesai = React.lazy(() => import('./components/seller/Pesanan/Selesai'));
// const DetailPesanan = React.lazy(() => import('./components/seller/Pesanan/DetailPesanan'));
// const Produk = React.lazy(() => import('./components/seller/Produk/Produk'));
// const BelumBayar = React.lazy(() => import("./pages/buyer/BelumBayar"));
// const BerhasilBayar = React.lazy(() => import("./pages/buyer/BerhasilBayar"));
// const DetailPembayaran = React.lazy(() => import("./pages/buyer/DetailPembayaran"));
// const ProfileBuyyer = React.lazy(() => import('./layout/ProfileBuyyer/ProfileBuyyerLay'));
// const DetailProdukLay = React.lazy(() => import('./layout/DetailProdukLay'));
// const Succes = React.lazy(() => import('./pages/seller/Succes'));
// const Pemesanan = React.lazy(() => import('./layout/PemesananLay'));
// const AlamatBuyyerLay = React.lazy(() => import('./layout/ProfileBuyyer/AlamatBuyyerLay'));
// const PesananBuyyerLay = React.lazy(() => import('./layout/ProfileBuyyer/PesananBuyyerLay'));
// const PesananBuyyer = React.lazy(() => import('./components/buyer/ProfileBuyyer/PesananBuyyer'));
// const Rekening = React.lazy(() => import('./components/seller/Pengaturan/Rekening'));
// const InformasiToko = React.lazy(() => import('./components/seller/Pengaturan/InformasiToko'));

// function App() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Routes>
//         {/* Rute untuk halaman login dengan AuthLayout */}
//         <Route element={<AuthLayout />}>
//           <Route path="/" element={<Login />} />
//           <Route path="/singup" element={<SingupPage />} />
//         </Route>
        
//         {/* Rute BuyerLayout */}
//         <Route element={<BuyerLayout />}>
//           <Route path="/utama" element={<div />} />
//         </Route>
        
//         {/* Route HalLayout */}
//         <Route element={<HalLayout />}>
//           <Route path="/halamanproduk" element={<div />} />
//         </Route>

//         {/* SidebarBuyyerProfile */}
//         <Route element={<ProfileBuyyer />}>
//           <Route path="/profilebuyyer" element={<div />} />
//         </Route>

//         {/* AlamatBuyyer */}
//         <Route element={<AlamatBuyyerLay />}>
//           <Route path="/alamatprofile" element={<div />} />
//         </Route>

//         {/* Pesanan Buyyer */}
//         <Route element={<PesananBuyyerLay />}>
//           <Route path="/pesananbuyyer" element={<PesananBuyyer />} />
//         </Route>

//         {/* Ini pemesanan */}
//         <Route element={<Pemesanan />}>
//           <Route path="/pemesanan" element={<div />} />
//         </Route>

//         {/* Universal Layout */}
//         <Route element={<Universal />}>
//           <Route path="/keranjang" element={<Keranjang />} />
//           <Route path="/pendaftarantoko" element={<PendaftaranToko />} />
//           <Route path="/verifikasi" element={<Verifikasi />} />
//           <Route path="/detailpesanan" element={<DetailPesanan />} />
//           <Route path="/detailpembayaran" element={<DetailPembayaran />} />
//           <Route path="/belumbayar" element={<BelumBayar />} />
//           <Route path="/berhasilbayar" element={<BerhasilBayar />} />
//           <Route path="/sukses" element={<Succes />} />
//         </Route>

//         {/* Home sidebarSeller */}
//         <Route element={<HomeLayout />}>
//           <Route path="/home" element={<div />} />
//         </Route>

//         <Route element={<DetailProdukLay />}>
//           <Route path="/detailproduk" element={<div />} />
//         </Route>

//         {/* Produk Sidebar Seller */}
//         <Route element={<PesananLayout />}>
//           <Route path="/semua" element={<Semua />} />
//           <Route path="/notbayar" element={<NotBayar />} />
//           <Route path="/dibatalkan" element={<Dibatalkan />} />
//           <Route path="/perludikirim" element={<PerluDikirim />} />
//           <Route path="/dikirim" element={<Dikirim />} />
//           <Route path="/selesai" element={<Selesai />} />
//         </Route>

//         {/* Produk Seller */}
//         <Route element={<ProdukLayout />}>
//           <Route path="/produk" element={<Produk />} />
//         </Route>

//         {/* ChatLayoutseller */}
//         <Route element={<ChatLayout />}>
//           <Route path="/chat" element={<div />} />
//         </Route>
        
//         {/* Rekening Layout */}
//         <Route element={<PengaturanLayout />}>
//           <Route path="/pengaturan" element={<InformasiToko />} />
//           <Route path="/rekening" element={<Rekening />} />
//         </Route>

//         <Route element={<BantuanLayout />}>
//           <Route path="/bantuan" element={<div />} />
//         </Route>

//         <Route element={<TambahProdukLayout />}>
//           <Route path="/tambahproduk" element={<div />} />
//         </Route>

//         <Route element={<EdukasiLayout />}>
//           <Route path="/edukasi" element={<div />} />
//         </Route>
//       </Routes>
//     </Suspense>
//   );
// }

// export default App;
