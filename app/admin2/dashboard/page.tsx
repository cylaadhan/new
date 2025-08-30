"use client";
import Sidebar2 from "../../../components/Sidebar2";
import { DollarSign, RefreshCw, Download, BarChart2, Clock, Ticket, ChevronDown, TrendingUp } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState } from "react";

const FILTER_OPTIONS = [
  { label: "Hari Ini", value: "today" },
  { label: "Minggu Ini", value: "week" },
  { label: "Bulan Ini", value: "month" },
];

const ticketStatusData = [
  { status: "Lunas", count: 9, color: "bg-green-500" },
  { status: "Menunggu", count: 3, color: "bg-yellow-500" },
];

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Data untuk chart statistik tiket
const ticketChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
  datasets: [
    {
      label: 'Lunas',
      data: [4, 5, 7, 8, 9, 9],
      borderColor: 'rgba(34, 197, 94, 1)',
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      tension: 0.3,
      pointRadius: 3,
    },
    {
      label: 'Menunggu',
      data: [1, 2, 2, 3, 3, 3],
      borderColor: 'rgba(234, 179, 8, 1)',
      backgroundColor: 'rgba(234, 179, 8, 0.2)',
      tension: 0.3,
      pointRadius: 3,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { 
      position: 'top',
      display: true,
      align: 'center'
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      padding: 10,
      displayColors: true
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { precision: 0 },
      title: {
        display: true,
        text: 'Jumlah Tiket'
      }
    },
    x: {
      grid: {
        display: false
      },
      title: {
        display: true,
        text: 'Bulan'
      }
    }
  }
};

const recentSalesData = [
  {
    id: "PRTX-0479",
    status: "Menunggu",
    name: "Budi Santoso",
    date: "6/7/2025, 12.05.11",
    ticketType: "Regular",
    ticketCount: 1,
    price: "Rp 100.000",
    statusColor: "bg-yellow-200 text-yellow-800",
  },
  {
    id: "PRTX-0451",
    status: "Lunas",
    name: "Ahmad Rizki",
    date: "6/7/2025, 11.12.53",
    ticketType: "VIP",
    ticketCount: 2,
    price: "Rp 300.000",
    statusColor: "bg-green-200 text-green-800",
  },
  {
    id: "PRTX-0062",
    status: "Lunas",
    name: "Siti Nurhaliza",
    date: "6/7/2025, 11.12.53",
    ticketType: "Regular",
    ticketCount: 1,
    price: "Rp 100.000",
    statusColor: "bg-green-200 text-green-800",
  },
  {
    id: "PRTX-831",
    status: "Lunas",
    name: "Dewi Lestari",
    date: "6/7/2025, 10.45.21",
    ticketType: "VIP",
    ticketCount: 1,
    price: "Rp 150.000",
    statusColor: "bg-green-200 text-green-800",
  },
  {
    id: "PRTX-219",
    status: "Menunggu",
    name: "Eko Prasetyo",
    date: "6/7/2025, 09.30.00",
    ticketType: "Regular",
    ticketCount: 3,
    price: "Rp 300.000",
    statusColor: "bg-yellow-200 text-yellow-800",
  },
];

export default function DashboardPage() {
  const [filter, setFilter] = useState(FILTER_OPTIONS[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500); // Animasi berputar selama 1 detik
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar2 adminName="Admin Tiket" />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Selamat Datang di Dashboard Admin</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 justify-end">
            <button 
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            <div className="relative">
              <select
                value={filter.value}
                onChange={(e) => {
                  const selectedOption = FILTER_OPTIONS.find(opt => opt.value === e.target.value);
                  if (selectedOption) {
                    setFilter(selectedOption);
                  }
                }}
                className="appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                {FILTER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition-shadow duration-300">
              <div>
                <p className="text-gray-500">Total Tiket</p>
                <p className="text-4xl font-bold text-gray-900">13</p>
              </div>
              <div className="bg-blue-500 text-white p-4 rounded-lg">
                <Ticket className="h-7 w-7" />
              </div>
            </div>
          
            {/* Total Revenue Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition-shadow duration-300">
              <div>
                <p className="text-gray-500">Total Revenue</p>
                <p className="text-4xl font-bold text-gray-900">Rp 1.050.000</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-lg">
                <DollarSign className="h-7 w-7" />
              </div>
            </div>
          </div>
          
          {/* Bottom Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kolom Kiri: Status Tiket dan Statistik Status Tiket */}
            <div className="flex flex-col gap-6">
              {/* Status Tiket */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-2 text-black">
                  <h2 className="font-bold text-lg">Status Tiket</h2>
                  <BarChart2 className="text-gray-400 h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  {ticketStatusData.map((item) => (
                    <div key={item.status} className="flex items-center justify-between">
                      <span className="text-gray-600">{item.status}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`${item.color} h-2.5 rounded-full`}
                            style={{ width: `${item.count * 10}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-gray-800 w-4 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistik Status Tiket */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col flex-grow hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-2 text-black">
                  <h2 className="font-bold text-lg">Statistik Status Tiket</h2>
                  <TrendingUp className="text-gray-400 h-5 w-5" />
                </div>
                <div className="relative flex-grow">
                  <Line data={ticketChartData} options={chartOptions as any} />
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Penjualan Terbaru */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 h-full hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-lg text-gray-800">Penjualan Terbaru</h2>
                  <Clock className="text-gray-400 h-5 w-5" />
                </div>
                <div className="space-y-4">
                  {recentSalesData.map((sale) => (
                    <div key={sale.id} className="flex justify-between items-start bg-gray-50 p-4 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-mono text-black text-sm">{sale.id}</p>
                          <span
                            className={`px-2 py-0.5 text-xs font-bold rounded-md ${sale.statusColor}`}>
                            {sale.status}
                          </span>
                        </div>
                        <p className="text-gray-800 font-medium">{sale.name}</p>
                        <p className="text-sm text-gray-500">{sale.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">{sale.ticketType}</p>
                        <p className="text-sm text-gray-500">{sale.ticketCount} tiket</p>
                        <p className={`font-semibold ${sale.status === 'Lunas' ? 'text-green-600' : 'text-yellow-600'}`}>{sale.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}