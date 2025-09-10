"use client";
import { useState, useEffect } from "react";
import Sidebar2 from "../../../../components/Sidebar2";
import { Search, RefreshCw, Trash2, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

// Interface untuk data form
interface FormData {
  nama: string;
  noWa: string;
  email: string;
  jenisTicket: string;
  jumlahTicket: number;
  panitia: string;
}

// Interface untuk data penjualan
interface SaleData {
  id: number;
  nama: string;
  noWa: string;
  email: string;
  jenisTicket: string;
  jumlahTicket: number;
  panitia: string;
  totalHarga: string;
  dibayarkan: string;
  tanggalPemesanan: string;
}

// Data dummy untuk tabel penjualan
const DUMMY_SALES: SaleData[] = [
  { id: 1, 
    nama: "Budi Santoso", 
    noWa: "081234567890", 
    email: "budi@example.com", 
    jenisTicket: "Regular", 
    jumlahTicket: 2, 
    panitia: "Soegeng", 
    totalHarga: "Rp 100.000", 
    dibayarkan: "Rp 100.000", 
    tanggalPemesanan: "2025-10-15 08:30" 
  },
  { id: 2, 
    nama: "Dewi Lestari", 
    noWa: "081298765432", 
    email: "dewi@example.com", 
    jenisTicket: "VIP", 
    jumlahTicket: 1, 
    panitia: "Soegeng", 
    totalHarga: "Rp 250.000", 
    dibayarkan: "Rp 250.000", 
    tanggalPemesanan: "2025-10-16 09:15" 
  },
  { id: 3, 
    nama: "Ahmad Rizki", 
    noWa: "085712345678", 
    email: "ahmad@example.com", 
    jenisTicket: "Regular", 
    jumlahTicket: 3, 
    panitia: "Bambang", 
    totalHarga: "Rp 150.000", 
    dibayarkan: "Rp 150.000", 
    tanggalPemesanan: "2025-10-17 10:45" 
  },
  { id: 4, 
    nama: "Siti Nurhaliza", 
    noWa: "087812345678", 
    email: "siti@example.com", 
    jenisTicket: "VIP", 
    jumlahTicket: 2, 
    panitia: "Bambang", 
    totalHarga: "Rp 500.000", 
    dibayarkan: "Rp 500.000", 
    tanggalPemesanan: "2025-10-18 13:20" 
  },
  { id: 5, 
    nama: "Rudi Hermawan", 
    noWa: "089912345678", 
    email: "rudi@example.com", 
    jenisTicket: "Regular", 
    jumlahTicket: 1, 
    panitia: "Soegeng", 
    totalHarga: "Rp 50.000", 
    dibayarkan: "Rp 50.000", 
    tanggalPemesanan: "2025-10-19 14:05" 
  },
  { id: 6, 
    nama: "Aditi Surya", 
    noWa: "081234567891", 
    email: "aditi@example.com", 
    jenisTicket: "VVIP", 
    jumlahTicket: 2, 
    panitia: "Panitia", 
    totalHarga: "Rp 1.000.000", 
    dibayarkan: "Rp 1.000.000", 
    tanggalPemesanan: "2025-10-20 15:30" 
  },
  { id: 7, 
    nama: "Arjuna Wijaya", 
    noWa: "081234567892", 
    email: "arjuna@example.com", 
    jenisTicket: "VIP", 
    jumlahTicket: 3, 
    panitia: "Panitia", 
    totalHarga: "Rp 750.000", 
    dibayarkan: "Rp 750.000", 
    tanggalPemesanan: "2025-10-21 16:45" 
  },
  { id: 8, 
    nama: "Kirana Dewi", 
    noWa: "081234567893", 
    email: "kirana@example.com", 
    jenisTicket: "Regular", 
    jumlahTicket: 4, 
    panitia: "Panitia", 
    totalHarga: "Rp 200.000", 
    dibayarkan: "Rp 200.000", 
    tanggalPemesanan: "2025-10-22 11:10" 
  },
  { id: 9, 
    nama: "Lakshmi Purnama", 
    noWa: "081234567894", 
    email: "lakshmi@example.com", 
    jenisTicket: "VVIP", 
    jumlahTicket: 1, 
    panitia: "Panitia", 
    totalHarga: "Rp 500.000", 
    dibayarkan: "Rp 500.000", 
    tanggalPemesanan: "2025-10-23 09:25" 
  },
  { id: 10, 
    nama: "Vishnu Mahendra", 
    noWa: "081234567895", 
    email: "vishnu@example.com", 
    jenisTicket: "VIP", 
    jumlahTicket: 2, 
    panitia: "Panitia", 
    totalHarga: "Rp 500.000", 
    dibayarkan: "Rp 500.000", 
    tanggalPemesanan: "2025-10-24 12:40" 
  },
];

// Data dummy untuk jenis tiket
const TICKET_TYPES = [
  { id: 1, name: "Regular", price: 50000 },
  { id: 2, name: "VIP", price: 250000 },
  { id: 3, name: "VVIP", price: 500000 },
];

export default function PenjualanOfflinePage() {
  // State untuk form
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    noWa: "",
    email: "",
    jenisTicket: "",
    jumlahTicket: 1,
    panitia: "Panitia Event",
  });
  
  // State untuk data penjualan
  const [salesData, setSalesData] = useState<SaleData[]>(DUMMY_SALES);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Deteksi ukuran layar untuk tampilan mobile
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const adminName = "Panitia";
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Cek saat komponen dimuat
    checkIsMobile();
    
    // Tambahkan event listener untuk resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup event listener saat komponen unmount
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };
  
  // Pengaturan paginasi
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Filter data berdasarkan pencarian
  const filteredData = salesData.filter(item => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      item.nama.toLowerCase().includes(searchTermLower) ||
      item.email.toLowerCase().includes(searchTermLower) ||
      item.noWa.includes(searchTerm) ||
      item.jenisTicket.toLowerCase().includes(searchTermLower)
    );
  });
  
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  // Hitung total harga berdasarkan jenis tiket yang dipilih
  const selectedTicket = TICKET_TYPES.find(ticket => ticket.name === formData.jenisTicket);
  const ticketPrice = selectedTicket ? selectedTicket.price : 0;
  const totalPrice = ticketPrice * formData.jumlahTicket;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "jumlahTicket" ? parseInt(value) : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Tambahkan data baru ke tabel
    const newSale: SaleData = {
      id: salesData.length + 1,
      nama: formData.nama,
      noWa: formData.noWa,
      email: formData.email,
      jenisTicket: formData.jenisTicket,
      jumlahTicket: formData.jumlahTicket,
      panitia: formData.panitia,
      totalHarga: `Rp ${totalPrice.toLocaleString()}`,
      dibayarkan: `Rp ${totalPrice.toLocaleString()}`,
      tanggalPemesanan: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    
    setSalesData([...salesData, newSale]);
    
    // Reset form
    setFormData({
      nama: "",
      noWa: "",
      email: "",
      jenisTicket: "",
      jumlahTicket: 1,
      panitia: "Panitia Event",
    });
  };
  
  const handleDelete = (id: number) => {
    setSalesData(salesData.filter(item => item.id !== id));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500); // Animasi berputar selama 0.5 detik
  };

  // Fungsi untuk mendapatkan kelas warna berdasarkan tipe tiket
  const getTipeClass = (tipe: string) => {
    switch (tipe) {
      case "Regular":
        return "bg-green-100 text-green-800";
      case "VIP":
        return "bg-blue-100 text-blue-800";
      case "VVIP":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const formatTanggal = (tanggalStr: string) => {
    const [tanggal, waktu] = tanggalStr.split(' ');
    const [tahun, bulan, hari] = tanggal.split('-');
    return `${hari}-${bulan}-${tahun} ${waktu}`;
  };
  
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
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Penjualan Offline</h1>
              </div>
            </div>
            
            {/* Form dan Rincian */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 px-4 md:px-8">
              {/* Form Pemesanan - 2 kolom pertama */}
              <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-4 md:p-6">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. WA</label>
                    <input
                      type="text"
                      name="noWa"
                      value={formData.noWa}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Tiket</label>
                    <input
                      type="number"
                      name="jumlahTicket"
                      value={formData.jumlahTicket}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Tiket</label>
                    <select
                      name="jenisTicket"
                      value={formData.jenisTicket}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium"
                      required
                    >
                      <option value="">Pilih Jenis Tiket</option>
                      {TICKET_TYPES.map((ticket) => (
                        <option key={ticket.name} value={ticket.name}>{ticket.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Panitia</label>
                    <input
                      type="text"
                      name="panitia"
                      value={formData.panitia}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shadow-sm"
                    >
                      Pesan Sekarang
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Rincian Harga - kolom ketiga */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Rincian Harga</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Jenis Tiket</span>
                    <span className="font-medium">{formData.jenisTicket || "-"}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Harga per Tiket</span>
                    <span className="font-medium">{ticketPrice ? `Rp ${ticketPrice.toLocaleString()}` : "-"}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Jumlah Tiket</span>
                    <span className="font-medium">{formData.jumlahTicket}</span>
                  </div>
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-bold">Total</span>
                      <span className="text-blue-600 font-bold">{totalPrice ? `Rp ${totalPrice.toLocaleString()}` : "-"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rekap Data Penjualan */}
            <div className="px-4 md:px-8 pb-8">
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Rekap Data Penjualan Offline</h2>
                
                {/* Search dan Refresh */}
                <div className="flex flex-wrap justify-between items-center text-black mb-4 gap-2">
                  <div className="relative w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Cari data..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center gap-2 md:gap-3">
                    <button
                      onClick={handleRefresh}
                      className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-900 text-sm md:text-base"
                    >
                      <RefreshCw className={`h-4 w-4 md:h-5 md:w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>

                    {/* Total Tiket */}
                    <div className="px-3 md:px-4 py-1.5 md:py-2 text-gray-600 font-medium text-sm md:text-base">
                      Total: {filteredData.length} tiket
                    </div>
                  </div>
                </div>
                
                {/* Card Data */}
                <div className="space-y-3 md:space-y-4">
                  {currentItems.map((item) => (
                    <div key={item.id} className="flex flex-row gap-2"> 
                      {/* Bagian Kiri - Informasi Utama */}
                      <div className="flex-1 bg-gray-50 rounded-lg p-2 md:p-4 flex justify-between items-center">
                        {/* Info Pemesan */}
                        <div>
                          <div className="flex items-center gap-1 md:gap-2">
                            <p className="font-mono text-[10px] md:text-sm text-gray-600">{formatTanggal(item.tanggalPemesanan)}</p>
                            <span className={"text-[10px] md:text-xs font-semibold px-1 md:px-2 py-0.5 rounded-md " + getTipeClass(item.jenisTicket)}>
                              {item.jenisTicket}
                            </span>
                          </div>
                          <div className="mt-0.5">
                            <p className="text-sm md:text-xl font-bold text-gray-900">{item.nama}</p>
                            <p className="text-[10px] md:text-sm text-gray-500">{item.email}</p>
                            <p className="text-[10px] md:text-sm text-gray-500">{item.noWa}</p>
                          </div>
                        </div>
                
                        {/* Info Tiket dan Pembayaran */}
                        <div className="text-right">
                          <p className={`text-xs md:text-base font-medium ${item.jenisTicket === "Regular" ? "text-green-800" : item.jenisTicket === "VIP" ? "text-blue-800" : item.jenisTicket === "VVIP" ? "text-purple-800" : "text-gray-700"}`}>
                            {item.jenisTicket === "Regular" ? "Rp 50.000" : 
                             item.jenisTicket === "VIP" ? "Rp 250.000" : 
                             item.jenisTicket === "VVIP" ? "Rp 500.000" : "Rp 0"}
                          </p>
                          <p className="text-xs md:text-base font-medium text-gray-700">{item.jumlahTicket} Tiket</p>
                          <p className="text-xs md:text-base font-semibold mt-0.5 md:mt-1 text-gray-800">{item.totalHarga}</p>
                        </div>
                      </div>
                
                      {/* Bagian Kanan - Aksi Hapus */}
                      <div className="w-12 md:w-40 bg-gray-50 rounded-lg p-1 md:p-2 flex justify-center items-center">
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-1 md:p-1.5 text-red-600 hover:bg-red-100 hover:text-red-800 rounded-full transition-colors" 
                          title="Hapus"
                        >
                          <Trash2 size={isMobile ? 14 : 20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Tampilkan pesan jika tidak ada data */}
                {currentItems.length === 0 && (
                  <div className="text-center py-6 md:py-8">
                    <p className="text-gray-500 font-medium text-sm md:text-base">Tidak ada data penjualan</p>
                    <p className="text-gray-400 text-xs md:text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
                  </div>
                )}
                
                {/* Paginasi */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center py-2 md:py-4 mt-2 md:mt-4 px-1 md:px-2">
                    <span className="text-xs md:text-sm text-gray-600">
                      Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
                    </span>
                    <div className="flex items-center gap-0.5 md:gap-1">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-1.5 md:px-3 py-0.5 md:py-1 text-xs md:text-sm rounded-full border border-gray-300 ${currentPage === 1 ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold flex items-center`}
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
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-1.5 md:px-3 py-0.5 md:py-1 text-xs md:text-sm rounded-full border border-gray-300 ${currentPage === totalPages ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold flex items-center`}
                      >
                        Next
                        <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-0.5 md:ml-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );}
