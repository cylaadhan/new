"use client";
import { useState, useEffect } from "react";
import Sidebar2 from "../../../../components/Sidebar2";
import { Search, RefreshCw, Download, Edit, Trash2, Copy, Eye, CheckCircle, TicketIcon, SlidersHorizontal, ListFilter, ChevronLeft, ChevronRight } from "lucide-react";

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
    tanggal: "6-7-2025, 11:30:53",
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
    tanggal: "6-7-2025, 11:12:53",
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
      <Sidebar2 adminName="Panitia" />
      <main className="flex-1 w-full flex flex-col min-h-screen">
        <div className="flex-grow">
          {/* Judul dan Export */}
          <div className="flex justify-between items-center p-8 pb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Daftar Tiket</h1>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center justify-center w-10 h-10 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition transform hover:scale-105"
                title="Filter"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Panel Filter */}
          {showFilter && (
            <div className="mx-8 mb-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-gray-800 text-lg">Filter Data</h2>
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
          <div className="flex flex-wrap justify-between items-center gap-4 px-8 mb-6">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari kode tiket, nama, atau email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Items Per Page */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700 text-sm">Show</label>
              <select 
                className="border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-700">entries</span>
              
              {/* Tombol Refresh */}
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 ml-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-900"
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              
              {/* Total Tiket */}
              <div className="px-4 py-2 text-gray-600 font-medium">
                Total: {filteredData.length} tiket
              </div>
            </div>
          </div>

          {/* Tabel Data (Diubah menjadi Card) */}
          <div className="bg-white rounded-xl shadow-md p-6 mx-8">
            <div className="space-y-4">
              {currentItems.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-2">
                  {/* Bagian Kiri - Informasi Utama */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    {/* Info Tiket dan Pemesan */}
                    <div>
                      <div className="flex items-center gap-1 pl-1.5">
                        <p className="font-mono text-sm text-gray-600">{item.tanggal}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${getStatusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-1">
                        <div className="flex items-center gap-1">
                          <p className="font-mono text-sm font-bold text-gray-700 px-1.5 py-0.5 rounded-md">{item.kode}</p>
                        </div>
                        <p className="text-xl font-bold text-gray-900">{item.customer.nama}</p>
                        <p className="text-sm text-gray-500">{item.customer.email}</p>
                        <p className="text-sm text-gray-500">{item.customer.telp}</p>
                      </div>
                    </div>

                    {/* Info Tiket */}
                    <div className="text-right">
                      <span className={`px-2 py-1 text-sm font-bold rounded-md ${getTipeClass(item.tipe)}`}>
                        {item.tipe}
                      </span>
                      <p className="text-base font-medium text-gray-700 mt-1">{item.jumlah} tiket</p>
                      <p className="text-base font-semibold text-gray-800">{formatRupiah(item.total)}</p>
                    </div>
                  </div>

                  {/* Bagian Kanan - Aksi */}
                  <div className="md:w-52 bg-gray-50 rounded-lg p-3 flex flex-col justify-between">
                    <div className="flex justify-start items-center gap-1 mt-2">
                      <button className="p-1.5 text-blue-800 hover:bg-blue-100 hover:text-blue-900 rounded-full transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-100 hover:text-red-800 rounded-full transition-colors" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-800 rounded-full transition-colors" title="Detail">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
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
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                  Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredData.length)} dari {filteredData.length} data
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-medium text-gray-700">Halaman {currentPage} dari {totalPages}</span>
                  <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}