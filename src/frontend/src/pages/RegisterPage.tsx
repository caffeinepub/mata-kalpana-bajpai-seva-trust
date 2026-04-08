import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import { MEMBER_CHARGE, UP_DISTRICTS } from "../constants";
import { useApp } from "../context/AppContext";
import type { FamilyMember, MemberProfile } from "../types";

const RELATIONS = ["पत्नी", "पति", "पुत्र", "पुत्री", "माता", "पिता", "अन्य"];

type FormData = {
  name: string;
  fatherName: string;
  mobile: string;
  age: string;
  district: string;
  block: string;
  address: string;
  aadhaar: string;
};

type FamilyFormMember = {
  name: string;
  age: string;
  relation: string;
  aadhaar: string;
};

export default function RegisterPage() {
  const { members, setMembers, language } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    name: "",
    fatherName: "",
    mobile: "",
    age: "",
    district: "",
    block: "",
    address: "",
    aadhaar: "",
  });
  const [familyMembers, setFamilyMembers] = useState<FamilyFormMember[]>([]);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalAmount = MEMBER_CHARGE * (1 + familyMembers.length);

  const addFamilyMember = () => {
    setFamilyMembers((prev) => [
      ...prev,
      { name: "", age: "", relation: "", aadhaar: "" },
    ]);
  };

  const updateFamilyMember = (
    idx: number,
    field: keyof FamilyFormMember,
    value: string,
  ) => {
    setFamilyMembers((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m)),
    );
  };

  const removeFamilyMember = (idx: number) => {
    setFamilyMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  const validateStep1 = () => {
    if (
      !form.name ||
      !form.fatherName ||
      !form.mobile ||
      !form.age ||
      !form.district ||
      !form.aadhaar
    ) {
      toast.error("सभी अनिवार्य फ़ील्ड भरें");
      return false;
    }
    if (!/^[0-9]{10}$/.test(form.mobile)) {
      toast.error("मोबाइल नंबर 10 अंक का होना चाहिए");
      return false;
    }
    if (!/^[0-9]{12}$/.test(form.aadhaar)) {
      toast.error("Aadhaar नंबर 12 अंक का होना चाहिए");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!consent) {
      toast.error("कृपया सहमति दें");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const memberId = `MKBR-${new Date().getFullYear()}-${String(members.length + 1).padStart(3, "0")}`;
    const newMember: MemberProfile = {
      id: memberId,
      memberCode: memberId,
      name: form.name,
      fatherName: form.fatherName,
      mobile: form.mobile,
      age: Number(form.age),
      district: form.district,
      block: form.block,
      address: form.address,
      aadhaar: `XXXX-XXXX-${form.aadhaar.slice(-4)}`,
      status: "pending",
      joiningDate: new Date().toISOString().split("T")[0],
      role: "member",
      familyMembers: familyMembers.map(
        (fm, i) =>
          ({
            id: `FM-${memberId}-${i + 1}`,
            name: fm.name,
            age: Number(fm.age),
            relation: fm.relation,
            aadhaar: fm.aadhaar ? `XXXX-XXXX-${fm.aadhaar.slice(-4)}` : "",
            address: form.address,
            fatherName: form.fatherName,
          }) as FamilyMember,
      ),
      paymentStatus: "pending",
      totalAmount,
      districtCode: form.district.substring(0, 3).toUpperCase(),
      blockCode: form.block.substring(0, 3).toUpperCase(),
    };
    setMembers([...members, newMember]);
    toast.success("पंजीकरण सफल! अब भुगतान करें");
    setLoading(false);
    navigate({
      to: "/payment",
      search: { memberId, amount: String(totalAmount) },
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1
          className="text-2xl font-bold text-center mb-2"
          style={{ color: "oklch(0.28 0.12 260)" }}
        >
          {language === "hi" ? "नया पंजीकरण" : "New Registration"}
        </h1>
        <p
          className="text-xs text-center mb-6"
          style={{ color: "oklch(0.48 0.03 260)" }}
        >
          माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट
        </p>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background:
                    s <= step ? "oklch(0.28 0.12 260)" : "oklch(0.9 0.01 260)",
                  color: s <= step ? "white" : "oklch(0.48 0.03 260)",
                }}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className="w-12 h-0.5"
                  style={{
                    background:
                      s < step ? "oklch(0.28 0.12 260)" : "oklch(0.9 0.01 260)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <Progress value={(step / 3) * 100} className="mb-6 h-1.5" />

        {/* Step 1: Personal */}
        {step === 1 && (
          <div
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4"
            data-ocid="register.personal.section"
          >
            <h2
              className="font-bold mb-2"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              व्यक्तिगत जानकारी
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold">नाम *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="सदस्य का पूरा नाम"
                  className="mt-1"
                  data-ocid="register.name.input"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">पिता/पति नाम *</Label>
                <Input
                  value={form.fatherName}
                  onChange={(e) =>
                    setForm({ ...form, fatherName: e.target.value })
                  }
                  placeholder="पिता या पति का नाम"
                  className="mt-1"
                  data-ocid="register.father_name.input"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">मोबाइल *</Label>
                <Input
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  placeholder="10 अंक का मोबाइल नंबर"
                  maxLength={10}
                  className="mt-1"
                  data-ocid="register.mobile.input"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">आयु *</Label>
                <Input
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  placeholder="आयु (वर्ष)"
                  className="mt-1"
                  data-ocid="register.age.input"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">जिला *</Label>
                <Select
                  value={form.district}
                  onValueChange={(v) => setForm({ ...form, district: v })}
                >
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="register.district.select"
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
                <Label className="text-xs font-semibold">ब्लॉक</Label>
                <Input
                  value={form.block}
                  onChange={(e) => setForm({ ...form, block: e.target.value })}
                  placeholder="ब्लॉक का नाम"
                  className="mt-1"
                  data-ocid="register.block.input"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold">पता</Label>
              <Textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="ग्राम, पोस्ट, तहसील"
                className="mt-1"
                data-ocid="register.address.textarea"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Aadhaar नंबर *</Label>
              <Input
                value={form.aadhaar}
                onChange={(e) => setForm({ ...form, aadhaar: e.target.value })}
                placeholder="12 अंक का Aadhaar नंबर"
                maxLength={12}
                className="mt-1"
                data-ocid="register.aadhaar.input"
              />
            </div>
            <Button
              className="w-full text-white"
              style={{ background: "oklch(0.28 0.12 260)" }}
              onClick={() => validateStep1() && setStep(2)}
              data-ocid="register.step1.primary_button"
            >
              अगला कदम →
            </Button>
          </div>
        )}

        {/* Step 2: Family */}
        {step === 2 && (
          <div
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4"
            data-ocid="register.family.section"
          >
            <h2
              className="font-bold mb-1"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              अपने परिवार के सदस्य जोड़ें
            </h2>
            <div
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: "oklch(0.95 0.05 55)" }}
            >
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                कुल राशि:
              </span>
              <span
                className="text-lg font-bold"
                style={{ color: "oklch(0.68 0.18 55)" }}
              >
                &#8377;{totalAmount}
              </span>
            </div>
            <p className="text-xs" style={{ color: "oklch(0.48 0.03 260)" }}>
              मूल सदस्य &#8377;110 + {familyMembers.length} परिवार सदस्य ×
              &#8377;110
            </p>

            {familyMembers.map((fm, i) => (
              <div
                key={`fm-${i}-${fm.name}`}
                className="border border-slate-100 rounded-xl p-4 space-y-3"
                data-ocid={`register.family.item.${i + 1}`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.28 0.12 260)" }}
                  >
                    परिवार सदस्य {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFamilyMember(i)}
                    className="text-xs text-red-500 hover:text-red-700"
                    data-ocid={`register.family.delete_button.${i + 1}`}
                  >
                    हटाएं
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">नाम</Label>
                    <Input
                      value={fm.name}
                      onChange={(e) =>
                        updateFamilyMember(i, "name", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">आयु</Label>
                    <Input
                      type="number"
                      value={fm.age}
                      onChange={(e) =>
                        updateFamilyMember(i, "age", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">संबंध</Label>
                    <Select
                      value={fm.relation}
                      onValueChange={(v) =>
                        updateFamilyMember(i, "relation", v)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="संबंध" />
                      </SelectTrigger>
                      <SelectContent>
                        {RELATIONS.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Aadhaar (वैकल्पिक)</Label>
                    <Input
                      value={fm.aadhaar}
                      onChange={(e) =>
                        updateFamilyMember(i, "aadhaar", e.target.value)
                      }
                      maxLength={12}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full text-sm"
              onClick={addFamilyMember}
              data-ocid="register.add_family.button"
            >
              + परिवार सदस्य जोड़ें
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(1)}
                data-ocid="register.step2.back.button"
              >
                वापस
              </Button>
              <Button
                className="flex-1 text-white"
                style={{ background: "oklch(0.28 0.12 260)" }}
                onClick={() => setStep(3)}
                data-ocid="register.step2.primary_button"
              >
                अगला कदम →
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Documents */}
        {step === 3 && (
          <div
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4"
            data-ocid="register.documents.section"
          >
            <h2
              className="font-bold mb-2"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              दस्तावेज़ और सहमति
            </h2>

            <div className="space-y-3">
              <div>
                <Label className="text-xs font-semibold">
                  Aadhaar सामने की फोटो
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="mt-1"
                  data-ocid="register.aadhaar_front.upload_button"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">
                  Aadhaar पीछे की फोटो
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="mt-1"
                  data-ocid="register.aadhaar_back.upload_button"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">सदस्य की फोटो</Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="mt-1"
                  data-ocid="register.photo.upload_button"
                />
              </div>
            </div>

            {/* Consent */}
            <div
              className="rounded-xl p-4 border-l-4 text-sm"
              style={{
                borderColor: "oklch(0.68 0.18 55)",
                background: "oklch(0.98 0.01 55)",
              }}
            >
              <p
                className="text-xs leading-relaxed mb-3"
                style={{ color: "oklch(0.25 0.05 260)" }}
              >
                <strong>अनिवार्य कानूनी सहमति:</strong> यह मंच पूर्णतः सार्वजनिक
                धर्मार्थ, सामाजिक एवं जनहितकारी उद्देशों हेतु संचालित हो रहा है। ट्रस्ट किसी
                भी प्रकार की बीमा योजना, निवेश योजना, निश्चित प्रतिफल, गारंटीड सहायता
                राशि अथवा व्यावसायिक लाभ का वचन नहीं देता।
              </p>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(v) => setConsent(!!v)}
                  data-ocid="register.consent.checkbox"
                />
                <Label
                  htmlFor="consent"
                  className="text-xs leading-relaxed cursor-pointer"
                >
                  मैं सहमत हूँ कि यह केवल सार्वजनिक जन-अनुदान आधारित धर्मार्थ मंच है। इसमें
                  किसी भी प्रकार की बीमा, निश्चित राशि, गारंटी, निवेश अथवा रिटर्न का
                  कोई वचन नहीं दिया गया है।
                </Label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(2)}
                data-ocid="register.step3.back.button"
              >
                वापस
              </Button>
              <Button
                className="flex-1 text-white"
                style={{ background: "oklch(0.68 0.18 55)" }}
                onClick={handleSubmit}
                disabled={loading}
                data-ocid="register.submit.primary_button"
              >
                {loading ? "पंजीकरण हो रहा है..." : "✓ सदस्य बनें"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
