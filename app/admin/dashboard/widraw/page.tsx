"use client";
import Sidebar from "../../../../components/Sidebar";
import { Search, RefreshCw, Check, X } from "lucide-react";
import { useState } from "react";

const initialData = [
  { no: 1, tanggal: "2025-07-22", keterangan: "Withdraw ke BCA", jumlah: 500000, status: "Sukses" },
  { no: 2, tanggal: "2025-07-23", keterangan: "Withdraw ke Mandiri", jumlah: 300000, status: "Pending" },
];

export default function Page() {
  const [data, setData] = useState(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  const totalWithdraw = data.reduce((sum, d) => sum + d.jumlah, 0);
  const saldoAkhir = 1286000 - totalWithdraw;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  // Fungsi untuk mendapatkan kelas warna berdasarkan status
  const getStatusClass = (status: string): string => {
    switch (status) {
      case "Sukses":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format Rupiah
  const formatRupiah = (amount: number): string => {
    return `Rp${amount.toLocaleString('id-ID')}`;
  };

  // Filter dan pencarian data
  const filteredData = initialData.filter((item) => {
    // Filter berdasarkan status
    if (statusFilter !== "Semua Status" && item.status !== statusFilter) {
      return false;
    }
    
    // Pencarian berdasarkan keterangan dan tanggal
    if (searchQuery.trim() !== "") {
      const searchLower = searchQuery.toLowerCase();
      return (
        item.keterangan.toLowerCase().includes(searchLower) ||
        item.tanggal.includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar adminName="Pemilik Event" />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Withdraw</h1>
          </div>
        </div>

        {/* Card untuk Total Withdraw dan Saldo Akhir */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-5 w-[240px] hover:shadow-md hover:scale-[1.01] transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Withdraw</div>
            <div className="text-xl font-bold text-orange-600">{formatRupiah(totalWithdraw)}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-5 w-[240px] hover:shadow-md hover:scale-[1.01] transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Saldo</div>
            <div className="text-xl font-bold text-green-600">{formatRupiah(saldoAkhir)}</div>
          </div>
        </div>

        {/* Filter dan Pencarian */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari keterangan atau tanggal..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter dan Aksi */}
          <div className="flex items-center gap-4">
            {/* Filter Status */}
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Semua Status</option>
              <option>Sukses</option>
              <option>Pending</option>
            </select>

            {/* Tombol Refresh */}
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-900"
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Tabel Withdraw */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 ease-in-out">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-medium text-gray-500 text-xs">NO.</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">TANGGAL</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">KETERANGAN</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">JUMLAH</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">STATUS</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <tr key={row.no} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm text-gray-900">{row.no}</td>
                      <td className="p-4 text-sm text-gray-900">{row.tanggal}</td>
                      <td className="p-4 text-sm text-gray-900">{row.keterangan}</td>
                      <td className="p-4 font-medium text-gray-900 text-sm">{formatRupiah(row.jumlah)}</td>
                      <td className="p-4">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusClass(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-row flex-wrap gap-2">
                          <button className="bg-green-500 hover:bg-green-600 text-white font-medium p-1.5 rounded-md shadow-sm">
                            <Check className="h-4 w-4" />
                          </button>
                          <button className="bg-red-500 hover:bg-red-600 text-white font-medium p-1.5 rounded-md shadow-sm">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-sm text-center text-gray-500">
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