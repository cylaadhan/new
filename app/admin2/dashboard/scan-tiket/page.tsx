"use client";
import { useState, useRef, useCallback } from "react";
import Sidebar2 from "../../../../components/Sidebar2";
import { FaQrcode, FaCamera, FaUpload, FaArrowLeft } from "react-icons/fa";
import Webcam from "react-webcam";

export default function ScanTiketPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  
  // Konfigurasi kamera
  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "environment" // Gunakan kamera belakang untuk scan QR
  };
  
  // Fungsi untuk meminta izin kamera
  const requestCameraPermission = () => {
    setIsCameraActive(true);
  };
  
  // Fungsi untuk menangkap gambar dari kamera
  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Di sini Anda bisa menambahkan logika untuk memproses QR code
        // Misalnya menggunakan library seperti jsQR
        setScanResult("Berhasil mengambil gambar, memproses QR code...");
        // Simulasi hasil scan
        setTimeout(() => {
          setScanResult("Tiket #EB-1234 terverifikasi");
        }, 1000);
      }
    }
  }, [webcamRef]);
  
  // Fungsi untuk menangani pemindaian file gambar
  const handleImageScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Dalam implementasi nyata, ini akan memproses gambar untuk memindai QR code
      const fileName = e.target.files[0].name;
      setScanResult(`Memindai file: ${fileName}`);
    }
  };
  
  // Fungsi untuk kembali ke tampilan awal
  const handleBack = () => {
    setIsCameraActive(false);
    setScanResult(null);
  };
  
  return (
    <div className="flex min-h-screen">
      <Sidebar2 adminName="Admin Tiket" />
      <main className="flex-1 p-8 bg-gray-50 text-black">
        {/* Header dengan tombol kembali jika kamera aktif */}
        <div className="flex items-center mb-8">
          {isCameraActive && (
            <button 
              onClick={handleBack}
              className="mr-4 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors"
              aria-label="Kembali"
            >
              <FaArrowLeft className="text-lg" />
            </button>
          )}
          <h1 className="text-3xl font-bold">Scan Tiket</h1>
        </div>
        
        {/* Area Pemindaian */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
            {isCameraActive ? (
              <div className="w-full max-w-md aspect-square bg-gray-100 flex flex-col items-center justify-center rounded-lg mb-4">
                {/* Area kamera */}
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="rounded-lg"
                  mirrored={false}
                  style={{ width: '100%', height: 'auto' }}
                />
                <button 
                  onClick={captureImage}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
                >
                  Ambil Gambar
                </button>
              </div>
            ) : (
              <div className="text-center mb-6">
                <FaQrcode className="text-6xl mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-6">Pindai QR code tiket untuk verifikasi</p>
                
                <button 
                  onClick={requestCameraPermission}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition mb-4 w-full max-w-xs"
                >
                  Aktifkan Kamera
                </button>
                
                <div className="flex items-center justify-center my-4">
                  <div className="border-t border-gray-300 flex-grow"></div>
                  <span className="px-4 text-gray-500 text-sm">ATAU</span>
                  <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                
                <label className="block">
                  <span className="sr-only">Scan an Image File</span>
                  <div className="flex items-center justify-center">
                    <a 
                      href="#"
                      onClick={() => document.getElementById('fileInput')?.click()}
                      className="text-blue-600 hover:text-blue-800 underline flex items-center"
                    >
                      <FaUpload className="mr-2" /> Scan an Image File
                    </a>
                    <input 
                      id="fileInput"
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageScan}
                    />
                  </div>
                </label>
              </div>
            )}
            
            {scanResult && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg w-full max-w-md">
                <h3 className="font-semibold text-green-800 mb-2">Hasil Pemindaian:</h3>
                <p className="text-green-700">{scanResult}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Riwayat Pemindaian (opsional) */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Riwayat Pemindaian</h2>
          <div className="text-gray-500 italic">
            Belum ada riwayat pemindaian
          </div>
        </div>
      </main>
    </div>
  );
}