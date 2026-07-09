import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Logo } from "./Logo";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Link } from "@tanstack/react-router";

const FOOTER_LINKS = [
  { label: "Home", to: "/", hash: "home" },
  { label: "About", to: "/", hash: "about" },
  { label: "Menu", to: "/menu", hash: undefined },
  { label: "Gallery", to: "/", hash: "gallery" },
  { label: "Reviews", to: "/", hash: "reviews" },
  { label: "Contact", to: "/", hash: "contact" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = z.string().email().safeParse(email);
    if (!ok.success) return toast.error("Please enter a valid email");
    toast.success("Subscribed!", { description: "Watch your inbox for tasty updates." });
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary/40 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="inline-flex rounded-full bg-background/10 px-2 py-1.5 backdrop-blur">
              <Logo />
            </div>
            <p className="mt-4 max-w-md text-sm text-background/70">
              Authentic Indian dhaba serving North Indian, Chinese, South Indian, fast food
              and refreshing beverages since 2014. A place families call their own.
            </p>
            <form onSubmit={submit} className="mt-6 flex max-w-md items-center gap-2 rounded-full border border-background/20 bg-background/5 p-1.5 backdrop-blur">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Get offers in your inbox"
                className="w-full bg-transparent px-4 py-2 text-sm text-background placeholder:text-background/50 focus:outline-none"
              />
              <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Subscribe</button>
            </form>
            <div className="mt-6 flex gap-3">
              {[FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube].map((I, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-10 w-10 place-items-center rounded-full border border-background/20 text-background/80 transition hover:bg-primary hover:text-primary-foreground">
                  <I size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">Quick Links</p>
            <ul className="mt-4 space-y-2 text-sm text-background/75">
              {FOOTER_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to as any} {...(l.hash ? { hash: l.hash } : {})} className="transition hover:text-primary-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">Opening Hours</p>
            <ul className="mt-4 space-y-2 text-sm text-background/75">
              <li>Mon – Fri : 10:00 – 23:30</li>
              <li>Sat – Sun : 09:00 – 00:00</li>
              <li className="text-background/60">Kitchen closes 30 min prior</li>
            </ul>
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">Visit</p>
            <p className="mt-2 text-sm text-background/75">Infront of Veshnodam Mandir,<br />A-16, Inderprasth, Kundan Vihar,<br />Ridmalsar Purohitan, Bikaner,<br />Rajasthan 334022</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-background/10 pt-6 text-xs text-background/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Ganesh Dhaba. All rights reserved.</p>
          <p>Designed by <span className="font-semibold text-[var(--color-gold)]">Nisha Soni</span></p>
        </div>
      </div>
    </footer>
  );
}
