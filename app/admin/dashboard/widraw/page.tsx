"use client";
import Sidebar from "../../../../components/Sidebar";
import { Search, RefreshCw, Check, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";

const initialData = [
  { no: 1, tanggal: "2025-07-22", keterangan: "Withdraw ke BCA", jumlah: 500000, status: "Sukses" },
  { no: 2, tanggal: "2025-07-23", keterangan: "Withdraw ke Mandiri", jumlah: 300000, status: "Pending" },
];

export default function Page() {
  const [data, setData] = useState(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  // Tambahkan state untuk mobile view
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const adminName = "Protix";

  // Deteksi ukuran layar untuk mobile view
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Cek saat komponen dimuat
    checkIsMobile();

    // Tambahkan event listener untuk resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup event listener saat komponen unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

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
      {/* Sidebar untuk desktop */}
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <Sidebar adminName={adminName} />
      </div>
      
      {/* Sidebar untuk mobile */}
      {isMobile && showMobileSidebar && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={toggleMobileSidebar}>
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <Sidebar adminName={adminName} />
          </div>
        </div>
      )}
      
     
      
      {!isMobile && (
        <Sidebar 
          adminName={adminName} 
          showMobileSidebar={showMobileSidebar} 
          setShowMobileSidebar={setShowMobileSidebar} 
        />
      )}
      
     
      {isMobile && showMobileSidebar && (
        <div className="fixed inset-0 z-30">
          <Sidebar 
            adminName={adminName} 
            showMobileSidebar={showMobileSidebar} 
            setShowMobileSidebar={setShowMobileSidebar} 
          />
        </div>
      )}
      
      <div className="flex-1">
        {/* Header Mobile */}
        {isMobile && (
          <header className="fixed top-0 left-0 right-0 bg-white z-20 px-4 py-3 flex justify-between items-center border-b shadow-sm">
            <button 
              onClick={toggleMobileSidebar}
              className="p-1.5 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            
            <h1 className="text-xl font-bold text-center text-gray-800">{adminName}</h1>
            
            <div className="w-6"></div>
          </header>
        )}
        
        <main className={`${isMobile ? 'p-4 pt-20' : 'p-8'}`}>
          {!isMobile && (
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Withdraw</h1>
              </div>
            </div>
          )}
          
          
          {isMobile && (
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Withdraw</h1>
            </div>
          )}
          
          {/* Card untuk Total Withdraw dan Saldo Akhir */}
          {isMobile ? (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white rounded-xl shadow-md p-3 transition-all duration-300 hover:shadow-lg">
                <div className="text-gray-500 font-medium mb-1 text-xs">Total Withdraw</div>
                <div className="text-lg font-bold text-orange-600">{formatRupiah(totalWithdraw)}</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3 transition-all duration-300 hover:shadow-lg">
                <div className="text-gray-500 font-medium mb-1 text-xs">Total Saldo</div>
                <div className="text-lg font-bold text-green-600">{formatRupiah(saldoAkhir)}</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg w-full">
                <div className="text-gray-500 font-medium mb-1">Total Withdraw</div>
                <div className="text-2xl font-bold text-orange-600">{formatRupiah(totalWithdraw)}</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg w-full">
                <div className="text-gray-500 font-medium mb-1">Total Saldo</div>
                <div className="text-2xl font-bold text-green-600">{formatRupiah(saldoAkhir)}</div>
              </div>
            </div>
          )}

          {/* Filter dan Pencarian */}
          {isMobile ? (
            <div className="flex flex-col space-y-3 mb-6">
              {/* Search Bar */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari keterangan atau tanggal"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 transition-all"
                />
              </div>

              {/* Filter dan Aksi untuk Mobile */}
              <div className="flex items-center justify-between w-full gap-1">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 w-28"
                >
                  <option>Semua Status</option>
                  <option>Sukses</option>
                  <option>Pending</option>
                </select>

                <button
                  onClick={handleRefresh}
                  className="flex items-center justify-center p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-black"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              {/* Search Bar */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari keterangan atau tanggal"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter dan Aksi */}
              <div className="flex items-center gap-2">
                {/* Filter Status */}
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 w-32"
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
                  className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-black"
                >
                  <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          )}

          {/* Tabel Withdraw */}
          <div className="bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition-all duration-300 ease-in-out">
            {/* Judul Tabel */}
            <h2 className={`font-semibold ${isMobile ? 'text-sm mb-2' : 'text-base mb-3'} text-gray-800`}>Daftar Withdraw</h2>
            <div className="overflow-x-auto max-w-full">
              <table className="w-full text-left border-collapse min-w-full table-fixed">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {!isMobile && <th className="p-4 font-medium text-gray-500 text-xs">NO.</th>}
                    <th className={`${isMobile ? 'p-1.5 text-[10px] w-[60px]' : 'p-4 text-xs'} font-medium text-gray-500`}>TANGGAL</th>
                    <th className={`${isMobile ? 'p-1.5 text-[10px] w-[80px]' : 'p-4 text-xs'} font-medium text-gray-500`}>KETERANGAN</th>
                    <th className={`${isMobile ? 'p-1.5 text-[10px] w-[70px]' : 'p-4 text-xs'} font-medium text-gray-500`}>JUMLAH</th>
                    <th className={`${isMobile ? 'p-1.5 text-[10px] w-[60px]' : 'p-4 text-xs'} font-medium text-gray-500`}>STATUS</th>
                    <th className={`${isMobile ? 'p-1.5 text-[10px] w-[50px]' : 'p-4 text-xs'} font-medium text-gray-500`}>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <tr key={row.no} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        {!isMobile && <td className="p-4 text-sm text-gray-900">{row.no}</td>}
                        <td className={`${isMobile ? 'p-1.5 text-[10px]' : 'p-4 text-sm'} text-gray-900 truncate`}>
                          {isMobile ? row.tanggal.split('-')[0].substring(2) + '/' + row.tanggal.split('-')[1] + '/' + row.tanggal.split('-')[2] : row.tanggal}
                        </td>
                        <td className={`${isMobile ? 'p-1.5 text-[10px]' : 'p-4 text-sm'} text-gray-900 truncate`}>{row.keterangan}</td>
                        <td className={`${isMobile ? 'p-1.5 text-[10px]' : 'p-4 text-sm'} font-medium text-gray-900 truncate`}>{formatRupiah(row.jumlah)}</td>
                        <td className={`${isMobile ? 'p-1.5' : 'p-4'}`}>
                          <span className={`${isMobile ? 'text-[8px] px-2 py-0.5' : 'text-xs px-3 py-1'} font-medium rounded-full ${getStatusClass(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className={`${isMobile ? 'p-1.5' : 'p-4'}`}>
                          <div className="flex flex-row gap-0.5">
                            <button className={`bg-green-500 hover:bg-green-600 text-white font-medium ${isMobile ? 'p-0.5' : 'p-1.5'} rounded-md shadow-sm`}>
                              <Check className={`${isMobile ? 'h-2.5 w-2.5' : 'h-4 w-4'}`} />
                            </button>
                            <button className={`bg-red-500 hover:bg-red-600 text-white font-medium ${isMobile ? 'p-0.5' : 'p-1.5'} rounded-md shadow-sm`}>
                              <X className={`${isMobile ? 'h-2.5 w-2.5' : 'h-4 w-4'}`} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={isMobile ? 5 : 6} className="p-4 text-sm text-center text-gray-500">
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
    </div>
  );
}