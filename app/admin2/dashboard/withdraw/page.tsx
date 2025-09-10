"use client";
import { useState, useEffect } from "react";
import Sidebar2 from "../../../../components/Sidebar2";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Search, RefreshCw, Download, Menu } from "lucide-react";

const initialData = [
  { no: 1, tanggal: "2025-07-22", keterangan: "Withdraw ke BCA", jumlah: 500000, status: "Sukses" },
  { no: 2, tanggal: "2025-07-23", keterangan: "Withdraw ke Mandiri", jumlah: 300000, status: "Pending" },
];

export default function Page() {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    tanggal: "",
    jumlah: "",
    keterangan: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  // Tambahkan state untuk mobile view
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const adminName = "Admin Tiket";

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

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };
  
  const totalWithdraw = data.reduce((sum, d) => sum + d.jumlah, 0);
  const saldoAkhir = 1286000 - totalWithdraw;

  // Filter data berdasarkan pencarian dan status
  const filteredData = data.filter(item => {
    // Filter berdasarkan status
    if (statusFilter !== "Semua Status" && item.status !== statusFilter) {
      return false;
    }
    
    // Filter berdasarkan pencarian
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.keterangan.toLowerCase().includes(query) ||
        item.tanggal.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "jumlah" ? value.replace(/\D/g, "") : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editIndex !== null) {
      // Edit existing data
      const updatedData = [...data];
      updatedData[editIndex] = {
        ...updatedData[editIndex],
        tanggal: formData.tanggal,
        keterangan: formData.keterangan,
        jumlah: parseInt(formData.jumlah) || 0,
        status: Math.random() > 0.5 ? "Sukses" : "Pending"
      };
      setData(updatedData);
    } else {
      // Add new data
      const newData = {
        no: data.length > 0 ? Math.max(...data.map(item => item.no)) + 1 : 1,
        tanggal: formData.tanggal,
        keterangan: formData.keterangan,
        jumlah: parseInt(formData.jumlah) || 0,
        status: "Pending"
      };
      setData([...data, newData]);
    }
    
    // Reset form and close modal
    setFormData({ tanggal: "", jumlah: "", keterangan: "" });
    setShowModal(false);
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    const item = data[index];
    setFormData({
      tanggal: item.tanggal,
      jumlah: item.jumlah.toString(),
      keterangan: item.keterangan,
    });
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  };

  const openModal = () => {
    setFormData({ tanggal: "", jumlah: "", keterangan: "" });
    setEditIndex(null);
    setShowModal(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  // Fungsi untuk mendapatkan kelas warna berdasarkan status
  const getStatusClass = (status: string): string => {
    switch (status) {
      case "Sukses":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format Rupiah
  const formatRupiah = (amount: number): string => {
    return `Rp${amount.toLocaleString('id-ID')}`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar untuk desktop */}
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <Sidebar2 
          adminName={adminName} 
          showMobileSidebar={showMobileSidebar} 
          setShowMobileSidebar={setShowMobileSidebar} 
        />
      </div>
      
      {/* Sidebar untuk mobile */}
      {isMobile && showMobileSidebar && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={toggleMobileSidebar}>
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <Sidebar2 
              adminName={adminName} 
              showMobileSidebar={showMobileSidebar} 
              setShowMobileSidebar={setShowMobileSidebar} 
            />
          </div>
        </div>
      )}
      
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
            
            <div className="text-center">
              <span className="font-bold text-lg text-black">Withdraw</span>
            </div>
            
            <div className="w-6"></div> {/* Spacer untuk menjaga keseimbangan */}
          </header>
        )}
        
        <main className={`${isMobile ? 'p-4' : 'p-8'}`}>
          {!isMobile && (
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Withdraw</h1>
              </div>
            </div>
          )}
          
          {/* Card untuk Total Withdraw dan Saldo Akhir */}
          {isMobile ? (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white rounded-xl shadow-md p-3 transition-all duration-300 hover:shadow-lg">
                <div className="text-gray-500 font-medium mb-1 text-xs">Total Withdraw</div>
                <div className="text-lg font-bold text-orange-600">{formatRupiah(totalWithdraw)}</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3 transition-all duration-300 hover:shadow-lg">
                <div className="text-gray-500 font-medium mb-1 text-xs">Total Saldo</div>
                <div className="text-lg font-bold text-green-600">{formatRupiah(saldoAkhir)}</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <div className="text-gray-500 font-medium mb-1">Total Withdraw</div>
                <div className="text-2xl font-bold text-orange-600">{formatRupiah(totalWithdraw)}</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <div className="text-gray-500 font-medium mb-1">Saldo Akhir</div>
                <div className="text-2xl font-bold text-green-600">{formatRupiah(saldoAkhir)}</div>
              </div>
            </div>
          )}

          {/* Filter dan Pencarian */}
          {isMobile ? (
            <div className="flex flex-col space-y-3 mb-6">
              {/* Search Bar */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari keterangan atau tanggal"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 transition-all"
                />
              </div>

              {/* Filter dan Aksi untuk Mobile */}
              <div className="flex items-center justify-between w-full gap-2">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 w-32"
                >
                  <option>Semua Status</option>
                  <option>Sukses</option>
                  <option>Pending</option>
                </select>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleRefresh}
                    className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-black"
                  >
                    <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </button>

                  <button 
                    onClick={openModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-lg shadow flex items-center gap-1"
                  >
                    <FaPlus size={14} />
                    <span>Ajukan</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6 space-y-4">
              {/* Search Bar */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari keterangan atau tanggal"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 transition-all"
                />
              </div>

              {/* Filter dan Aksi untuk Desktop */}
              <div className="flex items-center justify-between w-full">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option>Semua Status</option>
                  <option>Sukses</option>
                  <option>Pending</option>
                </select>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-900"
                  >
                    <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>

                  <button 
                    onClick={openModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow flex items-center gap-2"
                  >
                    <FaPlus />
                    Ajukan Withdraw
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tabel Withdraw */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className={`${isMobile ? 'p-2 text-[10px]' : 'p-4 text-xs'} font-medium text-gray-500`}>TANGGAL</th>
                    <th className={`${isMobile ? 'p-2 text-[10px]' : 'p-4 text-xs'} font-medium text-gray-500`}>KETERANGAN</th>
                    <th className={`${isMobile ? 'p-2 text-[10px]' : 'p-4 text-xs'} font-medium text-gray-500`}>JUMLAH</th>
                    <th className={`${isMobile ? 'p-2 text-[10px]' : 'p-4 text-xs'} font-medium text-gray-500`}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                      <tr key={row.no} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className={`${isMobile ? 'p-2 text-xs' : 'p-4 text-sm'} text-gray-900`}>
                          {isMobile ? row.tanggal.split('-')[0].substring(2) + '/' + row.tanggal.split('-')[1] + '/' + row.tanggal.split('-')[2] : row.tanggal}
                        </td>
                        <td className={`${isMobile ? 'p-2 text-xs' : 'p-4 text-sm'} text-gray-900`}>{row.keterangan}</td>
                        <td className={`${isMobile ? 'p-2 text-xs' : 'p-4 text-sm'} font-medium text-gray-900`}>{formatRupiah(row.jumlah)}</td>
                        <td className={`${isMobile ? 'p-2' : 'p-4'}`}>
                          <span className={`${isMobile ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'} font-medium rounded-full ${getStatusClass(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className={`${isMobile ? 'p-2 text-xs' : 'p-4'} text-center text-gray-500`}>
                        Tidak ada data yang sesuai dengan filter
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Ajukan Withdraw */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black bg-opacity-50">
          <div className={`bg-white rounded-xl shadow-lg ${isMobile ? 'p-4 w-[90%]' : 'p-6 w-full max-w-xl'} relative animate-fadeIn`}>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Tutup"
            >
              <FaTimes />
            </button>
            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 text-gray-800`}>{editIndex !== null ? "Edit Withdraw" : "Ajukan Withdraw"}</h2>
            
            <div className="mb-4">
              <p className={`text-gray-700 mb-1 ${isMobile ? 'text-sm' : ''}`}><span className="font-semibold">Total Penjualan:</span> {formatRupiah(1286000)}</p>
              <p className={`text-gray-700 mb-1 ${isMobile ? 'text-sm' : ''}`}><span className="font-semibold">Total Withdraw:</span> {formatRupiah(totalWithdraw)}</p>
              <p className={`text-gray-700 mb-1 ${isMobile ? 'text-sm' : ''}`}><span className="font-semibold">Saldo Akhir:</span> {formatRupiah(saldoAkhir)}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Tanggal</label>
                <input
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Jumlah</label>
                <div className="flex items-center">
                  <span className="inline-block px-2 py-2 border border-r-0 rounded-l text-gray-500 bg-gray-100">Rp</span>
                  <input
                    type="text"
                    name="jumlah"
                    value={formData.jumlah}
                    onChange={handleInputChange}
                    className="w-full border rounded-r px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none"
                    placeholder="0"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Keterangan</label>
                <input
                  type="text"
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none"
                  placeholder="Contoh: Withdraw ke BCA"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded shadow transition"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition"
                >
                  {editIndex !== null ? "Simpan" : "Ajukan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}