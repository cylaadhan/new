"use client";
import { useState, useEffect } from "react";
import Sidebar2 from "../../../../components/Sidebar2";
import { Search, RefreshCw, Download, Edit, Trash2, Copy, Eye, CheckCircle, TicketIcon, SlidersHorizontal, ListFilter, ChevronLeft, ChevronRight, Menu } from "lucide-react";

// Data tiket yang disesuaikan dengan desain baru
const ticketData = [
  {
    kode: "PRTX-0679",
    customer: {
      nama: "Adi",
      email: "adi@gmail.com",
      telp: "087673546",
    },
    tipe: "Early Bird",
    jumlah: 2,
    total: 300000,
    status: "Menunggu",
    tanggal: "6-7-2025 11:30:53",
  },
  {
    kode: "PRTX-0753",
    customer: {
      nama: "Ahmad Rizki",
      email: "ahmad@email.com",
      telp: "081234567890",
    },
    tipe: "Presale 1",
    jumlah: 2,
    total: 300000,
    status: "Lunas",
    tanggal: "6-7-2025 11:12:53",
  },
  {
    kode: "PRTX-0072",
    customer: {
      nama: "Siti Nurhaliza",
      email: "siti@email.com",
      telp: "081234567891",
    },
    tipe: "Presale 2",
    jumlah: 1,
    total: 100000,
    status: "Lunas",
    tanggal: "6-7-2025, 11:12:53",
  },
  {
    kode: "PRTX-0803",
    customer: {
      nama: "Budi Santoso",
      email: "budi@email.com",
      telp: "081234567892",
    },
    tipe: "Presale 3",
    jumlah: 1,
    total: 200000,
    status: "Menunggu",
    tanggal: "6-7-2025, 11:12:53",
  },
  // 8 data tiket baru
  {
    kode: "PRTX-0421",
    customer: {
      nama: "Dewi Lestari",
      email: "dewi@gmail.com",
      telp: "081234567893",
    },
    tipe: "Early Bird",
    jumlah: 3,
    total: 450000,
    status: "Lunas",
    tanggal: "7-7-2025, 09:15:22",
  },
  {
    kode: "PRTX-0198",
    customer: {
      nama: "Rudi Hartono",
      email: "rudi@gmail.com",
      telp: "081234567894",
    },
    tipe: "Presale 1",
    jumlah: 1,
    total: 150000,
    status: "Menunggu",
    tanggal: "7-7-2025, 10:22:45",
  },
  {
    kode: "PRTX-0537",
    customer: {
      nama: "Maya Sari",
      email: "maya@gmail.com",
      telp: "081234567895",
    },
    tipe: "Presale 2",
    jumlah: 2,
    total: 200000,
    status: "Lunas",
    tanggal: "7-7-2025, 13:05:17",
  },
  {
    kode: "PRTX-0862",
    customer: {
      nama: "Dian Sastro",
      email: "dian@gmail.com",
      telp: "081234567896",
    },
    tipe: "Presale 3",
    jumlah: 4,
    total: 800000,
    status: "Lunas",
    tanggal: "7-7-2025, 14:30:42",
  },
  {
    kode: "PRTX-0315",
    customer: {
      nama: "Joko Widodo",
      email: "joko@gmail.com",
      telp: "081234567897",
    },
    tipe: "Early Bird",
    jumlah: 2,
    total: 300000,
    status: "Menunggu",
    tanggal: "8-7-2025, 08:45:33",
  },
  {
    kode: "PRTX-0649",
    customer: {
      nama: "Anita Wijaya",
      email: "anita@gmail.com",
      telp: "081234567898",
    },
    tipe: "Presale 1",
    jumlah: 1,
    total: 150000,
    status: "Lunas",
    tanggal: "8-7-2025, 09:55:21",
  },
  {
    kode: "PRTX-0724",
    customer: {
      nama: "Bambang Suparno",
      email: "bambang@gmail.com",
      telp: "081234567899",
    },
    tipe: "Presale 2",
    jumlah: 3,
    total: 300000,
    status: "Menunggu",
    tanggal: "8-7-2025, 11:20:15",
  },
  {
    kode: "PRTX-0481",
    customer: {
      nama: "Ratna Sari",
      email: "ratna@gmail.com",
      telp: "081234567800",
    },
    tipe: "Presale 3",
    jumlah: 2,
    total: 400000,
    status: "Lunas",
    tanggal: "8-7-2025, 13:10:05",
  },
];

// Fungsi untuk memformat angka menjadi format Rupiah
const formatRupiah = (angka: number) => {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
  
  // Menghilangkan spasi setelah "Rp"
  return formatted.replace("Rp ", "Rp");
};

export default function Page() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedTicketType, setSelectedTicketType] = useState("Semua Tipe");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  
  // State untuk mengelola tampilan mobile
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const adminName = "Panitia";

  // Deteksi ukuran layar untuk tampilan mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  // Reset halaman saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTicketType, selectedStatus]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500); // Animasi berputar selama 0.5 detik
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Lunas":
        return "bg-green-100 text-green-800";
      case "Menunggu":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTipeClass = (tipe: string) => {
    switch (tipe) {
      case "Early Bird":
        return "bg-green-100 text-green-800";
      case "Presale 1":
        return "bg-blue-100 text-blue-800";
      case "Presale 2":
        return "bg-purple-100 text-purple-800";
      case "Presale 3":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter data berdasarkan pencarian dan filter
  const filteredData = ticketData.filter(item => {
    // Jika tidak ada pencarian atau filter yang aktif, tampilkan semua data
    if (searchTerm === "" && 
        selectedTicketType === "Semua Tipe" && 
        selectedStatus === "Semua Status") {
      return true;
    }
    
    // Filter berdasarkan pencarian
    const matchesSearch = searchTerm === "" ? true :
      item.customer.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kode.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter berdasarkan tipe tiket
    const matchesTicketType = selectedTicketType === "Semua Tipe" || 
                             item.tipe === selectedTicketType;
    
    // Filter berdasarkan status
    const matchesStatus = selectedStatus === "Semua Status" || 
                         item.status === selectedStatus;
    
    // Menggabungkan semua kondisi filter
    return matchesSearch && matchesTicketType && matchesStatus;
  });
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  // Handle page change
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-sans">
      {/* Sidebar dengan props yang diperlukan - hanya untuk desktop */}
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <Sidebar2 
          adminName={adminName} 
          showMobileSidebar={showMobileSidebar} 
          setShowMobileSidebar={setShowMobileSidebar} 
        />
      </div>
      
      {/* Konten utama */}
      <div className="flex-1">
        {/* Header Mobile */}
        {isMobile && (
          <header className="sticky top-0 bg-white shadow-md z-20 px-4 py-3 flex items-center justify-between">
            <button 
              onClick={toggleMobileSidebar}
              className="p-1 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 text-center">
              <span className="font-bold text-lg text-black">{adminName}</span>
            </div>
            
            <div className="w-6"></div> {/* Spacer untuk menjaga keseimbangan layout */}
          </header>
        )}
        
        {/* Sidebar Mobile (hanya muncul saat tombol hamburger diklik) */}
        {isMobile && showMobileSidebar && (
          <div className="fixed inset-0 z-30">
            <Sidebar2 
              adminName={adminName} 
              showMobileSidebar={showMobileSidebar} 
              setShowMobileSidebar={setShowMobileSidebar} 
            />
          </div>
        )}
        
        <main className={`${isMobile ? 'pt-0' : ''} flex-1 w-full flex flex-col min-h-screen`}>
          <div className="flex-grow">
            {/* Judul dan Export */}
            <div className="flex justify-between items-center p-4 md:p-8 pb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Daftar Tiket</h1>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <button 
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition transform hover:scale-105"
                  title="Filter"
                >
                  <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button className="flex items-center gap-1 md:gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-1 md:px-4 md:py-2 rounded-lg shadow-md transition text-sm md:text-base">
                  <Download className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Panel Filter */}
            {showFilter && (
              <div className="mx-4 md:mx-8 mb-4 md:mb-6">
                <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-gray-800 text-base md:text-lg">Filter Data</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-medium mb-1 text-gray-700 text-sm">Tipe Tiket</label>
                      <select 
                        className="border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
                        value={selectedTicketType}
                        onChange={(e) => setSelectedTicketType(e.target.value)}
                      >
                        <option>Semua Tipe</option>
                        <option>Early Bird</option>
                        <option>Presale 1</option>
                        <option>Presale 2</option>
                        <option>Presale 3</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-gray-700 text-sm">Status</label>
                      <select 
                        className="border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option>Semua Status</option>
                        <option>Lunas</option>
                        <option>Menunggu</option>
                      </select>
                    </div>
                    <div className="self-end mb-1">
                      <button 
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full shadow-md transition transform hover:scale-105"
                        onClick={() => {
                          setCurrentPage(1);
                          setShowFilter(false);
                        }}
                      >
                        <ListFilter className="w-4 h-4" />
                        <span>Terapkan Filter</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search dan Items Per Page */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4 md:px-8 mb-4 md:mb-6">
              {/* Search Bar */}
              <div className="relative flex-grow w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari kode tiket, nama, atau email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 text-sm md:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Items Per Page */}
              <div className="flex flex-wrap items-center justify-between w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <label className="font-medium text-gray-700 text-xs md:text-sm">Show</label>
                  <select 
                    className="border rounded-lg px-2 py-1 md:px-3 md:py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-xs md:text-sm text-gray-700">entries</span>
                </div>
                
                <div className="flex items-center ml-auto">
                  {/* Tombol Refresh */}
                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-900 text-xs md:text-sm"
                  >
                    <RefreshCw className={`h-3 w-3 md:h-5 md:w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                  
                  {/* Total Tiket */}
                  <div className="px-2 py-1 md:px-4 md:py-2 text-gray-600 font-medium text-xs md:text-sm ml-2 md:ml-4">
                    Total: {filteredData.length} tiket
                  </div>
                </div>
              </div>
            </div>

            {/* Tabel Data */}
            <div className="bg-white rounded-xl shadow-md p-3 md:p-5 mx-3 md:mx-6">
              <div className="space-y-3">
                {currentItems.map((item, index) => (
                  <div key={index} className="flex flex-row gap-1">
                    {/* Bagian Kiri - Informasi Utama */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-2 md:p-3 flex justify-between items-center">
                      {/* Info Tiket dan Pemesan */}
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="font-mono text-xs md:text-sm text-gray-600">{item.tanggal}</p>
                          <span className={`text-xs md:text-sm font-semibold px-1.5 py-0.5 rounded-md ${getStatusClass(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="mt-0.5">
                          <p className="font-mono text-xs md:text-sm font-bold text-gray-700 py-0.5 rounded-md">{item.kode}</p>
                          <p className="text-sm md:text-lg font-bold text-gray-900">{item.customer.nama}</p>
                          <p className="text-xs md:text-sm text-gray-500">{item.customer.email}</p>
                          <p className="text-xs md:text-sm text-gray-500">{item.customer.telp}</p>
                        </div>
                      </div>

                      {/* Info Tiket */}
                      <div className="text-right">
                        <span className={`px-1.5 py-0.5 text-xs md:text-sm font-bold rounded-md ${getTipeClass(item.tipe)}`}>
                          {item.tipe}
                        </span>
                        <p className="text-xs md:text-base font-medium text-gray-700 mt-0.5">{item.jumlah} tiket</p>
                        <p className="text-xs md:text-base font-semibold text-gray-800">{formatRupiah(item.total)}</p>
                      </div>
                    </div>

                    {/* Bagian Kanan - Aksi */}
                    <div className="w-16 md:w-40 bg-gray-50 rounded-lg p-2 flex justify-center items-center">
                      <button className="p-1.5 text-blue-700 hover:bg-blue-100 hover:text-blue-900 rounded-full transition-colors flex items-center gap-1" title="Daftar Tiket">
                        <TicketIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="font-medium text-xs hidden md:inline">Daftar Tiket</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Tampilkan pesan jika tidak ada data */}
              {currentItems.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 font-medium">Tidak ada data yang ditemukan</p>
                  <p className="text-gray-400 text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
                </div>
              )}
              
              {/* Pagination */}
              {filteredData.length > 0 && (
                <div className="flex justify-between items-center py-2 md:py-4 mt-2 md:mt-4 px-1 md:px-2">
                  <span className="text-xs md:text-sm text-gray-600">
                    Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
                  </span>
                  <div className="flex items-center gap-0.5 md:gap-1">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm rounded-full border border-gray-300 ${currentPage === 1 ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold flex items-center`}
                    >
                      <ChevronLeft className="h-3 w-3 md:h-4 md:w-4 mr-0.5 md:mr-1" />
                      Prev
                    </button>
                    
                    <button 
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-blue-500 text-white text-xs md:text-sm"
                    >
                      {currentPage}
                    </button>
                    
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm rounded-full border border-gray-300 ${currentPage === totalPages ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold flex items-center`}
                    >
                      Next
                      <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-0.5 md:ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}