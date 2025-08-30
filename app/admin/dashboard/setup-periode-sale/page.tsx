"use client";
import { useState } from "react";
import { FaPlus, FaTimes, FaSave } from "react-icons/fa";
import { Edit, Trash2 } from "lucide-react";
import Sidebar from "../../../../components/Sidebar";

const data = [
  { id: 1, nama: "Early Bird", mulai: "01-08-2025", selesai: "10-08-2025" },
  { id: 2, nama: "Presale 1", mulai: "11-08-2025", selesai: "20-08-2025" },
  { id: 3, nama: "Presale 2", mulai: "21-08-2025", selesai: "30-08-2025" },
  { id: 4, nama: "Presale 3", mulai: "01-09-2025", selesai: "10-09-2025" },
];

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const handleEdit = (row: any) => {
    setEditData(row);
    setShowModal(true);
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
            <h1 className="text-3xl font-bold text-gray-800">Setup Periode Sale</h1>
            <p className="text-gray-600 mt-1">Atur periode penjualan tiket untuk event Anda</p>
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
            <span>Tambah Periode Sale</span>
          </button>
        </div>

        {/* Box-box Periode Sale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((periode) => (
            <div key={periode.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${getTipeClass(periode.nama)}`}>
                  {periode.nama}
                </span>
                <div className="flex gap-2">
                  <button 
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    onClick={() => handleEdit(periode)}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
                {/* Ikon trash dihapus dari sini */}
              </div>
              
              <div className="flex gap-8 mt-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">PERIODE AWAL</p>
                  <p className="text-gray-800 font-medium">{periode.mulai}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">PERIODE AKHIR</p>
                  <p className="text-gray-800 font-medium">{periode.selesai}</p>
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
                {editData ? "Edit Periode Sale" : "Tambah Periode Sale Baru"}
              </h2>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-medium mb-1 text-gray-700">Nama Periode</label>
                  <select className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none">
                    <option>Early Bird</option>
                    <option>Presale 1</option>
                    <option>Presale 2</option>
                    <option>Presale 3</option>
                    <option>VIP</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Periode Awal</label>
                  <input type="date" className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none" defaultValue={editData ? "2025-08-01" : ""} />
                  <label className="block font-medium mb-1 text-gray-700">Jam Mulai</label>
                  <input type="time" className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none" defaultValue={editData ? "00:00" : ""} />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Periode Akhir</label>
                  <input type="date" className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none" defaultValue={editData ? "2025-08-10" : ""} />
                  <label className="block font-medium mb-1 text-gray-700">Jam Selesai</label>
                  <input type="time" className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none" defaultValue={editData ? "23:59" : ""} />
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
                    Simpan
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