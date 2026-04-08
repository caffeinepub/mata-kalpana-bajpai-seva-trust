import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";
import type { PaymentRecord } from "../types";

const UPI_APPS = [
  { name: "Google Pay", icon: "📱", color: "#4285F4", scheme: "gpay" },
  { name: "PhonePe", icon: "📲", color: "#5F259F", scheme: "phonepe" },
  { name: "Paytm", icon: "💳", color: "#00BAF2", scheme: "paytm" },
  { name: "BHIM", icon: "🏦", color: "#004C8F", scheme: "bhim" },
];

export default function PaymentPage() {
  const { memberId, amount } = useSearch({ from: "/payment" });
  const {
    members,
    trustUpiId,
    payments,
    setPayments,
    setCurrentMember,
    setShowCommunityPopup,
    language,
  } = useApp();
  const navigate = useNavigate();

  const member = members.find((m) => m.id === memberId);
  const [utr, setUtr] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(trustUpiId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("UPI ID कॉपी हो गया!");
    });
  };

  const handleSubmit = async () => {
    if (!utr || utr.length < 12) {
      toast.error("UTR नंबर अनिवार्य है (12+ अंक)");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const payment: PaymentRecord = {
      id: `PAY-${Date.now()}`,
      memberId: memberId || "",
      memberName: member?.name || "",
      amount: Number(amount),
      utr,
      paymentDate: new Date().toISOString().split("T")[0],
      status: "pending",
      submittedAt: new Date().toISOString(),
    };
    setPayments([...payments, payment]);
    if (member) setCurrentMember(member);
    toast.success(
      "भुगतान सबमिट हो गया! Admin approval के बाद membership active होगी।",
    );
    setLoading(false);
    setShowCommunityPopup(false);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1
          className="text-2xl font-bold text-center mb-2"
          style={{ color: "oklch(0.28 0.12 260)" }}
        >
          {language === "hi" ? "भुगतान करें" : "Make Payment"}
        </h1>
        <p
          className="text-xs text-center mb-6"
          style={{ color: "oklch(0.48 0.03 260)" }}
        >
          सदस्य पंजीकरण शुल्क
        </p>

        {member && (
          <div
            className="rounded-xl p-4 mb-5 border"
            style={{
              background: "oklch(0.97 0.005 260)",
              borderColor: "oklch(0.9 0.01 260)",
            }}
          >
            <p
              className="text-sm font-semibold"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              {member.name}
            </p>
            <p className="text-xs" style={{ color: "oklch(0.48 0.03 260)" }}>
              {member.id} • {member.district}
            </p>
          </div>
        )}

        {/* Amount */}
        <div className="text-center mb-6">
          <div
            className="inline-block px-8 py-4 rounded-2xl shadow-sm"
            style={{ background: "oklch(0.28 0.12 260)" }}
          >
            <div className="text-xs text-white opacity-75 mb-1">कुल राशि</div>
            <div className="text-4xl font-bold text-white">₹{amount}</div>
          </div>
        </div>

        {/* UPI ID Display */}
        <div
          className="rounded-xl p-4 mb-5 border"
          style={{
            borderColor: "oklch(0.68 0.18 55)",
            background: "oklch(0.98 0.01 55)",
          }}
        >
          <div
            className="text-xs font-semibold mb-2"
            style={{ color: "oklch(0.68 0.18 55)" }}
          >
            UPI ID
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex-1 font-mono text-sm font-bold p-2 rounded-lg bg-white border"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              {trustUpiId}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyUpi}
              className="shrink-0"
              data-ocid="payment.copy_upi.button"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* UPI App Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {UPI_APPS.map((app) => (
            <button
              type="button"
              key={app.name}
              onClick={() => {
                navigator.clipboard.writeText(trustUpiId);
                toast.success(`${app.name} खोलें और UPI ID पेस्ट करें`);
              }}
              className="flex items-center gap-2 p-3 rounded-xl border hover:shadow-md transition-all"
              style={{ borderColor: `${app.color}40` }}
              data-ocid="payment.upi_app.button"
            >
              <span className="text-xl">{app.icon}</span>
              <span
                className="text-sm font-semibold"
                style={{ color: app.color }}
              >
                {app.name}
              </span>
            </button>
          ))}
        </div>

        {/* Screenshot Upload */}
        <div className="space-y-3 mb-5">
          <div>
            <Label className="text-xs font-semibold">भुगतान स्क्रीनशॉट *</Label>
            <Input
              type="file"
              accept="image/*"
              className="mt-1"
              data-ocid="payment.screenshot.upload_button"
            />
          </div>
          <div>
            <Label className="text-xs font-semibold">UTR नंबर *</Label>
            <Input
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              placeholder="12 अंक का UTR नंबर"
              maxLength={22}
              className="mt-1 font-mono"
              data-ocid="payment.utr.input"
            />
          </div>
        </div>

        <div
          className="rounded-xl p-3 mb-5 text-xs"
          style={{ background: "oklch(0.97 0.005 260)" }}
        >
          <p style={{ color: "oklch(0.48 0.03 260)" }}>
            ⚠️ भुगतान स्क्रीनशॉट और UTR नंबर दोनों अनिवार्य हैं। Admin approval के बाद
            membership active होगी।
          </p>
        </div>

        <Button
          className="w-full text-white py-3 text-sm font-semibold rounded-xl"
          style={{ background: "oklch(0.68 0.18 55)" }}
          onClick={handleSubmit}
          disabled={loading}
          data-ocid="payment.submit.primary_button"
        >
          {loading ? "भुगतान जमा हो रहा है..." : "✓ भुगतान सबमिट करें"}
        </Button>
      </div>
      <Footer />
    </div>
  );
}
