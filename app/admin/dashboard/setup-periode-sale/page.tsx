"use client";
import { useState } from "react";
import { FaPlus, FaTimes, FaSave } from "react-icons/fa";
import { Settings } from "lucide-react";
import Sidebar from "../../../../components/Sidebar";

const data = [
  { no: 1, nama: "Early Bird", mulai: "01-08-2025", selesai: "10-08-2025" },
  { no: 2, nama: "Presale 1", mulai: "11-08-2025", selesai: "20-08-2025" },
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
          </div>
        </div>

        {/* Kotak untuk Tabel */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <button className="mb-4 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-green-500 text-white hover:bg-green-600 transition">
            <FaPlus className="h-4 w-4" />
            <span>Tambah</span>
          </button>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-medium text-gray-500 text-xs">KODE</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">NAMA</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">PERIODE AWAL</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">PERIODE AKHIR</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.no} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-900">{row.no}</td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full text-center w-fit ${getTipeClass(row.nama)}`}>
                        {row.nama}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-900">{row.mulai}</td>
                    <td className="p-4 text-sm text-gray-900">{row.selesai}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button 
                          className="text-blue-800 hover:text-black transition-colors duration-200"
                          onClick={() => handleEdit(row)}
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal Edit Pop Up */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative animate-fadeIn">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowModal(false)}
                aria-label="Tutup"
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-bold mb-6 text-gray-800">Setup Periode Sale</h2>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Periode Awal</label>
                  <input type="date" className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400" defaultValue="2025-03-15" />
                  <label className="block font-semibold mb-1 text-gray-700">Periode Akhir</label>
                  <input type="date" className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400" defaultValue="2025-04-16" />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Jam</label>
                  <input type="time" className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400" defaultValue="12:00" />
                  <label className="block font-semibold mb-1 text-gray-700">Jam</label>
                  <input type="time" className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400" defaultValue="23:59" />
                </div>
                <div className="col-span-2 flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    className="bg-[#4B1E0E] hover:bg-[#2d1208] text-white font-semibold px-4 py-2 rounded"
                  >
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