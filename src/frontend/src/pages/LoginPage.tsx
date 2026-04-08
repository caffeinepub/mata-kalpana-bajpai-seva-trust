import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";

export default function LoginPage() {
  const { members, setCurrentMember, language } = useApp();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobile) {
      toast.error("मोबाइल नंबर डालें");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const member = members.find((m) => m.mobile === mobile);
    if (member) {
      setCurrentMember(member);
      toast.success(`नमस्ते ${member.name}! सफलतापूर्वक लॉगिन हुआ।`);
      navigate({ to: "/dashboard" });
    } else {
      toast.error("सदस्य नहीं मिला। कृपया पहले पंजीकरण करें।");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <div
              className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ background: "oklch(0.28 0.12 260)" }}
            >
              <span className="text-2xl">📍</span>
            </div>
            <h1
              className="text-2xl font-bold"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              {language === "hi" ? "सदस्य लॉगिन" : "Member Login"}
            </h1>
            <p
              className="text-xs mt-1"
              style={{ color: "oklch(0.48 0.03 260)" }}
            >
              माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट
            </p>
          </div>

          <div
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4"
            data-ocid="login.form.section"
          >
            <div>
              <Label className="text-xs font-semibold">
                सदस्य ID या मोबाइल नंबर
              </Label>
              <Input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="मोबाइल नंबर डालें"
                className="mt-1"
                data-ocid="login.mobile.input"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">पासवर्ड</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="पासवर्ड डालें"
                className="mt-1"
                data-ocid="login.password.input"
              />
            </div>
            <Button
              className="w-full text-white"
              style={{ background: "oklch(0.28 0.12 260)" }}
              onClick={handleLogin}
              disabled={loading}
              data-ocid="login.submit.primary_button"
            >
              {loading ? "लॉगिन हो रहा है..." : "लॉगिन करें"}
            </Button>

            <div className="text-center pt-2">
              <p className="text-xs" style={{ color: "oklch(0.48 0.03 260)" }}>
                नया सदस्य?{" "}
                <Link
                  to="/register"
                  className="font-semibold hover:underline"
                  style={{ color: "oklch(0.68 0.18 55)" }}
                  data-ocid="login.register.link"
                >
                  अभी जुड़ें
                </Link>
              </p>
            </div>
          </div>

          {/* Demo Credentials */}
          <div
            className="mt-4 rounded-xl p-3 border"
            style={{
              background: "oklch(0.97 0.005 260)",
              borderColor: "oklch(0.9 0.01 260)",
            }}
          >
            <p
              className="text-xs font-semibold mb-1"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              परीक्षण के लिए:
            </p>
            <p
              className="text-xs font-mono"
              style={{ color: "oklch(0.48 0.03 260)" }}
            >
              मोबाइल: 9876543210
            </p>
          </div>

          {/* Admin Access */}
          <div className="mt-3 text-center">
            <p className="text-xs" style={{ color: "oklch(0.48 0.03 260)" }}>
              Admin?{" "}
              <Link
                to="/admin"
                className="font-semibold hover:underline"
                style={{ color: "oklch(0.28 0.12 260)" }}
                data-ocid="login.admin.link"
              >
                सीधे /admin पर जाएं
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
