import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";

const mockCases = [
  {
    id: "CASE-001",
    type: "पुत्री विवाह",
    member: "रामेश्वर प्रसाद",
    district: "लखनऊ",
    donors: 7,
    target: 10,
    status: "सक्रिय",
  },
  {
    id: "CASE-002",
    type: "मृत्यु सहायता",
    member: "सुनीता देवी",
    district: "वाराणसी",
    donors: 3,
    target: 10,
    status: "सक्रिय",
  },
  {
    id: "CASE-003",
    type: "बीमारी सहायता",
    member: "अजय कुमार",
    district: "आगरा",
    donors: 10,
    target: 10,
    status: "पूर्ण",
  },
];

export default function QRRotationPage() {
  const [batchSize, setBatchSize] = useState("10");
  const [cases] = useState(mockCases);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "oklch(0.28 0.12 260)" }}
        >
          QR बैच रोटेशन — बहु-case प्रबंधन
        </h1>
        <p className="text-xs mb-6" style={{ color: "oklch(0.48 0.03 260)" }}>
          Multi-case campaigns के लिए configurable batch logic
        </p>

        {/* Config */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5 flex items-end gap-4">
          <div>
            <Label className="text-xs font-semibold">Batch आकार</Label>
            <Input
              type="number"
              value={batchSize}
              onChange={(e) => setBatchSize(e.target.value)}
              className="mt-1 w-24"
              min="1"
              max="100"
              data-ocid="qr.batch_size.input"
            />
          </div>
          <Button
            className="text-white"
            style={{ background: "oklch(0.28 0.12 260)" }}
            onClick={() => toast.success("नया बैच बनاया!")}
            data-ocid="qr.new_batch.primary_button"
          >
            नया बैच बनाएं
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.success("सभी QR Export हो रहे हैं...")}
            data-ocid="qr.export_all.button"
          >
            सभी QR Export करें
          </Button>
        </div>

        {/* Cases */}
        <div className="space-y-4">
          {cases.map((c, i) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
              data-ocid={`qr.case.item.${i + 1}`}
            >
              <div className="flex items-start gap-4">
                {/* QR Placeholder */}
                <div
                  className="w-16 h-16 rounded-lg flex flex-col items-center justify-center shrink-0"
                  style={{
                    background: "oklch(0.97 0.005 260)",
                    border: "2px dashed oklch(0.9 0.01 260)",
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: "oklch(0.48 0.03 260)" }}
                  >
                    QR
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "oklch(0.68 0.18 55)" }}
                  >
                    #{i + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Badge
                      style={{
                        background: "oklch(0.97 0.005 260)",
                        color: "oklch(0.28 0.12 260)",
                      }}
                    >
                      {c.type}
                    </Badge>
                    <Badge
                      className={
                        c.status === "पूर्ण"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {c.status}
                    </Badge>
                  </div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.28 0.12 260)" }}
                  >
                    {c.member}
                  </p>
                  <p
                    className="text-xs mb-2"
                    style={{ color: "oklch(0.48 0.03 260)" }}
                  >
                    {c.district} • Case ID: {c.id}
                  </p>
                  <div className="space-y-1">
                    <div
                      className="flex justify-between text-xs"
                      style={{ color: "oklch(0.48 0.03 260)" }}
                    >
                      <span>
                        Donors: {c.donors}/{c.target}
                      </span>
                      <span>{Math.round((c.donors / c.target) * 100)}%</span>
                    </div>
                    <Progress
                      value={(c.donors / c.target) * 100}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
