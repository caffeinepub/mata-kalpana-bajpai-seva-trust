import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { TRUST_REG_NO } from "../constants";
import { useApp } from "../context/AppContext";

const ROLE_LABELS: Record<string, string> = {
  district_officer: "जिला अध्यक्ष",
  block_officer: "ब्लॉक अध्यक्ष",
  state_officer: "राज्य पदाधिकारी",
  admin: "संस्थापक प्रतिनिधि",
  member: "साधारण सदस्य",
};

/** Centered faded trust watermark for appointment letter */
function TrustWatermark() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
      style={{ zIndex: 0, opacity: 0.07 }}
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

export default function AppointmentPage() {
  const { currentMember } = useApp();
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
            data-ocid="appointment.login.button"
          >
            लॉगिन
          </Button>
        </div>
      </div>
    );
  }

  if (currentMember.role === "member") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-lg mb-4" style={{ color: "oklch(0.28 0.12 260)" }}>
            यह पत्र केवल पदाधिकारियों के लिए उपलब्ध है
          </p>
        </div>
      </div>
    );
  }

  const m = currentMember;
  const year = new Date().getFullYear();
  const apntNo = `APNT-${m.districtCode}-${year}-${Math.floor(1000 + Math.random() * 9000)}`;
  const issueDate = new Date().toLocaleDateString("hi-IN");
  const validTill = new Date(
    Date.now() + 365 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString("hi-IN");
  const roleLabel = ROLE_LABELS[m.role] || m.role;

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
            नियुक्ति पत्र
          </h1>
          <Button
            size="sm"
            onClick={() => window.print()}
            className="text-white text-xs"
            style={{ background: "oklch(0.68 0.18 55)" }}
            data-ocid="appointment.print.button"
          >
            🖶 डाउनलोड/प्रिंट
          </Button>
        </div>

        {/* ── Appointment Letter ── */}
        <div
          className="bg-white relative overflow-hidden"
          style={{ border: "4px double oklch(0.28 0.12 260)", padding: "40px" }}
          id="appointment-letter"
        >
          {/* ② WATERMARK — centered, behind all content */}
          <TrustWatermark />

          {/* All content above watermark */}
          <div className="relative" style={{ zIndex: 1 }}>
            {/* ① HEADER LOGO — Letterhead */}
            <div className="text-center mb-6">
              <div
                className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-xl"
                style={{ background: "oklch(0.28 0.12 260)" }}
              >
                <span className="text-white">🛞</span>
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
              <p className="text-xs" style={{ color: "oklch(0.48 0.03 260)" }}>
                उत्तर प्रदेश, भारत
              </p>
            </div>

            {/* Saffron divider */}
            <div
              className="h-0.5 mb-6"
              style={{ background: "oklch(0.68 0.18 55)" }}
            />

            {/* Meta row */}
            <div
              className="mb-4 flex justify-between text-xs"
              style={{ color: "oklch(0.48 0.03 260)" }}
            >
              <span>
                नियुक्ति संख्या:{" "}
                <strong
                  className="font-mono"
                  style={{ color: "oklch(0.28 0.12 260)" }}
                >
                  {apntNo}
                </strong>
              </span>
              <span>तिथि: {issueDate}</span>
            </div>

            <h2
              className="text-xl font-bold text-center mb-6"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              नियुक्ति पत्र
            </h2>

            {/* Body */}
            <div
              className="space-y-4 text-sm leading-loose"
              style={{ color: "oklch(0.25 0.05 260)" }}
            >
              <p>
                आपको माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट में{" "}
                <strong>{roleLabel}</strong> पद पर नियुक्त किया जाता है।
              </p>
              <p>
                आप ट्रस्ट के सार्वजनिक धर्मार्थ, सामाजिक एवं जनहितकारी उद्देशों के अंतर्गत
                अपने जिला / ब्लॉक / क्षेत्र में सदस्यता, सेवा गतिविधियों, सत्यापन एवं सहायता
                समन्वय का कार्य करेंगे।
              </p>
              <p>
                यह नियुक्ति ट्रस्ट की नीति, संस्थापक के निर्देश एवं सेवा आचार संहिता के अधीन
                प्रभावी रहेगी।
              </p>
            </div>

            {/* Officer details box */}
            <div
              className="mt-6 p-4 rounded-lg"
              style={{ background: "oklch(0.97 0.005 260)" }}
            >
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { label: "पदाधिकारी नाम", value: m.name },
                  { label: "Member ID", value: m.id },
                  { label: "जिला", value: m.district },
                  { label: "ब्लॉक", value: m.block || "-" },
                  { label: "पद", value: roleLabel },
                  { label: "कार्य क्षेत्र", value: m.district },
                  { label: "जारी तिथि", value: issueDate },
                  { label: "वैधता", value: validTill },
                ].map((item) => (
                  <div key={item.label}>
                    <p style={{ color: "oklch(0.48 0.03 260)" }}>
                      {item.label}
                    </p>
                    <p
                      className="font-semibold"
                      style={{ color: "oklch(0.28 0.12 260)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Light divider */}
            <div
              className="h-0.5 mt-6 mb-6"
              style={{ background: "oklch(0.9 0.01 260)" }}
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
                  className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-xs"
                  style={{
                    borderColor: "oklch(0.28 0.12 260)",
                    color: "oklch(0.28 0.12 260)",
                  }}
                >
                  सील
                </div>
              </div>
              <div className="text-right">
                <div
                  className="border-t pt-1"
                  style={{ borderColor: "oklch(0.48 0.03 260)" }}
                >
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.48 0.03 260)" }}
                  >
                    संस्थापक हस्ताक्षर
                  </p>
                </div>
              </div>
            </div>

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
