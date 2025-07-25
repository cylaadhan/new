"use client";
import { useState } from "react";
import Sidebar2 from "../../../../components/Sidebar2";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const initialData = [
  { no: 1, tanggal: "2025-07-22", keterangan: "Withdraw ke BCA", jumlah: 500000 },
  { no: 2, tanggal: "2025-07-23", keterangan: "Withdraw ke Mandiri", jumlah: 300000 },
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

  const totalWithdraw = data.reduce((sum, d) => sum + d.jumlah, 0);
  const saldoAkhir = 1286000 - totalWithdraw;

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
      };
      setData(updatedData);
    } else {
      // Add new data
      const newData = {
        no: data.length > 0 ? Math.max(...data.map(item => item.no)) + 1 : 1,
        tanggal: formData.tanggal,
        keterangan: formData.keterangan,
        jumlah: parseInt(formData.jumlah) || 0,
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

  return (
    <div className="flex min-h-screen">
      <Sidebar2 adminName="Admin Tiket" />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Withdraw</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-6">
            <button 
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow flex items-center gap-2"
            >
              <FaPlus />
              Ajukan Withdraw
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 px-4 py-2 text-left font-bold text-black">No.</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-left font-bold text-black">Tanggal</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-left font-bold text-black">Keterangan</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-right font-bold text-black">Jumlah</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-center font-bold text-black">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={row.no} className="even:bg-gray-50 hover:bg-blue-50 transition">
                    <td className="border-b border-gray-200 px-4 py-2 text-gray-800">{row.no}</td>
                    <td className="border-b border-gray-200 px-4 py-2 text-gray-800">{row.tanggal}</td>
                    <td className="border-b border-gray-200 px-4 py-2 text-gray-800">{row.keterangan}</td>
                    <td className="border-b border-gray-200 px-4 py-2 text-right text-black font-bold">Rp{row.jumlah.toLocaleString('id-ID')}</td>
                    <td className="border-b border-gray-200 px-4 py-2 text-center">
                      <div className="flex flex-row flex-wrap justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(index)} 
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-3 py-1 rounded shadow text-xs"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(index)} 
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded shadow text-xs"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Baris Total Withdraw */}
                <tr className="bg-gray-100">
                  <td colSpan={3} className="border-b border-gray-200 px-4 py-2 text-right font-bold text-black">Total Withdraw</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-right font-bold text-black">Rp{totalWithdraw.toLocaleString('id-ID')}</td>
                  <td className="border-b border-gray-200 px-4 py-2"></td>
                </tr>
                {/* Baris Saldo Akhir */}
                <tr>
                  <td colSpan={3} className="border-b border-gray-200 px-4 py-2 text-right font-bold text-black">Saldo Akhir</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-right font-bold text-black">Rp{saldoAkhir.toLocaleString('id-ID')}</td>
                  <td className="border-b border-gray-200 px-4 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Ajukan Withdraw */}
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
            <h2 className="text-xl font-bold mb-6 text-gray-800">{editIndex !== null ? "Edit Withdraw" : "Ajukan Withdraw"}</h2>
            
            <div className="mb-4">
              <p className="text-gray-700 mb-1"><span className="font-semibold">Total Penjualan:</span> Rp{(1286000).toLocaleString('id-ID')}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Total Withdraw:</span> Rp{(800000).toLocaleString('id-ID')}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Saldo Akhir:</span> Rp{(486000).toLocaleString('id-ID')}</p>
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
                  placeholder="Masukkan keterangan"
                  required
                />
              </div>
              
              <div>
                <p className="text-gray-700"><span className="font-semibold">Saldo Akhir:</span> Rp{(486000).toLocaleString('id-ID')}</p>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="bg-[#4B1E0E] hover:bg-[#2d1208] text-white font-semibold px-4 py-2 rounded"
                >
                  {editIndex !== null ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}