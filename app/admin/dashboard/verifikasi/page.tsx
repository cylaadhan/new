"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar";
import { Download, Eye, QrCode, EyeOff, CheckCircle, TicketIcon, Calendar, SlidersHorizontal, ListFilter, Search, ChevronLeft, ChevronRight, DollarSign, Menu } from "lucide-react";

export default function Page() {
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedTicketType, setSelectedTicketType] = useState("Semua Jenis Tiket");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("Semua Status Pembayaran");
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [adminName] = useState("Protix");
  
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
  
  // Efek untuk reset halaman saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, startDate, endDate, selectedTicketType, selectedPaymentStatus]);
  
  // Toggle sidebar mobile
  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };
  
  // Data dummy untuk tabel
  const dummyData = [
    {
      id: 1,
      tanggal: "08-04-2025 14:41",
      nama: "Acyla",
      email: "cyla1@gmail.com",
      jenisTiket: "Presale 1",
      jumlah: 2,
      total: "Rp121000",
      metode: "QRIS",
      fee: "Rp810",
      status: "Terkonfirmasi",
      statusTiket: ["Dikirim", "Aktif"]
    },
    {
      id: 2,
      tanggal: "08-04-2025 14:42",
      nama: "Adhan",
      email: "nahda@gmail.com",
      jenisTiket: "Early Bird",
      jumlah: 3,
      total: "Rp122000",
      metode: "BCA",
      fee: "Rp820",
      status: "Terkonfirmasi",
      statusTiket: ["Dikirim", "Aktif"]
    },
    {
      id: 3,
      tanggal: "08-04-2025 14:43",
      nama: "Adi",
      email: "adi@gmail.com",
      jenisTiket: "Presale 1",
      jumlah: 4,
      total: "Rp123000",
      metode: "QRIS",
      fee: "Rp830",
      status: "Terkonfirmasi",
      statusTiket: ["Dikirim", "Aktif"]
    },
    {
      id: 4,
      tanggal: "08-04-2025 14:44",
      nama: "Nahda",
      email: "adhan@gmail.com",
      jenisTiket: "Early Bird",
      jumlah: 5,
      total: "Rp124000",
      metode: "BCA",
      fee: "Rp840",
      status: "Terkonfirmasi",
      statusTiket: ["Dikirim", "Aktif"]
    },
    {
      id: 5,
      tanggal: "08-04-2025 14:45",
      nama: "Suparman",
      email: "suparman@gmail.com",
      jenisTiket: "Presale 1",
      jumlah: 6,
      total: "Rp125000",
      metode: "QRIS",
      fee: "Rp850",
      status: "Terkonfirmasi",
      statusTiket: ["Dikirim", "Aktif"]
    },
    {
      id: 6,
      tanggal: "08-04-2025 14:46",
      nama: "User6",
      email: "user6@gmail.com",
      jenisTiket: "Early Bird",
      jumlah: 7,
      total: "Rp126000",
      metode: "BCA",
      fee: "Rp860",
      status: "Terkonfirmasi",
      statusTiket: ["Dikirim", "Aktif"]
    },
    {
      id: 7,
      tanggal: "08-04-2025 14:47",
      nama: "User7",
      email: "user7@example.com",
      jenisTiket: "Presale 1",
      jumlah: 8,
      total: "Rp127000",
      metode: "QRIS",
      fee: "Rp870",
      status: "Terkonfirmasi",
      statusTiket: ["Dikirim", "Aktif"]
    },
    {
      id: 8,
      tanggal: "08-04-2025 14:48",
      nama: "User8",
      email: "user8@gmail.com",
      jenisTiket: "Early Bird",
      jumlah: 9,
      total: "Rp128000",
      metode: "BCA",
      fee: "Rp880",
      status: "Terkonfirmasi",
      statusTiket: ["Dikirim", "Aktif"]
    },
    {
      id: 9,
      tanggal: "08-04-2025 14:49",
      nama: "User9",
      email: "user9@gmail.com",

      jenisTiket: "Presale 1",
      jumlah: 10,
      total: "Rp129000",
      metode: "QRIS",
      fee: "Rp890",
      status: "Terkonfirmasi",
      statusTiket: ["Dikirim", "Aktif"]
    },
    {
      id: 10,
      tanggal: "08-04-2025 14:50",
      nama: "User10",
      email: "user10@gmail.com",
      jenisTiket: "Early Bird",
      jumlah: 11,
      total: "Rp130000",
      metode: "BCA",
      fee: "Rp900",
      status: "Terkonfirmasi",
      statusTiket: ["Dikirim", "Aktif"]
    }
  ];
  
  // Fungsi untuk mendapatkan kelas warna berdasarkan tipe tiket
  const getTipeClass = (tipe: string) => {
    if (tipe.includes("Early Bird")) {
      return "bg-green-100 text-green-800";
    } else if (tipe.includes("Presale 1")) {
      return "bg-blue-100 text-blue-800";
    } else if (tipe.includes("Presale 2")) {
      return "bg-purple-100 text-purple-800";
    } else if (tipe.includes("Presale 3")) {
      return "bg-indigo-100 text-indigo-800";
    } else if (tipe.includes("VIP")) {
      return "bg-red-100 text-red-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  // Fungsi untuk memformat angka menjadi format Rupiah
  const formatRupiah = (angka: string) => {
    const numericValue = angka.replace(/[^0-9]/g, "");
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(numericValue));
  };
  
  // Fungsi untuk memformat tanggal dengan jam
  const formatTanggal = (tanggal: string) => {
    return tanggal;
  };

  // Filter data berdasarkan pencarian dan filter
  const filteredData = dummyData.filter(item => {
    // Jika tidak ada pencarian atau filter yang aktif, tampilkan semua data
    if (searchTerm === "" && 
        selectedTicketType === "Semua Jenis Tiket" && 
        selectedPaymentStatus === "Semua Status Pembayaran" &&
        !startDate && !endDate) {
      return true;
    }
    
    // Filter berdasarkan pencarian
    const matchesSearch = searchTerm === "" ? true :
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tanggal.includes(searchTerm) ||
      item.jenisTiket.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Konversi tanggal item ke format yang bisa dibandingkan
    // Format tanggal item: DD-MM-YYYY HH:MM
    const [datePart] = item.tanggal.split(' ');
    const [day, month, year] = datePart.split('-');
    const itemDate = new Date(`${year}-${month}-${day}T00:00:00`);
    
    // Format tanggal filter: YYYY-MM-DD
    const startDateObj = startDate ? new Date(`${startDate}T00:00:00`) : null;
    const endDateObj = endDate ? new Date(`${endDate}T23:59:59`) : null;
    
    // Filter berdasarkan rentang tanggal
    const isInDateRange = (!startDateObj || itemDate >= startDateObj) && (!endDateObj || itemDate <= endDateObj);
    
    // Filter berdasarkan jenis tiket
    const matchesTicketType = selectedTicketType === "Semua Jenis Tiket" || 
                             item.jenisTiket === selectedTicketType;
    
    // Filter berdasarkan status pembayaran
    const matchesPaymentStatus = selectedPaymentStatus === "Semua Status Pembayaran" || 
                               item.status === selectedPaymentStatus;
    
    // Menggabungkan semua kondisi filter
    return matchesSearch && isInDateRange && matchesTicketType && matchesPaymentStatus;
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
      {/* Sidebar Desktop */}
      {!isMobile && (
        <Sidebar 
          adminName={adminName} 
          showMobileSidebar={showMobileSidebar} 
          setShowMobileSidebar={setShowMobileSidebar} 
        />
      )}
      
      {/* Header Mobile */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 bg-white z-20 px-4 py-3 flex justify-between items-center border-b shadow-sm">
          <button 
            onClick={toggleMobileSidebar}
            className="p-1.5 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          
          <h1 className="text-xl font-bold text-center text-gray-800">{adminName}</h1>
          
          <div className="w-6"></div> 
        </header>
      )}
      
      {/* Sidebar Mobile (hanya muncul saat tombol hamburger diklik) */}
      {isMobile && showMobileSidebar && (
        <div className="fixed inset-0 z-30">
          <Sidebar 
            adminName={adminName} 
            showMobileSidebar={showMobileSidebar} 
            setShowMobileSidebar={setShowMobileSidebar} 
          />
        </div>
      )}
      
      <main className={`flex-1 w-full flex flex-col min-h-screen ${isMobile ? 'mt-14' : ''}`}>
        <div className="flex-grow">
          {/* Judul dan Export */}
          <div className={`flex justify-between items-center ${isMobile ? 'p-4 pb-2' : 'p-8 pb-4'}`}>
            <div>
              <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-gray-800`}>Verifikasi Pembayaran</h3>
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
                
              </button>
            </div>
          </div>

          {/* Statistik Box */}
          <div className={`flex flex-col gap-4 ${isMobile ? 'px-4 pb-3' : 'px-8 pb-6'}`}>
            {/* 2 Box Besar di Atas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box Tiket Terjual */}
              <div className="bg-white rounded-xl shadow-md p-6 transition transform hover:scale-105 flex justify-between items-center">
                <div>
                  <div className="text-gray-500 font-medium text-sm mb-1">Total Tiket</div>

                  <div className="text-3xl font-bold text-orange-600">24 Tiket</div>
                </div>
                <div className="bg-blue-500 text-white p-4 rounded-lg">
                  <TicketIcon className="w-7 h-7" />
                </div>
              </div>
              
              {/* Box Total Revenue */}
              <div className="bg-white rounded-xl shadow-md p-6 transition transform hover:scale-105 flex justify-between items-center">
                <div>
                  <div className="text-gray-500 font-medium text-sm mb-1">Total Revenue</div>
                  <div className="text-3xl font-bold text-orange-600">Rp1.454.720</div>
                </div>
                <div className="bg-red-500 text-white p-4 rounded-lg">
                  <DollarSign className="w-7 h-7" />
                </div>
              </div>
            </div>
            
            {/* 3 Box Kecil di Bawah */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box Tiket Dipesan */}
              <div className="bg-white rounded-xl shadow-md p-4 transition transform hover:scale-105">
                <div className="text-gray-500 font-medium text-sm">Jumlah Tiket Dipesan</div>
                <div className="text-xl font-bold text-orange-600">24 Tiket</div>
              </div>
              
              {/* Box Fee Midtrans */}
              <div className="bg-white rounded-xl shadow-md p-4 transition transform hover:scale-105">
                <div className="text-gray-500 font-medium text-sm">Jumlah Fee Midtrans</div>
                <div className="text-xl font-bold text-orange-600">Rp13.243</div>
              </div>
              
              {/* Box Pendapatan Bersih */}
              <div className="bg-white rounded-xl shadow-md p-4 transition transform hover:scale-105">
                <div className="text-gray-500 font-medium text-sm">Pendapatan Bersih</div>
                <div className="text-xl font-bold text-orange-600">Rp1.441.477</div>
              </div>
            </div>
          </div>

          {/* Filter Panel (Collapsible) */}
          {showFilter && (
            <div className="flex justify-center px-4 md:px-8 py-6 animate-fadeIn">
              <div className="bg-white shadow-lg rounded-3xl px-4 md:px-8 py-6 w-full max-w-5xl mx-auto border border-gray-100 overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-center font-semibold text-gray-800">Filter Pencarian</h3>
                  <button 
                    onClick={() => setShowFilter(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-center gap-4`}>
                  <div className="w-full">
                    <label className="block font-medium mb-1 text-gray-700 text-sm">Rentang Tanggal</label>
                    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-2`}>
                      <input 
                        type="date" 
                        className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        max={endDate || undefined}
                      />
                      <span className="text-gray-700 font-medium">{isMobile ? 'Sampai' : 'sampai'}</span>
                      <input 
                        type="date" 
                        className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || undefined}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block font-medium mb-1 text-gray-700 text-sm">Jenis Tiket</label>
                    <select 
                      className="border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
                      value={selectedTicketType}
                      onChange={(e) => setSelectedTicketType(e.target.value)}
                    >
                      <option>Semua Jenis Tiket</option>
                      <option>Early Bird</option>
                      <option>Presale 1</option>
                      <option>Presale 2</option>
                      <option>Presale 3</option>
                      <option>VIP</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block font-medium mb-1 text-gray-700 text-sm">Status Pembayaran</label>
                    <select 
                      className="border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
                      value={selectedPaymentStatus}
                      onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                    >
                      <option>Semua Status Pembayaran</option>
                      <option>Terkonfirmasi</option>
                      <option>Belum Bayar</option>
                      <option>Dibatalkan</option>
                    </select>
                  </div>
                  <div className="w-full flex justify-center mt-4">
                    <button 
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full shadow-md transition transform hover:scale-105 w-full md:w-auto"
                      onClick={() => {
                        // Reset halaman ke 1 saat filter diterapkan
                        setCurrentPage(1);
                        // Tutup panel filter setelah diterapkan
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
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-4 md:px-8">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama, email, atau jenis tiket..."
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
            </div>
          </div>

          {/* Tabel Data (Diubah menjadi Card) */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mx-4 md:mx-8">
            <div className="space-y-4">
              {currentItems.map((item) => (
                <div key={item.id} className="flex flex-row gap-2">
                  {/* Bagian Kiri - Informasi Utama */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-3 md:p-4">
                    {/* Layout untuk mobile dan desktop */}
                    <div className={`flex ${isMobile ? 'flex-row justify-between items-start' : 'flex-row justify-between items-center'}`}>
                      {/* Info Pemesan */}
                      <div className={`${isMobile ? 'w-3/5' : 'flex-1'}`}>
                        <div className="flex flex-wrap items-center gap-1 md:gap-2">
                          <p className={`font-mono ${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>{formatTanggal(item.tanggal)}</p>
                          <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-semibold bg-blue-100 text-blue-800 px-1.5 py-0.5 md:px-2 md:py-1 rounded-md`}>{item.metode}</span>
                          <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-semibold bg-green-100 text-green-800 px-1.5 py-0.5 md:px-2 md:py-1 rounded-md`}>{item.status}</span>
                        </div>
                        <div className="mt-1 md:mt-2">
                          <p className={`${isMobile ? 'text-base' : 'text-xl'} font-bold text-gray-900`}>{item.nama}</p>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>{item.email}</p>
                        </div>
                      </div>

                      {/* Info Tiket - Sekarang di sebelah kanan untuk mobile juga */}
                      <div className={`${isMobile ? 'w-2/5 text-right' : 'text-right'}`}>
                        <span className={`px-2 py-0.5 md:py-1 ${isMobile ? 'text-xs' : 'text-sm'} font-bold rounded-md ${getTipeClass(item.jenisTiket)}`}>
                          {item.jenisTiket}
                        </span>
                        <p className={`${isMobile ? 'text-xs' : 'text-base'} font-medium text-gray-700 mt-1`}>{item.jumlah} Tiket</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-base'} font-semibold text-gray-800`}>{formatRupiah(item.total)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bagian Kanan - Aksi & Fee */}
                  <div className="w-20 md:w-52 bg-gray-50 rounded-lg p-2 md:p-3 flex flex-col justify-between">
                    <div>
                      {isMobile ? (
                        <div className="flex flex-col">
                          <p className="font-semibold text-gray-800 text-xs">{formatRupiah(item.fee)}</p>
                          <div className="flex flex-row justify-between gap-0.5 mt-1">
                            {item.statusTiket.map((status, idx) => (
                              <span key={idx} className="inline-block bg-cyan-100 text-cyan-800 px-1 py-0.5 rounded-md text-[9px] font-medium">
                                {status}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="font-semibold text-gray-800 text-base">{formatRupiah(item.fee)}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.statusTiket.map((status, idx) => (
                              <span key={idx} className="inline-block bg-cyan-100 text-cyan-800 px-2 py-1 rounded-md text-xs font-medium">
                                {status}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <div className={`flex ${isMobile ? 'flex-wrap justify-center' : 'justify-end'} items-center gap-0.5 md:gap-1 mt-2 ${isMobile ? 'mt-3' : ''}}`}>
                      <button className="p-0.5 md:p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-full transition-colors m-0.5" title="Hide">
                        <EyeOff size={isMobile ? 12 : 18} />
                      </button>
                      <button className="p-0.5 md:p-1.5 text-green-500 hover:bg-green-100 hover:text-green-700 rounded-full transition-colors m-0.5" title="Kirim Konfirmasi Bayar">
                        <CheckCircle size={isMobile ? 12 : 18} />
                      </button>
                      <button className="p-0.5 md:p-1.5 text-blue-500 hover:bg-blue-100 hover:text-blue-700 rounded-full transition-colors m-0.5" title="Kirim QR Tiket">
                        <TicketIcon size={isMobile ? 12 : 18} />
                      </button>
                      <button className="p-0.5 md:p-1.5 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-800 rounded-full transition-colors m-0.5" title="Detail">
                        <Eye size={isMobile ? 12 : 18} />
                      </button>
                      <button className="p-0.5 md:p-1.5 text-orange-600 hover:bg-orange-100 hover:text-orange-800 rounded-full transition-colors m-0.5" title="Generate QR">
                        <QrCode size={isMobile ? 12 : 18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tampilkan pesan jika tidak ada data */}
            {currentItems.length === 0 && (
              <div className="text-center py-8">
                <p className={`text-gray-500 font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>Tidak ada data yang ditemukan</p>
                <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'} mt-1`}>Coba ubah filter atau kata kunci pencarian</p>
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex justify-between items-center py-4 mt-4 px-2">
              <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>
                Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
              </span>
              <div className="flex items-center gap-1">
                <button 
                  className={`px-3 py-1 rounded-full border border-gray-300 ${currentPage === 1 ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-1`} />
                  {isMobile ? 'Prev' : 'Previous'}
                </button>
                
                {isMobile ? (
                  <button 
                    className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500 text-white text-xs"
                  >
                    {currentPage}
                  </button>
                ) : (
                  Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button 
                      key={page}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === page ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'} text-sm`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))
                )}
                
                <button 
                  className={`px-3 py-1 rounded-full border border-gray-300 ${currentPage === totalPages ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  {isMobile ? 'Next' : 'Next'}
                  <ChevronRight className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} ml-1`} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-white shadow-md mt-auto py-4 px-8 text-center text-gray-600 text-sm">
          Supported by Protix.id © 2025
        </footer>
      </main>
    </div>
  );
}