"use client";
import { useState, useEffect } from "react";
import Sidebar2 from "../../../../components/Sidebar2";
import { Search, RefreshCw, Download, QrCode, ScanLine, ChevronLeft, ChevronRight, Eye, EyeOff, CheckCircle, TicketIcon, Calendar } from "lucide-react";

// Data dummy untuk tabel
const dummyData = [
  {
    noTiket: "EB-0023-1/2-M",
    namaPemesan: "Arjuna Wijaya",
    email: "arjuna@gmail.com",
    jenisTiket: "Early Bird",
    tanggalScan: "08-04-2025 14:52"
  },
  {
    noTiket: "EB-0024-2/2-F",
    namaPemesan: "Dewi Saraswati",
    email: "dewi@gmail.com",
    jenisTiket: "Presale 1",
    tanggalScan: "16-03-2025 21:38"
  },
  {
    noTiket: "EB-0025-1/2-M",
    namaPemesan: "Rama Aditya",
    email: "rama@gmail.com",
    jenisTiket: "Presale 2",
    tanggalScan: "23-03-2025 13:12"
  },
  {
    noTiket: "EB-0026-2/2-F",
    namaPemesan: "Lakshmi Devi",
    email: "lakshmi@gmail.com",
    jenisTiket: "Presale 3",
    tanggalScan: "24-03-2025 09:45"
  },
  {
    noTiket: "EB-0027-1/20-M",
    namaPemesan: "Krishna Putra",
    email: "krishna@gmail.com",
    jenisTiket: "VIP",
    tanggalScan: "25-03-2025 16:30"
  },
  // 5 data tambahan untuk halaman kedua
  {
    noTiket: "EB-0028-1/3-F",
    namaPemesan: "Indra Surya",
    email: "indra@gmail.com",
    jenisTiket: "Early Bird",
    tanggalScan: "26-03-2025 10:15"
  },
  {
    noTiket: "EB-0029-2/3-M",
    namaPemesan: "Agni Deva",
    email: "agni@gmail.com",
    jenisTiket: "Presale 1",
    tanggalScan: "27-03-2025 11:30"
  },
  {
    noTiket: "EB-0030-3/3-F",
    namaPemesan: "Maya Shakti",
    email: "maya@gmail.com",
    jenisTiket: "Presale 2",
    tanggalScan: "28-03-2025 12:45"
  },
  {
    noTiket: "EB-0031-1/4-M",
    namaPemesan: "Surya Chandra",
    email: "surya@gmail.com",
    jenisTiket: "Presale 3",
    tanggalScan: "29-03-2025 13:20"
  },
  {
    noTiket: "EB-0032-2/4-F",
    namaPemesan: "Aditi Purnama",
    email: "aditi@gmail.com",
    jenisTiket: "VIP",
    tanggalScan: "30-03-2025 14:10"
  },
  // 10 data tambahan baru
  {
    noTiket: "EB-0033-1/5-M",
    namaPemesan: "Vishnu Dharma",
    email: "vishnu@gmail.com",
    jenisTiket: "Early Bird",
    tanggalScan: "31-03-2025 15:20"
  },
  {
    noTiket: "EB-0034-2/5-F",
    namaPemesan: "Sita Devi",
    email: "sita@gmail.com",
    jenisTiket: "Presale 1",
    tanggalScan: "01-04-2025 16:30"
  },
  {
    noTiket: "EB-0035-3/5-M",
    namaPemesan: "Ganesha Vidya",
    email: "ganesha@gmail.com",
    jenisTiket: "Presale 2",
    tanggalScan: "02-04-2025 17:40"
  },
  {
    noTiket: "EB-0036-4/5-F",
    namaPemesan: "Parvati Shakti",
    email: "parvati@gmail.com",
    jenisTiket: "Presale 3",
    tanggalScan: "03-04-2025 18:50"
  },
  {
    noTiket: "EB-0037-5/5-M",
    namaPemesan: "Brahma Vidya",
    email: "brahma@gmail.com",
    jenisTiket: "VIP",
    tanggalScan: "04-04-2025 19:00"
  },
  {
    noTiket: "EB-0038-1/6-F",
    namaPemesan: "Durga Mata",
    email: "durga@gmail.com",
    jenisTiket: "Early Bird",
    tanggalScan: "05-04-2025 20:10"
  },
  {
    noTiket: "EB-0039-2/6-M",
    namaPemesan: "Hanuman Vira",
    email: "hanuman@gmail.com",
    jenisTiket: "Presale 1",
    tanggalScan: "06-04-2025 21:20"
  },
  {
    noTiket: "EB-0040-3/6-F",
    namaPemesan: "Radha Priya",
    email: "radha@gmail.com",
    jenisTiket: "Presale 2",
    tanggalScan: "07-04-2025 22:30"
  },
  {
    noTiket: "EB-0041-4/6-M",
    namaPemesan: "Shiva Nataraja",
    email: "shiva@gmail.com",
    jenisTiket: "Presale 3",
    tanggalScan: "08-04-2025 23:40"
  },
  {
    noTiket: "EB-0042-5/6-F",
    namaPemesan: "Kali Shakti",
    email: "kali@gmail.com",
    jenisTiket: "VIP",
    tanggalScan: "09-04-2025 00:50"
  }
];

export default function PenukaranTiketPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [scannedTickets, setScannedTickets] = useState(dummyData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("Semua Tipe");
  const [searchTableInput, setSearchTableInput] = useState("");
  
  // Pagination settings
  const itemsPerPage = 10;
  
  // Reset halaman saat filter atau pencarian berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, searchTableInput]);
  
  const handleSearch = () => {
    // Simulasi pencarian dengan data yang lebih realistis
    if (searchInput.trim()) {
      // Cari tiket yang belum di-scan berdasarkan input
      const tiketTypes = ["Early Bird", "Presale 1", "Presale 2", "Presale 3", "VIP"];
      const randomType = tiketTypes[Math.floor(Math.random() * tiketTypes.length)];
      const randomPrice = randomType === "VIP" ? "Rp150.000" : 
                         randomType === "Presale 3" ? "Rp100.000" : 
                         randomType === "Presale 2" ? "Rp85.000" : 
                         randomType === "Presale 1" ? "Rp70.000" : "Rp53.000";
      
      // Gunakan nama Sansekerta yang estetik
      const names = ["Aditya Surya", "Deva Putra", "Kirana Dewi", "Mahendra Wijaya", "Nirmala Devi"];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const firstName = randomName.split(" ")[0].toLowerCase();
      
      setSearchResult({
        nama: randomName,
        email: `${firstName}@gmail.com`,
        jenisTiket: randomType,
        harga: randomPrice
      });
    } else {
      setSearchResult(null);
    }
  };

  const handleScan = () => {
    // Simulasi scan dengan data yang lebih realistis
    if (searchResult) {
      // Buat nomor tiket yang realistis berdasarkan jenis tiket
      const prefix = searchResult.jenisTiket === "Early Bird" ? "EB" : 
                    searchResult.jenisTiket === "Presale 1" ? "PS1" : 
                    searchResult.jenisTiket === "Presale 2" ? "PS2" : 
                    searchResult.jenisTiket === "Presale 3" ? "PS3" : "VIP";
      
      // Tambahkan tiket ke daftar yang sudah di-scan
      const newScannedTicket = {
        noTiket: `${prefix}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1 + Math.random() * 2)}/2-${Math.random() > 0.5 ? 'M' : 'F'}`,
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
      
      // Tampilkan pesan sukses (bisa ditambahkan toast notification)
      alert(`Tiket ${newScannedTicket.noTiket} berhasil disimpan!`);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulasi refresh data dari server
    setTimeout(() => {
      // Urutkan tiket berdasarkan tanggal scan terbaru
      const sortedTickets = [...scannedTickets].sort((a, b) => {
        const dateA = new Date(a.tanggalScan.split(' ')[0].split('-').reverse().join('-'));
        const dateB = new Date(b.tanggalScan.split(' ')[0].split('-').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
      });
      
      setScannedTickets(sortedTickets);
      setIsRefreshing(false);
      setCurrentPage(1); // Reset ke halaman pertama
      
      // Tampilkan pesan sukses (bisa ditambahkan toast notification)
      alert("Data berhasil diperbarui!");
    }, 800);
  };

  // Fungsi untuk mendapatkan kelas warna berdasarkan tipe tiket
  const getTipeClass = (tipe: string): string => {
    switch (tipe) {
      case "Early Bird":
        return "bg-green-100 text-green-800";
      case "Presale 1":
        return "bg-blue-100 text-blue-800";
      case "Presale 2":
        return "bg-purple-100 text-purple-800";
      case "Presale 3":
        return "bg-indigo-100 text-indigo-800";
      case "VIP":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Filter dan pagination
  const filteredTickets = scannedTickets.filter(ticket => {
    const matchesType = filterType === "Semua Tipe" || ticket.jenisTiket === filterType;
    const matchesSearch = searchTableInput === "" || 
      ticket.noTiket.toLowerCase().includes(searchTableInput.toLowerCase()) ||
      ticket.namaPemesan.toLowerCase().includes(searchTableInput.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTableInput.toLowerCase());
    
    return matchesType && matchesSearch;
  });
  
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTickets = filteredTickets.slice(startIndex, startIndex + itemsPerPage);
  
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
      <Sidebar2 adminName="Admin Tiket" />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Penukaran Tiket dan Gelang</h1>
          </div>
        </div>
        
        {/* Scan Tiket Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Scan Tiket</h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Input dan Scan Button */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-3 pr-12 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan kode tiket atau scan QR"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
              
              <button 
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow transition flex items-center justify-center gap-2"
                onClick={handleSearch}
              >
                <ScanLine className="h-5 w-5" />
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
        
        {/* Filter dan Pencarian */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nomor tiket, nama, atau email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              value={searchTableInput}
              onChange={(e) => setSearchTableInput(e.target.value)}
            />
          </div>

          {/* Filter dan Aksi */}
          <div className="flex items-center gap-4">
            {/* Filter Tipe */}
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option>Semua Tipe</option>
              <option>Early Bird</option>
              <option>Presale 1</option>
              <option>Presale 2</option>
              <option>Presale 3</option>
              <option>VIP</option>
            </select>

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
              Total: {filteredTickets.length} tiket
            </div>
          </div>
        </div>
        
        {/* Card Tiket yang Sudah Di-scan - Menggantikan Tabel */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Daftar Tiket yang Sudah Ditukar</h2>
          
          <div className="grid grid-cols-2 gap-4">  
            {currentTickets.map((ticket, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                {/* Info Tiket dalam Satu Bagian */}
                <div className="flex justify-between items-center">
                  {/* Info Pemesan */}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm text-gray-600">{ticket.tanggalScan}</p>
                      <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-md">Ditukar</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-xl font-bold text-gray-900">{ticket.namaPemesan}</p>
                      <p className="text-sm text-gray-500">{ticket.email}</p>
                    </div>
                  </div>

                  {/* Info Tiket */}
                  <div className="text-right">
                    <span className={`px-2 py-1 text-sm font-bold rounded-md ${getTipeClass(ticket.jenisTiket)}`}>
                      {ticket.jenisTiket}
                    </span>
                    <p className="text-base font-medium text-gray-700 mt-1">{ticket.noTiket}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
            <span>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTickets.length)} of {filteredTickets.length} entries</span>
            <div className="flex items-center gap-1">
              <button 
                className={`px-3 py-1 rounded-full border border-gray-300 ${currentPage === 1 ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold flex items-center`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === page ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              
              <button 
                className={`px-3 py-1 rounded-full border border-gray-300 ${currentPage === totalPages ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold flex items-center`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}