"use client";
import { useState } from "react";
import Sidebar2 from "../../../../components/Sidebar2";
import { FaSearch, FaTicketAlt, FaQrcode } from "react-icons/fa";

// Data dummy untuk tabel
const dummyData = [
  {
    noTiket: "EB-0023-1/2-M",
    namaPemesan: "Alex Johnson",
    email: "alex.johnson@example.com",
    jenisTiket: "Early Bird SOERATS 2025",
    tanggalScan: "08-04-2025 14:52"
  },
  {
    noTiket: "EB-0024-2/2-F",
    namaPemesan: "Sarah Miller",
    email: "sarah.miller@example.com",
    jenisTiket: "Early Bird SOERATS 2025",
    tanggalScan: "16-03-2025 21:38"
  },
  {
    noTiket: "EB-0025-1/2-M",
    namaPemesan: "Michael Chen",
    email: "michael.chen@example.com",
    jenisTiket: "Early Bird SOERATS 2025",
    tanggalScan: "23-03-2025 13:12"
  },
  {
    noTiket: "EB-0026-2/2-F",
    namaPemesan: "Jessica Wong",
    email: "jessica.wong@example.com",
    jenisTiket: "Early Bird SOERATS 2025",
    tanggalScan: "24-03-2025 09:45"
  },
  {
    noTiket: "EB-0027-1/20-M",
    namaPemesan: "David Kim",
    email: "david.kim@example.com",
    jenisTiket: "Early Bird SOERATS 2025",
    tanggalScan: "25-03-2025 16:30"
  }
];

export default function PenukaranTiketPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [scannedTickets, setScannedTickets] = useState(dummyData);

  const handleSearch = () => {
    // Simulasi pencarian
    if (searchInput.trim()) {
      setSearchResult({
        nama: "Alex Johnson",
        email: "alex.johnson@example.com",
        jenisTiket: "Early Bird SOERATS 2025",
        harga: "Rp53.000"
      });
    } else {
      setSearchResult(null);
    }
  };

  const handleScan = () => {
    // Simulasi scan
    if (searchResult) {
      // Tambahkan tiket ke daftar yang sudah di-scan
      const newScannedTicket = {
        noTiket: `EB-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1 + Math.random() * 2)}/2-${Math.random() > 0.5 ? 'M' : 'F'}`,
        namaPemesan: searchResult.nama,
        email: searchResult.email,
        jenisTiket: searchResult.jenisTiket,
        tanggalScan: new Date().toLocaleString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).replace(',', '')
      };
      
      setScannedTickets([newScannedTicket, ...scannedTickets]);
      setSearchInput("");
      setSearchResult(null);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar2 adminName="Admin Tiket" />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Penukaran Tiket dan Gelang</h1>
        
        {/* Scan Tiket Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Scan Tiket</h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Input dan Scan Button */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-3 pr-12 text-gray-800 focus:border-blue-300 focus:outline-none"
                  placeholder="Masukkan kode tiket atau scan QR"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={handleSearch}
                >
                  <FaSearch className="text-xl" />
                </button>
              </div>
              
              <button 
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow transition flex items-center justify-center gap-2"
                onClick={handleSearch}
              >
                <FaQrcode className="text-xl" />
                Scan
              </button>
            </div>
            
            {/* Hasil Pencarian */}
            <div className="w-full md:w-1/2 bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Hasil Pencarian</h3>
              
              {searchResult ? (
                <div className="space-y-2">
                  <div className="flex">
                    <div className="w-28 font-medium text-gray-800">Nama</div>
                    <div className="w-4 text-right text-gray-800">:</div>
                    <div className="flex-1 pl-2 text-gray-800">{searchResult.nama}</div>
                  </div>
                  <div className="flex">
                    <div className="w-28 font-medium text-gray-800">Email</div>
                    <div className="w-4 text-right text-gray-800">:</div>
                    <div className="flex-1 pl-2 text-gray-800">{searchResult.email}</div>
                  </div>
                  <div className="flex">
                    <div className="w-28 font-medium text-gray-800">Jenis Tiket</div>
                    <div className="w-4 text-right text-gray-800">:</div>
                    <div className="flex-1 pl-2 text-gray-800">{searchResult.jenisTiket}</div>
                  </div>
                  <div className="flex">
                    <div className="w-28 font-medium text-gray-800">Harga</div>
                    <div className="w-4 text-right text-gray-800">:</div>
                    <div className="flex-1 pl-2 text-gray-800">{searchResult.harga}</div>
                  </div>
                  
                  <button 
                    className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow transition"
                    onClick={handleScan}
                  >
                    Simpan
                  </button>
                </div>
              ) : (
                <div className="text-gray-500 italic">Belum ada hasil pencarian</div>
              )}
            </div>
          </div>
        </div>
        
        {/* Tabel Tiket yang Sudah Di-scan */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Daftar Tiket yang Sudah Ditukar</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-bold text-gray-800">No. Tiket</th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-bold text-gray-800">Nama Pemesan</th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-bold text-gray-800">Email</th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-bold text-gray-800">Jenis Tiket</th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-bold text-gray-800">Tanggal Scan</th>
                </tr>
              </thead>
              <tbody>
                {scannedTickets.map((ticket, index) => (
                  <tr key={index} className="even:bg-gray-50 hover:bg-blue-50 transition">
                    <td className="border-b border-gray-200 px-4 py-3 text-gray-800">{ticket.noTiket}</td>
                    <td className="border-b border-gray-200 px-4 py-3 text-gray-800">{ticket.namaPemesan}</td>
                    <td className="border-b border-gray-200 px-4 py-3 text-gray-800">{ticket.email}</td>
                    <td className="border-b border-gray-200 px-4 py-3 text-gray-800">{ticket.jenisTiket}</td>
                    <td className="border-b border-gray-200 px-4 py-3 text-gray-800">{ticket.tanggalScan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
            <span>Showing 1 to {scannedTickets.length} of {scannedTickets.length} entries</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 rounded-full border border-gray-300 bg-gray-100 font-semibold">Previous</button>
              <span className="mx-2 font-semibold">1</span>
              <button className="px-3 py-1 rounded-full border border-gray-300 bg-gray-100 font-semibold">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}