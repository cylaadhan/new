"use client";
import Sidebar from "../../../../components/Sidebar";
import { useState } from "react";
import { AlertCircle, RefreshCw, Save } from "lucide-react";

export default function Page() {
  const [feeAmount, setFeeAmount] = useState(""); 
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fungsi untuk menangani perubahan fee
  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeeAmount(e.target.value); // Simpan nilai input apa adanya
  };
  
  // Fungsi untuk menangani penyimpanan fee
  const handleSave = () => {
    setIsLoading(true);
    // Simulasi proses penyimpanan
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      // Sembunyikan pesan sukses setelah 3 detik
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };
  
  const feeValue = feeAmount === "" ? 0 : parseInt(feeAmount);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar adminName="Pemilik Event" />
      <main className="flex-1 p-8">
        <div className="w-full mx-0"> 
          {/* Header dengan informasi halaman */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Setup Fee Tiket</h1>
              <p className="text-gray-500 mt-1">Atur biaya layanan untuk setiap tiket yang terjual</p>
            </div>
          
          </div>
          
          {/* Form pengaturan fee */}
          <div className="bg-white rounded-xl shadow-md p-6 w-[600px]"> 
            <h2 className="font-semibold text-gray-800 text-lg mb-4">Pengaturan Fee Tiket</h2>
            
            {showSuccess && (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-4 flex items-center gap-2">
                <div className="bg-green-100 p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Fee tiket berhasil diperbarui!</span>
              </div>
            )}
            
            <form className="space-y-6">
              <div>
                <label className="block font-medium mb-2 text-gray-700">Fee Per Tiket</label>
                <div className="flex items-center max-w-md">
                  <span className="inline-flex items-center h-12 px-4 border border-r-0 rounded-l-lg text-gray-500 bg-gray-50 font-semibold">Rp</span>
                  {/* Input fee tiket tanpa atribut min */}
                  <input
                    type="number"
                    className="w-full h-12 border rounded-r-lg px-4 text-gray-800 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none transition-all duration-200 text-lg"
                    placeholder="Masukkan fee per tiket"
                    value={feeAmount}
                    onChange={handleFeeChange}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                  <AlertCircle size={14} />
                  Fee ini akan dikenakan untuk setiap tiket yang terjual
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'}`}
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Simpan Perubahan</span>
                    </>
                  )}
                </button>
                
                {/* Tombol reset untuk mengosongkan input */}
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-all duration-200"
                  onClick={() => setFeeAmount("")}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}