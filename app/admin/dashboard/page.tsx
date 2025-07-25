"use client";
import Sidebar from "../../../components/Sidebar";
import { FaTicketAlt, FaDollarSign, FaSyncAlt, FaDownload } from "react-icons/fa";
import { useState } from "react";

const FILTER_OPTIONS = [
  { label: "Hari Ini", value: "today" },
  { label: "Minggu Ini", value: "week" },
  { label: "Bulan Ini", value: "month" },
];

export default function DashboardPage() {
  const [filter, setFilter] = useState("today");

  return (
    <div className="flex min-h-screen">
      <Sidebar adminName="Pemilik Event" />
      <main className="flex-1 p-8 bg-gray-50">
        {/* Judul dan Toolbar sejajar */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Selamat datang, Event Manager</h1>
          <div className="flex flex-wrap gap-4 justify-end">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border text-gray-700 hover:bg-gray-100">
              <FaSyncAlt className="text-lg" />
              Refresh
            </button>
            <select
              className="px-4 py-2 bg-white rounded-lg shadow border text-gray-700 focus:outline-none"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              {FILTER_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border text-gray-700 hover:bg-gray-100">
              <FaDownload className="text-lg" />
              Export
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 mt-0">
          {/* Card Total Tiket */}
          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 min-w-[260px] w-full max-w-xs">
            <div className="flex-1">
              <div className="text-gray-500 font-medium">Total Tiket</div>
              <div className="text-3xl font-bold text-gray-900">13</div>
              <div className="text-gray-400 text-sm">9310 total</div>
            </div>
            <div className="bg-blue-500 rounded-lg p-3 flex items-center justify-center">
              <FaTicketAlt className="text-white text-2xl" />
            </div>
          </div>
          {/* Card Total Revenue */}
          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 min-w-[260px] w-full max-w-xs">
            <div className="flex-1">
              <div className="text-gray-500 font-medium">Total Revenue</div>
              <div className="text-3xl font-bold text-gray-900">Rp 1.050.000</div>
              <div className="text-gray-400 text-sm">Rp 500.000 pending</div>
            </div>
            <div className="bg-green-500 rounded-lg p-3 flex items-center justify-center">
              <FaDollarSign className="text-white text-2xl" />
            </div>
          </div>
        </div>
        {/* Statistik Table */}
        <div className="bg-white rounded-xl shadow p-6 mt-8">
          <div className="font-bold text-lg mb-4 text-gray-800">Statistik</div>
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 px-4 py-2 font-bold text-left align-bottom text-gray-800" rowSpan={2}>Jenis Tiket</th>
                  <th className="border-b border-gray-200 px-4 py-2 font-bold text-center text-gray-800" colSpan={4}>Estimasi Jumlah Tiket</th>
                  <th className="border-b border-gray-200 px-4 py-2 font-bold text-center text-gray-800" colSpan={4}>Estimasi Pendapatan</th>
                </tr>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 px-4 py-2 font-bold text-center text-gray-800">Dipesan</th>
                  <th className="border-b border-gray-200 px-4 py-2 font-bold text-center text-gray-800">Sudah Dibayar</th>
                  <th className="border-b border-gray-200 px-4 py-2 font-bold text-center text-gray-800">Belum Dibayar</th>
                  <th className="border-b border-gray-200 px-4 py-2 font-bold text-center text-gray-800">Belum Dikonfirm</th>
                  <th className="border-b border-gray-200 px-4 py-2 font-bold text-center text-gray-800">Total</th>
                  <th className="border-b border-gray-200 px-4 py-2 font-bold text-center text-gray-800">Tiket</th>
                  <th className="border-b border-gray-200 px-4 py-2 font-bold text-center text-gray-800">Fee</th>
                  <th className="border-b border-gray-200 px-4 py-2 font-bold text-center text-gray-800">Kode Unik</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50 text-gray-700">
                  <td className="border-b border-gray-200 px-4 py-2">Early Bird SOERATS 2025</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">24</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">24</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">Rp1.454.720</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">Rp1.286.000</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">Rp168.000</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">Rp720</td>
                </tr>
                <tr className="even:bg-gray-50 text-gray-700">
                  <td className="border-b border-gray-200 px-4 py-2">Presale 1 SOERATS 2025</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">Rp0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">Rp0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">Rp0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">Rp0</td>
                </tr>
                {/* Baris total */}
                <tr className="font-bold bg-gray-50 text-gray-800">
                  <td className="border-b border-gray-200 px-4 py-2"></td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">24</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">24</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">0</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">Rp1.454.720</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">Rp1.286.000</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">Rp168.000</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-center">Rp720</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
