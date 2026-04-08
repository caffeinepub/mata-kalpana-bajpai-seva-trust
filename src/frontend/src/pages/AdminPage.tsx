import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import type { BeneficiaryCase, MemberProfile, PaymentRecord } from "../types";

const ADMIN_PASSWORD = "admin@mkbr2024";
const ADMIN_KEY = "mkbr_admin_auth";

const TABS = [
  { id: "members", label: "सदस्य" },
  { id: "payments", label: "भुगतान" },
  { id: "cases", label: "Cases" },
  { id: "districts", label: "जिले" },
  { id: "cms", label: "CMS" },
  { id: "templates", label: "Templates" },
  { id: "analytics", label: "Analytics" },
  { id: "seo", label: "SEO" },
  { id: "legal", label: "Legal Docs" },
  { id: "export", label: "Export" },
  { id: "qr", label: "QR Batches" },
];

const PAYMENT_TREND = [
  { day: "Mon", amount: 1540 },
  { day: "Tue", amount: 2200 },
  { day: "Wed", amount: 1980 },
  { day: "Thu", amount: 3100 },
  { day: "Fri", amount: 2700 },
  { day: "Sat", amount: 3850 },
  { day: "Sun", amount: 2100 },
];

const MEMBER_JOINS = [
  { day: "Mon", joins: 12 },
  { day: "Tue", joins: 18 },
  { day: "Wed", joins: 25 },
  { day: "Thu", joins: 15 },
  { day: "Fri", joins: 32 },
  { day: "Sat", joins: 47 },
  { day: "Sun", joins: 28 },
];

export default function AdminPage() {
  const {
    members,
    setMembers,
    payments,
    setPayments,
    cases,
    setCases,
    stats,
    districts,
    trustUpiId,
    setTrustUpiId,
  } = useApp();

  const [isAuth, setIsAuth] = useState(
    () => localStorage.getItem(ADMIN_KEY) === "true",
  );
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("members");
  const [memberSearch, setMemberSearch] = useState("");
  const [upiInput, setUpiInput] = useState(trustUpiId);
  const [telegramDistrict, setTelegramDistrict] = useState(
    "https://t.me/mkbrseva",
  );
  const [telegramState, setTelegramState] = useState(
    "https://t.me/mkbrseva_up",
  );
  const [telegramNational, setTelegramNational] = useState(
    "https://t.me/mkbrseva_national",
  );
  const [whatsappLink, setWhatsappLink] = useState("https://wa.me/9999999999");
  const [newDistrictName, setNewDistrictName] = useState("");
  const [newDistrictCode, setNewDistrictCode] = useState("");
  const [seoTitle, setSeoTitle] = useState("माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट");
  const [seoDesc, setSeoDesc] = useState(
    "75 जनपदों में सार्वजनिक धर्मार्थ जन-सहयोग मंच",
  );
  const [seoKeywords, setSeoKeywords] = useState(
    "सेवा, जन-सहयोग, ट्रस्ट, उत्तर प्रदेश",
  );
  const [viewPayment, setViewPayment] = useState<PaymentRecord | null>(null);
  const [viewCase, setViewCase] = useState<BeneficiaryCase | null>(null);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuth(true);
      localStorage.setItem(ADMIN_KEY, "true");
      toast.success("Admin Panel में आउश्वागत है!");
    } else {
      toast.error("गलत पासवर्ड!");
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem(ADMIN_KEY);
  };

  const approveMember = (id: string) => {
    setMembers(
      members.map((m) =>
        m.id === id ? { ...m, status: "active" as const } : m,
      ),
    );
    toast.success("सदस्य अनुमोदित!");
  };

  const rejectMember = (id: string) => {
    setMembers(
      members.map((m) =>
        m.id === id ? { ...m, status: "rejected" as const } : m,
      ),
    );
    toast.success("सदस्य अस्वीकृत!");
  };

  const approvePayment = (id: string) => {
    setPayments(
      payments.map((p) =>
        p.id === id ? { ...p, status: "approved" as const } : p,
      ),
    );
    toast.success("भुगतान अनुमोदित!");
  };

  const rejectPayment = (id: string) => {
    setPayments(
      payments.map((p) =>
        p.id === id ? { ...p, status: "rejected" as const } : p,
      ),
    );
    toast.success("भुगतान अस्वीकृत!");
  };

  const holdPayment = (id: string) => {
    setPayments(
      payments.map((p) =>
        p.id === id ? { ...p, status: "hold" as const } : p,
      ),
    );
    toast.success("भुगतान Hold किया!");
  };

  const updateCaseStatus = (id: string, status: BeneficiaryCase["status"]) => {
    setCases(cases.map((c) => (c.id === id ? { ...c, status } : c)));
    toast.success("आवेदन स्थिति अपडेट!");
  };

  const saveCMS = () => {
    setTrustUpiId(upiInput);
    toast.success("CMS सेटिंग सेव हो गई!");
  };

  const saveSEO = () => {
    localStorage.setItem("mkbr_seo_title", seoTitle);
    localStorage.setItem("mkbr_seo_desc", seoDesc);
    localStorage.setItem("mkbr_seo_keywords", seoKeywords);
    toast.success("SEO सेटिंग सेव हो गई!");
  };

  const handleExport = (type: string) => {
    toast.success(`${type} Export प्रारंभ हो रहा है...`);
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.includes(memberSearch) ||
      m.district.includes(memberSearch) ||
      m.id.includes(memberSearch),
  );

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      active: "bg-green-100 text-green-700",
      approved: "bg-green-100 text-green-700",
      pending: "bg-amber-100 text-amber-700",
      under_review: "bg-blue-100 text-blue-700",
      rejected: "bg-red-100 text-red-700",
      hold: "bg-gray-100 text-gray-700",
      disbursed: "bg-purple-100 text-purple-700",
    };
    return map[status] || "bg-gray-100 text-gray-700";
  };

  if (!isAuth) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(0.97 0.005 260)" }}
      >
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <div
              className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ background: "oklch(0.28 0.12 260)" }}
            >
              <span className="text-2xl">🔐</span>
            </div>
            <h1
              className="text-2xl font-bold"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              Admin Panel
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
            data-ocid="admin.login.section"
          >
            <div>
              <Label className="text-xs font-semibold">पासवर्ड</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Admin पासवर्ड डालें"
                className="mt-1"
                data-ocid="admin.login.input"
              />
            </div>
            <Button
              className="w-full text-white"
              style={{ background: "oklch(0.28 0.12 260)" }}
              onClick={handleLogin}
              data-ocid="admin.login.submit.primary_button"
            >
              लॉगिन
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.005 260)" }}
    >
      {/* Admin Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div>
          <h1
            className="text-lg font-bold"
            style={{ color: "oklch(0.28 0.12 260)" }}
          >
            Admin Panel
          </h1>
          <p className="text-xs" style={{ color: "oklch(0.48 0.03 260)" }}>
            माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleLogout}
          data-ocid="admin.logout.button"
        >
          लॉगआउट
        </Button>
      </div>

      {/* Stats Row */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
          {[
            { label: "सदस्य", value: stats.totalMembers },
            { label: "परिवार", value: stats.totalFamilies },
            { label: "जनपद", value: stats.activeDistricts },
            { label: "आज नए", value: stats.todayNewMembers },
            { label: "Cases", value: stats.liveCases },
            { label: "Beneficiaries", value: stats.totalBeneficiaries },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl p-3 text-center shadow-xs border border-slate-100"
            >
              <div
                className="text-xl font-bold"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                {s.value.toLocaleString()}
              </div>
              <div
                className="text-xs"
                style={{ color: "oklch(0.48 0.03 260)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="flex gap-1 min-w-max pb-2" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                style={{
                  background:
                    activeTab === tab.id ? "oklch(0.28 0.12 260)" : "white",
                  color:
                    activeTab === tab.id ? "white" : "oklch(0.48 0.03 260)",
                  border: "1px solid oklch(0.9 0.01 260)",
                }}
                onClick={() => setActiveTab(tab.id)}
                data-ocid={`admin.tab.${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mt-2">
          {/* Members Tab */}
          {activeTab === "members" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2
                  className="font-bold"
                  style={{ color: "oklch(0.28 0.12 260)" }}
                >
                  सदस्य सूची ({filteredMembers.length})
                </h2>
                <Input
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  placeholder="नाम / जिला खोजें"
                  className="w-44 text-xs"
                  data-ocid="admin.members.search_input"
                />
              </div>
              <div className="overflow-x-auto">
                <Table data-ocid="admin.members.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">नाम</TableHead>
                      <TableHead className="text-xs">जिला</TableHead>
                      <TableHead className="text-xs">मोबाइल</TableHead>
                      <TableHead className="text-xs">स्थिति</TableHead>
                      <TableHead className="text-xs">कार्रवाई</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((m, i) => (
                      <TableRow
                        key={m.id}
                        data-ocid={`admin.member.row.${i + 1}`}
                      >
                        <TableCell className="text-xs">
                          <div className="font-semibold">{m.name}</div>
                          <div style={{ color: "oklch(0.48 0.03 260)" }}>
                            {m.id}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">{m.district}</TableCell>
                        <TableCell className="text-xs">{m.mobile}</TableCell>
                        <TableCell>
                          <Badge className={statusBadge(m.status)}>
                            {m.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {m.status !== "active" && (
                              <Button
                                size="sm"
                                className="text-xs h-7 text-white"
                                style={{ background: "oklch(0.55 0.15 145)" }}
                                onClick={() => approveMember(m.id)}
                                data-ocid={`admin.member.approve.button.${i + 1}`}
                              >
                                अनुमोदित
                              </Button>
                            )}
                            {m.status !== "rejected" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7 text-red-600 border-red-200"
                                onClick={() => rejectMember(m.id)}
                                data-ocid={`admin.member.reject.button.${i + 1}`}
                              >
                                अस्वीकृत
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div>
              <h2
                className="font-bold mb-3"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                भुगतान सूची ({payments.length})
              </h2>
              <div className="overflow-x-auto">
                <Table data-ocid="admin.payments.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">सदस्य</TableHead>
                      <TableHead className="text-xs">राशि</TableHead>
                      <TableHead className="text-xs">UTR</TableHead>
                      <TableHead className="text-xs">स्थिति</TableHead>
                      <TableHead className="text-xs">कार्रवाई</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((p, i) => (
                      <TableRow
                        key={p.id}
                        data-ocid={`admin.payment.row.${i + 1}`}
                      >
                        <TableCell className="text-xs">
                          <div className="font-semibold">{p.memberName}</div>
                          <div style={{ color: "oklch(0.48 0.03 260)" }}>
                            {p.memberId}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-semibold">
                          ₹{p.amount}
                        </TableCell>
                        <TableCell className="text-xs font-mono">
                          {p.utr}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusBadge(p.status)}>
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            <Button
                              size="sm"
                              className="text-xs h-7"
                              variant="outline"
                              onClick={() => setViewPayment(p)}
                              data-ocid={`admin.payment.view.button.${i + 1}`}
                            >
                              देखें
                            </Button>
                            <Button
                              size="sm"
                              className="text-xs h-7 text-white"
                              style={{ background: "oklch(0.55 0.15 145)" }}
                              onClick={() => approvePayment(p.id)}
                              data-ocid={`admin.payment.approve.button.${i + 1}`}
                            >
                              अनुमोदित
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7 text-red-600"
                              onClick={() => rejectPayment(p.id)}
                              data-ocid={`admin.payment.reject.button.${i + 1}`}
                            >
                              अस्वीकृत
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7"
                              onClick={() => holdPayment(p.id)}
                              data-ocid={`admin.payment.hold.button.${i + 1}`}
                            >
                              Hold
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Cases Tab */}
          {activeTab === "cases" && (
            <div>
              <h2
                className="font-bold mb-3"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                Beneficiary Cases ({cases.length})
              </h2>
              <div className="overflow-x-auto">
                <Table data-ocid="admin.cases.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">सदस्य</TableHead>
                      <TableHead className="text-xs">प्रकार</TableHead>
                      <TableHead className="text-xs">जिला</TableHead>
                      <TableHead className="text-xs">स्थिति</TableHead>
                      <TableHead className="text-xs">कार्रवाई</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cases.map((c, i) => (
                      <TableRow
                        key={c.id}
                        data-ocid={`admin.case.row.${i + 1}`}
                      >
                        <TableCell className="text-xs">
                          <div className="font-semibold">{c.memberName}</div>
                          <div style={{ color: "oklch(0.48 0.03 260)" }}>
                            {c.id}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">{c.type}</TableCell>
                        <TableCell className="text-xs">{c.district}</TableCell>
                        <TableCell>
                          <Select
                            defaultValue={c.status}
                            onValueChange={(v) =>
                              updateCaseStatus(
                                c.id,
                                v as BeneficiaryCase["status"],
                              )
                            }
                          >
                            <SelectTrigger
                              className="h-7 text-xs w-32"
                              data-ocid={`admin.case.status.select.${i + 1}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "pending",
                                "under_review",
                                "approved",
                                "rejected",
                                "disbursed",
                              ].map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7"
                            onClick={() => setViewCase(c)}
                            data-ocid={`admin.case.view.button.${i + 1}`}
                          >
                            विवरण
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Districts Tab */}
          {activeTab === "districts" && (
            <div>
              <h2
                className="font-bold mb-3"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                जिला प्रबंधन
              </h2>
              <div className="flex gap-3 mb-4">
                <Input
                  value={newDistrictName}
                  onChange={(e) => setNewDistrictName(e.target.value)}
                  placeholder="जिला नाम"
                  className="text-xs"
                  data-ocid="admin.district.name.input"
                />
                <Input
                  value={newDistrictCode}
                  onChange={(e) => setNewDistrictCode(e.target.value)}
                  placeholder="कोड"
                  className="text-xs w-24"
                  data-ocid="admin.district.code.input"
                />
                <Button
                  className="text-white text-xs"
                  style={{ background: "oklch(0.28 0.12 260)" }}
                  onClick={() => {
                    toast.success("जिला जोड़ा गया!");
                    setNewDistrictName("");
                    setNewDistrictCode("");
                  }}
                  data-ocid="admin.district.add.primary_button"
                >
                  जोड़ें
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table data-ocid="admin.districts.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">जिला</TableHead>
                      <TableHead className="text-xs">सदस्य</TableHead>
                      <TableHead className="text-xs">Telegram</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {districts.slice(0, 10).map((d, i) => (
                      <TableRow
                        key={d.id}
                        data-ocid={`admin.district.row.${i + 1}`}
                      >
                        <TableCell className="text-xs font-semibold">
                          {d.name}
                        </TableCell>
                        <TableCell className="text-xs">
                          {d.memberCount}
                        </TableCell>
                        <TableCell className="text-xs text-blue-600 truncate max-w-32">
                          {d.telegramLink}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* CMS Tab */}
          {activeTab === "cms" && (
            <div className="space-y-4">
              <h2
                className="font-bold"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                CMS सेटिंग
              </h2>
              <div
                className="p-4 rounded-xl border"
                style={{
                  background: "oklch(0.98 0.01 55)",
                  borderColor: "oklch(0.68 0.18 55)",
                }}
              >
                <Label
                  className="text-xs font-bold"
                  style={{ color: "oklch(0.68 0.18 55)" }}
                >
                  💳 UPI ID सेटिंग
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={upiInput}
                    onChange={(e) => setUpiInput(e.target.value)}
                    className="font-mono"
                    data-ocid="admin.cms.upi_id.input"
                  />
                  <Button
                    className="text-white"
                    style={{ background: "oklch(0.68 0.18 55)" }}
                    onClick={saveCMS}
                    data-ocid="admin.cms.save.primary_button"
                  >
                    सेव
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label className="text-xs font-semibold">
                    जिला Telegram Link
                  </Label>
                  <Input
                    value={telegramDistrict}
                    onChange={(e) => setTelegramDistrict(e.target.value)}
                    className="mt-1 text-xs"
                    data-ocid="admin.cms.telegram_district.input"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">
                    राज्य Channel Link
                  </Label>
                  <Input
                    value={telegramState}
                    onChange={(e) => setTelegramState(e.target.value)}
                    className="mt-1 text-xs"
                    data-ocid="admin.cms.telegram_state.input"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">
                    National Channel Link
                  </Label>
                  <Input
                    value={telegramNational}
                    onChange={(e) => setTelegramNational(e.target.value)}
                    className="mt-1 text-xs"
                    data-ocid="admin.cms.telegram_national.input"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">WhatsApp Link</Label>
                  <Input
                    value={whatsappLink}
                    onChange={(e) => setWhatsappLink(e.target.value)}
                    className="mt-1 text-xs"
                    data-ocid="admin.cms.whatsapp.input"
                  />
                </div>
              </div>
              <Button
                className="text-white"
                style={{ background: "oklch(0.28 0.12 260)" }}
                onClick={() => toast.success("सभी Links सेव हो गईं!")}
                data-ocid="admin.cms.save_links.primary_button"
              >
                सभी Links सेव करें
              </Button>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === "templates" && (
            <div className="space-y-4">
              <h2
                className="font-bold"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                Document Templates
              </h2>
              {[
                {
                  title: "ID Card Template",
                  text: "सदस्य ID, नाम, पिता नाम, जिला, मोबाइल, Aadhaar last 4, सदस्यता तिथि, परिवार संख्या, QR, संस्थापक हस्ताक्षर",
                },
                {
                  title: "Certificate Template",
                  text: "यह मंच स्वर्गीय माता कल्पना बाजपेई जी की सेवा, करुणा, गरीबों एवं असहायों की सहायता की प्रेरणा से स्थापित किया गया है।",
                },
                {
                  title: "Appointment Letter Template",
                  text: "आपको माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट में {role} पद पर नियुक्त किया जाता है।",
                },
              ].map((t, i) => (
                <div
                  key={t.title}
                  className="border rounded-xl p-4"
                  style={{ borderColor: "oklch(0.9 0.01 260)" }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: "oklch(0.28 0.12 260)" }}
                    >
                      {t.title}
                    </h3>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText(t.text);
                        toast.success("कॉपी हुआ!");
                      }}
                      data-ocid={`admin.template.copy.button.${i + 1}`}
                    >
                      कॉपी
                    </Button>
                  </div>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.48 0.03 260)" }}
                  >
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-5">
              <h2
                className="font-bold"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                Analytics Dashboard
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "कुल सदस्य", value: stats.totalMembers },
                  { label: "आज नए सदस्य", value: stats.todayNewMembers },
                  { label: "सक्रिय जनपद", value: stats.activeDistricts },
                  { label: "कुल यात्रा", value: stats.totalVisitors },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white rounded-xl p-3 border border-slate-100 text-center"
                  >
                    <div
                      className="text-xl font-bold"
                      style={{ color: "oklch(0.68 0.18 55)" }}
                    >
                      {s.value.toLocaleString()}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "oklch(0.48 0.03 260)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "oklch(0.28 0.12 260)" }}
                >
                  भुगतान रुझान (7 दिन)
                </h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={PAYMENT_TREND}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar
                      dataKey="amount"
                      fill="oklch(0.68 0.18 55)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "oklch(0.28 0.12 260)" }}
                >
                  सदस्य वृद्धि (7 दिन)
                </h3>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={MEMBER_JOINS}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="joins"
                      stroke="oklch(0.28 0.12 260)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === "seo" && (
            <div className="space-y-4">
              <h2
                className="font-bold"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                SEO सेटिंग
              </h2>
              <div>
                <Label className="text-xs font-semibold">शीर्षक (Title)</Label>
                <Input
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="mt-1"
                  data-ocid="admin.seo.title.input"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">
                  विवरण (Description)
                </Label>
                <Input
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  className="mt-1"
                  data-ocid="admin.seo.desc.input"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">
                  कीवर्ड (Keywords)
                </Label>
                <Input
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  className="mt-1"
                  data-ocid="admin.seo.keywords.input"
                />
              </div>
              <Button
                className="text-white"
                style={{ background: "oklch(0.28 0.12 260)" }}
                onClick={saveSEO}
                data-ocid="admin.seo.save.primary_button"
              >
                SEO सेव करें
              </Button>
            </div>
          )}

          {/* Legal Docs Tab */}
          {activeTab === "legal" && (
            <div className="space-y-4">
              <h2
                className="font-bold"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                Legal Documents
              </h2>
              {[
                { title: "Trust Deed (ट्रस्ट डीड)" },
                { title: "Audit Documents (ऑडिट दस्तावेज़)" },
                { title: "Registration Certificate (पंजीकरण प्रमाणपत्र)" },
              ].map((doc, i) => (
                <div
                  key={doc.title}
                  className="flex items-center justify-between p-4 rounded-xl border"
                  style={{ borderColor: "oklch(0.9 0.01 260)" }}
                >
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "oklch(0.28 0.12 260)" }}
                    >
                      {doc.title}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.48 0.03 260)" }}
                    >
                      अपलोड करें (PDF)
                    </p>
                  </div>
                  <Input
                    type="file"
                    className="w-36 text-xs"
                    data-ocid={`admin.legal.upload.button.${i + 1}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Export Tab */}
          {activeTab === "export" && (
            <div className="space-y-3">
              <h2
                className="font-bold"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                Export / रिपोर्ट
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "सदस्य सूची (Members)",
                  "परिवार सूची (Families)",
                  "भुगतान रिपोर्ट (Payments)",
                  "Beneficiary Cases",
                  "जिला रिपोर्ट (District)",
                ].map((label, i) => (
                  <div
                    key={label}
                    className="flex items-center justify-between p-3 rounded-xl border"
                    style={{ borderColor: "oklch(0.9 0.01 260)" }}
                  >
                    <span
                      className="text-sm"
                      style={{ color: "oklch(0.28 0.12 260)" }}
                    >
                      {label}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="text-xs text-white"
                        style={{ background: "oklch(0.28 0.12 260)" }}
                        onClick={() => handleExport(`${label} PDF`)}
                        data-ocid={`admin.export.pdf.button.${i + 1}`}
                      >
                        PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => handleExport(`${label} Excel`)}
                        data-ocid={`admin.export.excel.button.${i + 1}`}
                      >
                        Excel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QR Batches Tab */}
          {activeTab === "qr" && (
            <div className="space-y-4">
              <h2
                className="font-bold"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                QR Batch सेटिंग
              </h2>
              <div className="flex items-end gap-3">
                <div>
                  <Label className="text-xs font-semibold">
                    डिफ़ॉल्ट Batch आकार
                  </Label>
                  <Input
                    type="number"
                    defaultValue={10}
                    className="mt-1 w-24"
                    data-ocid="admin.qr.batch_size.input"
                  />
                </div>
                <Button
                  className="text-white"
                  style={{ background: "oklch(0.68 0.18 55)" }}
                  onClick={() => toast.success("नया QR Batch बनाया!")}
                  data-ocid="admin.qr.new_batch.primary_button"
                >
                  नया Batch
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="border rounded-xl p-3 text-center"
                    style={{ borderColor: "oklch(0.9 0.01 260)" }}
                    data-ocid={`admin.qr.batch.item.${n}`}
                  >
                    <div
                      className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center font-bold text-sm"
                      style={{
                        background: "oklch(0.97 0.005 260)",
                        border: "1px dashed oklch(0.9 0.01 260)",
                      }}
                    >
                      QR {n}
                    </div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "oklch(0.28 0.12 260)" }}
                    >
                      Batch #{n}
                    </p>
                    <Badge className="bg-blue-100 text-blue-700 text-xs">
                      सक्रिय
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Detail Modal */}
      <Dialog open={!!viewPayment} onOpenChange={() => setViewPayment(null)}>
        <DialogContent data-ocid="admin.payment_detail.dialog">
          <DialogHeader>
            <DialogTitle>भुगतान विवरण</DialogTitle>
          </DialogHeader>
          {viewPayment && (
            <div className="space-y-2 text-sm">
              {Object.entries(viewPayment).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span style={{ color: "oklch(0.48 0.03 260)" }}>{k}:</span>
                  <span className="font-semibold">{String(v)}</span>
                </div>
              ))}
            </div>
          )}
          <Button
            onClick={() => setViewPayment(null)}
            variant="outline"
            data-ocid="admin.payment_detail.close_button"
          >
            बंद करें
          </Button>
        </DialogContent>
      </Dialog>

      {/* Case Detail Modal */}
      <Dialog open={!!viewCase} onOpenChange={() => setViewCase(null)}>
        <DialogContent data-ocid="admin.case_detail.dialog">
          <DialogHeader>
            <DialogTitle>Case विवरण</DialogTitle>
          </DialogHeader>
          {viewCase && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>Case ID:</strong> {viewCase.id}
              </p>
              <p>
                <strong>सदस्य:</strong> {viewCase.memberName}
              </p>
              <p>
                <strong>प्रकार:</strong> {viewCase.type}
              </p>
              <p>
                <strong>स्थिति:</strong> {viewCase.status}
              </p>
              <p>
                <strong>जिला:</strong> {viewCase.district}
              </p>
              <div>
                <strong>विवरण:</strong>
                {Object.entries(viewCase.details).map(([k, v]) => (
                  <p
                    key={k}
                    className="text-xs ml-2"
                    style={{ color: "oklch(0.48 0.03 260)" }}
                  >
                    {k}: {v}
                  </p>
                ))}
              </div>
            </div>
          )}
          <Button
            onClick={() => setViewCase(null)}
            variant="outline"
            data-ocid="admin.case_detail.close_button"
          >
            बंद करें
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
