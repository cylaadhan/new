"use client";
import Sidebar from "../../../../components/Sidebar";
import { Search, RefreshCw, FileText, Download, DollarSign, Ticket } from "lucide-react";
import { useState } from "react";

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
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [jenisFilter, setJenisFilter] = useState("Semua Jenis");

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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        {/* Judul dan Tombol Refresh */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daftar Tiket</h1>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-900"
          >
            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
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

          {/* Filter Jenis Tiket (dipindahkan ke sebelah kiri Show entries) */}
          <div className="flex items-center gap-4">
            {/* Filter Jenis Tiket */}
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
          
            {/* Items Per Page (dipindahkan ke sebelah kanan Filter Jenis Tiket) */}
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
            </div>
          </div>
        </div>

        {/* Daftar Tiket dalam format Tabel */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tgl Pemesanan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nama Pemesan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Jenis Tiket</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Jumlah Tiket</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Harga Satuan</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Total Harga</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Jumlah Dibayarkan</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.tgl}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-sm font-medium rounded-md ${getJenisClass(item.jenis)}`}>
                        {item.jenis}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{item.jumlah}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Rp{item.harga}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Rp{item.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Rp{item.dibayar}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-4 py-2 rounded-md text-sm transition">
                        Daftar Tiket
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Tampilkan pesan jika tidak ada data */}
          {currentItems.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 font-medium">Tidak ada data yang ditemukan</p>
              <p className="text-gray-400 text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
          
          {/* Pagination */}
          <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
            <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries</span>
            <div className="flex items-center gap-2">
              <button 
                className="px-3 py-1 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 font-medium transition"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-3 py-1 rounded-lg border border-gray-300 bg-white font-medium">{currentPage}</span>
              <button 
                className="px-3 py-1 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 font-medium transition"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}