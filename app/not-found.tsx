export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Halaman Tidak Ditemukan</h1>
      <p className="text-lg mb-6">Maaf, halaman yang Anda cari tidak dapat ditemukan.</p>
      <a href="/" className="text-blue-500 hover:underline">Kembali ke Beranda</a>
    </div>
  );
}