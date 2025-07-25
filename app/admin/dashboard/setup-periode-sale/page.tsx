"use client";
import { useState } from "react";
import { FaPlus, FaCog, FaTimes } from "react-icons/fa";
import Sidebar from "../../../../components/Sidebar";

const data = [
  { no: 1, nama: "Early Bird", mulai: "01-08-2025", selesai: "10-08-2025" },
  { no: 2, nama: "Presale 1", mulai: "11-08-2025", selesai: "20-08-2025" },
];

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar adminName="Pemilik Event" />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Setup Periode Sale</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <button className="mb-4 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
            <FaPlus />
            Tambah Periode Sale
          </button>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 px-4 py-2 text-left font-bold text-gray-800">No.</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-left font-bold text-gray-800">Nama Periode</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-left font-bold text-gray-800">Tanggal Mulai</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-left font-bold text-gray-800">Tanggal Selesai</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-center font-bold text-gray-800">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.no} className="even:bg-gray-50 hover:bg-blue-50 transition">
                    <td className="border-b border-gray-200 px-4 py-2 text-gray-800">{row.no}</td>
                    <td className="border-b border-gray-200 px-4 py-2 text-gray-800">{row.nama}</td>
                    <td className="border-b border-gray-200 px-4 py-2 text-gray-800">{row.mulai}</td>
                    <td className="border-b border-gray-200 px-4 py-2 text-gray-800">{row.selesai}</td>
                    <td className="border-b border-gray-200 px-4 py-2">
                      <div className="flex justify-center">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded shadow flex items-center gap-1 transition"
                          onClick={() => setShowModal(true)}
                        >
                          <FaCog /> Setup Periode Sale
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal Pop Up */}
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