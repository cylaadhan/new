"use client";
import Sidebar from "../../../../components/Sidebar";
import { Search, RefreshCw, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useState, useEffect } from "react";

// Data dummy dengan jenis tiket yang diminta
const data = [
  { tiket: "TKT001", nama: "Acel", email: "acel@gmail.com", jenis: "Early Bird", scan: "21-07-2025 09:00" },
  { tiket: "TKT002", nama: "Arin", email: "arin@gmail.com", jenis: "Presale 1", scan: "21-07-2025 09:05" },
  { tiket: "TKT003", nama: "Nelson", email: "nelson@gmail.com", jenis: "Presale 2", scan: "21-07-2025 09:10" },
  { tiket: "TKT004", nama: "Banu", email: "banu@gmail.com", jenis: "Presale 3", scan: "21-07-2025 09:15" },
  { tiket: "TKT005", nama: "Dimas", email: "dimas@gmail.com", jenis: "OTS", scan: "21-07-2025 09:20" },
  { tiket: "TKT006", nama: "Faisal", email: "faisal@gmail.com", jenis: "Early Bird", scan: "21-07-2025 09:25" },
  { tiket: "TKT007", nama: "Gita", email: "gita@gmail.com", jenis: "Presale 1", scan: "21-07-2025 09:30" },
  { tiket: "TKT008", nama: "Hendra", email: "hendra@gmail.com", jenis: "Presale 2", scan: "21-07-2025 09:35" },
  { tiket: "TKT009", nama: "Kiki Rizky", email: "kikuy@gmail.com", jenis: "Early Bird", scan: "21-07-2025 09:40" },
  { tiket: "TKT010", nama: "Nanda", email: "nandakepo@gmail.com", jenis: "Presale 1", scan: "21-07-2025 09:45" },
  { tiket: "TKT011", nama: "Rezan", email: "rezabucin@gmail.com", jenis: "Presale 2", scan: "21-07-2025 09:50" },
  { tiket: "TKT012", nama: "Dita", email: "ditaslay@gmail.com", jenis: "Presale 3", scan: "21-07-2025 09:55" },
  { tiket: "TKT013", nama: "Bima", email: "bimagacor@gmail.com", jenis: "OTS", scan: "21-07-2025 10:00" },
  { tiket: "TKT014", nama: "Putri", email: "putrisantuy@gmail.com", jenis: "Early Bird", scan: "21-07-2025 10:05" },
  { tiket: "TKT015", nama: "Iqbal", email: "iqbalgokil@gmail.com", jenis: "Presale 1", scan: "21-07-2025 10:10" },
  { tiket: "TKT016", nama: "Zahra", email: "zahrakece@gmail.com", jenis: "Presale 2", scan: "21-07-2025 10:15" },
  { tiket: "TKT017", nama: "Rafli", email: "raflianjay@gmail.com", jenis: "Presale 3", scan: "21-07-2025 10:20" },
  { tiket: "TKT018", nama: "Tasya", email: "tasyaskuy@gmail.com", jenis: "OTS", scan: "21-07-2025 10:25" },
];

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [adminName] = useState("Protix");
  
  // Pagination settings
  const indexOfLastItem = currentPage * entriesPerPage;
  const indexOfFirstItem = indexOfLastItem - entriesPerPage;

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

  // Toggle sidebar mobile
  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  // Fungsi untuk mendapatkan kelas warna berdasarkan tipe tiket
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
      case "OTS":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Fungsi untuk memfilter data berdasarkan input pencarian
  const filteredData = data.filter((item) => {
    if (searchQuery.trim() === "") return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      item.tiket.toLowerCase().includes(searchLower) ||
      item.nama.toLowerCase().includes(searchLower) ||
      item.email.toLowerCase().includes(searchLower) ||
      item.jenis.toLowerCase().includes(searchLower)
    );
  });

  // Data untuk halaman saat ini
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500); // Animasi berputar selama 0.5 detik
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar 
        adminName={adminName} 
        showMobileSidebar={showMobileSidebar} 
        setShowMobileSidebar={setShowMobileSidebar} 
      />
      
      {/* Header Mobile */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 bg-white z-10 shadow-md">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleMobileSidebar}
              className="p-1 rounded-md hover:bg-gray-200"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">{adminName}</h1>
            <div className="w-6"></div> {/* Spacer untuk menyeimbangkan layout */}
          </div>
        </div>
      )}
      
      <main className={`flex-1 ${isMobile ? 'pt-20 px-2 pb-4' : 'p-8'}`}>
        {!isMobile && (
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Penukaran Tiket & Gelang</h1>
              <p className="text-gray-600 mt-1">Daftar tiket yang telah ditukarkan dengan gelang</p>
            </div>
            
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-900"
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        )}
        
        {/* Judul Halaman untuk Mobile */}
        {isMobile && (
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Penukaran Tiket & Gelang</h1>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-900 bg-white shadow-sm"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
        )}
        
        {/* Filter dan Pencarian - Responsif */}
        <div className={`flex flex-wrap items-center gap-4 ${isMobile ? 'mb-4' : 'mb-8'}`}>
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

          {/* Show Entries dan Total Tiket - Responsif */}
          {isMobile ? (
            <div className="w-full flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Show</span>
                <select 
                  className="border border-gray-300 text-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-gray-600">entries</span>
              </div>
              
              <div className="text-gray-600 font-medium text-right">
                Total: {filteredData.length} tiket
              </div>
            </div>
          ) : (
            // Desktop layout tetap sama
            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Show</span>
                <select 
                  className="border border-gray-300 text-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-gray-600">entries</span>
              </div>

              <div className="text-gray-600 font-medium">
                Total: {filteredData.length} tiket
              </div>
            </div>
          )}
        </div>
        
       

        {/* Box Daftar Tiket yang sudah ditukar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mt-6 overflow-hidden w-full max-w-none mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {filteredData.length > 0 ? (
              currentItems.map((ticket, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-all duration-200 w-full">
                  {/* Info Tiket dalam Satu Bagian */}
                  <div className="flex justify-between items-center w-full gap-3">
                    {/* Info Pemesan */}
                    <div className="flex-1 overflow-hidden">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-mono text-sm text-gray-600 whitespace-nowrap">{ticket.scan}</p>
                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-md whitespace-nowrap">Ditukar</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-xl font-bold text-gray-900 truncate">{ticket.nama}</p>
                        <p className="text-sm text-gray-500 truncate">{ticket.email}</p>
                      </div>
                    </div>

                    {/* Info Tiket */}
                    <div className="text-right min-w-[120px]">
                      <span className={`px-2 py-1 text-sm font-bold rounded-md ${getTipeClass(ticket.jenis)}`}>
                        {ticket.jenis}
                      </span>
                      <p className="text-base font-medium text-gray-700 mt-1 font-mono">{ticket.tiket}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-500 font-medium">Tidak ada data yang ditemukan</p>
                <p className="text-gray-400 text-sm mt-1">Coba ubah kata kunci pencarian</p>
              </div>
            )}
          </div>

          {/* Pagination - Responsif */}
          <div className={`${isMobile ? 'flex justify-end' : 'flex justify-between items-center'} mt-6`}>
            {!isMobile && (
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-2 py-1 rounded-full border border-gray-300 ${currentPage === 1 ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold flex items-center text-sm`}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </button>
              
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white">
                {currentPage}
              </div>
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-2 py-1 rounded-full border border-gray-300 ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold flex items-center text-sm`}
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