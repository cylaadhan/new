"use client";
import Sidebar from "../../../../components/Sidebar";

const data = [
  { tiket: "TKT001", nama: "axcel", email: "axcel@gmail.com", jenis: "Early Bird SOERATS 2025", scan: "21-07-2025 09:00" },
  { tiket: "TKT002", nama: "Adin", email: "andin@gmail.com", jenis: "Presale 1 SOERATS 2025", scan: "21-07-2025 09:05" },
  { tiket: "TKT003", nama: "Neli", email: "neli@gmail.com", jenis: "Early Bird SOERATS 2025", scan: "21-07-2025 09:10" },
  { tiket: "TKT004", nama: "Banyu", email: "banyu@gmail.com", jenis: "Presale 1 SOERATS 2025", scan: "21-07-2025 09:15" },
];

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar adminName="Pemilik Event" />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Penukaran Tiket & Gelang</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="w-full max-w-full">
            <table className="w-full table-auto text-sm border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">No. Tiket</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Nama Pemesan</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Email</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Jenis Tiket</th>
                  <th className="border-b border-gray-200 px-2 py-2 text-center font-bold text-gray-800">Tanggal Scan</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="even:bg-gray-50 hover:bg-blue-50 transition">
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800">{row.tiket}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800">{row.nama}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800 break-words">{row.email}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800 break-words">{row.jenis}</td>
                    <td className="border-b border-gray-200 px-2 py-2 text-center text-gray-800">{row.scan}</td>
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