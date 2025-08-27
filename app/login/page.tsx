"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Kredensial untuk kedua admin
const ADMIN_CREDENTIALS = {
  admin1: {
    username: "admin",
    password: "admin",
    redirectPath: "/admin/dashboard",
    storageKey: "isAdmin1LoggedIn"
  },
  admin2: {
    username: "admin2",
    password: "admin2",
    redirectPath: "/admin2/dashboard",
    storageKey: "isAdmin2LoggedIn"
  }
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Cek kredensial admin1
    if (
      username === ADMIN_CREDENTIALS.admin1.username &&
      password === ADMIN_CREDENTIALS.admin1.password
    ) {
      if (typeof window !== "undefined") {
        localStorage.setItem(ADMIN_CREDENTIALS.admin1.storageKey, "true");
      }
      router.push(ADMIN_CREDENTIALS.admin1.redirectPath);
      return;
    }
    
    // Cek kredensial admin2
    if (
      username === ADMIN_CREDENTIALS.admin2.username &&
      password === ADMIN_CREDENTIALS.admin2.password
    ) {
      if (typeof window !== "undefined") {
        localStorage.setItem(ADMIN_CREDENTIALS.admin2.storageKey, "true");
      }
      router.push(ADMIN_CREDENTIALS.admin2.redirectPath);
      return;
    }
    
    // Jika tidak ada yang cocok
    setError("Username atau password salah");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-4xl flex overflow-hidden rounded-2xl shadow-2xl">
        {/* Bagian Kiri - Gambar */}
        <div className="hidden md:block w-1/2 bg-blue-600 p-8 relative">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 h-full flex flex-col justify-between text-white">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome</h2>
              <p className="text-blue-100">Selamat datang di Protix.id</p>
            </div>
            <div className="flex justify-center items-center h-full">
              <Image 
                src="/lorg.png" 
                alt="Event Management" 
                width={300} 
                height={300}
                className="rounded-xl shadow-lg object-cover"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <p className="text-sm text-blue-100">© 2025 Event Management System</p>
          </div>
        </div>
        
        {/* Bagian Kanan - Form Login */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Image src="/lorg.png" alt="Logo" width={32} height={32} className="invert" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Login Admin</h1>
            <p className="text-gray-500 mt-2">Please login to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}