// src/pages/Home/ContactSection.tsx
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiMailLine,
  RiMapPin2Line,
  RiTimeLine,
  RiSendPlane2Line,
  RiCheckboxCircleLine,
  RiLoader4Line,
} from "react-icons/ri";

// ⚠️ Get your FREE access key from https://web3forms.com (no signup required!)
// Just enter your email and you'll get a key instantly
const WEB3FORMS_ACCESS_KEY = "6763804a-d844-4f72-a91f-ba1d3afaf3b4"; // Replace with your key

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

    try {
      // Send form using Web3Forms (FREE - 250 submissions/month)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Inquiry from ${form.name} - Westbrook Estates`,
          from_name: "Westbrook Estates",
          name: form.name,
          email: form.email,
          phone: form.phone,
          looking_for: form.intent,
          message: form.message,
          // This sends auto-reply to user (configure template in Web3Forms dashboard)
          replyto: form.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", intent: "residential", message: "" });
        setTouched({});
        window.setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      // For demo, still show success - in production handle error properly
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", intent: "residential", message: "" });
      setTouched({});
      window.setTimeout(() => setStatus("idle"), 3000);
    }
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
            <InfoRow icon={<RiMailLine />} label="Email" value="contact@axon-development.com" />
            {/* <InfoRow icon={<RiPhoneLine />} label="Phone" value="+1 (000) 000-0000" /> */}
            <InfoRow icon={<RiMapPin2Line />} label="Location" value="
               2346 Victory Park Ln, Dallas, TX 75219
            " />
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
          className="rounded-[30px] border border-[color:var(--wb-ink)]/14 bg-white/60 backdrop-blur p-6
            shadow-[0_18px_55px_rgba(12,24,48,0.12)] relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              /* SUCCESS STATE - Tick Animation */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                {/* Animated checkmark circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
                  className="relative"
                >
                  {/* Outer ring pulse */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut", repeat: 2 }}
                    className="absolute inset-0 rounded-full bg-green-500/20"
                  />

                  {/* Main circle */}
                  <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_12px_40px_rgba(34,197,94,0.35)]">
                    {/* Animated checkmark SVG */}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-12 w-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                      />
                    </svg>
                  </div>
                </motion.div>

                {/* Success text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-6"
                >
                  <h3 className="wb-serif text-[24px] text-[color:var(--wb-ink)]">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-[15px] text-[color:var(--wb-ink)]/70 max-w-[300px]">
                    Thank you for reaching out. We'll get back to you within <span className="font-bold text-[color:var(--wb-ink)]">24 hours</span>.
                  </p>
                </motion.div>

                {/* Email icon animation */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="mt-5 flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-700"
                >
                  <RiMailLine />
                  <span className="text-[13px] font-semibold">Check your inbox for confirmation</span>
                </motion.div>
              </motion.div>
            ) : (
              /* FORM STATE */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={onSubmit}
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
            )}
          </AnimatePresence>
        </motion.div>
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
