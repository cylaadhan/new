"use client";
import Sidebar from "../../../../components/Sidebar";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar adminName="Pemilik Event" />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Setup Fee Tiket</h1>
        <div className="bg-white rounded-xl shadow p-6 max-w-md">
          <form className="space-y-6">
            <div>
              <label className="block font-semibold mb-1 text-gray-700 text-lg">Fee Per Tiket</label>
              <div className="flex items-center">
                <span className="inline-flex items-center h-10 px-4 border border-r-0 rounded-l text-gray-500 bg-gray-100 font-semibold">Rp</span>
                <input
                  type="number"
                  className="w-full h-10 border rounded-r px-4 text-gray-800 focus:border-blue-300 focus:outline-none placeholder-gray-400 text-lg"
                  placeholder="Masukkan fee per tiket"
                  defaultValue={7000}
                  min={0}
                />
              </div>
            </div>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded shadow transition"
            >
              Simpan
            </button>
          </form>
        </div>
      </main>
    </div>
  );
} 