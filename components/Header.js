import Image from "next/image";
export default function Header() {
  return (
    <header className="w-full border-b border-brand.grayLight bg-white">
      <div className="mx-auto max-w-screen-md px-4 py-3 flex items-center gap-3">
        <Image src="/logo.png" alt="GradeSense" width={28} height={28} />
        <span className="text-lg font-semibold tracking-tight">GradeSense</span>
      </div>
    </header>
  );
}