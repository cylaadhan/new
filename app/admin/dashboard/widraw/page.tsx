"use client";
import Sidebar from "../../../../components/Sidebar";

const data = [
  { no: 1, tanggal: "2025-07-22", keterangan: "Withdraw ke BCA", jumlah: 500000 },
  { no: 2, tanggal: "2025-07-23", keterangan: "Withdraw ke Mandiri", jumlah: 300000 },
];

export default function Page() {
  const totalWithdraw = data.reduce((sum, d) => sum + d.jumlah, 0);
  const saldoAkhir = 1286000 - totalWithdraw;

  return (
    <div className="flex min-h-screen">
      <Sidebar adminName="Pemilik Event" />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Withdraw</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 px-4 py-2 text-left font-bold text-black">No.</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-left font-bold text-black">Tanggal</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-left font-bold text-black">Keterangan</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-right font-bold text-black">Jumlah</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-center font-bold text-black">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.no} className="even:bg-gray-50 hover:bg-blue-50 transition">
                    <td className="border-b border-gray-200 px-4 py-2 text-gray-800">{row.no}</td>
                    <td className="border-b border-gray-200 px-4 py-2 text-gray-800">{row.tanggal}</td>
                    <td className="border-b border-gray-200 px-4 py-2 text-gray-800">{row.keterangan}</td>
                    <td className="border-b border-gray-200 px-4 py-2 text-right text-black font-bold">Rp{row.jumlah.toLocaleString('id-ID')}</td>
                    <td className="border-b border-gray-200 px-4 py-2 text-center">
                      <div className="flex flex-row flex-wrap justify-center gap-2">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1 rounded shadow text-xs">Setujui</button>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded shadow text-xs">Tolak</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Baris Total Withdraw */}
                <tr className="bg-gray-100">
                  <td colSpan={3} className="border-b border-gray-200 px-4 py-2 text-right font-bold text-black">Total Withdraw</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-right font-bold text-black">Rp{totalWithdraw.toLocaleString('id-ID')}</td>
                  <td className="border-b border-gray-200 px-4 py-2"></td>
                </tr>
                {/* Baris Saldo Akhir */}
                <tr>
                  <td colSpan={3} className="border-b border-gray-200 px-4 py-2 text-right font-bold text-black">Saldo Akhir</td>
                  <td className="border-b border-gray-200 px-4 py-2 text-right font-bold text-black">Rp{saldoAkhir.toLocaleString('id-ID')}</td>
                  <td className="border-b border-gray-200 px-4 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 