"use client";
import Sidebar2 from "../../../../components/Sidebar2";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar2 adminName="Panitia" />
      <main className="flex-1 p-8">
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Pemesanan Tiket</h1>
            <p className="text-gray-500">Kelola pemesanan tiket event</p>
          </div>
        </div>
      </main>
    </div>
  );
}