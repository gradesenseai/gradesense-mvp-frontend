import { useState } from "react";

export default function UploadCard({ onSubmit }) {
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    setError("");
    if (!front || !back) {
      setError("Please upload both front and back images.");
      return;
    }
    onSubmit(front, back);
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow-soft p-4 sm:p-6 border border-brand.grayLight">
      <h2 className="text-base sm:text-lg font-semibold mb-2">Upload Your Card</h2>
      <p className="text-sm text-brand.grayDark mb-4">Front and back images are required. We’ll never alter your originals.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl2 border border-brand.grayLight p-3">
          <label className="block text-sm font-medium mb-2">Front image</label>
          <input type="file" accept="image/*" onChange={(e) => setFront(e.target.files?.[0] || null)} className="block w-full text-sm" />
        </div>
        <div className="rounded-xl2 border border-brand.grayLight p-3">
          <label className="block text-sm font-medium mb-2">Back image</label>
          <input type="file" accept="image/*" onChange={(e) => setBack(e.target.files?.[0] || null)} className="block w-full text-sm" />
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

      <button type="submit" className="mt-4 inline-flex items-center justify-center rounded-xl2 bg-brand.green text-black font-semibold px-4 py-2">
        Estimate Grade
      </button>
    </form>
  );
}