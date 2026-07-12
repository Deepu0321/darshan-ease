import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">Book Temple Darshan Easily & Securely. India's most-loved platform for hassle-free darshan and donations.</p>
          <div className="flex gap-3 text-muted-foreground">
            <a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/temples" className="hover:text-primary">Temples</Link></li>
            <li><Link to="/bookings" className="hover:text-primary">My Bookings</Link></li>
            <li><Link to="/donations" className="hover:text-primary">Donations</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><a href="#" className="hover:text-primary">Help Center</a></li>
            <li><a href="#" className="hover:text-primary">Terms</a></li>
            <li><a href="#" className="hover:text-primary">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Reach Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Somnath Rd, Prabhas Patan, Gujarat 362268</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />+91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />hello@darshanease.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} DarshanEase. All rights reserved.</div>
    </footer>
  );
}