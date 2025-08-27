"use client";
import { useState } from "react";
import { FaPlus, FaTimes, FaSave, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { Edit, Trash2, User, Mail, Phone } from "lucide-react";
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
      <Sidebar2 adminName="Panitia" />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Setup Form Pemesanan</h1>
            <p className="text-gray-500">Konfigurasi field yang ditampilkan pada form pemesanan</p>
          </div>
        </div>

        {/* Form Setup Form Pemesanan */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field Nama */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-800">Nama Lengkap</h3>
                    <p className="text-sm text-gray-500">Field wajib, tidak dapat dinonaktifkan</p>
                  </div>
                </div>
                <div className="text-green-500">
                  <FaToggleOn className="h-6 w-6" />
                </div>
              </div>

              {/* Field Email */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <p className="text-sm text-gray-500">Field wajib, tidak dapat dinonaktifkan</p>
                  </div>
                </div>
                <div className="text-green-500">
                  <FaToggleOn className="h-6 w-6" />
                </div>
              </div>

              {/* Field Telepon */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-800">Nomor Telepon</h3>
                    <p className="text-sm text-gray-500">Field opsional</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleToggle('telepon')} 
                  className={formFields.telepon ? "text-green-500" : "text-gray-400"}
                >
                  {formFields.telepon ? <FaToggleOn className="h-6 w-6" /> : <FaToggleOff className="h-6 w-6" />}
                </button>
              </div>

              {/* Field Alamat */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-800">Alamat</h3>
                    <p className="text-sm text-gray-500">Field opsional</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleToggle('alamat')} 
                  className={formFields.alamat ? "text-green-500" : "text-gray-400"}
                >
                  {formFields.alamat ? <FaToggleOn className="h-6 w-6" /> : <FaToggleOff className="h-6 w-6" />}
                </button>
              </div>

              {/* Field KTP */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-800">Nomor KTP</h3>
                    <p className="text-sm text-gray-500">Field opsional</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleToggle('ktp')} 
                  className={formFields.ktp ? "text-green-500" : "text-gray-400"}
                >
                  {formFields.ktp ? <FaToggleOn className="h-6 w-6" /> : <FaToggleOff className="h-6 w-6" />}
                </button>
              </div>

              {/* Field Catatan */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-800">Catatan</h3>
                    <p className="text-sm text-gray-500">Field opsional</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleToggle('catatan')} 
                  className={formFields.catatan ? "text-green-500" : "text-gray-400"}
                >
                  {formFields.catatan ? <FaToggleOn className="h-6 w-6" /> : <FaToggleOff className="h-6 w-6" />}
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaSave className="inline mr-2" />
                Simpan Konfigurasi
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}