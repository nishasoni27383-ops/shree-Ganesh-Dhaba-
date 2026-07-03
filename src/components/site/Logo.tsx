import logoMark from "@/assets/ganesh-logo.png.asset.json";
import wordmark from "@/assets/ganesh-wordmark.png.asset.json";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-3 group">
      <img
        src={logoMark.url}
        alt="Ganesh Dhaba"
        className="h-11 w-11 shrink-0 rounded-full object-contain transition group-hover:scale-105"
      />
      {!compact && (
        <img
          src={wordmark.url}
          alt="Ganesh Dhaba"
          className="h-7 w-auto object-contain sm:h-8"
        />
      )}
    </a>
  );
}
