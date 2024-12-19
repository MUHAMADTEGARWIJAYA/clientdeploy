import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatistikDashboard = () => {
  const data = {
    labels: ["00:00", "06:00", "12:00", "18:00"],
    datasets: [
      {
        label: "Produk Toko",
        data: [0, 0, 0, 4],
        backgroundColor: "#0E7490",
      },
      {
        label: "Pesanan",
        data: [0, 0, 0, 0],
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Grafik setiap Kriteria",
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-bold">Statistik</h1>
          <button className="bg-teal-700 text-white px-4 py-2 rounded-md shadow">
            Download Data
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-teal-50 border-l-4 border-teal-700 p-4 rounded-md">
            <h2 className="text-teal-700 font-semibold">Penjualan</h2>
            <p className="text-xl font-bold">Rp.-</p>
            <p className="text-gray-500 text-sm">Kemarin pada 00:00-23.00</p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded-md">
            <h2 className="text-blue-700 font-semibold">Produk</h2>
            <p className="text-xl font-bold">4</p>
            <p className="text-gray-500 text-sm">Kemarin pada 00:00-23.00</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default StatistikDashboard;
