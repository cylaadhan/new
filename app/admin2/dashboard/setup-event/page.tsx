"use client";
import { useState, useRef } from "react";
import { FaPlus, FaTimes, FaSave, FaInstagram, FaTiktok } from "react-icons/fa";
import { Edit, Trash2, Calendar, MapPin, Clock, DollarSign, Link, FileText, Image } from "lucide-react";
import Sidebar2 from "../../../../components/Sidebar2";

export default function Page() {
  interface EventData {
    nama: string;
    tanggal: string;
    waktu: string;
    lokasi: string;
    hargaStart: string;
    deskripsi: string;
    instagram: string;
    tiktok: string;
    syaratKetentuan: string;
    poster: File | null;
  }

  const [eventData, setEventData] = useState<EventData>({
    nama: "",
    tanggal: "",
    waktu: "",
    lokasi: "",
    hargaStart: "",
    deskripsi: "",
    instagram: "",
    tiktok: "",
    syaratKetentuan: "",
    poster: null
  });
  
  const [posterPreview, setPosterPreview] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEventData({
        ...eventData,
        poster: file
      });
      
      // Membuat URL preview untuk gambar
      const reader = new FileReader();
      reader.onload = (event) => {
        setPosterPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika untuk menyimpan data event
    console.log("Data event disimpan:", eventData);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar2 adminName="Panitia" />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Setup Event</h1>
            <p className="text-gray-500">Konfigurasi informasi dasar event</p>
          </div>
        </div>

        {/* Form Setup Event */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Event */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">Nama Event</label>
              <input
                type="text"
                name="nama"
                value={eventData.nama}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Masukkan nama event"
                required
              />
            </div>
            
            {/* Poster Event */}
            <div>
              <label className="block font-medium mb-2 text-gray-700 flex items-center gap-2">
                <Image className="h-5 w-5 text-gray-600" /> Poster Event
              </label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 w-full md:w-1/2 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors relative overflow-hidden"
                onClick={() => {
                  if (fileInputRef.current) {
                    (fileInputRef.current as HTMLInputElement).click();
                  }
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                
                {posterPreview ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={posterPreview} 
                      alt="Preview poster" 
                      className="h-full w-full object-contain" 
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation(); // Mencegah event click menyebar ke parent
                        setPosterPreview("");
                        setEventData({...eventData, poster: null});
                        if (fileInputRef.current) {
                          (fileInputRef.current as HTMLInputElement).value = "";
                        }
                      }}
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Image className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-center text-sm">Klik untuk upload poster</p>
                    <p className="text-xs text-gray-400 mt-1">Format: JPG, PNG, WEBP</p>
                  </>
                )}
              </div>
            </div>

            {/* Tanggal, Waktu dan Lokasi */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-2 text-gray-700">Tanggal Event</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="tanggal"
                    value={eventData.tanggal}
                    onChange={handleChange}
                    className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-700">Jam Mulai</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    name="waktu"
                    value={eventData.waktu}
                    onChange={handleChange}
                    className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-700">Harga Tiket Start From</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">Rp</span>
                  </div>
                  <input
                    type="number"
                    name="hargaStart"
                    value={eventData.hargaStart}
                    onChange={handleChange}
                    className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Contoh: 50000"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Lokasi */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">Lokasi Event</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="lokasi"
                  value={eventData.lokasi}
                  onChange={handleChange}
                  className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Masukkan lokasi event"
                  required
                />
              </div>
            </div>

            {/* Media Sosial */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    name="instagram"
                    value={eventData.instagram}
                    onChange={handleChange}
                    className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="https://instagram.com/username"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-700 flex items-center gap-2">
                  <FaTiktok className="text-black" /> Link TikTok
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="tiktok"
                    value={eventData.tiktok}
                    onChange={handleChange}
                    className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="https://tiktok.com/@username"
                  />
                </div>
              </div>
            </div>

            {/* Deskripsi Event */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">Deskripsi Event</label>
              <textarea
                name="deskripsi"
                value={eventData.deskripsi}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Masukkan deskripsi event"
                rows={4}
              />
            </div>

            {/* Syarat dan Ketentuan */}
            <div>
              <label className="block font-medium mb-2 text-gray-700 flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" /> Syarat dan Ketentuan
              </label>
              <textarea
                name="syaratKetentuan"
                value={eventData.syaratKetentuan}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Masukkan syarat dan ketentuan event"
                rows={6}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaSave className="inline mr-2" />
                Simpan
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setEventData({
                    nama: "",
                    tanggal: "",
                    waktu: "",
                    lokasi: "",
                    hargaStart: "",
                    deskripsi: "",
                    instagram: "",
                    tiktok: "",
                    syaratKetentuan: "",
                    poster: null
                  });
                  setPosterPreview("");
                  if (fileInputRef.current) {
                    (fileInputRef.current as HTMLInputElement).value = "";
                  }
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}