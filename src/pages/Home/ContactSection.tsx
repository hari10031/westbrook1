// src/pages/Home/ContactSection.tsx
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPin2Line,
  RiTimeLine,
  RiSendPlane2Line,
  RiCheckboxCircleLine,
  RiLoader4Line,
} from "react-icons/ri";

const EASE: [number, number, number, number] = [0.18, 0.82, 0.22, 1];

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  intent: "residential" | "plots" | "commercial" | "other";
  message: string;
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    intent: "residential",
    message: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (form.phone.replace(/\D/g, "").length < 8) e.phone = "Enter a valid phone";
    if (!form.message.trim()) e.message = "Tell us what you’re looking for";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0 && status !== "sending";

  function setField<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });

    if (!canSubmit) return;

    setStatus("sending");

    // ✅ Hook your backend here
    // Example:
    // await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });

    await new Promise((r) => setTimeout(r, 900)); // demo

    setStatus("sent");
    setForm({ name: "", email: "", phone: "", intent: "residential", message: "" });
    setTouched({});
    window.setTimeout(() => setStatus("idle"), 2600);
  }

  return (
    <section className="relative">
      {/* ink glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-140px] h-[340px] w-[700px] -translate-x-1/2 rounded-full bg-[color:var(--wb-ink)]/10 blur-3xl" />
        <div className="absolute left-[-140px] top-[180px] h-[260px] w-[260px] rounded-full bg-[color:var(--wb-ink)]/8 blur-3xl" />
      </div>

      {/* header */}
      <div className="mx-auto max-w-[78ch] text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-[12px] font-extrabold tracking-[0.32em] text-[color:var(--wb-ink)]/80"
        >
          CONTACT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.06 }}
          className="wb-serif mt-3 text-[34px] leading-[1.1] sm:text-[44px] text-[color:var(--wb-ink)]"
        >
          Tell us what you’re looking for —
          <span className="block">
            we’ll shortlist with{" "}
            <span className="relative inline-block">
              <span className="relative z-10">clarity</span>
              <span className="absolute left-0 bottom-[3px] h-[6px] w-full bg-[color:var(--wb-ink)]/22" />
            </span>
            .
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
          className="mt-4 text-[15.5px] leading-relaxed text-[color:var(--wb-ink)]/75"
        >
          Share your budget, location, and timeline. We’ll reply with a clean shortlist
          and clear next steps — no noise, no pressure.
        </motion.p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        {/* LEFT: info + promise */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
          className="rounded-[30px] border border-[color:var(--wb-ink)]/14 bg-white/55 backdrop-blur p-6
            shadow-[0_18px_55px_rgba(12,24,48,0.10)]"
        >
          <p className="text-[12px] font-extrabold tracking-[0.28em] text-[color:var(--wb-ink)]/75">
            REACH US
          </p>

          <div className="mt-4 grid gap-3">
            <InfoRow icon={<RiMailLine />} label="Email" value="support@westbrook.com" />
            <InfoRow icon={<RiPhoneLine />} label="Phone" value="+1 (000) 000-0000" />
            <InfoRow icon={<RiMapPin2Line />} label="Location" value="Dallas–Fort Worth, TX" />
            <InfoRow icon={<RiTimeLine />} label="Hours" value="Mon–Sat • 9:00 AM – 6:00 PM" />
          </div>

          <div className="mt-6 rounded-[22px] border border-[color:var(--wb-ink)]/14 bg-[color:var(--wb-ink)]/6 p-5">
            <p className="text-[14px] font-extrabold text-[color:var(--wb-ink)]">
              What you’ll get from us
            </p>
            <div className="mt-4 grid gap-3">
              {[
                "A shortlist that matches budget + timeline",
                "Clear documentation checklist + next steps",
                "Straight answers on trade-offs and risk",
              ].map((x) => (
                <div key={x} className="flex items-start gap-2">
                  <span className="mt-[1px] text-[color:var(--wb-ink)]/85">
                    <RiCheckboxCircleLine />
                  </span>
                  <p className="text-[14px] leading-snug text-[color:var(--wb-ink)]/78">
                    <b className="text-[color:var(--wb-ink)]/90">{x}</b>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-[12.5px] text-[color:var(--wb-ink)]/60">
            Prefer WhatsApp? Tell us in the message and we’ll respond there.
          </div>
        </motion.div>

        {/* RIGHT: form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
          onSubmit={onSubmit}
          className="rounded-[30px] border border-[color:var(--wb-ink)]/14 bg-white/60 backdrop-blur p-6
            shadow-[0_18px_55px_rgba(12,24,48,0.12)]"
        >
          <p className="text-[12px] font-extrabold tracking-[0.28em] text-[color:var(--wb-ink)]/75">
            REQUEST A SHORTLIST
          </p>

          <div className="mt-5 grid gap-4">
            <Field
              label="Full name"
              value={form.name}
              placeholder="Your name"
              error={touched.name ? errors.name : undefined}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              onChange={(v) => setField("name", v)}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Email"
                value={form.email}
                placeholder="you@email.com"
                error={touched.email ? errors.email : undefined}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                onChange={(v) => setField("email", v)}
              />
              <Field
                label="Phone"
                value={form.phone}
                placeholder="Your phone"
                error={touched.phone ? errors.phone : undefined}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                onChange={(v) => setField("phone", v)}
              />
            </div>

            {/* intent */}
            <div>
              <label className="text-[13px] font-extrabold text-[color:var(--wb-ink)]/85">
                I’m looking for
              </label>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["residential", "Residential homes"],
                    ["plots", "Plots / land"],
                    ["commercial", "Commercial"],
                    ["other", "Other"],
                  ] as const
                ).map(([k, label]) => (
                  <button
                    type="button"
                    key={k}
                    onClick={() => setField("intent", k)}
                    className={cx(
                      "rounded-2xl border px-4 py-3 text-left transition",
                      "bg-white/55 hover:bg-white/70",
                      form.intent === k
                        ? "border-[color:var(--wb-ink)]/35 shadow-[0_0_0_3px_rgba(13,35,74,0.10)]"
                        : "border-[color:var(--wb-ink)]/14"
                    )}
                  >
                    <p className="text-[13.5px] font-extrabold text-[color:var(--wb-ink)]/85">
                      {label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* message */}
            <div>
              <label className="text-[13px] font-extrabold text-[color:var(--wb-ink)]/85">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setField("message", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                placeholder="Budget, preferred areas, timeline, and anything important..."
                className={cx(
                  "mt-2 w-full rounded-2xl border bg-white/55 px-4 py-3 text-[14px]",
                  "text-[color:var(--wb-ink)]/90 placeholder:text-[color:var(--wb-ink)]/40",
                  "focus:outline-none focus:ring-4 focus:ring-[color:var(--wb-ink)]/10",
                  touched.message && errors.message
                    ? "border-red-400/60"
                    : "border-[color:var(--wb-ink)]/14"
                )}
                rows={5}
              />
              {touched.message && errors.message ? (
                <p className="mt-2 text-[12px] font-bold text-red-500/90">
                  {errors.message}
                </p>
              ) : null}
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={cx(
                "mt-1 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3",
                "font-extrabold transition",
                canSubmit
                  ? "bg-[color:var(--wb-ink)] text-white hover:opacity-95"
                  : "bg-black/15 text-black/45 cursor-not-allowed"
              )}
            >
              {status === "sending" ? (
                <>
                  <RiLoader4Line className="animate-spin" />
                  Sending…
                </>
              ) : status === "sent" ? (
                <>
                  <RiCheckboxCircleLine />
                  Sent!
                </>
              ) : (
                <>
                  <RiSendPlane2Line />
                  Send message
                </>
              )}
            </button>

            <p className="text-[12.5px] text-[color:var(--wb-ink)]/55">
              We typically respond within 24 hours. No spam — ever.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

/* ---------------- components ---------------- */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[color:var(--wb-ink)]/12 bg-white/55 px-4 py-3">
      <span className="mt-[2px] text-[color:var(--wb-ink)]/80">{icon}</span>
      <div className="min-w-0">
        <p className="text-[12px] font-extrabold tracking-[0.18em] text-[color:var(--wb-ink)]/60">
          {label}
        </p>
        <p className="mt-1 text-[14px] font-bold text-[color:var(--wb-ink)]/80">
          {value}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  placeholder,
  error,
  onChange,
  onBlur,
}: {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label className="text-[13px] font-extrabold text-[color:var(--wb-ink)]/85">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cx(
          "mt-2 w-full rounded-2xl border bg-white/55 px-4 py-3 text-[14px]",
          "text-[color:var(--wb-ink)]/90 placeholder:text-[color:var(--wb-ink)]/40",
          "focus:outline-none focus:ring-4 focus:ring-[color:var(--wb-ink)]/10",
          error ? "border-red-400/60" : "border-[color:var(--wb-ink)]/14"
        )}
      />
      {error ? (
        <p className="mt-2 text-[12px] font-bold text-red-500/90">{error}</p>
      ) : null}
    </div>
  );
}
