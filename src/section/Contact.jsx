import React, { useState, useRef, useEffect } from "react";
import ParticlesBackground from "../components/ParticlesBackground"

const API_ENDPOINT = "/api/contact";

const SERVICE_OPTIONS = [
  "Web Development",
  "Backend Development",
  "Full Stack Development",
  "AI Automation",
  "Other",
];

const INITIAL_FORM = {
  name: "",
  email: "",
  service: "",
  budget: "",
  message: "",
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Your name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "That name looks too short.";
  }

  if (!values.email.trim()) {
    errors.email = "Your email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.service) {
    errors.service = "Pick the service you need.";
  }

  if (!values.budget.trim()) {
    errors.budget = "Give a rough budget so I can plan accordingly.";
  }

  if (!values.message.trim()) {
    errors.message = "Tell me a bit about the idea.";
  } else if (values.message.trim().length < 10) {
    errors.message = "A few more details would help — at least 10 characters.";
  }

  return errors;
}

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function ContactPage({ onSubmit }) {
  const [values, setValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [statusMessage, setStatusMessage] = useState("");
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  function handleChange(field) {
    return (e) => {
      const value = e.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      if (touched[field]) {
        setErrors(validate({ ...values, [field]: value }));
      }
    };
  }

  function handleBlur(field) {
    return () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors(validate(values));
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, service: true, budget: true, message: true });

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields before sending.");
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      if (typeof onSubmit === "function") {
        await onSubmit(values);
      } else {
        const res = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
      }

      if (!mountedRef.current) return;
      setStatus("success");
      setStatusMessage("Message sent — I'll get back to you within a day or two.");
      setValues(INITIAL_FORM);
      setTouched({});
      setErrors({});
    } catch (err) {
      if (!mountedRef.current) return;
      setStatus("error");
      setStatusMessage(
        "Something went wrong sending your message. Please try again, or email me directly."
      );
    }
  }

  const isLoading = status === "loading";

  const inputBase =
    "w-full rounded-xl border bg-white/[0.03] px-3.5 py-3 text-[15px] text-slate-100 placeholder-slate-500 outline-none transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
  const inputOk =
    "border-white/10 hover:border-white/25 focus:border-[#4C8DFF] focus:bg-[#4C8DFF]/5 focus:ring-2 focus:ring-[#4C8DFF]/25";
  const inputErr = "border-rose-400/70 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/25";

  function fieldClass(hasError) {
    return cx(inputBase, hasError ? inputErr : inputOk);
  }

  return (
    <div id="contact" className="relative min-h-screen w-full overflow-hidden bg-[#03050A] px-4 py-14 font-sans text-slate-100 sm:px-8 md:px-12 lg:px-[6vw] lg:py-16">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-[#000b1f] [clip-path:polygon(0_23%,100%_0,100%_100%,0_100%)]"
        aria-hidden="true"
      />
      <ParticlesBackground/>
      <style>{KEYFRAMES}</style>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
      />



      {/* nebula glow */}
      <div
        className="pointer-events-none absolute -right-[10%] -top-[10%] h-[45vw] w-[45vw] bg-[radial-gradient(circle,rgba(76,141,255,0.16)_0%,rgba(76,141,255,0)_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-8 lg:gap-16">
        {/* left: intro + astronaut */}
        <section className="flex flex-col items-center text-center opacity-0 animate-[cp-fade-up_0.8s_ease_forwards] md:items-start md:text-left">
          <AstronautIllustration className="mb-2 w-[220px] animate-[cp-float_6s_ease-in-out_infinite] sm:w-[280px] md:w-[300px] lg:w-[380px]" />
          <h1 className="font-[Space_Grotesk] text-[28px] font-semibold leading-[1.15] tracking-tight sm:text-[34px] lg:text-[42px]">
            Got a project in mind?
          </h1>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-slate-400 sm:text-base">
            I build web apps, backends, and AI-driven automations from the
            ground up. Tell me what you're working on and I'll help you plan
            the build.
          </p>
        </section>

        {/* right: form card */}
        <section
          className="relative rounded-[20px] border border-white/[0.09] bg-[#0B0E1A]/55 p-6 opacity-0 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-[cp-fade-up_0.8s_ease_0.15s_forwards] sm:p-8 lg:p-10"
          aria-labelledby="cp-card-title"
        >
          <h2
            id="cp-card-title"
            className="mb-6 font-[Space_Grotesk] text-[22px] font-semibold tracking-tight sm:text-[26px]"
          >
            Let&apos;s Work Together
          </h2>

          <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit} noValidate>
            <Field label="Your Name" required error={touched.name && errors.name}>
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                disabled={isLoading}
                className={fieldClass(touched.name && errors.name)}
                placeholder="Jane Doe"
              />
            </Field>

            <Field label="Your Email" required error={touched.email && errors.email}>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                disabled={isLoading}
                className={fieldClass(touched.email && errors.email)}
                placeholder="jane@example.com"
              />
            </Field>

            <Field label="Service Needed" required error={touched.service && errors.service}>
              <select
                name="service"
                value={values.service}
                onChange={handleChange("service")}
                onBlur={handleBlur("service")}
                disabled={isLoading}
                className={cx(
                  fieldClass(touched.service && errors.service),
                  "cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg_xmlns=%27http://www.w3.org/2000/svg%27_width=%2712%27_height=%278%27_viewBox=%270_0_12_8%27_fill=%27none%27><path_d=%27M1_1.5L6_6.5L11_1.5%27_stroke=%27%238D96AC%27_stroke-width=%271.6%27_stroke-linecap=%27round%27_stroke-linejoin=%27round%27/></svg>')] bg-[right_14px_center] bg-no-repeat pr-9"
                )}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0F1326] text-slate-100">
                    {opt}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Your Budget" required error={touched.budget && errors.budget}>
              <input
                type="text"
                name="budget"
                value={values.budget}
                onChange={handleChange("budget")}
                onBlur={handleBlur("budget")}
                disabled={isLoading}
                className={fieldClass(touched.budget && errors.budget)}
                placeholder="e.g."
              />
            </Field>

            <Field label="Explain your Idea" required error={touched.message && errors.message}>
              <textarea
                name="message"
                rows={4}
                value={values.message}
                onChange={handleChange("message")}
                onBlur={handleBlur("message")}
                disabled={isLoading}
                className={cx(fieldClass(touched.message && errors.message), "resize-y")}
                placeholder="What are you trying to build?"
              />
            </Field>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F75E8] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(47,117,232,0.65)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#4388F4] hover:shadow-[0_14px_30px_-10px_rgba(47,117,232,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78A9FF] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-[#2F75E8]"
            >
              {isLoading ? (
                <>
                  <span className="h-[15px] w-[15px] animate-spin rounded-full border-2 border-white/35 border-t-white" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <SendIcon />
                </>
              )}
            </button>

            <div
              className={cx(
                "flex min-h-[18px] items-center gap-2 text-[13.5px]",
                status === "success" && "text-emerald-400",
                status === "error" && "text-rose-400"
              )}
              role="status"
              aria-live="polite"
            >
              {status === "success" && (
                <>
                  <CheckIcon />
                  <span>{statusMessage}</span>
                </>
              )}
              {status === "error" && statusMessage && (
                <>
                  <ErrorIcon />
                  <span>{statusMessage}</span>
                </>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <label className="flex flex-col gap-[7px]">
      <span className="text-[13.5px] font-medium text-slate-400">
        {label}
        {required && <span className="text-[#4C8DFF]"> *</span>}
      </span>
      {children}
      {error && <span className="text-[12.5px] text-rose-400">{error}</span>}
    </label>
  );
}

/* ---------------------------- Icons ---------------------------- */

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12L20 4L13 20L11 13L4 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 12.5L10.7 15L16 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16.3" r="1" fill="currentColor" />
    </svg>
  );
}

/* ----------------------- Astronaut Illustration ----------------------- */

function AstronautIllustration({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of an astronaut playing an electric guitar"
    >
      <ellipse cx="180" cy="330" rx="90" ry="10" fill="#4C8DFF" opacity="0.12" />

      <path
        d="M180 60 C 120 90, 90 140, 100 190"
        stroke="#3A4262"
        strokeWidth="2"
        strokeDasharray="4 6"
        fill="none"
      />

      <rect x="150" y="150" width="60" height="80" rx="14" fill="#151B33" stroke="#2C3557" strokeWidth="2" />

      <path
        d="M120 170 C120 130 145 105 180 105 C215 105 240 130 240 170 L236 245 C236 268 214 282 180 282 C146 282 124 268 124 245 Z"
        fill="#E9ECF5"
      />
      <path
        d="M120 170 C120 130 145 105 180 105 C215 105 240 130 240 170 L236 245 C236 268 214 282 180 282 C146 282 124 268 124 245 Z"
        fill="url(#cpSuitShade)"
        opacity="0.5"
      />

      <rect x="160" y="185" width="40" height="26" rx="6" fill="#2C3557" opacity="0.8" />
      <circle cx="170" cy="198" r="3" fill="#4C8DFF" />
      <circle cx="182" cy="198" r="3" fill="#8B6BFF" />
      <circle cx="194" cy="198" r="3" fill="#4C8DFF" />

      <path d="M128 175 C 98 185 78 205 76 232" stroke="#E9ECF5" strokeWidth="26" strokeLinecap="round" />
      <path d="M232 175 C 258 190 268 205 262 222" stroke="#E9ECF5" strokeWidth="26" strokeLinecap="round" />

      <circle cx="74" cy="236" r="15" fill="#D7DBEA" />
      <circle cx="262" cy="224" r="15" fill="#D7DBEA" />

      <circle cx="180" cy="88" r="52" fill="#E9ECF5" />
      <circle cx="180" cy="90" r="40" fill="#0B0E1A" />
      <circle cx="180" cy="90" r="40" fill="url(#cpVisorGloss)" />
      <ellipse cx="166" cy="76" rx="10" ry="14" fill="#4C8DFF" opacity="0.55" />

      <path d="M150 275 C 148 300 150 320 158 335" stroke="#E9ECF5" strokeWidth="24" strokeLinecap="round" />
      <path d="M210 275 C 214 298 212 318 206 334" stroke="#E9ECF5" strokeWidth="24" strokeLinecap="round" />
      <circle cx="159" cy="338" r="13" fill="#D7DBEA" />
      <circle cx="205" cy="337" r="13" fill="#D7DBEA" />

      <g transform="translate(46 200) rotate(-18)">
        <path
          d="M0 40 C -6 20 8 4 26 6 C 44 4 60 18 58 38 C 60 58 46 74 28 72 C 10 74 -4 58 0 40 Z"
          fill="#8B6BFF"
        />
        <circle cx="28" cy="40" r="10" fill="#0B0E1A" opacity="0.7" />
        <rect x="52" y="30" width="70" height="8" rx="3" fill="#151B33" />
        <rect x="112" y="18" width="14" height="32" rx="3" fill="#0B0E1A" />
        <line x1="58" y1="27" x2="118" y2="20" stroke="#D7DBEA" strokeWidth="1.2" />
        <line x1="58" y1="40" x2="118" y2="33" stroke="#D7DBEA" strokeWidth="1.2" />
      </g>

      <g fill="#4C8DFF" opacity="0.8">
        <circle cx="284" cy="150" r="5" />
        <rect x="288" y="118" width="2.4" height="34" />
        <circle cx="308" cy="176" r="4" />
        <rect x="311" y="150" width="2" height="28" />
      </g>

      <defs>
        <linearGradient id="cpSuitShade" x1="120" y1="105" x2="240" y2="282" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4C8DFF" stopOpacity="0" />
          <stop offset="1" stopColor="#4C8DFF" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="cpVisorGloss" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#4C8DFF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0B0E1A" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const KEYFRAMES = `
@keyframes cp-twinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.9; } }
@keyframes cp-float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(1.2deg); } }
@keyframes cp-fade-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
}
`;