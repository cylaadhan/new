"use client";
import { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaSave, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { Edit, Trash2, User, Mail, Phone, Menu } from "lucide-react";
import Sidebar2 from "../../../../components/Sidebar2";

export default function Page() {
  const [formFields, setFormFields] = useState({
    nama: true,
    email: true,
    telepon: true,
    alamat: false,
    ktp: false,
    catatan: false
  });
  
  // State untuk mengelola tampilan mobile
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const adminName = "Panitia";

  // Deteksi ukuran layar untuk tampilan mobile
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

  const handleToggle = (field: string) => {
    setFormFields({
      ...formFields,
      [field]: !formFields[field as keyof typeof formFields]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika untuk menyimpan konfigurasi form
    console.log("Konfigurasi form disimpan:", formFields);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar dengan props yang diperlukan - hanya untuk desktop */}
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
        
        {/* Sidebar Mobile (hanya muncul saat tombol hamburger diklik) */}
        {isMobile && showMobileSidebar && (
          <div className="fixed inset-0 z-30">
            <Sidebar2 
              adminName={adminName} 
              showMobileSidebar={showMobileSidebar} 
              setShowMobileSidebar={setShowMobileSidebar} 
            />
          </div>
        )}
        
        <main className="p-4 md:p-8">
          {/* Header Desktop */}
          <div className={`${isMobile ? 'hidden' : 'flex'} flex-wrap justify-between items-center mb-8 gap-4`}>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Setup Form Pemesanan</h1>
              <p className="text-gray-500">Konfigurasi field yang ditampilkan pada form pemesanan</p>
            </div>
          </div>
          
          {/* Header Mobile Title */}
          {isMobile && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Setup Form Pemesanan</h1>
              <p className="text-gray-500 text-sm">Konfigurasi field yang ditampilkan pada form pemesanan</p>
            </div>
          )}

          {/* Form Setup Form Pemesanan */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Field Nama */}
                <div className="flex items-center justify-between p-3 md:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 md:gap-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm md:text-base">Nama Lengkap</h3>
                      <p className="text-xs md:text-sm text-gray-500">Field wajib, tidak dapat dinonaktifkan</p>
                    </div>
                  </div>
                  <div className="text-green-500">
                    <FaToggleOn className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                </div>

                {/* Field Email */}
                <div className="flex items-center justify-between p-3 md:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm md:text-base">Email</h3>
                      <p className="text-xs md:text-sm text-gray-500">Field wajib, tidak dapat dinonaktifkan</p>
                    </div>
                  </div>
                  <div className="text-green-500">
                    <FaToggleOn className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                </div>

                {/* Field Telepon */}
                <div className="flex items-center justify-between p-3 md:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm md:text-base">Nomor Telepon</h3>
                      <p className="text-xs md:text-sm text-gray-500">Field opsional</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleToggle('telepon')} 
                    className={formFields.telepon ? "text-green-500" : "text-gray-400"}
                  >
                    {formFields.telepon ? <FaToggleOn className="h-5 w-5 md:h-6 md:w-6" /> : <FaToggleOff className="h-5 w-5 md:h-6 md:w-6" />}
                  </button>
                </div>

                {/* Field Alamat */}
                <div className="flex items-center justify-between p-3 md:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm md:text-base">Alamat</h3>
                      <p className="text-xs md:text-sm text-gray-500">Field opsional</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleToggle('alamat')} 
                    className={formFields.alamat ? "text-green-500" : "text-gray-400"}
                  >
                    {formFields.alamat ? <FaToggleOn className="h-5 w-5 md:h-6 md:w-6" /> : <FaToggleOff className="h-5 w-5 md:h-6 md:w-6" />}
                  </button>
                </div>

                {/* Field KTP */}
                <div className="flex items-center justify-between p-3 md:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm md:text-base">Nomor KTP</h3>
                      <p className="text-xs md:text-sm text-gray-500">Field opsional</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleToggle('ktp')} 
                    className={formFields.ktp ? "text-green-500" : "text-gray-400"}
                  >
                    {formFields.ktp ? <FaToggleOn className="h-5 w-5 md:h-6 md:w-6" /> : <FaToggleOff className="h-5 w-5 md:h-6 md:w-6" />}
                  </button>
                </div>

                {/* Field Catatan */}
                <div className="flex items-center justify-between p-3 md:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm md:text-base">Catatan</h3>
                      <p className="text-xs md:text-sm text-gray-500">Field opsional</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleToggle('catatan')} 
                    className={formFields.catatan ? "text-green-500" : "text-gray-400"}
                  >
                    {formFields.catatan ? <FaToggleOn className="h-5 w-5 md:h-6 md:w-6" /> : <FaToggleOff className="h-5 w-5 md:h-6 md:w-6" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mt-6 md:mt-8">
                <button
                  type="submit"
                  className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  <FaSave className="inline mr-2" />
                  Simpan Konfigurasi
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}