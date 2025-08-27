"use client";
import { useState } from "react";
import { FaPlus, FaTimes, FaSave } from "react-icons/fa";
import { Edit, Trash2, Calendar, MapPin, Clock } from "lucide-react";
import Sidebar2 from "../../../../components/Sidebar2";

export default function Page() {
  const [eventData, setEventData] = useState({
    nama: "",
    tanggal: "",
    waktu: "",
    lokasi: "",
    deskripsi: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika untuk menyimpan data event
    console.log("Data event disimpan:", eventData);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar2 adminName="Panitia" />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Setup Event</h1>
            <p className="text-gray-500">Konfigurasi informasi dasar event</p>
          </div>
        </div>

        {/* Form Setup Event */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-2 text-gray-700">Nama Event</label>
              <input
                type="text"
                name="nama"
                value={eventData.nama}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none"
                placeholder="Masukkan nama event"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2 text-gray-700">Tanggal Event</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="tanggal"
                    value={eventData.tanggal}
                    onChange={handleChange}
                    className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-700">Waktu Event</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    name="waktu"
                    value={eventData.waktu}
                    onChange={handleChange}
                    className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">Lokasi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="lokasi"
                  value={eventData.lokasi}
                  onChange={handleChange}
                  className="w-full pl-10 border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none"
                  placeholder="Masukkan lokasi event"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">Deskripsi Event</label>
              <textarea
                name="deskripsi"
                value={eventData.deskripsi}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:border-blue-300 focus:outline-none"
                placeholder="Masukkan deskripsi event"
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaSave className="inline mr-2" />
                Simpan
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => setEventData({
                  nama: "",
                  tanggal: "",
                  waktu: "",
                  lokasi: "",
                  deskripsi: ""
                })}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}