"use client";
import { useState } from "react";
import { FaPlus, FaTimes, FaSave } from "react-icons/fa";
import { Edit, Trash2 } from "lucide-react";
import Sidebar from "../../../../components/Sidebar";

const data = [
  { no: 1, kode: "EB", nama: "Early Bird", harga: "53000", kuota: "100" },
  { no: 2, kode: "P1", nama: "Presale 1", harga: "63000", kuota: "200" },
];

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);

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
      <Sidebar adminName="Pemilik Event" />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Setup Jenis Tiket & Harga</h1>
            <p className="text-gray-600 mt-1">Atur jenis tiket dan harga untuk event Anda</p>
          </div>
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((tiket) => (
            <div key={tiket.no} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
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
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-800 hover:bg-red-100 p-1.5 rounded-full transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">HARGA</p>
                  <p className="text-gray-800 font-medium">{formatRupiah(tiket.harga)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">KUOTA</p>
                  <p className="text-gray-800 font-medium">{tiket.kuota} tiket</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modal Tambah/Edit Pop Up */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative animate-fadeIn">
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
  );
}
