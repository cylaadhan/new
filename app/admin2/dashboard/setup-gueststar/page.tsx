"use client";
import { useState } from "react";
import { FaPlus, FaTimes, FaSave, FaTrash } from "react-icons/fa";
import { Edit, Trash2, Music, Image, Star } from "lucide-react";
import Sidebar2 from "../../../../components/Sidebar2";

export default function Page() {
  const [guestStars, setGuestStars] = useState([
    { id: 1, nama: "", deskripsi: "", gambar: null }
  ]);

  const handleChange = (id: number, field: string, value: string) => {
    setGuestStars(guestStars.map(star => 
      star.id === id ? { ...star, [field]: value } : star
    ));
  };

  const handleAddGuestStar = () => {
    const newId = guestStars.length > 0 ? Math.max(...guestStars.map(star => star.id)) + 1 : 1;
    setGuestStars([...guestStars, { id: newId, nama: "", deskripsi: "", gambar: null }]);
  };

  const handleRemoveGuestStar = (id: number) => {
    if (guestStars.length > 1) {
      setGuestStars(guestStars.filter(star => star.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika untuk menyimpan data guest star
    console.log("Data guest star disimpan:", guestStars);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar2 adminName="Panitia" />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Setup Guest Star</h1>
            <p className="text-gray-500">Tambahkan informasi guest star/artis untuk event</p>
          </div>
        </div>

        {/* Form Setup Guest Star */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {guestStars.map((star, index) => (
              <div key={star.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Guest Star {index + 1}
                  </h3>
                  {guestStars.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => handleRemoveGuestStar(star.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Nama Artis/Guest Star</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Music className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={star.nama}
                      onChange={(e) => handleChange(star.id, 'nama', e.target.value)}
                      className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none"
                      placeholder="Masukkan nama artis/guest star"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-2 text-gray-700">Deskripsi</label>
                  <textarea
                    value={star.deskripsi}
                    onChange={(e) => handleChange(star.id, 'deskripsi', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none"
                    placeholder="Masukkan deskripsi singkat tentang artis/guest star"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2 text-gray-700">Gambar</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Pilih Gambar
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddGuestStar}
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 w-full justify-center"
            >
              <FaPlus className="h-4 w-4" />
              Tambah Guest Star
            </button>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaSave className="inline mr-2" />
                Simpan
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}