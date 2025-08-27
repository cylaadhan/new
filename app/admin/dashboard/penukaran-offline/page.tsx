"use client";
import Sidebar from "../../../../components/Sidebar";
import { Search } from "lucide-react";
import { useState } from "react";

const data = [
  { tiket: "TKT001", nama: "acel", email: "acel@gmail.com", jenis: "OTS", scan: "21-07-2025 09:00" },
  { tiket: "TKT002", nama: "Arin", email: "anrin@gmail.com", jenis: "OTS", scan: "21-07-2025 09:05" },
  { tiket: "TKT003", nama: "Nelson", email: "nelson@gmail.com", jenis: "OTS", scan: "21-07-2025 09:10" },
  { tiket: "TKT004", nama: "Banu", email: "banu@gmail.com", jenis: "OTS", scan: "21-07-2025 09:15" },
];

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk memfilter data berdasarkan input pencarian
  const filteredData = data.filter((item) => {
    if (searchQuery.trim() === "") return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      item.tiket.toLowerCase().includes(searchLower) ||
      item.nama.toLowerCase().includes(searchLower) ||
      item.email.toLowerCase().includes(searchLower) ||
      item.jenis.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar adminName="Pemilik Event" />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Penukaran Tiket & Gelang</h1>
          </div>
        </div>
        
        {/* Filter dan Pencarian */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari tiket atau nama..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Tabel Penukaran Tiket */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 ease-in-out">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-medium text-gray-500 text-xs">NO. TIKET</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">NAMA PEMESAN</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">EMAIL</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">JENIS TIKET</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">TANGGAL SCAN</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, i) => (
                    <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm text-gray-900">{row.tiket}</td>
                      <td className="p-4 text-sm text-gray-900">{row.nama}</td>
                      <td className="p-4 text-sm text-gray-900">{row.email}</td>
                      <td className="p-4 text-sm text-gray-900">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-100 text-orange-800">
                          {row.jenis}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-900">{row.scan}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-sm text-center text-gray-500">
                      Tidak ada data yang ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}