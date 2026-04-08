import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";
import type { BeneficiaryCase } from "../types";

const LEGAL_NOTE =
  "सहायता राशि उपलब्ध जन-अनुदान के अनुपात में सत्यापन के बाद nominee के बैंक खाते में सीधे हस्तांतरित की जाएगी।";

function useApplyForm(type: BeneficiaryCase["type"]) {
  const { cases, setCases } = useApp();
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = async (
    memberId: string,
    details: Record<string, string>,
    district: string,
  ) => {
    if (!consent) {
      toast.error("कृपया सहमति दें");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const newCase: BeneficiaryCase = {
      id: `CASE-${Date.now()}`,
      memberId,
      memberName: details.memberName || memberId,
      type,
      status: "pending",
      submittedAt: new Date().toISOString(),
      district,
      details,
    };
    setCases([...cases, newCase]);
    toast.success("आवेदन सफलतापूर्वक जमा हुआ! Admin सत्यापन के बाद कार्रवाई होगी।");
    setSubmitted(true);
    setLoading(false);
  };

  return { loading, consent, setConsent, submit, submitted };
}

function ConsentSection({
  consent,
  setConsent,
}: { consent: boolean; setConsent: (v: boolean) => void }) {
  return (
    <div
      className="rounded-xl p-4 border-l-4 mt-4"
      style={{
        borderColor: "oklch(0.68 0.18 55)",
        background: "oklch(0.98 0.01 55)",
      }}
    >
      <p className="text-xs mb-3" style={{ color: "oklch(0.25 0.05 260)" }}>
        {LEGAL_NOTE}
      </p>
      <div className="flex items-start gap-2">
        <Checkbox
          id="apply-consent"
          checked={consent}
          onCheckedChange={(v) => setConsent(!!v)}
          data-ocid="apply.consent.checkbox"
        />
        <Label htmlFor="apply-consent" className="text-xs cursor-pointer">
          मैं सहमत हूँ कि यह केवल सार्वजनिक जन-सहयोग आधारित धर्मार्थ मंच है। कोई निश्चित
          राशि की गारंटी नहीं है।
        </Label>
      </div>
    </div>
  );
}

function SuccessMsg() {
  return (
    <div className="text-center py-12" data-ocid="apply.success_state">
      <div className="text-5xl mb-4">✅</div>
      <h2
        className="text-xl font-bold mb-2"
        style={{ color: "oklch(0.28 0.12 260)" }}
      >
        आवेदन जमा हुआ!
      </h2>
      <p className="text-sm" style={{ color: "oklch(0.48 0.03 260)" }}>
        Admin सत्यापन के बाद कार्रवाई होगी।
      </p>
    </div>
  );
}

export function MrityuPage() {
  const [form, setForm] = useState({
    memberId: "",
    memberName: "",
    deceasedName: "",
    relation: "",
    deathDate: "",
    district: "",
    nomineeName: "",
    nomineeAadhaar: "",
    nomineeAccount: "",
    ifsc: "",
    bankName: "",
  });
  const { loading, consent, setConsent, submit, submitted } =
    useApplyForm("mrityu");

  return (
    <div className="min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "oklch(0.28 0.12 260)" }}
        >
          मृत्यु सहायता आवेदन
        </h1>
        {submitted ? (
          <SuccessMsg />
        ) : (
          <div
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3"
            data-ocid="mrityu.form.section"
          >
            {(
              [
                { id: "memberId", label: "सदस्य ID *", type: "text" },
                { id: "memberName", label: "सदस्य का नाम", type: "text" },
                { id: "deceasedName", label: "मृतक का नाम *", type: "text" },
                { id: "relation", label: "सदस्य से संबंध *", type: "text" },
                { id: "deathDate", label: "मृत्यु तिथि *", type: "date" },
                { id: "district", label: "जिला *", type: "text" },
                { id: "nomineeName", label: "Nominee नाम *", type: "text" },
                {
                  id: "nomineeAadhaar",
                  label: "Nominee Aadhaar",
                  type: "text",
                },
                {
                  id: "nomineeAccount",
                  label: "Nominee खाता नंबर *",
                  type: "text",
                },
                { id: "ifsc", label: "IFSC कोड *", type: "text" },
                { id: "bankName", label: "बैंक का नाम *", type: "text" },
              ] as { id: keyof typeof form; label: string; type: string }[]
            ).map((f) => (
              <div key={f.id}>
                <Label className="text-xs font-semibold">{f.label}</Label>
                <Input
                  type={f.type}
                  value={form[f.id]}
                  onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                  className="mt-1"
                  data-ocid={`mrityu.${f.id}.input`}
                />
              </div>
            ))}
            <div>
              <Label className="text-xs font-semibold">
                मृत्यु प्रमाणपत्र Upload
              </Label>
              <Input
                type="file"
                className="mt-1"
                data-ocid="mrityu.death_cert.upload_button"
              />
            </div>
            <ConsentSection consent={consent} setConsent={setConsent} />
            <Button
              className="w-full text-white"
              style={{ background: "oklch(0.68 0.18 55)" }}
              onClick={() => submit(form.memberId, form, form.district)}
              disabled={loading}
              data-ocid="mrityu.submit.primary_button"
            >
              {loading ? "आवेदन जमा हो रहा..." : "✓ आवेदन जमा करें"}
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export function BimariPage() {
  const [form, setForm] = useState({
    memberId: "",
    memberName: "",
    patientName: "",
    diagnosis: "",
    hospital: "",
    doctor: "",
    estimatedAmount: "",
    district: "",
    nomineeAccount: "",
    ifsc: "",
    bankName: "",
  });
  const { loading, consent, setConsent, submit, submitted } =
    useApplyForm("bimari");

  return (
    <div className="min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "oklch(0.28 0.12 260)" }}
        >
          गंभीर बीमारी सहायता आवेदन
        </h1>
        {submitted ? (
          <SuccessMsg />
        ) : (
          <div
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3"
            data-ocid="bimari.form.section"
          >
            {(
              [
                { id: "memberId", label: "सदस्य ID *", type: "text" },
                { id: "memberName", label: "सदस्य का नाम", type: "text" },
                { id: "patientName", label: "रोगी का नाम *", type: "text" },
                { id: "diagnosis", label: "बीमारी/निदान *", type: "text" },
                { id: "hospital", label: "अस्पताल का नाम *", type: "text" },
                { id: "doctor", label: "Doctor का नाम", type: "text" },
                { id: "estimatedAmount", label: "अनुमानित खर्च", type: "text" },
                { id: "district", label: "जिला *", type: "text" },
                {
                  id: "nomineeAccount",
                  label: "Nominee खाता नंबर *",
                  type: "text",
                },
                { id: "ifsc", label: "IFSC *", type: "text" },
                { id: "bankName", label: "बैंक नाम *", type: "text" },
              ] as { id: keyof typeof form; label: string; type: string }[]
            ).map((f) => (
              <div key={f.id}>
                <Label className="text-xs font-semibold">{f.label}</Label>
                <Input
                  type={f.type}
                  value={form[f.id]}
                  onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                  className="mt-1"
                  data-ocid={`bimari.${f.id}.input`}
                />
              </div>
            ))}
            <div>
              <Label className="text-xs font-semibold">
                मेडिकल दस्तावेज़ Upload
              </Label>
              <Input
                type="file"
                className="mt-1"
                data-ocid="bimari.docs.upload_button"
              />
            </div>
            <ConsentSection consent={consent} setConsent={setConsent} />
            <Button
              className="w-full text-white"
              style={{ background: "oklch(0.68 0.18 55)" }}
              onClick={() => submit(form.memberId, form, form.district)}
              disabled={loading}
              data-ocid="bimari.submit.primary_button"
            >
              {loading ? "आवेदन जमा हो रहा..." : "✓ आवेदन जमा करें"}
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export function AccidentPage() {
  const [form, setForm] = useState({
    memberId: "",
    memberName: "",
    accidentDescription: "",
    accidentDate: "",
    hospital: "",
    fir: "",
    estimatedAmount: "",
    district: "",
    nomineeAccount: "",
    ifsc: "",
    bankName: "",
  });
  const { loading, consent, setConsent, submit, submitted } =
    useApplyForm("accident");

  return (
    <div className="min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "oklch(0.28 0.12 260)" }}
        >
          दुर्घटना सहायता आवेदन
        </h1>
        {submitted ? (
          <SuccessMsg />
        ) : (
          <div
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3"
            data-ocid="accident.form.section"
          >
            {(
              [
                { id: "memberId", label: "सदस्य ID *", type: "text" },
                { id: "memberName", label: "सदस्य का नाम", type: "text" },
                {
                  id: "accidentDescription",
                  label: "दुर्घटना विवरण *",
                  type: "text",
                },
                { id: "accidentDate", label: "दुर्घटना तिथि *", type: "date" },
                { id: "hospital", label: "अस्पताल *", type: "text" },
                { id: "fir", label: "FIR नंबर (वैकल्पिक)", type: "text" },
                { id: "estimatedAmount", label: "अनुमानित खर्च", type: "text" },
                { id: "district", label: "जिला *", type: "text" },
                {
                  id: "nomineeAccount",
                  label: "Nominee खाता नंबर *",
                  type: "text",
                },
                { id: "ifsc", label: "IFSC *", type: "text" },
                { id: "bankName", label: "बैंक नाम *", type: "text" },
              ] as { id: keyof typeof form; label: string; type: string }[]
            ).map((f) => (
              <div key={f.id}>
                <Label className="text-xs font-semibold">{f.label}</Label>
                <Input
                  type={f.type}
                  value={form[f.id]}
                  onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                  className="mt-1"
                  data-ocid={`accident.${f.id}.input`}
                />
              </div>
            ))}
            <div>
              <Label className="text-xs font-semibold">
                मेडिकल दस्तावेज़ Upload
              </Label>
              <Input
                type="file"
                className="mt-1"
                data-ocid="accident.docs.upload_button"
              />
            </div>
            <ConsentSection consent={consent} setConsent={setConsent} />
            <Button
              className="w-full text-white"
              style={{ background: "oklch(0.68 0.18 55)" }}
              onClick={() => submit(form.memberId, form, form.district)}
              disabled={loading}
              data-ocid="accident.submit.primary_button"
            >
              {loading ? "आवेदन जमा हो रहा..." : "✓ आवेदन जमा करें"}
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
