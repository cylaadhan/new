"use client";
import Sidebar from "../../../../components/Sidebar";
import { Search, RefreshCw, FileText, Download, DollarSign, Ticket, Edit, Trash2, Eye, SlidersHorizontal, ListFilter, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const data = [
  {
    tgl: "08-04-2025 14:52",
    nama: "Acyla",
    email: "acyla@gmail.com",
    jenis: "Early Bird",
    jumlah: 2,
    harga: "53000",
    total: "106000",
    dibayar: "120385",
  },
  {
    tgl: "16-03-2025 21:38",
    nama: "Alvarez",
    email: "arez@gmail.com",
    jenis: "Early Bird",
    jumlah: 2,
    harga: "60000", 
    total: "120000", 
    dibayar: "134232",
  },
  {
    tgl: "23-03-2025 13:12",
    nama: "Mimi",
    email: "mimi@gmail.com",
    jenis: "Early Bird",
    jumlah: 20,
    harga: "53000", 
    total: "1060000", 
    dibayar: "1200103", 
  },
  {
    tgl: "05-05-2025 09:30",
    nama: "Adikara",
    email: "adikara@gmail.com",
    jenis: "Presale 1",
    jumlah: 3,
    harga: "75000",
    total: "225000", 
    dibayar: "225500", 
  },
  {
    tgl: "12-05-2025 15:45",
    nama: "Candrika",
    email: "candrika@gmail.com",
    jenis: "VIP",
    jumlah: 1,
    harga: "150000",
    total: "150000",
    dibayar: "150250",
  },
  {
    tgl: "18-05-2025 11:20",
    nama: "Darma",
    email: "darma@gmail.com",
    jenis: "Presale 2",
    jumlah: 4,
    harga: "85000",
    total: "340000",
    dibayar: "340750",
  },
  {
    tgl: "25-05-2025 14:15",
    nama: "Ekalavya",
    email: "ekalavya@gmail.com",
    jenis: "Early Bird",
    jumlah: 2,
    harga: "53000",
    total: "106000",
    dibayar: "106300",
  },
  {
    tgl: "02-06-2025 10:10",
    nama: "Gayatri",
    email: "gayatri@gmail.com",
    jenis: "Presale 3",
    jumlah: 5,
    harga: "95000",
    total: "475000",
    dibayar: "475800",
  },
  {
    tgl: "10-06-2025 16:30",
    nama: "Indrajit",
    email: "indrajit@gmail.com",
    jenis: "VIP",
    jumlah: 2,
    harga: "150000",
    total: "300000",
    dibayar: "300450",
  },
  {
    tgl: "15-06-2025 13:25",
    nama: "Kausalya",
    email: "kausalya@gmail.com",
    jenis: "Presale 1",
    jumlah: 3,
    harga: "75000",
    total: "225000",
    dibayar: "225600",
  },
  {
    tgl: "15-06-2025 13:25",
    nama: "Merisa",
    email: "markisa@gmail.com",
    jenis: "Presale 1",
    jumlah: 3,
    harga: "75000",
    total: "225000",
    dibayar: "225600",
  },
  {
    tgl: "01-07-2025 10:15",
    nama: "Raditya",
    email: "raditya@gmail.com",
    jenis: "Early Bird",
    jumlah: 2,
    harga: "53000",
    total: "106000",
    dibayar: "106300",
  },
  {
    tgl: "03-07-2025 14:30",
    nama: "Kirana",
    email: "kirana@gmail.com",
    jenis: "VIP",
    jumlah: 1,
    harga: "150000",
    total: "150000",
    dibayar: "150250",
  },
  {
    tgl: "05-07-2025 09:45",
    nama: "Bintang",
    email: "bintang@gmail.com",
    jenis: "Presale 2",
    jumlah: 3,
    harga: "85000",
    total: "255000",
    dibayar: "255500",
  },
  {
    tgl: "08-07-2025 16:20",
    nama: "Zahra",
    email: "zahra@gmail.com",
    jenis: "Presale 1",
    jumlah: 2,
    harga: "75000",
    total: "150000",
    dibayar: "150300",
  },
  {
    tgl: "10-07-2025 11:10",
    nama: "Daffa",
    email: "daffa@gmail.com",
    jenis: "Early Bird",
    jumlah: 4,
    harga: "53000",
    total: "212000",
    dibayar: "212500",
  },
  {
    tgl: "12-07-2025 13:40",
    nama: "Nasywa",
    email: "nasywa@gmail.com",
    jenis: "Presale 3",
    jumlah: 2,
    harga: "95000",
    total: "190000",
    dibayar: "190400",
  },
  {
    tgl: "15-07-2025 15:25",
    nama: "Rizky",
    email: "rizky@gmail.com",
    jenis: "VIP",
    jumlah: 1,
    harga: "150000",
    total: "150000",
    dibayar: "150250",
  },
  {
    tgl: "18-07-2025 10:30",
    nama: "Aqila",
    email: "aqila@gmail.com",
    jenis: "Presale 2",
    jumlah: 3,
    harga: "85000",
    total: "255000",
    dibayar: "255500",
  },
  {
    tgl: "20-07-2025 14:15",
    nama: "Farhan",
    email: "farhan@gmail.com",
    jenis: "Presale 1",
    jumlah: 2,
    harga: "75000",
    total: "150000",
    dibayar: "150300",
  },
];

// Fungsi untuk mendapatkan kelas warna berdasarkan tipe tiket
const getJenisClass = (jenis: string | string[]) => {
  if (jenis.includes("Early Bird")) {
    return "bg-green-100 text-green-800";
  } else if (jenis.includes("Presale 1")) {
    return "bg-blue-100 text-blue-800";
  } else if (jenis.includes("Presale 2")) {
    return "bg-purple-100 text-purple-800";
  } else if (jenis.includes("Presale 3")) {
    return "bg-indigo-100 text-indigo-800";
  } else if (jenis.includes("VIP")) {
    return "bg-red-100 text-red-800";
  } else {
    return "bg-gray-100 text-gray-800";
  }
};


const formatRupiah = (angka: string) => {
  // Hapus "Rp" dan karakter non-digit
  const numericValue = angka.replace(/[^0-9]/g, "");
  
  // Format angka menggunakan Intl.NumberFormat
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(numericValue));
};

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [jenisFilter, setJenisFilter] = useState("Semua Jenis");
  const [showFilter, setShowFilter] = useState(false);

  // Reset halaman saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, jenisFilter]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Reset ke halaman pertama saat refresh
    setCurrentPage(1);
    
    // Simulasi delay loading
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  // Filter data berdasarkan pencarian dan jenis tiket
  const filteredData = data.filter((item) => {
    // Filter berdasarkan pencarian
    const matchesSearch = searchQuery === "" || 
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jenis.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter berdasarkan jenis tiket
    const matchesJenis = jenisFilter === "Semua Jenis" || item.jenis === jenisFilter;
    
    return matchesSearch && matchesJenis;
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
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        {/* Judul dan Tombol Filter/Refresh */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Tiket</h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center justify-center w-10 h-10 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition transform hover:scale-105"
              title="Filter"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-900"
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
        
        {/* Statistik Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Box Jumlah Tiket Terjual - Besar */}
          <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer">
            <div>
              <p className="text-gray-500">Jml Tiket Terjual</p>
              <p className="text-4xl font-bold text-gray-900">24</p>
            </div>
            <div className="bg-blue-500 text-white p-4 rounded-lg">
              <Ticket className="h-7 w-7" />
            </div>
          </div>
          
          {/* Box Total Harga Tiket - Besar */}
          <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer">
            <div>
              <p className="text-gray-500">Total Harga Tiket</p>
              <p className="text-4xl font-bold text-gray-900">Rp1.286.000</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg">
              <DollarSign className="h-7 w-7" />
            </div>
          </div>
        </div>
        
        {/* Box Kecil di Bawah */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Box Total Fee - Kecil */}
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md hover:scale-[1.01] transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Fee</div>
            <div className="text-xl font-bold text-orange-600">Rp168.000</div>
          </div>
          
          {/* Box Total Kode Unik - Kecil */}
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md hover:scale-[1.01] transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Kode Unik</div>
            <div className="text-xl font-bold text-orange-600">Rp720</div>
          </div>
        </div>

        {/* Export Data Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="font-bold text-lg text-gray-800">Export Data</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label className="block font-medium mb-1 text-gray-700 text-sm">Dari</label>
                  <input type="date" className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="2025-07-21" />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-700 text-sm">Sampai</label>
                  <input type="date" className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="2025-07-21" />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition">
                  <Download className="w-5 h-5" />
                  <span>Export</span>
                </button>
                <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition">
                  <FileText className="h-4 w-4" />
                  <span>Statistik Referral</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Filter */}
        {showFilter && (
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-800 text-lg">Filter Data</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-gray-700 text-sm">Jenis Tiket</label>
                  <select 
                    className="border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
                    value={jenisFilter}
                    onChange={(e) => setJenisFilter(e.target.value)}
                  >
                    <option>Semua Jenis</option>
                    <option>Early Bird</option>
                    <option>Presale 1</option>
                    <option>Presale 2</option>
                    <option>Presale 3</option>
                    <option>VIP</option>
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

        {/* Filter & Search */}
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
            
            {/* Total Tiket */}
            <div className="px-4 py-2 text-gray-600 font-medium">
              Total: {filteredData.length} tiket
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentItems.map((item, index) => (
              <div key={index} className="flex flex-col bg-gray-50 rounded-lg overflow-hidden">
                {/* Bagian Atas - Informasi Utama */}
                <div className="p-4 flex justify-between items-center">
                  {/* Info Tiket dan Pemesan */}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm text-gray-600">{item.tgl}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-md ${getJenisClass(item.jenis)}`}>
                        {item.jenis}
                      </span>
                    </div>
                    <div className="mt-1">
                      <p className="text-xl font-bold text-gray-900">{item.nama}</p>
                      <p className="text-sm text-gray-500">{item.email}</p>
                    </div>
                  </div>

                  {/* Info Tiket */}
                  <div className="text-right">
                    <p className="text-base font-medium text-gray-700">{formatRupiah(item.harga)}</p>
                    <p className="text-base font-medium text-gray-700">{item.jumlah} tiket</p>
                    <p className="text-base font-semibold text-gray-800">{formatRupiah(item.total)}</p>
                    <p className="text-base text-gray-800 font-semibold">{formatRupiah(item.dibayar)}</p>
                  </div>
                </div>

                {/* Bagian Bawah - Aksi */}
                <div className="bg-gray-50 p-3 flex items-center justify-center gap-2 border-t border-gray-200">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" title="Daftar Tiket">
                    <Ticket size={18} />
                    <span>Daftar Tiket</span>
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
            <div className="flex justify-between items-center py-4 mt-4 px-2">
              <span className="text-sm text-gray-600">
                Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-full border border-gray-300 ${currentPage === 1 ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold flex items-center`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === page ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-full border border-gray-300 ${currentPage === totalPages ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold flex items-center`}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}