"use client";
import { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaSave } from "react-icons/fa";
import { Edit, Trash2, Menu } from "lucide-react";
import Sidebar2 from "../../../../components/Sidebar2";

const data = [
  { kode: "EB", nama: "Early Bird", harga: "53000", kuota: "100" },
  { kode: "P1", nama: "Presale 1", harga: "63000", kuota: "200" },
  { kode: "P2", nama: "Presale 2", harga: "130000", kuota: "50" },
  { kode: "P3", nama: "Presale 3", harga: "200000", kuota: "30" },
  { kode: "VIP", nama: "VIP", harga: "410000", kuota: "20" },
];

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  
  // State untuk mengelola tampilan mobile
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const adminName = "Panitia";

  // Deteksi ukuran layar untuk tampilan mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  const handleEdit = (row: any) => {
    setEditData(row);
    setShowModal(true);
  };

  // Fungsi untuk memformat angka menjadi format Rupiah
  const formatRupiah = (angka: string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(angka));
  };

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
      case "VIP":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
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
            
            <div className="text-center">
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
        
        <main className="p-4 md:p-8">
          {/* Header Desktop */}
          <div className={`${isMobile ? 'hidden' : 'flex'} flex-wrap justify-between items-center mb-8 gap-4`}>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Setup Jenis Tiket & Harga</h1>
              <p className="text-gray-600 mt-1">Atur jenis tiket dan harga untuk event Anda</p>
            </div>
          </div>
          
          {/* Header Mobile Title */}
          {isMobile && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Setup Jenis Tiket & Harga</h1>
              <p className="text-gray-600 text-sm mt-1">Atur jenis tiket dan harga untuk event Anda</p>
            </div>
          )}

          {/* Tombol Tambah */}
          <div className="mb-6">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition shadow-sm"
              onClick={() => {
                setEditData(null);
                setShowModal(true);
              }}
            >
              <FaPlus className="h-4 w-4" />
              <span>Tambah Jenis Tiket</span>
            </button>
          </div>

          {/* Box-box Jenis Tiket */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {data.map((tiket) => (
              <div key={tiket.kode} className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${getTipeClass(tiket.nama)}`}>
                      {tiket.nama}
                    </span>
                    <span className="text-xs text-gray-500 font-medium mt-2">KODE: {tiket.kode}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-1.5 rounded-full transition-colors"
                      onClick={() => handleEdit(tiket)}
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-800 hover:bg-red-100 p-1.5 rounded-full transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">HARGA</p>
                    <p className="text-gray-800 text-sm md:text-base font-medium">{formatRupiah(tiket.harga)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">KUOTA</p>
                    <p className="text-gray-800 text-sm md:text-base font-medium">{tiket.kuota} tiket</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Modal Tambah/Edit Pop Up */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 w-full max-w-xl relative animate-fadeIn mx-4">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                  onClick={() => setShowModal(false)}
                  aria-label="Tutup"
                >
                  <FaTimes />
                </button>
                <h2 className="text-xl font-bold mb-6 text-gray-800">
                  {editData ? "Edit Jenis Tiket" : "Tambah Jenis Tiket Baru"}
                </h2>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1 text-gray-700">Kode Jenis Tiket</label>
                    <input 
                      type="text" 
                      className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400" 
                      defaultValue={editData?.kode || ""}
                      placeholder="Contoh: EB, P1, P2"
                    />
                    <label className="block font-medium mb-1 text-gray-700">Harga</label>
                    <div className="flex items-center">
                      <span className="inline-block px-2 py-2 border border-r-0 rounded-l text-gray-500 bg-gray-100">Rp</span>
                      <input 
                        type="number" 
                        className="w-full border rounded-r px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400" 
                        defaultValue={editData?.harga || ""}
                        placeholder="Contoh: 50000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-1 text-gray-700">Nama Jenis Tiket</label>
                    <input 
                      type="text" 
                      className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400" 
                      defaultValue={editData?.nama || ""}
                      placeholder="Contoh: Early Bird"
                    />
                    <label className="block font-medium mb-1 text-gray-700">Kuota Tiket</label>
                    <input 
                      type="number" 
                      className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400" 
                      defaultValue={editData?.kuota || ""}
                      placeholder="Contoh: 100"
                    />
                  </div>
                  <div className="col-span-2 flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded"
                      onClick={() => setShowModal(false)}
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded flex items-center gap-2"
                    >
                      <FaSave className="w-4 h-4" />
                      {editData ? "Simpan" : "Tambah"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}