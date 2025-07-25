"use client";
import { useState } from "react";
import Sidebar2 from "../../../../components/Sidebar2";
import { FaTrash } from "react-icons/fa";

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
  { id: 1, nama: "Budi Santoso", noWa: "081234567890", email: "budi@example.com", jenisTicket: "Regular", jumlahTicket: 2, panitia: "Soegeng", totalHarga: "Rp 100.000", dibayarkan: "Rp 100.000", tanggalPemesanan: "2023-10-15" },
  { id: 2, nama: "Dewi Lestari", noWa: "081298765432", email: "dewi@example.com", jenisTicket: "VIP", jumlahTicket: 1, panitia: "Soegeng", totalHarga: "Rp 250.000", dibayarkan: "Rp 250.000", tanggalPemesanan: "2023-10-16" },
  { id: 3, nama: "Ahmad Rizki", noWa: "085712345678", email: "ahmad@example.com", jenisTicket: "Regular", jumlahTicket: 3, panitia: "Bambang", totalHarga: "Rp 150.000", dibayarkan: "Rp 150.000", tanggalPemesanan: "2023-10-17" },
  { id: 4, nama: "Siti Nurhaliza", noWa: "087812345678", email: "siti@example.com", jenisTicket: "VIP", jumlahTicket: 2, panitia: "Bambang", totalHarga: "Rp 500.000", dibayarkan: "Rp 500.000", tanggalPemesanan: "2023-10-18" },
  { id: 5, nama: "Rudi Hermawan", noWa: "089912345678", email: "rudi@example.com", jenisTicket: "Regular", jumlahTicket: 1, panitia: "Soegeng", totalHarga: "Rp 50.000", dibayarkan: "Rp 50.000", tanggalPemesanan: "2023-10-19" },
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
    panitia: "Panitia Soegeng",
  });
  const [salesData, setSalesData] = useState<SaleData[]>(DUMMY_SALES);
  
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
      tanggalPemesanan: new Date().toISOString().split('T')[0],
    };
    
    setSalesData([...salesData, newSale]);
    
    // Reset form
    setFormData({
      nama: "",
      noWa: "",
      email: "",
      jenisTicket: "",
      jumlahTicket: 1,
      panitia: "Panitia Soegeng",
    });
  };
  
  const handleDelete = (id: number) => {
    setSalesData(salesData.filter(item => item.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-black">
      <Sidebar2 adminName="Admin Tiket" />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Penjualan Offline</h1>
        
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Tiket</label>
                <select
                  name="jenisTicket"
                  value={formData.jenisTicket}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">-- Pilih Jenis Tiket --</option>
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
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
                />
              </div>
              
              <div className="md:col-span-2 flex justify-end mt-4">
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
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
                <span className="font-medium">{formData.jenisTicket || '-'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Harga Satuan</span>
                <span className="text-gray-600 mr-2">:</span>
                <span className="font-medium">{ticketPrice ? `Rp ${ticketPrice.toLocaleString()}` : '-'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Jumlah Tiket</span>
                <span className="text-gray-600 mr-2">:</span>
                <span className="font-medium">{formData.jumlahTicket}</span>
              </div>
              <div className="pt-2 mt-2 border-t border-gray-200">
                <div className="flex">
                  <span className="text-gray-700 font-medium w-32">Harga Total</span>
                  <span className="text-gray-700 mr-2">:</span>
                  <span className="font-semibold">{totalPrice ? `Rp ${totalPrice.toLocaleString()}` : '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabel Rekap Penjualan */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Rekap Data Penjualan Offline</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari nama, email, atau no. WA"
                className="pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Pemesanan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pemesan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Tiket</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Tiket</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Harga</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Dibayarkan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggalPemesanan}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.nama}</div>
                        <div className="text-sm text-gray-500">{item.noWa}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jenisTicket}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jumlahTicket}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.totalHarga}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.dibayarkan}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                      Tidak ada data penjualan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} dari {filteredData.length} data
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}