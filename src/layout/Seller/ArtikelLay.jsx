import Footer from '../../components/Footer';
import NavbarEdukasi from '../../components/NavbarEdukasi';

import EdukasiSec from '../../components/seller/Edukasi/EdukasiSec';


const HomeLayout = () => {
    return (
        <div className='bg-gray-100 min-h-screen flex flex-col'>
            <NavbarEdukasi /> 
            
            {/* <Outlet /> Halaman login akan dirender di sini */}
            
           
                <EdukasiSec  /> 
           
          

            <Footer />
          
        </div>
    );
};

export default HomeLayout;