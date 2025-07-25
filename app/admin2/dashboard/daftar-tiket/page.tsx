"use client";
import { useState, useEffect } from "react";
import Sidebar2 from "../../../../components/Sidebar2";
import { FaTimes } from "react-icons/fa";

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
    noWA: "082218878996",
    waktuPemesanan: "08-04-2025 14:52",
    buktiTransfer: "ada",
    tiketDetail: [
      { noTiket: "EB-0023-1/2-M", checksum: "M" },
      { noTiket: "EB-0024-2/2-F", checksum: "F" }
    ]
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
    noWA: "081234567890",
    waktuPemesanan: "16-03-2025 21:38",
    buktiTransfer: "ada",
    tiketDetail: [
      { noTiket: "EB-0025-1/2-M", checksum: "M" },
      { noTiket: "EB-0026-2/2-F", checksum: "F" }
    ]
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
    noWA: "089876543210",
    waktuPemesanan: "23-03-2025 13:12",
    buktiTransfer: "ada",
    tiketDetail: [
      { noTiket: "EB-0027-1/20-M", checksum: "M" },
      { noTiket: "EB-0028-2/20-F", checksum: "F" }
    ]
  },
];

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showEditMode, setShowEditMode] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);

  // Efek animasi untuk modal
  useEffect(() => {
    if (showModal) {
      // Delay untuk memulai animasi
      setTimeout(() => {
        setModalAnimation(true);
      }, 50);
    } else {
      setModalAnimation(false);
    }
  }, [showModal]);

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowModal(true);
    setShowEditMode(false);
  };

  const handleCloseModal = () => {
    // Animasi keluar sebelum menutup modal
    setModalAnimation(false);
    setTimeout(() => {
      setShowModal(false);
    }, 200);
  };

  const handleEdit = () => {
    setShowEditMode(true);
  };

  const handleSave = () => {
    // Implementasi penyimpanan data
    setShowEditMode(false);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar2 adminName="Panitia" />
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
                  <option>PAKET COUPLE</option>
                  <option>PAKET BERTIGA</option>
                  <option>PAKET BEREMPAT</option>
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
                <tr className="bg-gray-100">
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
                      <button 
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-3 py-1 rounded shadow text-xs"
                        onClick={() => handleViewTicket(row)}
                      >
                        Daftar Tiket
                      </button>
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

        {/* Modal Detail Tiket */}
        {showModal && selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 ease-in-out"
               style={{ backgroundColor: modalAnimation ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)' }}>
            <div 
              className={`bg-white rounded-xl shadow-lg p-4 w-full max-w-lg relative transition-all duration-300 ease-in-out ${modalAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transform`}
              style={{ height: '670px', overflow: 'hidden' }}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">Daftar Tiket</h2>
                <div className="flex gap-2">
                  {!showEditMode && (
                    <button 
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-2 py-1 rounded shadow text-xs"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="text-gray-500 hover:text-gray-700 text-lg"
                    onClick={handleCloseModal}
                    aria-label="Tutup"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {/* Identitas Pemesan */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 text-xs">A. Identitas Pemesan</h3>
                  <div className="space-y-1">
                    <div className="flex">
                      <div className="w-28 font-medium text-gray-800">Nama Pemesan</div>
                      <div className="w-4 text-right text-gray-800">:</div>
                      <div className="flex-1 pl-2 text-gray-800">
                        {showEditMode ? (
                          <input 
                            type="text" 
                            className="w-full border rounded px-2 py-1 text-xs text-gray-800 focus:border-blue-300 focus:outline-none" 
                            defaultValue={selectedTicket.nama} 
                          />
                        ) : (
                          <div>{selectedTicket.nama}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-28 font-medium text-gray-800">No. WA</div>
                      <div className="w-4 text-right text-gray-800">:</div>
                      <div className="flex-1 pl-2 text-gray-800">
                        {showEditMode ? (
                          <input 
                            type="text" 
                            className="w-full border rounded px-2 py-1 text-xs text-gray-800 focus:border-blue-300 focus:outline-none" 
                            defaultValue={selectedTicket.noWA} 
                          />
                        ) : (
                          <div>{selectedTicket.noWA}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-28 font-medium text-gray-800">Email</div>
                      <div className="w-4 text-right text-gray-800">:</div>
                      <div className="flex-1 pl-2 text-gray-800">
                        {showEditMode ? (
                          <input 
                            type="email" 
                            className="w-full border rounded px-2 py-1 text-xs text-gray-800 focus:border-blue-300 focus:outline-none" 
                            defaultValue={selectedTicket.email} 
                          />
                        ) : (
                          <div>{selectedTicket.email}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detail Pemesanan */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">B. Detail Pemesanan</h3>
                  <div className="space-y-1">
                    <div className="flex">
                      <div className="w-28 font-medium text-gray-800">Waktu Pemesanan</div>
                      <div className="w-4 text-right text-gray-800">:</div>
                      <div className="flex-1 pl-2 text-gray-800">{selectedTicket.waktuPemesanan}</div>
                    </div>
                    <div className="flex">
                      <div className="w-28 font-medium text-gray-800">Jenis Tiket</div>
                      <div className="w-4 text-right text-gray-800">:</div>
                      <div className="flex-1 pl-2 text-gray-800">{selectedTicket.jenis}</div>
                    </div>
                    <div className="flex">
                      <div className="w-28 font-medium text-gray-800">Harga Satuan</div>
                      <div className="w-4 text-right text-gray-800">:</div>
                      <div className="flex-1 pl-2 text-gray-800">{selectedTicket.harga}</div>
                    </div>
                    <div className="flex">
                      <div className="w-28 font-medium text-gray-800">Jumlah Tiket</div>
                      <div className="w-4 text-right text-gray-800">:</div>
                      <div className="flex-1 pl-2 text-gray-800">{selectedTicket.jumlah}</div>
                    </div>
                    <div className="flex">
                      <div className="w-28 font-medium text-gray-800">Harga Total</div>
                      <div className="w-4 text-right text-gray-800">:</div>
                      <div className="flex-1 pl-2 text-gray-800">
                        {showEditMode ? (
                          <div className="flex">
                            <span className="inline-block px-2 py-1 border border-r-0 rounded-l text-gray-500 bg-gray-100 text-xs">Rp</span>
                            <input 
                              type="text" 
                              className="w-full border rounded-r px-2 py-1 text-xs text-gray-800 focus:border-blue-300 focus:outline-none" 
                              defaultValue={selectedTicket.total.replace('Rp', '').replace('.', '')} 
                            />
                          </div>
                        ) : (
                          <div>{selectedTicket.total}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-28 font-medium text-gray-800">Bukti Transfer</div>
                      <div className="w-4 text-right text-gray-800">:</div>
                      <div className="flex-1 pl-2 text-gray-800">{selectedTicket.buktiTransfer}</div>
                    </div>
                  </div>
                </div>

                {/* Daftar Tiket */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">C. Daftar Tiket</h3>
                  <div className="space-y-6">
                    {selectedTicket.tiketDetail.map((tiket: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="space-y-1">
                          <div className="flex">
                            <div className="w-20 font-medium text-gray-800">No. Tiket</div>
                            <div className="w-2 text-right text-gray-800">:</div>
                            <div className="flex-1 pl-1 text-gray-800">{tiket.noTiket}</div>
                          </div>
                          <div className="flex">
                            <div className="w-20 font-medium text-gray-800">Checksum</div>
                            <div className="w-2 text-right text-gray-800">:</div>
                            <div className="flex-1 pl-1 text-gray-800">{tiket.checksum}</div>
                          </div>
                        </div>
                        <div className="bg-yellow-400 rounded-lg overflow-hidden w-full max-w-[250px]">
                          <div className="flex items-center justify-center h-[120px] text-black font-bold text-xl">
                            SOERATS 2025
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button - Only shown in edit mode */}
                {showEditMode && (
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      type="button"
                      className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-3 py-1 rounded shadow transition text-xs"
                      onClick={() => setShowEditMode(false)}
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1 rounded shadow transition text-xs"
                      onClick={handleSave}
                    >
                      Simpan
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}