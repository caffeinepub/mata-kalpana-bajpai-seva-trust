import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { TRUST_REG_NO } from "../constants";
import { useApp } from "../context/AppContext";

/** Centered faded trust watermark — shows behind document content */
function TrustWatermark() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
      style={{ zIndex: 0, opacity: 0.08 }}
      aria-hidden="true"
    >
      <span style={{ fontSize: "96px", lineHeight: 1 }}>🛞</span>
      <span
        className="text-center font-bold leading-snug mt-2 px-8"
        style={{
          fontSize: "14px",
          color: "oklch(0.28 0.12 260)",
          letterSpacing: "0.04em",
        }}
      >
        माता कल्पना बाजपेई
        <br />
        राष्ट्रीय सेवा ट्रस्ट
      </span>
    </div>
  );
}

/** Passport-style photo box for certificates */
function MemberPhotoBox({ photoUrl }: { photoUrl: string | null }) {
  if (photoUrl) {
    return (
      <div
        className="w-16 h-20 overflow-hidden flex-shrink-0 rounded-sm"
        style={{ border: "2px solid oklch(0.68 0.18 55)" }}
      >
        <img src={photoUrl} alt="सदस्य" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className="w-16 h-20 flex-shrink-0 flex flex-col items-center justify-center gap-1 rounded-sm"
      style={{
        border: "2px solid oklch(0.68 0.18 55)",
        background: "oklch(0.96 0.01 260)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7 opacity-40"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        style={{ color: "oklch(0.48 0.03 260)" }}
        aria-label="सदस्य"
        role="img"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
      <span
        className="text-[8px] text-center"
        style={{ color: "oklch(0.55 0.03 260)" }}
      >
        फोटो
      </span>
    </div>
  );
}

export default function CertificatePage() {
  const { currentMember, getPhotoUrl } = useApp();
  const navigate = useNavigate();

  if (!currentMember) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4" style={{ color: "oklch(0.48 0.03 260)" }}>
            कृपया पहले लॉगिन करें
          </p>
          <Button
            onClick={() => navigate({ to: "/login" })}
            data-ocid="certificate.login.button"
          >
            लॉगिन
          </Button>
        </div>
      </div>
    );
  }

  const m = currentMember;
  const photoUrl = getPhotoUrl(m.photoHash);
  const year = new Date().getFullYear();
  const certNo = `CERT-${m.id}-${year}`;
  const issueDate = new Date().toLocaleDateString("hi-IN");

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.005 260)" }}
    >
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Controls — hidden on print */}
        <div className="flex justify-between items-center mb-5 no-print">
          <h1
            className="text-xl font-bold"
            style={{ color: "oklch(0.28 0.12 260)" }}
          >
            प्रमाणपत्र
          </h1>
          <Button
            size="sm"
            onClick={() => window.print()}
            className="text-white text-xs"
            style={{ background: "oklch(0.68 0.18 55)" }}
            data-ocid="certificate.print.button"
          >
            🖶 डाउनलोड/प्रिंट
          </Button>
        </div>

        {/* ── Certificate ── */}
        <div
          className="bg-white relative overflow-hidden"
          style={{
            border: "8px double oklch(0.28 0.12 260)",
            padding: "40px",
          }}
          id="certificate"
        >
          {/* Corner accent circles */}
          {[
            "top-4 left-4",
            "top-4 right-4",
            "bottom-4 left-4",
            "bottom-4 right-4",
          ].map((pos) => (
            <div
              key={pos}
              className={`absolute ${pos} w-8 h-8 rounded-full`}
              style={{
                background: "oklch(0.68 0.18 55)",
                opacity: 0.3,
              }}
            />
          ))}

          {/* ② WATERMARK — centered, behind all content */}
          <TrustWatermark />

          {/* All content above watermark */}
          <div className="relative" style={{ zIndex: 1 }}>
            {/* ① HEADER LOGO */}
            <div className="text-center mb-4">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                style={{
                  background: "oklch(0.97 0.005 260)",
                  border: "2px solid oklch(0.68 0.18 55)",
                }}
              >
                🛞
              </div>
              <h1
                className="text-xl font-bold"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट
              </h1>
              <p className="text-xs" style={{ color: "oklch(0.48 0.03 260)" }}>
                Reg: {TRUST_REG_NO}
              </p>
            </div>

            {/* Saffron divider */}
            <div
              className="h-0.5 mb-4"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.68 0.18 55), transparent)",
              }}
            />

            {/* Title */}
            <div className="text-center mb-5">
              <h2
                className="text-2xl font-bold"
                style={{ color: "oklch(0.68 0.18 55)" }}
              >
                प्रमाण पत्र
              </h2>
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.48 0.03 260)" }}
              >
                Certificate No: {certNo}
              </p>
            </div>

            {/* Member photo + certificate text side-by-side */}
            <div className="flex gap-4 items-start mb-5">
              {/* Photo in top-right corner area */}
              <div className="flex-1 text-center space-y-3">
                <p
                  className="text-base leading-loose"
                  style={{ color: "oklch(0.25 0.05 260)" }}
                >
                  प्रमाणित किया जाता है कि श्री/श्रीमती{" "}
                  <span
                    className="font-bold text-lg"
                    style={{ color: "oklch(0.28 0.12 260)" }}
                  >
                    {m.name}
                  </span>{" "}
                  माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट के सार्वजनिक धर्मार्थ, सामाजिक
                  एवं जनहितकारी सेवा अभियानों से सक्रिय रूप से जुड़े हुए हैं।
                </p>
                <p
                  className="text-sm leading-loose"
                  style={{ color: "oklch(0.35 0.06 260)" }}
                >
                  यह मंच स्वर्गीय माता कल्पना बाजपेई जी की सेवा, करुणा, गरीबों एवं असहायों
                  की सहायता की प्रेरणा से स्थापित किया गया है।
                </p>
                <p
                  className="text-sm leading-loose"
                  style={{ color: "oklch(0.35 0.06 260)" }}
                >
                  आपका यह योगदान समाज में संवेदना, विश्वास, पारदर्शिता और जन-सहयोग की
                  भावना को सशक्त करता है।
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.28 0.12 260)" }}
                >
                  आप ट्रस्ट के सेवा समुदाय का अभिन्न अंग हैं।
                </p>
              </div>

              {/* Member photo — top-right */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <MemberPhotoBox photoUrl={photoUrl} />
                <p
                  className="text-[9px] text-center"
                  style={{ color: "oklch(0.48 0.03 260)" }}
                >
                  सदस्य फोटो
                </p>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
              {[
                { label: "Member ID", value: m.id },
                { label: "नाम", value: m.name },
                { label: "जिला", value: m.district },
                { label: "भूमिका", value: m.role },
                { label: "सदस्यता तिथि", value: m.joiningDate },
                { label: "जारी तिथि", value: issueDate },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.48 0.03 260)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-semibold text-xs"
                    style={{ color: "oklch(0.28 0.12 260)" }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Blue divider */}
            <div
              className="h-0.5 mb-5"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.28 0.12 260), transparent)",
              }}
            />

            {/* Signature row */}
            <div className="flex items-end justify-between">
              <div className="text-center">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "oklch(0.97 0.005 260)",
                    border: "1px solid oklch(0.9 0.01 260)",
                  }}
                >
                  QR
                </div>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.48 0.03 260)" }}
                >
                  Verify
                </p>
              </div>
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-xs text-center"
                  style={{
                    borderColor: "oklch(0.28 0.12 260)",
                    color: "oklch(0.28 0.12 260)",
                  }}
                >
                  सील
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-slate-300 pt-1">
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.48 0.03 260)" }}
                  >
                    संस्थापक हस्ताक्षर
                  </p>
                </div>
              </div>
            </div>

            {/* Tribute line */}
            <p
              className="text-center text-xs mt-4 italic"
              style={{ color: "oklch(0.68 0.18 55)" }}
            >
              स्वर्गीय माता श्रीमती कल्पना बाजपेई जी की सेवा भावना को सदैव जीवित रखने का
              संकल्प
            </p>

            {/* ③ FOOTER LOGO */}
            <div
              className="flex items-center justify-center gap-2 mt-5 pt-3"
              style={{ borderTop: "1px solid oklch(0.9 0.01 260)" }}
            >
              <span className="text-base leading-none">🛞</span>
              <p
                className="text-[10px] text-center"
                style={{ color: "oklch(0.48 0.03 260)" }}
              >
                माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट &nbsp;|&nbsp; Reg:{" "}
                {TRUST_REG_NO}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
