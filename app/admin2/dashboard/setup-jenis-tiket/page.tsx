"use client";
import { useState } from "react";
import { FaPlus, FaTimes, FaSave } from "react-icons/fa";
import { Edit, Trash2 } from "lucide-react";
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [newTicket, setNewTicket] = useState({
    kode: "",
    nama: "",
    harga: "",
    kuota: ""
  });

  const handleEdit = (row: any) => {
    setEditData(row);
    setShowModal(true);
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewTicket({
      ...newTicket,
      [id]: value
    });
  };

  const handleAddTicket = () => {
    // Logika untuk menambah tiket baru
    setShowAddModal(false);
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
      <Sidebar2 adminName="Panitia" />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Setup Jenis Tiket & Harga</h1>
          </div>
        </div>

        {/* Kotak untuk Tabel */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <button 
            className="mb-4 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow transition"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus />
            Tambah
          </button>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-medium text-gray-500 text-xs">KODE</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">NAMA</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">HARGA</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">KUOTA</th>
                  <th className="p-4 font-medium text-gray-500 text-xs">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.kode} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-900">{row.kode}</td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full text-center w-fit ${getTipeClass(row.nama)}`}>
                        {row.nama}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-900 text-sm">{formatRupiah(row.harga)}</td>
                    <td className="p-4 text-sm text-gray-900">{row.kuota}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button 
                          className="text-blue-800 hover:text-black transition-colors duration-200"
                          onClick={() => handleEdit(row)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-black transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
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
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black bg-opacity-30 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
                aria-label="Tutup"
              >
                <FaTimes />
              </button>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Edit Setup Jenis Tiket & Harga</h2>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-gray-700 text-sm">Kode Jenis Tiket</label>
                  <input 
                    type="text" 
                    className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400 text-sm" 
                    defaultValue={editData?.kode || ""} 
                  />
                  <label className="block font-medium mb-1 text-gray-700 text-sm">Harga</label>
                  <div className="flex items-center">
                    <span className="inline-block px-2 py-2 border border-r-0 rounded-l text-gray-500 bg-gray-100 text-sm">Rp</span>
                    <input 
                      type="number" 
                      className="w-full border rounded-r px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400 text-sm" 
                      defaultValue={editData?.harga || ""} 
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-700 text-sm">Nama Jenis Tiket</label>
                  <input 
                    type="text" 
                    className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400 text-sm" 
                    defaultValue={editData?.nama || ""} 
                  />
                  <label className="block font-medium mb-1 text-gray-700 text-sm">Kuota Tiket</label>
                  <input 
                    type="number" 
                    className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400 text-sm" 
                    defaultValue={editData?.kuota || ""} 
                  />
                </div>
                <div className="col-span-2 flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded transition text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded transition text-sm flex items-center gap-2"
                  >
                    <FaSave className="text-xs" /> Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Modal Tambah Pop Up */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddModal(false)}
                aria-label="Tutup"
              >
                <FaTimes />
              </button>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Tambah Setup Jenis Tiket & Harga</h2>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-gray-700 text-sm">Kode Jenis Tiket</label>
                  <input 
                    type="text" 
                    id="kode"
                    className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400 text-sm" 
                    value={newTicket.kode} 
                    onChange={handleAddChange}
                    placeholder="Contoh: EB, P1, P2"
                  />
                  <label className="block font-medium mb-1 text-gray-700 text-sm">Harga</label>
                  <div className="flex items-center">
                    <span className="inline-block px-2 py-2 border border-r-0 rounded-l text-gray-500 bg-gray-50 text-sm">Rp</span>
                    <input 
                      type="number" 
                      id="harga"
                      className="w-full border rounded-r px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400 text-sm" 
                      value={newTicket.harga} 
                      onChange={handleAddChange}
                      placeholder="Contoh: 50000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1 text-gray-700 text-sm">Nama Jenis Tiket</label>
                  <input 
                    type="text" 
                    id="nama"
                    className="w-full border rounded px-3 py-2 mb-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400 text-sm" 
                    value={newTicket.nama} 
                    onChange={handleAddChange}
                    placeholder="Contoh: Early Bird"
                  />
                  <label className="block font-medium mb-1 text-gray-700 text-sm">Kuota Tiket</label>
                  <input 
                    type="number" 
                    id="kuota"
                    className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400 text-sm" 
                    value={newTicket.kuota} 
                    onChange={handleAddChange}
                    placeholder="Contoh: 100"
                  />
                </div>
                <div className="col-span-2 flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded transition text-sm"
                    onClick={() => setShowAddModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded transition text-sm flex items-center justify-center gap-1"
                    onClick={handleAddTicket}
                  >
                    <FaPlus className="text-xs" /> Tambah
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