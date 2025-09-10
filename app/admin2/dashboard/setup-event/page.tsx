"use client";
import { useState, useRef, useEffect } from "react";
import { FaPlus, FaTimes, FaSave, FaInstagram, FaTiktok } from "react-icons/fa";
import { Edit, Trash2, Calendar, MapPin, Clock, DollarSign, Link, FileText, Image, Menu } from "lucide-react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const adminName = "Panitia";

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

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
      {/* Sidebar untuk desktop */}
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <Sidebar2 
          adminName={adminName} 
          showMobileSidebar={showMobileSidebar} 
          setShowMobileSidebar={setShowMobileSidebar} 
        />
      </div>
      
      {/* Konten utama */}
      <div className="flex-1">
        {/* Header Mobile */}
        {isMobile && (
          <header className="sticky top-0 bg-white shadow-md z-20 px-4 py-3 flex items-center justify-between">
            <button 
              onClick={toggleMobileSidebar}
              className="p-1 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <span className="font-bold text-lg text-black">{adminName}</span>
            </div>
            
            <div className="w-6"></div> {/* Spacer untuk menjaga keseimbangan layout */}
          </header>
        )}
        
        {/* Sidebar Mobile - muncul saat tombol hamburger diklik */}
        {isMobile && showMobileSidebar && (
          <div className="fixed inset-0 z-30">
            <Sidebar2 
              adminName={adminName} 
              showMobileSidebar={showMobileSidebar} 
              setShowMobileSidebar={setShowMobileSidebar} 
            />
          </div>
        )}
        
        {/* Hapus overlay berikut karena sudah ada di dalam komponen Sidebar2 */}
        {/* {isMobile && showMobileSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30" 
            onClick={toggleMobileSidebar}
          ></div>
        )} */}

        <main className="p-4 md:p-8 z-10">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Setup Event</h1>
              <p className="text-gray-500">Konfigurasi informasi dasar event</p>
            </div>
          </div>

          {/* Form Setup Event */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Event */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Event</label>
                <div className="relative">
                  <input
                    type="text"
                    name="nama"
                    value={eventData.nama}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Masukkan nama event"
                  />
                </div>
              </div>

              {/* File */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                <div className="mt-1 flex items-center">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 flex items-center gap-2"
                    onClick={() => (fileInputRef.current as any)?.click()}
                  >
                    <FileText className="h-4 w-4" />
                    Pilih File
                  </button>
                  <span className="ml-3 text-sm text-gray-500">
                    {eventData.poster ? eventData.poster.name : "Belum ada file dipilih"}
                  </span>
                  {eventData.poster && (
                    <button
                      type="button"
                      onClick={() => {
                        setPosterPreview("");
                        setEventData({ ...eventData, poster: null });
                      }}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="*/*"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG Max 5MB
                </p>
              </div>

              {/* Tanggal dan Waktu Event */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Event</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="tanggal"
                      value={eventData.tanggal}
                      onChange={handleChange}
                      className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jam Mulai</label>
                  <div className="relative">
                    <input
                      type="time"
                      name="waktu"
                      value={eventData.waktu}
                      onChange={handleChange}
                      className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Lokasi dan Harga */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Event</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lokasi"
                      value={eventData.lokasi}
                      onChange={handleChange}
                      className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Masukkan lokasi event"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga Tiket Awal</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="hargaStart"
                      value={eventData.hargaStart}
                      onChange={handleChange}
                      className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Contoh: 50000"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Sosial */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="instagram"
                      value={eventData.instagram}
                      onChange={handleChange}
                      className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="@username"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaInstagram className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="tiktok"
                      value={eventData.tiktok}
                      onChange={handleChange}
                      className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="@username"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTiktok className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Deskripsi Event */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Event</label>
                <div className="relative">
                  <textarea
                    name="deskripsi"
                    value={eventData.deskripsi}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Masukkan deskripsi event"
                  ></textarea>
                </div>
              </div>

              {/* Syarat dan Ketentuan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Syarat & Ketentuan</label>
                <div className="relative">
                  <textarea
                    name="syaratKetentuan"
                    value={eventData.syaratKetentuan}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Masukkan syarat dan ketentuan event"
                  ></textarea>
                </div>
              </div>

              {/* Tombol Submit */}
              <div className="flex flex-wrap gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <FaSave className="h-4 w-4" />
                  Simpan
                </button>
                <button
                  type="button"
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
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <FaTimes className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}