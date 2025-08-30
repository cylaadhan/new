"use client";
import { useState } from "react";
import Sidebar2 from "../../../../components/Sidebar2";
import { Search, RefreshCw, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    noWa: "",
    email: "",
    jenisTicket: "",
    jumlahTicket: 1,
    panitia: "Panitia event",
  });
  const [salesData, setSalesData] = useState<SaleData[]>(DUMMY_SALES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Pagination settings
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Filter data berdasarkan pencarian
  const filteredData = salesData.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.noWa.includes(searchTerm)
  );
  
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  // Hitung harga berdasarkan jenis tiket yang dipilih
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
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar2 adminName="Admin Tiket" />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Penjualan Offline</h1>
        
        {/* Form dan Rincian */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Form Pemesanan - 2 kolom pertama */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {TICKET_TYPES.map(ticket => (
                    <option key={ticket.id} value={ticket.name}>{ticket.name}</option>
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
              
              <div className="md:col-span-2 flex justify-end mt-4">
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Pesan Sekarang
                </button>
              </div>
            </form>
          </div>
          
          {/* Rincian Pemesanan - kolom ketiga */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Rincian</h2>
            <div className="space-y-3">
              <div className="flex">
                <span className="text-gray-600 w-32">Jenis Tiket</span>
                <span className="text-gray-600 mr-2">:</span>
                <span className="font-medium text-gray-700">{formData.jenisTicket || '-'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Harga Satuan</span>
                <span className="text-gray-600 mr-2">:</span>
                <span className="font-medium text-gray-700">{ticketPrice ? `Rp ${ticketPrice.toLocaleString()}` : '-'}</span>

              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Jumlah Tiket</span>
                <span className="text-gray-600 mr-2">:</span>
                <span className="font-medium text-gray-700">{formData.jumlahTicket}</span>

              </div>
              <div className="pt-2 mt-2 border-t border-gray-200">
                <div className="flex">
                  <span className="text-gray-700 font-medium w-32">Harga Total</span>
                  <span className="text-gray-700 mr-2">:</span>
                  <span className="font-semibold text-gray-700">{totalPrice ? `Rp ${totalPrice.toLocaleString()}` : '-'}</span>

                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabel Rekap Penjualan - Diubah menjadi format card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Rekap Data Penjualan Offline</h2>
          
          <div className="flex items-center gap-4 mb-4 justify-between">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama, email, atau no. WA"
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 text-black font-medium" // Diubah dari w-64 menjadi w-80
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              {/* Tombol Refresh */}
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-900"
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
          
          {/* Card Data */}
          <div className="space-y-4">
            {currentItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-2">
                {/* Bagian Kiri - Informasi Utama */}
                <div className="flex-1 bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                  {/* Info Pemesan */}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm text-gray-600">{formatTanggal(item.tanggalPemesanan)}</p>
                      <span className={"text-xs font-semibold px-2 py-1 rounded-md " + getTipeClass(item.jenisTicket)}>
                        {item.jenisTicket}
                      </span>
                    </div>
                    <div className="mt-0.5">
                      <p className="text-xl font-bold text-gray-900">{item.nama}</p>
                      <p className="text-sm text-gray-500">{item.email}</p>
                      <p className="text-sm text-gray-500">{item.noWa}</p>
                    </div>
                  </div>

                  {/* Info Tiket dan Pembayaran */}
                  <div className="text-right">
                    <p className={`text-base font-medium ${item.jenisTicket === "Regular" ? "text-green-800" : item.jenisTicket === "VIP" ? "text-blue-800" : item.jenisTicket === "VVIP" ? "text-purple-800" : "text-gray-700"}`}>
                      {item.jenisTicket === "Regular" ? "Rp 50.000" : 
                       item.jenisTicket === "VIP" ? "Rp 250.000" : 
                       item.jenisTicket === "VVIP" ? "Rp 500.000" : "Rp 0"}
                    </p>
                    <p className="text-base font-medium text-gray-700">{item.jumlahTicket} Tiket</p>
                    <p className="text-base font-semibold mt-1 text-gray-800">{item.totalHarga}</p>
                  </div>
                </div>

                {/* Bagian Kanan - Aksi Hapus */}
                <div className="md:w-52 bg-gray-50 rounded-lg p-3 flex items-center justify-center"> {/* Diubah dari md:w-60 menjadi md:w-52 */}
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-100 hover:text-red-800 rounded-full transition-colors" 
                    title="Hapus"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Tampilkan pesan jika tidak ada data */}
          {currentItems.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 font-medium">Tidak ada data penjualan</p>
              <p className="text-gray-400 text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center py-4 mt-4 px-2">
              <span className="text-sm text-gray-600">
                Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
  );}
