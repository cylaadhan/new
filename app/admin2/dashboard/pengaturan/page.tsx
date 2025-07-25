"use client";
import Sidebar2 from "../../../../components/Sidebar2";
import { useState } from "react";
import { FaSave } from "react-icons/fa";

export default function Page() {
  const [eventSettings, setEventSettings] = useState({
    namaEvent: "A Fest 2024",
    tanggalEvent: "",
    waktuEvent: "18.00",
    venue: "Gelora Bung Karno, Jakarta",
    kapasitas: "5000",
    deskripsiEvent: "Festival musik terbesar tahun 2024 dengan berbagai genre musik. Menampilkan artis-artis ternama Indonesia dan internasional dalam satu malam yang spektakuler."
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventSettings({
      ...eventSettings,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simpan pengaturan ke server/database
    alert("Pengaturan event berhasil disimpan!");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar2 adminName="Admin Tiket" />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Pengaturan Event</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Nama Event</label>
                <input
                  type="text"
                  name="namaEvent"
                  className="w-full h-10 border rounded px-4 text-gray-800 focus:border-blue-300 focus:outline-none"
                  value={eventSettings.namaEvent}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Tanggal Event</label>
                <input
                  type="date"
                  name="tanggalEvent"
                  className="w-full h-10 border rounded px-4 text-gray-800 focus:border-blue-300 focus:outline-none"
                  value={eventSettings.tanggalEvent}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Waktu Event</label>
                <input
                  type="time"
                  name="waktuEvent"
                  className="w-full h-10 border rounded px-4 text-gray-800 focus:border-blue-300 focus:outline-none"
                  value={eventSettings.waktuEvent}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Venue</label>
                <input
                  type="text"
                  name="venue"
                  className="w-full h-10 border rounded px-4 text-gray-800 focus:border-blue-300 focus:outline-none"
                  value={eventSettings.venue}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Kapasitas</label>
                <input
                  type="number"
                  name="kapasitas"
                  className="w-full h-10 border rounded px-4 text-gray-800 focus:border-blue-300 focus:outline-none"
                  value={eventSettings.kapasitas}
                  onChange={handleChange}
                  min="1"
                />
              </div>
            </div>
            
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Deskripsi Event</label>
              <textarea
                name="deskripsiEvent"
                className="w-full border rounded px-4 py-2 text-gray-800 focus:border-blue-300 focus:outline-none h-32"
                value={eventSettings.deskripsiEvent}
                onChange={handleChange}
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded shadow transition flex items-center gap-2"
              >
                <FaSave /> Simpan
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}