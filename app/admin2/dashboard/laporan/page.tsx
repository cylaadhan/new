"use client";
import Sidebar2 from "../../../../components/Sidebar2";
import { Bar } from "react-chartjs-2";
import { FaSyncAlt, FaFileExcel, FaTicketAlt, FaDollarSign, FaChartLine, FaFileAlt } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ["Early Bird SOERATS 2025", "Presale 1 SOERATS 2025"];

const dataTiket = {
  labels,
  datasets: [
    {
      label: "Estimasi Tiket Terjual",
      data: [24, 0],
      backgroundColor: "rgba(255, 99, 132, 0.3)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
      borderRadius: 8,
      barPercentage: 0.6,
    },
  ],
};
const dataPendapatan = {
  labels,
  datasets: [
    {
      label: "Estimasi Pendapatan",
      data: [1286000, 0],
      backgroundColor: "rgba(255, 99, 132, 0.3)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
      borderRadius: 8,
      barPercentage: 0.6,
    },
  ],
};
const dataTukar = {
  labels,
  datasets: [
    {
      label: "Jumlah Tiket Ditukarkan",
      data: [0, 0],
      backgroundColor: "rgba(255, 99, 132, 0.3)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
      borderRadius: 8,
      barPercentage: 0.6,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: true, position: "top" as const },
    title: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: "#666", font: { size: 12 } },
      grid: { color: "#eee" },
    },
    x: {
      ticks: { color: "#666", font: { size: 12 } },
      grid: { color: "#eee" },
    },
  },
};

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar2 adminName="Panitia" />
      <main className="flex-1 p-8 bg-gray-50">
        {/* Header dan Filter */}
        <div className="flex flex-wrap justify-between items-center mb-2 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Laporan</h1>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded transition">
              <FaSyncAlt /> Refresh
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold px-4 py-2 rounded transition">
              <FaFileExcel /> Export Excel
            </button>
          </div>
        </div>
        {/* Filter Rentang Tanggal, Status, Tipe */}
        <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-semibold">Rentang Tanggal:</span>
            <input type="date" className="border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none" defaultValue="2025-06-21" />
            <span className="text-gray-700 font-semibold">sampai</span>
            <input type="date" className="border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none" defaultValue="2025-07-21" />
          </div>
          <select className="border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none">
            <option>Semua Status</option>
            <option>Lunas</option>
            <option>Belum Lunas</option>
          </select>
          <select className="border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none">
            <option>Semua Tipe</option>
            <option>Early Bird</option>
            <option>Presale 1</option>
          </select>
        </div>
        {/* Card Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow flex items-center gap-4 p-5">
            <div className="flex-1">
              <div className="text-gray-500 font-semibold">Total Tiket</div>
              <div className="text-2xl font-extrabold text-gray-900">13</div>
              <div className="text-gray-400 text-sm">8 transaksi</div>
            </div>
            <div className="bg-blue-500 rounded-lg p-3 flex items-center justify-center">
              <FaTicketAlt className="text-white text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center gap-4 p-5">
            <div className="flex-1">
              <div className="text-gray-500 font-semibold">Total Revenue</div>
              <div className="text-2xl font-extrabold text-gray-900">Rp 1.700.000</div>
              <div className="text-gray-400 text-sm">8 customer</div>
            </div>
            <div className="bg-green-500 rounded-lg p-3 flex items-center justify-center">
              <FaDollarSign className="text-white text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center gap-4 p-5">
            <div className="flex-1">
              <div className="text-gray-500 font-semibold">Rata-rata Harga</div>
              <div className="text-2xl font-extrabold text-gray-900">Rp 137.500</div>
            </div>
            <div className="bg-purple-400 rounded-lg p-3 flex items-center justify-center">
              <FaChartLine className="text-white text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center gap-4 p-5">
            <div className="flex-1">
              <div className="text-gray-500 font-semibold">Tiket Lunas</div>
              <div className="text-2xl font-extrabold text-gray-900">9</div>
              <div className="text-gray-400 text-sm">Rp 1.050.000</div>
            </div>
            <div className="bg-orange-500 rounded-lg p-3 flex items-center justify-center">
              <FaFileAlt className="text-white text-2xl" />
            </div>
          </div>
        </div>
        {/* Breakdown Tipe Tiket & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Breakdown Tipe Tiket - Format yang Dirapikan */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="font-bold text-xl text-gray-900 mb-6">Breakdown Tipe Tiket</div>
            <div className="space-y-4 mt-2">
              <div className="flex items-center">
                <span className="text-gray-800 w-24 text-sm">Regular</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="w-[50%] mx-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-1 bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-gray-800 text-sm w-6 text-right">6</span>
                  <span className="text-gray-500 text-sm w-[100px] text-right">(Rp 600.000)</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-800 w-24 text-sm">VIP</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="w-[50%] mx-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-1 bg-blue-400 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-gray-800 text-sm w-6 text-right">6</span>
                  <span className="text-gray-500 text-sm w-[100px] text-right">(Rp 900.000)</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-800 w-24 text-sm">Premium</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="w-[50%] mx-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-1 bg-purple-400 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <span className="text-gray-800 text-sm w-6 text-right">1</span>
                  <span className="text-gray-500 text-sm w-[100px] text-right">(Rp 200.000)</span>
                </div>
              </div>
            </div>
          </div>
          {/* Breakdown Status - Format yang Dirapikan */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="font-bold text-xl text-gray-900 mb-6">Breakdown Status</div>
            <div className="space-y-4 mt-2">
              <div className="flex items-center">
                <span className="text-gray-800 w-24 text-sm">Lunas</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="w-[50%] mx-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-1 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-gray-800 text-sm w-6 text-right">9</span>
                  <span className="text-gray-500 text-sm w-[100px] text-right">(Rp 1.050.000)</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-800 w-24 text-sm">Menunggu</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="w-[50%] mx-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-1 bg-yellow-400 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-gray-800 text-sm w-6 text-right">3</span>
                  <span className="text-gray-500 text-sm w-[100px] text-right">(Rp 500.000)</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-800 w-24 text-sm">Dibatalkan</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="w-[50%] mx-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-1 bg-gray-300 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <span className="text-gray-800 text-sm w-6 text-right">0</span>
                  <span className="text-gray-500 text-sm w-[100px] text-right">(Rp 0)</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-800 w-24 text-sm">Digunakan</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="w-[50%] mx-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-1 bg-gray-700 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <span className="text-gray-800 text-sm w-6 text-right">1</span>
                  <span className="text-gray-500 text-sm w-[100px] text-right">(Rp 150.000)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Grafik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Estimasi Tiket Terjual */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold text-lg text-gray-800 mb-2">Estimasi Tiket Terjual</div>
            <Bar data={dataTiket} options={options} height={220} />
            <div className="mt-4 font-bold text-gray-800">Total: <span className="text-orange-600 text-xl">24 Tiket</span></div>
          </div>
          {/* Estimasi Pendapatan */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold text-lg text-gray-800 mb-2">Estimasi Pendapatan</div>
            <Bar data={dataPendapatan} options={options} height={220} />
            <div className="mt-4 font-bold text-gray-800">Total: <span className="text-orange-600 text-xl">Rp1.286.000</span></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Jumlah Tiket Ditukarkan */}
          <div className="bg-white rounded-xl shadow p-6 md:col-span-1">
            <div className="font-bold text-lg text-gray-800 mb-2">Jumlah Tiket Ditukarkan</div>
            <Bar data={dataTukar} options={options} height={180} />
            <div className="mt-4 font-bold text-gray-800">Total: <span className="text-orange-600 text-xl">0 Tiket</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}