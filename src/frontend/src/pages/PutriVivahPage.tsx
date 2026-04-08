import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import { UP_DISTRICTS } from "../constants";
import { useApp } from "../context/AppContext";
import type { BeneficiaryCase } from "../types";

export default function PutriVivahPage() {
  const { cases, setCases } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fatherMemberId: "",
    daughterName: "",
    daughterAge: "",
    marriageDate: "",
    district: "",
    nomineeAccount: "",
    ifsc: "",
    bankName: "",
  });
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!consent) {
      toast.error("कृपया सहमति दें");
      return;
    }
    if (
      !form.fatherMemberId ||
      !form.daughterName ||
      !form.marriageDate ||
      !form.nomineeAccount
    ) {
      toast.error("सभी अनिवार्य फ़ील्ड भरें");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const newCase: BeneficiaryCase = {
      id: `CASE-${Date.now()}`,
      memberId: form.fatherMemberId,
      memberName: form.fatherMemberId,
      type: "vivah",
      status: "pending",
      submittedAt: new Date().toISOString(),
      district: form.district,
      details: { ...form, type: "vivah" },
    };
    setCases([...cases, newCase]);
    toast.success("पुत्री विवाह आवेदन जमा हुआ! अब &#8377;110 योगदान करें।");
    setLoading(false);
    setSubmitted(true);
    setTimeout(
      () =>
        navigate({
          to: "/payment",
          search: { memberId: form.fatherMemberId, amount: "110" },
        }),
      1500,
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1
          className="text-2xl font-bold text-center mb-2"
          style={{ color: "oklch(0.28 0.12 260)" }}
        >
          पुत्री विवाह सहायता
        </h1>
        <p
          className="text-xs text-center mb-6"
          style={{ color: "oklch(0.48 0.03 260)" }}
        >
          बेटी के विवाह हेतु अलग पंजीकरण एवं &#8377;110 योगदान
        </p>

        {submitted ? (
          <div className="text-center py-10" data-ocid="vivah.success_state">
            <div className="text-5xl mb-4">💛</div>
            <h2
              className="text-xl font-bold"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              आवेदन जमा हुआ!
            </h2>
            <p
              className="text-sm mt-2"
              style={{ color: "oklch(0.48 0.03 260)" }}
            >
              অআপনাकে ভুগতান পৃষ্ঠায় নিয়ে যাওয়া হচ্ছে...
            </p>
          </div>
        ) : (
          <div
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4"
            data-ocid="vivah.form.section"
          >
            {/* ₹110 Notice */}
            <div
              className="rounded-xl p-3 text-center"
              style={{ background: "oklch(0.95 0.05 55)" }}
            >
              <p
                className="text-sm font-bold"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                &#8377;110 अलग योगदान आवश्यक
              </p>
              <p className="text-xs" style={{ color: "oklch(0.48 0.03 260)" }}>
                पुत्री विवाह हेतु अलग सहयोग
              </p>
            </div>

            <div>
              <Label className="text-xs font-semibold">
                पिता का Member ID *
              </Label>
              <Input
                value={form.fatherMemberId}
                onChange={(e) =>
                  setForm({ ...form, fatherMemberId: e.target.value })
                }
                className="mt-1"
                data-ocid="vivah.father_id.input"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">बेटी का नाम *</Label>
              <Input
                value={form.daughterName}
                onChange={(e) =>
                  setForm({ ...form, daughterName: e.target.value })
                }
                className="mt-1"
                data-ocid="vivah.daughter_name.input"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">बेटी की आयु *</Label>
              <Input
                type="number"
                value={form.daughterAge}
                onChange={(e) =>
                  setForm({ ...form, daughterAge: e.target.value })
                }
                className="mt-1"
                data-ocid="vivah.daughter_age.input"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">
                बेटी का Aadhaar Upload
              </Label>
              <Input
                type="file"
                accept="image/*"
                className="mt-1"
                data-ocid="vivah.aadhaar.upload_button"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">विवाह तिथि *</Label>
              <Input
                type="date"
                value={form.marriageDate}
                onChange={(e) =>
                  setForm({ ...form, marriageDate: e.target.value })
                }
                className="mt-1"
                data-ocid="vivah.marriage_date.input"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">जिला</Label>
              <Select
                value={form.district}
                onValueChange={(v) => setForm({ ...form, district: v })}
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="vivah.district.select"
                >
                  <SelectValue placeholder="जिला चुनें" />
                </SelectTrigger>
                <SelectContent>
                  {UP_DISTRICTS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-semibold">
                Beneficiary खाता नंबर *
              </Label>
              <Input
                value={form.nomineeAccount}
                onChange={(e) =>
                  setForm({ ...form, nomineeAccount: e.target.value })
                }
                className="mt-1"
                data-ocid="vivah.account.input"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">IFSC *</Label>
              <Input
                value={form.ifsc}
                onChange={(e) => setForm({ ...form, ifsc: e.target.value })}
                className="mt-1"
                data-ocid="vivah.ifsc.input"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">बैंक नाम *</Label>
              <Input
                value={form.bankName}
                onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                className="mt-1"
                data-ocid="vivah.bank_name.input"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">
                निमंत्रण कार्ड Upload (वैकल्पिक)
              </Label>
              <Input
                type="file"
                className="mt-1"
                data-ocid="vivah.invitation.upload_button"
              />
            </div>

            <div
              className="rounded-xl p-4 border-l-4"
              style={{
                borderColor: "oklch(0.68 0.18 55)",
                background: "oklch(0.98 0.01 55)",
              }}
            >
              <div className="flex items-start gap-2">
                <Checkbox
                  id="vivah-consent"
                  checked={consent}
                  onCheckedChange={(v) => setConsent(!!v)}
                  data-ocid="vivah.consent.checkbox"
                />
                <Label
                  htmlFor="vivah-consent"
                  className="text-xs cursor-pointer"
                >
                  मैं सहमत हूँ कि यह केवल सार्वजनिक जन-सहयोग आधारित धर्मार्थ मंच है। कोई
                  निश्चित सहायता राशि की गारंटी नहीं है।
                </Label>
              </div>
            </div>

            <Button
              className="w-full text-white"
              style={{ background: "oklch(0.68 0.18 55)" }}
              onClick={handleSubmit}
              disabled={loading}
              data-ocid="vivah.submit.primary_button"
            >
              {loading
                ? "जमा हो रहा है..."
                : "✓ आवेदन जमा करें (इसके बाद &#8377;110 भुगतान)"}
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
