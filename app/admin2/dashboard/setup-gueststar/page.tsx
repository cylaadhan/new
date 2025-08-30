"use client";
import { useState } from "react";
import { FaPlus, FaTimes, FaSave, FaTrash, FaInstagram } from "react-icons/fa";
import { Edit, Trash2, Music, Image, Star, Link, Globe } from "lucide-react";
import Sidebar2 from "../../../../components/Sidebar2";

export default function Page() {
  const [guestStars, setGuestStars] = useState([
    { id: 1, nama: "", gambar: null, instagram: "" }
  ]);

  const handleChange = (id: number, field: string, value: string | File | null) => {
    setGuestStars(guestStars.map(star => 
      star.id === id ? { ...star, [field]: value } : star
    ));
  };

  const handleAddGuestStar = () => {
    const newId = guestStars.length > 0 ? Math.max(...guestStars.map(star => star.id)) + 1 : 1;
    setGuestStars([...guestStars, { id: newId, nama: "", gambar: null, instagram: "" }]);
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
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {guestStars.map((star, index) => (
              <div key={star.id} className="p-6 border rounded-lg space-y-5 bg-gray-50 hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-center border-b pb-4">
                  <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Guest Star {index + 1}
                  </h3>
                  {guestStars.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => handleRemoveGuestStar(star.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Kolom Kiri: Informasi Dasar */}
                  <div className="space-y-4">
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
                          className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          placeholder="Masukkan nama artis/guest star"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium mb-2 text-gray-700">Foto Artis</label>
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                          {star.gambar ? (
                            <img src={URL.createObjectURL(star.gambar)} alt={star.nama} className="w-full h-full object-cover" />
                          ) : (
                            <Image className="h-10 w-10 text-gray-400" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <input
                            type="file"
                            id={`foto-${star.id}`}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleChange(star.id, 'gambar', e.target.files[0]);
                              }
                            }}
                          />
                          <label
                            htmlFor={`foto-${star.id}`}
                            className="px-4 py-2 bg-blue-50 border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-100 cursor-pointer inline-block"
                          >
                            Pilih Foto
                          </label>
                          <p className="text-xs text-gray-500">Format: JPG, PNG. Maks 2MB</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kolom Kanan: Link Instagram */}
                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium mb-2 text-gray-700 flex items-center gap-2">
                        <FaInstagram className="text-pink-600" /> Link Instagram
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Link className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={star.instagram}
                          onChange={(e) => handleChange(star.id, 'instagram', e.target.value)}
                          className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          placeholder="https://instagram.com/username"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddGuestStar}
              className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 w-full justify-center hover:border-blue-300 transition-colors"
            >
              <FaPlus className="h-4 w-4" />
              Tambah Guest Star
            </button>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FaSave className="h-4 w-4" />
                Simpan Data Guest Star
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}