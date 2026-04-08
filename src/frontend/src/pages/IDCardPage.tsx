import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { TRUST_REG_NO } from "../constants";
import { useApp } from "../context/AppContext";

/** Reusable member photo component — passport-style frame */
function MemberPhoto({
  photoUrl,
  size = "lg",
}: {
  photoUrl: string | null;
  size?: "lg" | "sm";
}) {
  const dim = size === "lg" ? "w-20 h-24" : "w-16 h-20";
  const border =
    "border-2 overflow-hidden flex items-center justify-center flex-shrink-0";
  const borderColor = "border-amber-500";

  if (photoUrl) {
    return (
      <div
        className={`${dim} ${border} ${borderColor} rounded-sm`}
        style={{ borderColor: "oklch(0.68 0.18 55)" }}
      >
        <img src={photoUrl} alt="सदस्य" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${dim} ${border} ${borderColor} rounded-sm flex-col gap-1`}
      style={{
        background: "oklch(0.96 0.01 260)",
        borderColor: "oklch(0.68 0.18 55)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8 opacity-40"
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
        className="text-[8px] text-center leading-tight px-1"
        style={{ color: "oklch(0.55 0.03 260)" }}
      >
        फोटो
      </span>
    </div>
  );
}

/** Centered faded trust watermark — shows behind content */
function TrustWatermark() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
      style={{ zIndex: 0, opacity: 0.07 }}
      aria-hidden="true"
    >
      <span style={{ fontSize: "72px", lineHeight: 1 }}>🛞</span>
      <span
        className="text-center font-bold leading-tight mt-1 px-4"
        style={{
          fontSize: "11px",
          color: "oklch(0.28 0.12 260)",
          letterSpacing: "0.03em",
        }}
      >
        माता कल्पना बाजपेई
        <br />
        राष्ट्रीय सेवा ट्रस्ट
      </span>
    </div>
  );
}

export default function IDCardPage() {
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
            data-ocid="idcard.login.button"
          >
            लॉगिन
          </Button>
        </div>
      </div>
    );
  }

  const m = currentMember;
  const photoUrl = getPhotoUrl(m.photoHash);
  const aadhaarLast4 = m.aadhaar.slice(-4);
  const maskedMobile = m.mobile.replace(/(\d{2})(\d{4})(\d{4})/, "$1XXXX$3");

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.005 260)" }}
    >
      <div className="max-w-sm mx-auto px-4 py-8">
        {/* Controls — hidden on print */}
        <div className="flex justify-between items-center mb-5 no-print">
          <h1
            className="text-xl font-bold"
            style={{ color: "oklch(0.28 0.12 260)" }}
          >
            ID Card
          </h1>
          <Button
            size="sm"
            onClick={() => window.print()}
            className="text-white text-xs"
            style={{ background: "oklch(0.68 0.18 55)" }}
            data-ocid="idcard.print.button"
          >
            🖶 डाउनलोड/प्रिंट
          </Button>
        </div>

        {/* ── ID Card ── */}
        <div
          className="bg-white rounded-2xl overflow-hidden shadow-lg relative"
          style={{
            border: "3px solid oklch(0.68 0.18 55)",
          }}
          id="id-card"
        >
          {/* ① HEADER LOGO — Top bar */}
          <div
            className="flex items-center justify-center gap-2 px-3 py-2"
            style={{ background: "oklch(0.28 0.12 260)" }}
          >
            <span className="text-white text-lg leading-none">🛞</span>
            <p className="text-white text-xs font-bold text-center leading-tight">
              माता कल्पना बाजपेई
              <br />
              <span className="font-normal text-[10px]">राष्ट्रीय सेवा ट्रस्ट</span>
            </p>
          </div>

          {/* Saffron strip */}
          <div
            className="h-1.5"
            style={{ background: "oklch(0.68 0.18 55)" }}
          />

          {/* ② WATERMARK — centered behind body content */}
          <TrustWatermark />

          {/* Body — sits above watermark via relative z-index */}
          <div className="p-4 relative" style={{ zIndex: 1 }}>
            {/* Photo + Status row */}
            <div className="flex items-start gap-3 mb-3">
              <MemberPhoto photoUrl={photoUrl} size="lg" />

              <div className="flex-1 min-w-0">
                {/* Status badge */}
                <div
                  className="inline-block px-2 py-0.5 rounded-full text-white text-[10px] font-bold mb-2"
                  style={{
                    background:
                      m.status === "active"
                        ? "oklch(0.55 0.15 145)"
                        : "oklch(0.68 0.18 55)",
                  }}
                >
                  {m.status === "active" ? "ACTIVE" : "PENDING"}
                </div>

                {/* Member ID */}
                <div>
                  <p
                    className="text-[9px]"
                    style={{ color: "oklch(0.48 0.03 260)" }}
                  >
                    Member ID
                  </p>
                  <p
                    className="font-bold text-[11px] font-mono"
                    style={{ color: "oklch(0.28 0.12 260)" }}
                  >
                    {m.id}
                  </p>
                </div>

                <div className="mt-1">
                  <p
                    className="font-semibold text-sm leading-tight truncate"
                    style={{ color: "oklch(0.22 0.1 260)" }}
                  >
                    {m.name}
                  </p>
                  <p
                    className="text-[10px] truncate"
                    style={{ color: "oklch(0.48 0.03 260)" }}
                  >
                    {m.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Details Table */}
            <div className="space-y-1.5">
              {[
                { label: "पिता/पति", value: m.fatherName },
                { label: "जिला", value: `${m.district} / ${m.block}` },
                { label: "मोबाइल", value: maskedMobile },
                { label: "Aadhaar", value: `XXXX-XXXX-${aadhaarLast4}` },
                { label: "सदस्यता", value: m.joiningDate },
                { label: "परिवार", value: `${m.familyMembers.length} सदस्य` },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between text-xs border-b pb-1"
                  style={{ borderColor: "oklch(0.93 0.01 260)" }}
                >
                  <span style={{ color: "oklch(0.48 0.03 260)" }}>
                    {row.label}
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "oklch(0.28 0.12 260)" }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* QR + Reg */}
            <div className="flex items-center justify-between mt-3 pt-2">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: "oklch(0.97 0.005 260)",
                  color: "oklch(0.48 0.03 260)",
                  border: "1px solid oklch(0.9 0.01 260)",
                }}
              >
                QR
              </div>
              <div className="text-right">
                <p
                  className="text-[9px]"
                  style={{ color: "oklch(0.48 0.03 260)" }}
                >
                  संस्थापक
                </p>
                <div
                  className="border-t mt-0.5 pt-0.5"
                  style={{ borderColor: "oklch(0.8 0.02 260)" }}
                >
                  <p
                    className="text-[9px]"
                    style={{ color: "oklch(0.28 0.12 260)" }}
                  >
                    Reg: {TRUST_REG_NO}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ③ FOOTER LOGO — bottom band */}
          <div className="h-1" style={{ background: "oklch(0.68 0.18 55)" }} />
          <div
            className="flex items-center justify-center gap-1.5 py-1.5 px-3"
            style={{ background: "oklch(0.28 0.12 260)" }}
          >
            <span className="text-white text-xs leading-none">🛞</span>
            <p className="text-white text-[9px] text-center">
              माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट &nbsp;|&nbsp; Reg:{" "}
              {TRUST_REG_NO}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
