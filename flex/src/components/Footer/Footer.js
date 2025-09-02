import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";

/**
 * BrightHub-like Footer
 * - TailwindCSS for styling
 * - Framer Motion for subtle enter animations & hover effects
 * - Lucide icons for socials
 *
 * Drop this component at the bottom of your layout. It is responsive out of the box.
 */

const footerLinks = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Support", href: "#" },
    { label: "Press", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Help Center", href: "#" },
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const Footer = () => {
  return (
    <footer className="relative mt-24 text-slate-200">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      {/* soft glow accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_100%,black,transparent)]">
        <div className="absolute bottom-0 left-1/2 h-48 w-[48rem] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 py-16"
      >
        {/* Top CTA / Newsletter */}
        <motion.div
          variants={item}
          className="grid items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:grid-cols-5"
        >
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-widest text-indigo-300">Join Our Newsletter</p>
            <h3 className="mt-1 text-xl font-semibold text-white">Get the latest automation insights & exclusive deals.</h3>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="md:col-span-2"
            aria-label="Newsletter subscription"
          >
            <div className="flex rounded-xl border border-white/10 bg-slate-900/70 p-1 focus-within:border-indigo-400/60">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-transparent px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 active:scale-[.98]"
              >
                Subscribe <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
          </form>
        </motion.div>

        {/* Link columns + Affiliate blurb */}
        <div className="mt-12 grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <motion.div variants={item}>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-white">BH</span>
              <div>
                <p className="text-lg font-semibold tracking-tight text-white">Flex Houses</p>
                <p className="text-xs text-slate-400">Automate better, scale smarter.</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              AI-powered automation for teams of all sizes. Build, run, and scale workflows without the busywork.
            </p>
            {/* Socials */}
            <div className="mt-4 flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Columns */}
          <motion.div variants={item} className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-2">
            <FooterColumn title="Company" links={footerLinks.company} />
            <FooterColumn title="Legal" links={footerLinks.legal} />
            <FooterColumn title="Resources" links={footerLinks.resources} />
          </motion.div>

          {/* Affiliate / Innovators */}
          <motion.div variants={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-widest text-indigo-300">For Innovators</p>
            <p className="mt-2 text-sm text-slate-200">
              Are you an automation enthusiast, content creator, or tech influencer? Join our affiliate program and earn while
              sharing the power of automation!
            </p>
            <a
              href="#"
              className="mt-3 inline-block text-sm font-medium text-indigo-300 hover:text-indigo-200"
            >
              Become an affiliate →
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={item}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row"
        >
          <p>
            <span className="font-medium text-slate-200">Flex Houses</span> © {new Date().getFullYear()} — Automate better, scale smarter.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((l) => (
              <a key={l.label} href={l.href} className="group relative">
                <span className="transition-colors group-hover:text-slate-200">{l.label}</span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-slate-300 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div>
    <p className="text-xs uppercase tracking-widest text-slate-300">{title}</p>
    <ul className="mt-3 space-y-2">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            className="group inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
          >
            <span>{l.label}</span>
            <motion.span
              aria-hidden
              className="h-[1px] w-0 bg-slate-200"
              whileHover={{ width: "100%" }}
            />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
