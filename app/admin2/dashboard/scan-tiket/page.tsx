"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Sidebar2 from "../../../../components/Sidebar2";
import { FaQrcode, FaCamera, FaUpload, FaArrowLeft } from "react-icons/fa";
import { Menu } from "lucide-react";
import Webcam from "react-webcam";

export default function ScanTiketPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  
  // State untuk mobile view
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const adminName = "Admin Tiket";

  // Deteksi ukuran layar untuk mobile view
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Cek saat komponen dimuat
    checkIsMobile();

    // Tambahkan event listener untuk resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup event listener saat komponen unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };
  
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
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar untuk desktop */}
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <Sidebar2 
          adminName={adminName} 
          showMobileSidebar={showMobileSidebar} 
          setShowMobileSidebar={setShowMobileSidebar} 
        />
      </div>
      
      {/* Sidebar untuk mobile */}
      {isMobile && showMobileSidebar && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={toggleMobileSidebar}>
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <Sidebar2 
              adminName={adminName} 
              showMobileSidebar={showMobileSidebar} 
              setShowMobileSidebar={setShowMobileSidebar} 
            />
          </div>
        </div>
      )}
      
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
            
            <div className="w-6"></div> 
          </header>
        )}
        
        <main className={`${isMobile ? 'p-4' : 'p-8'} bg-gray-50 text-black`}>
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
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}>Scan Tiket</h1>
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
    </div>
  );
}