"use client";
import Sidebar from "../../../../components/Sidebar";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar adminName="Pemilik Event" />
      <main className="flex-1 p-8 bg-gray-50">
        {/* Judul dan Export */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Verifikasi Pembayaran</h1>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-2 rounded shadow transition">
            Export
          </button>
        </div>
        {/* Filter & Statistik */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Tanggal Mulai</label>
              <input type="date" className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none" defaultValue="2025-07-20" />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Tanggal Selesai</label>
              <input type="date" className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none" defaultValue="2025-07-20" />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Jenis Tiket</label>
              <select className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none">
                <option>-- Semua Jenis Tiket --</option>
                <option>Early Bird</option>
                <option>Presale 1</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Status Pembayaran</label>
              <select className="w-full border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none">
                <option>-- Semua Status Pembayaran --</option>
                <option>Terbayar</option>
                <option>Belum Bayar</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 mb-4">
            <div>
              <div className="text-gray-500">Jumlah Tiket Dipesan</div>
              <div className="text-2xl font-bold text-orange-600">24 Tiket</div>
              <div className="text-gray-500 mt-2">Jumlah Fee Midtrans</div>
              <div className="text-xl font-bold text-orange-600">Rp13.243</div>
            </div>
            <div>
              <div className="text-gray-500">Jumlah Tiket Terjual</div>
              <div className="text-2xl font-bold text-orange-600">24 Tiket</div>
              <div className="text-gray-500 mt-2">Pendapatan Bersih di Potong Midtrans</div>
              <div className="text-xl font-bold text-orange-600">Rp1.441.477</div>
            </div>
            <div>
              <div className="text-gray-500">Jumlah Pendapatan</div>
              <div className="text-2xl font-bold text-orange-600">Rp1.454.720</div>
            </div>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded shadow transition mt-2">Filter</button>
        </div>
        {/* Tabel Data Dummy */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="w-full max-w-full">
            <table className="w-full table-auto text-xs border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 px-2 py-2 text-left font-bold text-gray-800">Tgl Pemesanan</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-left font-bold text-gray-800">Nama Pemesan</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800 min-w-[160px]">Email</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-left font-bold text-gray-800 min-w-[160px]">Jenis Tiket</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Jumlah Tiket</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Total Harga</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Jumlah Dibayarkan</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Metode Pembayaran</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Fee Midtrans</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Status</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Status Tiket</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4].map((i) => (
                  <tr key={i} className="even:bg-gray-50 hover:bg-blue-50 transition">
                    <td className="border-b border-gray-200 px-2 py-2 text-gray-800">08-04-2025 14:4{i}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-gray-800">User{i}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-gray-800 break-words">user{i}@example.com</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-gray-800 break-words">{i % 2 === 0 ? "Presale 1 SOERATS 2025" : "Early Bird SOERATS 2025"}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800">{i+1}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800">Rp{100000 + i*1000}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800">Rp{120000 + i*1000}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800">{i % 2 === 0 ? "qris" : "bca"}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800">Rp{800 + i*10}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center">
                      <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Pembayaran Terkonfirmasi</span>
                    </td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center">
                      <div className="flex flex-col gap-1 items-center">
                        <span className="inline-block bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs font-semibold">Tiket Sudah Dikirim</span>
                        <span className="inline-block bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs font-semibold">Tiket Sudah Di Aktivasi</span>
                      </div>
                    </td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center">
                      <div className="flex flex-col gap-2 items-center">
                        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-3 py-1 rounded shadow text-xs">Hide</button>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-1 rounded shadow text-xs">Kirim Konfirmasi Bayar</button>
                        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-3 py-1 rounded shadow text-xs">Kirim QR Tiket</button>
                        <button className="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold px-3 py-1 rounded shadow text-xs">Detail</button>
                        <button className="bg-[#4B1E0E] hover:bg-[#2d1208] text-white font-semibold px-3 py-1 rounded shadow text-xs">Generate QR</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}