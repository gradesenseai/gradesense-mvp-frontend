import { useState } from "react";
import Header from "@/components/Header";
import UploadCard from "@/components/UploadCard";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(front, back) {
    setLoading(true); setError(""); setResult(null);
    const fd = new FormData();
    fd.append("front", front);
    fd.append("back", back);
    try {
      const r = await fetch("/api/estimate", { method: "POST", body: fd });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Request failed");
      setResult(data);
    } catch (e) {
      setError(e.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand.white">
      <Header />
      <main className="mx-auto max-w-screen-md px-4 py-6 space-y-6">
        <UploadCard onSubmit={handleSubmit} />
        {loading && <div className="text-sm text-brand.grayDark">Estimating…</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
        <ResultCard result={result} />
      </main>
    </div>
  );
}