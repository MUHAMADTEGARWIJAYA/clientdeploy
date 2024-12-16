import { useState, useEffect } from "react";

import api from "../../../utils/api";

function UserProfile() {
  // State untuk menyimpan data pengguna
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });
  const [profileImage, setProfileImage] = useState("");
  const [isDashboardExist, setIsDashboardExist] = useState(false); // Cek apakah dashboard sudah ada

  // Ambil token dari localStorage (atau tempat lain yang kamu simpan)
  const token = localStorage.getItem("token");

  // Fetch user dashboard data
  const fetchUserDashboard = async () => {
    try {
      const response = await api.get("/api/dashboard/dapat", {
        headers: {
          Authorization: `Bearer ${token}`, // Menyertakan token untuk autentikasi
        },
      });
      const dashboardData = response.data.data;
      setName(dashboardData.full_name);
      setEmail(dashboardData.email);
      setPhone(dashboardData.phone_number);
      setGender(dashboardData.gender);
      setBirthDate({
        day: dashboardData.birth_date.split("-")[2], // Asumsikan format yyyy-mm-dd
        month: dashboardData.birth_date.split("-")[1],
        year: dashboardData.birth_date.split("-")[0],
      });
      setProfileImage(dashboardData.avatar);
      setIsDashboardExist(true); // Dashboard ditemukan
    } catch (error) {
      console.error(error);
      setIsDashboardExist(false); // Dashboard tidak ditemukan
    }
  };

  // Create new user dashboard if not exist
  const createUserDashboard = async () => {
    try {
      const formData = new FormData();
      formData.append("full_name", name);
      formData.append("email", email);
      formData.append("phone_number", phone);
      formData.append("gender", gender);
      formData.append("birth_date", `${birthDate.year}-${birthDate.month}-${birthDate.day}`);
      formData.append("address", "Address placeholder"); // Gantilah sesuai dengan input

      if (profileImage) {
        formData.append("avatar", profileImage);
      }

      const response = await api.post("/api/dashboard/tambah", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);
      fetchUserDashboard(); // Setelah membuat dashboard baru, ambil data dashboard yang baru
    } catch (error) {
      console.error("Error creating dashboard:", error);
      alert("Gagal membuat dashboard");
    }
  };

  // Handle Save
  const handleSave = () => {
    if (isDashboardExist) {
      // Jika dashboard sudah ada, update data
      updateUserDashboard();
    } else {
      // Jika dashboard belum ada, buat dashboard baru
      createUserDashboard();
    }
  };

  // Update user dashboard
  const updateUserDashboard = async () => {
    try {
      const formData = new FormData();
      formData.append("full_name", name);
      formData.append("email", email);
      formData.append("phone_number", phone);
      formData.append("gender", gender);
      formData.append("birth_date", `${birthDate.year}-${birthDate.month}-${birthDate.day}`);
      formData.append("address", "Address placeholder");

      if (profileImage) {
        formData.append("avatar", profileImage);
      }

      const response = await api.put("/api/dashboard/edit", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Error updating dashboard:", error);
      alert("Gagal memperbarui dashboard");
    }
  };

  useEffect(() => {
    fetchUserDashboard(); // Ambil dashboard pengguna saat pertama kali render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  return (
    <div className="flex flex-col w-full max-w-5xl bg-white shadow-lg rounded-lg m-4">
      <div className="bg-[#1C464F] text-white text-center p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">Profil Pengguna</h2>
      </div>
      <div className="flex p-8 space-x-8">
        <div className="h-56 w-80 flex flex-col items-center  bg-white space-y-4">
      
        <img
            src={profileImage && profileImage instanceof File
              ? URL.createObjectURL(profileImage)  // Menampilkan foto yang dipilih dari komputer
              : profileImage ? `http://localhost:5000/${profileImage}` : "default_image_url"} // Menampilkan gambar dari server jika ada
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover"
          />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
          className="hidden"
          id="upload-photo"
        />
        <p className=" text-center font-sans ">Format file yang di izinkan adalah : (Jpg, Jpeg, PNG)</p>
          <label htmlFor="upload-photo" className="bg-green-500 w-60 text-center  text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
            Pilih Foto
          </label>
        </div>
       
        <div className="flex flex-col space-y-6 w-full">
          <div className="flex items-center space-x-7 pr-20">
            <label className="w-52 text-gray-700">Nama Lengkap</label>
            <input type="text" className="border border-gray-300 rounded-md p-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="flex items-center space-x-7 pr-20">
            <label className="w-52 text-gray-700">Email</label>
            <input type="email" className="border border-gray-300 rounded-md p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="flex items-center space-x-7 pr-20">
            <label className="w-52 text-gray-700">Nomer Telepon</label>
            <input type="tel" className="border border-gray-300 rounded-md p-2 w-full" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="flex items-center space-x-7 pr-20">
            <label className="w-36 text-gray-700">Jenis Kelamin</label>
            <div className="flex items-center space-x-7 pr-20">
              <label>
                <input type="radio" name="gender" checked={gender === "Laki-laki"} onChange={() => setGender("Laki-laki")} />
                Laki-laki
              </label>
              <label>
                <input type="radio" name="gender" checked={gender === "Perempuan"} onChange={() => setGender("Perempuan")} />
                Perempuan
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-7">
            <label className="w-36 text-gray-700">Tanggal Lahir</label>
            <input type="date" checked={`${birthDate.year}-${birthDate.month}-${birthDate.day}`} onChange={(e) => {
              const [year, month, day] = e.target.value.split("-");
              setBirthDate({ day, month, year });
            }} />
          </div>

          <div className="flex justify-end">
            <button onClick={handleSave} className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
