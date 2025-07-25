"use client";
import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from "react-icons/fa";
import Sidebar2 from "../../../../components/Sidebar2";

const data = [
  { no: 1, kode: "EB", nama: "Early Bird SOERATS 2025", periodeAwal: "15-03-2025", periodeAkhir: "16-04-2025" },
  { no: 2, kode: "P1", nama: "Presale 1 SOERATS 2025", periodeAwal: "17-05-2025", periodeAkhir: "17-06-2025" },
  { no: 3, kode: "PS2 (COUPLE)", nama: "PAKET COUPLE", periodeAwal: "23-07-2025", periodeAkhir: "02-08-2025" },
  { no: 4, kode: "PS2 (TIGA)", nama: "PAKET BERTIGA", periodeAwal: "23-07-2025", periodeAkhir: "02-08-2025" },
  { no: 5, kode: "PS2 (EMPAT)", nama: "PAKET BER-EMPAT", periodeAwal: "23-07-2025", periodeAkhir: "02-08-2025" },
];

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const handleEdit = (row: any) => {
    setEditData(row);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar2 adminName="Panitia" />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Setup Periode Sale</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <button className="mb-4 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow transition">
            <FaPlus />
            Tambah Setup Periode Sale
          </button>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-bold text-gray-800">No.</th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-bold text-gray-800">Kode</th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-bold text-gray-800">Nama</th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-bold text-gray-800">Periode Awal</th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left font-bold text-gray-800">Periode Akhir</th>
                  <th className="border-b border-gray-200 px-4 py-3 text-center font-bold text-gray-800">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.no} className="even:bg-gray-50 hover:bg-blue-50 transition">
                    <td className="border-b border-gray-200 px-4 py-3 text-gray-800">{row.no}</td>
                    <td className="border-b border-gray-200 px-4 py-3 text-gray-800">{row.kode}</td>
                    <td className="border-b border-gray-200 px-4 py-3 text-gray-800">{row.nama}</td>
                    <td className="border-b border-gray-200 px-4 py-3 text-gray-800">{row.periodeAwal}</td>
                    <td className="border-b border-gray-200 px-4 py-3 text-gray-800">{row.periodeAkhir}</td>
                    <td className="border-b border-gray-200 px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <button 
                          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-1 rounded shadow transition"
                          onClick={() => handleEdit(row)}
                        >
                          Setup Periode Sale
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
                  <input 
                    type="date" 
                    className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400" 
                    defaultValue={editData ? editData.periodeAwal.split('-').reverse().join('-') : ""}
                  />
                  <label className="block font-semibold mb-1 text-gray-700">Periode Akhir</label>
                  <input 
                    type="date" 
                    className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400" 
                    defaultValue={editData ? editData.periodeAkhir.split('-').reverse().join('-') : ""}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Jam</label>
                  <input 
                    type="time" 
                    className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400" 
                    defaultValue="12:00" 
                  />
                  <label className="block font-semibold mb-1 text-gray-700">Jam</label>
                  <input 
                    type="time" 
                    className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400" 
                    defaultValue="23:59" 
                  />
                </div>
                <div className="col-span-2 flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded shadow transition"
                    onClick={() => setShowModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow transition flex items-center gap-2"
                  >
                    <FaSave /> Simpan
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