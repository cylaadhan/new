"use client";
import Sidebar from "../../../../components/Sidebar";
import { Line } from "react-chartjs-2";
import { RefreshCw, FileText, Ticket, DollarSign, TrendingUp, FileCheck, BarChart2, Clock, Download, SlidersHorizontal } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mengubah label menjadi mingguan selama 2 bulan
const labels = [
  "Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4", // Bulan 1
  "Minggu 5", "Minggu 6", "Minggu 7", "Minggu 8"  // Bulan 2
];

// Data tiket dengan pola penjualan early bird di bulan pertama, presale 1 di bulan kedua, dan presale 3 di 2 minggu terakhir
const dataTiket = {
  labels,
  datasets: [
    {
      label: "Early Bird",
      data: [25, 30, 35, 40, 0, 0, 0, 0], // Hanya di bulan pertama (4 minggu pertama)
      borderColor: "rgba(59, 130, 246, 1)",
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      tension: 0.3,
      pointRadius: 3,
    },
    {
      label: "Presale 1",
      data: [0, 0, 0, 0, 45, 50, 0, 0], // Di bulan kedua (minggu 5-6)
      borderColor: "rgba(168, 85, 247, 1)",
      backgroundColor: "rgba(168, 85, 247, 0.5)",
      tension: 0.3,
      pointRadius: 3,
    },
    {
      label: "Presale 3",
      data: [0, 0, 0, 0, 0, 0, 55, 60], // Di 2 minggu terakhir bulan kedua (minggu 7-8)
      borderColor: "rgba(249, 115, 22, 1)",
      backgroundColor: "rgba(249, 115, 22, 0.5)",
      tension: 0.3,
      pointRadius: 3,
    },
  ],
};

// Data pendapatan dengan pola yang sama
const dataPendapatan = {
  labels,
  datasets: [
    {
      label: "Pendapatan Mingguan",
      data: [
        1500000, 1800000, 2100000, 2400000, // Early Bird (bulan pertama)
        2700000, 3000000, // Presale 1 (minggu 5-6)
        3300000, 3600000  // Presale 3 (minggu 7-8)
      ],
      borderColor: "rgba(34, 197, 94, 1)",
      backgroundColor: "rgba(34, 197, 94, 0.5)",
      tension: 0.3,
      pointRadius: 3,
      fill: true,
    },
  ],
};

// Data penukaran tiket mingguan
const dataTukar = {
  labels,
  datasets: [
    {
      label: "Tiket Ditukarkan",
      data: [5, 8, 12, 15, 18, 22, 25, 30],
      borderColor: "rgba(249, 115, 22, 1)",
      backgroundColor: "rgba(249, 115, 22, 0.5)",
      tension: 0.3,
      pointRadius: 3,
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
      ticks: { color: "#666", font: { size: 12, family: "sans-serif" } },
      grid: { color: "#eee" },
    },
    x: {
      ticks: { color: "#666", font: { size: 12, family: "sans-serif" } },
      grid: { color: "#eee" },
    },
  },
};

const ticketStatusData = [
  { status: "Lunas", count: 9, amount: 1050000, color: "bg-green-500" },
  { status: "Menunggu", count: 3, amount: 500000, color: "bg-yellow-500" },
];

const ticketTypeData = [
  { type: "Early Bird", count: 6, amount: 600000, color: "bg-blue-500" },
  { type: "Presale 1", count: 6, amount: 900000, color: "bg-blue-400" },
  { type: "Presale 2", count: 1, amount: 200000, color: "bg-purple-400" },
];

// Data mentah sebagai contoh untuk filter
const allTickets = [
  { date: '2025-06-01', type: 'Early Bird', status: 'Lunas', price: 100000 },
  { date: '2025-06-05', type: 'Early Bird', status: 'Lunas', price: 100000 },
  { date: '2025-06-10', type: 'Presale 1', status: 'Menunggu', price: 150000 },
  { date: '2025-06-15', type: 'Presale 1', status: 'Lunas', price: 150000 },
  { date: '2025-06-20', type: 'Presale 1', status: 'Lunas', price: 150000 },
  { date: '2025-06-25', type: 'Presale 2', status: 'Lunas', price: 200000 },
  { date: '2025-07-01', type: 'Presale 2', status: 'Menunggu', price: 200000 },
  { date: '2025-07-05', type: 'Presale 2', status: 'Lunas', price: 200000 },
  { date: '2025-07-10', type: 'Presale 3', status: 'Lunas', price: 250000 },
  { date: '2025-07-15', type: 'Presale 3', status: 'Lunas', price: 250000 },
  { date: '2025-07-20', type: 'Early Bird', status: 'Menunggu', price: 100000 },
];


export default function Page() {
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState('2025-06-01');
  const [endDate, setEndDate] = useState('2025-07-31');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const [selectedType, setSelectedType] = useState('Semua Tipe');

  const [filteredTickets, setFilteredTickets] = useState(allTickets);

  useEffect(() => {
    const filtered = allTickets.filter(ticket => {
      const ticketDate = new Date(ticket.date);
      const start = new Date(startDate);
      const end = new Date(endDate);

      const isDateInRange = ticketDate >= start && ticketDate <= end;
      const isStatusMatch = selectedStatus === 'Semua Status' || ticket.status === selectedStatus;
      const isTypeMatch = selectedType === 'Semua Tipe' || ticket.type === selectedType;

      return isDateInRange && isStatusMatch && isTypeMatch;
    });
    setFilteredTickets(filtered);
  }, [startDate, endDate, selectedStatus, selectedType]);

  const totalTickets = filteredTickets.length;
  const totalRevenue = filteredTickets.reduce((sum, ticket) => ticket.status === 'Lunas' ? sum + ticket.price : sum, 0);
  const averagePrice = totalTickets > 0 ? totalRevenue / totalTickets : 0;

  const breakdownStatus = filteredTickets.reduce((acc, ticket) => {
    if (!acc[ticket.status]) {
      acc[ticket.status] = { count: 0, amount: 0 };
    }
    acc[ticket.status].count++;
    if (ticket.status === 'Lunas') {
      acc[ticket.status].amount += ticket.price;
    }
    return acc;
  }, {} as Record<string, { count: number, amount: number }>);

  const breakdownType = filteredTickets.reduce((acc, ticket) => {
    if (!acc[ticket.type]) {
      acc[ticket.type] = { count: 0, amount: 0 };
    }
    acc[ticket.type].count++;
    if (ticket.status === 'Lunas') {
      acc[ticket.type].amount += ticket.price;
    }
    return acc;
  }, {} as Record<string, { count: number, amount: number }>);

  const ticketStatusData = [
    { status: "Lunas", ...(breakdownStatus['Lunas'] || { count: 0, amount: 0 }), color: "bg-green-500" },
    { status: "Menunggu", ...("Menunggu" in breakdownStatus ? breakdownStatus['Menunggu'] : { count: 0, amount: 0 }), color: "bg-yellow-500" },
  ];

  const ticketTypeData = [
    { type: "Early Bird", ...breakdownType['Early Bird'], color: "bg-blue-500" },
    { type: "Presale 1", ...breakdownType['Presale 1'], color: "bg-blue-400" },
    { type: "Presale 2", ...breakdownType['Presale 2'], color: "bg-purple-400" },
    { type: "Presale 3", ...breakdownType['Presale 3'], color: "bg-orange-400" },
  ].filter(item => item.count > 0);


  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar adminName="Pemilik Event" />
      <main className="flex-1 p-8">
        {/* Header dan Filter */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Laporan</h1>
            <p className="text-gray-500">Ringkasan data penjualan tiket</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              aria-label="Toggle Filter"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition">
              <Download className="w-5 h-5" /> Export
            </button>
          </div>
        </div>
        {/* Filter Rentang Tanggal, Status, Tipe */}
        {showFilter && (
          <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Rentang Tanggal:</span>
              <input type="date" className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <span className="text-gray-700 font-medium">sampai</span>
              <input type="date" className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
            <select className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
              <option>Semua Status</option>
              <option>Lunas</option>
              <option>Menunggu</option>
            </select>
            <select className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
              <option>Semua Tipe</option>
              <option>Early Bird</option>
              <option>Presale 1</option>
              <option>Presale 2</option>
              <option>Presale 3</option>
            </select>
          </div>
        )}
        {/* Card Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Tiket</p>
              <p className="text-4xl font-bold text-gray-900">{totalTickets}</p>
            </div>
            <div className="bg-blue-500 text-white p-4 rounded-lg">
              <Ticket className="h-7 w-7" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <p className="text-4xl font-bold text-gray-900">Rp {totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg">
              <DollarSign className="h-7 w-7" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Rata-rata Harga</p>
              <p className="text-4xl font-bold text-gray-900">Rp {averagePrice.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            </div>
            <div className="bg-purple-400 text-white p-4 rounded-lg">
              <TrendingUp className="h-7 w-7" />
            </div>
          </div>
        </div>
        {/* Breakdown Tipe Tiket & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Breakdown Tipe Tiket */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-gray-800">Breakdown Tipe Tiket</h2>
              <BarChart2 className="text-gray-400 h-5 w-5" />
            </div>
            <div className="space-y-4">
              {ticketTypeData.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <span className="text-gray-600">{item.type}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`${item.color} h-2.5 rounded-full`}
                        style={{ width: `${totalTickets > 0 ? (item.count / totalTickets) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-gray-800 w-4 text-right">{item.count}</span>
                    <span className="text-gray-500 text-sm w-24 text-right">(Rp {item.amount.toLocaleString()})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Breakdown Status */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-gray-800">Breakdown Status</h2>
              <Clock className="text-gray-400 h-5 w-5" />
            </div>
            <div className="space-y-4">
              {ticketStatusData.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <span className="text-gray-600">{item.status}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`${item.color} h-2.5 rounded-full`}
                        style={{ width: `${totalTickets > 0 ? (item.count / totalTickets) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-gray-800 w-4 text-right">{item.count}</span>
                    <span className="text-gray-500 text-sm w-24 text-right">(Rp {item.amount.toLocaleString()})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Grafik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Estimasi Tiket Terjual */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-gray-800">Penjualan Tiket</h2>
              <Ticket className="text-gray-400 h-5 w-5" />
            </div>
            <Line data={dataTiket} options={options} height={220} />
            <div className="mt-4 text-gray-800">Total: <span className="text-blue-600 font-bold">340 Tiket</span></div>
          </div>
          {/* Estimasi Pendapatan */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-gray-800">Pendapatan</h2>
              <DollarSign className="text-gray-400 h-5 w-5" />
            </div>
            <Line data={dataPendapatan} options={options} height={220} />
            <div className="mt-4 text-gray-800">Total: <span className="text-green-600 font-bold">Rp 20.400.000</span></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Jumlah Tiket Ditukarkan */}
          <div className="bg-white rounded-xl shadow p-6 md:col-span-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-gray-800">Tiket Ditukarkan</h2>
              <FileCheck className="text-gray-400 h-5 w-5" />
            </div>
            <Line data={dataTukar} options={options} height={180} />
            <div className="mt-4 text-gray-800">Total: <span className="text-orange-600 font-bold">135 Tiket</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}