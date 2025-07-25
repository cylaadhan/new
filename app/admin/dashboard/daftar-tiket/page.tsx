"use client";
import Sidebar from "../../../../components/Sidebar";

const data = [
  {
    tgl: "08-04-2025 14:52",
    nama: "Alex Johnson",
    email: "alex.johnson@example.com",
    jenis: "Early Bird SOERATS 2025",
    jumlah: 2,
    harga: "Rp53.000",
    total: "Rp106.000",
    dibayar: "Rp120.385",
  },
  {
    tgl: "16-03-2025 21:38",
    nama: "Sarah Miller",
    email: "sarah.miller@example.com",
    jenis: "Early Bird SOERATS 2025",
    jumlah: 2,
    harga: "Rp60.000",
    total: "Rp120.000",
    dibayar: "Rp134.232",
  },
  {
    tgl: "23-03-2025 13:12",
    nama: "Michael Chen",
    email: "michael.chen@example.com",
    jenis: "Early Bird SOERATS 2025",
    jumlah: 20,
    harga: "Rp53.000",
    total: "Rp1.060.000",
    dibayar: "Rp1.200.103",
  },
];

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar adminName="Pemilik Event" />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Daftar Tiket</h1>
        {/* Statistik per box */}
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-4 min-w-[180px] flex-1">
            <div className="text-gray-500 font-medium mb-1">Jml Tiket Terjual</div>
            <div className="text-2xl font-bold text-orange-600">24</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 min-w-[180px] flex-1">
            <div className="text-gray-500 font-medium mb-1">Total Harga Tiket</div>
            <div className="text-2xl font-bold text-orange-600">Rp1.286.000</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 min-w-[180px] flex-1">
            <div className="text-gray-500 font-medium mb-1">Total Fee</div>
            <div className="text-2xl font-bold text-orange-600">Rp168.000</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 min-w-[180px] flex-1">
            <div className="text-gray-500 font-medium mb-1">Total Kode Unik</div>
            <div className="text-2xl font-bold text-orange-600">Rp720</div>
          </div>
        </div>
        {/* Export Data Container */}
        <div className="bg-white rounded-xl shadow p-6 mb-4">
          <div className="font-bold text-lg text-gray-800 mb-4">Export Data</div>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Tanggal Mulai</label>
                <input type="date" className="border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none" defaultValue="2025-07-21" />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Tanggal Selesai</label>
                <input type="date" className="border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none" defaultValue="2025-07-21" />
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow h-fit mt-6">Export Excel</button>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded shadow h-fit mt-6">Statistik Tiket Referral</button>
          </div>
        </div>
        {/* Filter & Search */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Tanggal Mulai</label>
                <input type="date" className="border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none" defaultValue="2025-07-21" />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Tanggal Selesai</label>
                <input type="date" className="border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none" defaultValue="2025-07-21" />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Jenis Tiket</label>
                <select className="border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none">
                  <option>-- Semua Jenis Tiket --</option>
                  <option>Early Bird SOERATS 2025</option>
                  <option>Presale 1 SOERATS 2025</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Status Pembayaran</label>
                <select className="border rounded px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none">
                  <option>-- Semua Status Pembayaran --</option>
                  <option>Terbayar</option>
                  <option>Belum Bayar</option>
                </select>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow h-fit">Filter</button>
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <label className="font-semibold text-gray-700 text-xs">Show</label>
                <select className="border rounded px-2 py-1 text-gray-800 text-xs w-20 focus:border-blue-300 focus:outline-none">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                <span className="text-xs text-gray-700">entries</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="font-semibold text-gray-700 text-xs">Search:</label>
                <input type="text" className="border rounded px-2 py-1 text-gray-800 text-xs focus:border-blue-300 focus:outline-none w-32" placeholder="Search..." />
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="w-full max-w-full">
            <table className="w-full table-auto text-xs border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 px-2 py-2 text-left font-bold text-gray-800">Tgl Pemesanan</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-left font-bold text-gray-800">Nama Pemesan</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800 min-w-[160px]">Email</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-left font-bold text-gray-800 min-w-[160px]">Jenis Tiket</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Jumlah Tiket</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Harga Satuan</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Total Harga</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Jumlah Dibayarkan</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="even:bg-gray-50 hover:bg-blue-50 transition">
                    <td className="border-b border-gray-200 px-2 py-2 text-gray-800">{row.tgl}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-gray-800">{row.nama}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800 break-words">{row.email}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-gray-800 break-words">{row.jenis}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800">{row.jumlah}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800">{row.harga}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800">{row.total}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800">{row.dibayar}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center">
                      <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-3 py-1 rounded shadow text-xs">Daftar Tiket</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Dummy */}
          <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
            <span>Showing 1 to 3 of 3 entries</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 rounded-full border border-gray-300 bg-gray-100 font-semibold">Previous</button>
              <span className="mx-2 font-semibold">1</span>
              <button className="px-3 py-1 rounded-full border border-gray-300 bg-gray-100 font-semibold">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}