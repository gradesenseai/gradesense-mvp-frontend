export default function ResultCard({ result }) {
  if (!result) return null;
  const { overall, subgrades = {}, notes = [] } = result || {};
  return (
    <div className="bg-white rounded-2xl shadow-soft p-4 sm:p-6 border border-brand.grayLight">
      <div className="flex items-baseline justify-between">
        <h2 className="text-base sm:text-lg font-semibold">Estimated Grade</h2>
        <div className="text-2xl sm:text-3xl font-bold">{overall?.toFixed ? overall.toFixed(1) : overall}</div>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["centering","corners","edges","surface"].map((k)=>(
          <div key={k} className="rounded-xl2 border border-brand.grayLight p-3 text-sm">
            <div className="text-brand.grayDark mb-1 capitalize">{k}</div>
            <div className="font-semibold">{subgrades?.[k]}</div>
          </div>
        ))}
      </div>
      {notes?.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-medium mb-1">Notes</div>
          <ul className="list-disc pl-5 text-sm text-brand.grayDark space-y-1">
            {notes.map((n, i) => (<li key={i}>{n}</li>))}
          </ul>
        </div>
      )}
    </div>
  );
}