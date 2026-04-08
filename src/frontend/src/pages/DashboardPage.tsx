import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import { ChevronDown, CreditCard, FileText, User } from "lucide-react";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";

export default function DashboardPage() {
  const { currentMember, payments, cases, language } = useApp();

  if (!currentMember) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: "oklch(0.48 0.03 260)" }}>
            कृपया पहले लॉगिन करें
          </p>
          <Link to="/login">
            <Button
              style={{ background: "oklch(0.28 0.12 260)" }}
              className="text-white"
              data-ocid="dashboard.login.button"
            >
              लॉगिन
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const memberPayments = payments.filter(
    (p) => p.memberId === currentMember.id,
  );
  const memberCases = cases.filter((c) => c.memberId === currentMember.id);

  const statusColor = {
    active: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
    rejected: "bg-red-100 text-red-700",
  };

  const caseTypeLabel: Record<string, string> = {
    mrityu: "मृत्यु सहायता",
    bimari: "बीमारी सहायता",
    accident: "दुर्घटना सहायता",
    vivah: "पुत्री विवाह",
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1
          className="text-2xl font-bold mb-6"
          style={{ color: "oklch(0.28 0.12 260)" }}
        >
          {language === "hi" ? "डैशबोर्ड" : "Dashboard"}
        </h1>

        {/* Profile Card */}
        <div
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-5"
          data-ocid="dashboard.profile.card"
        >
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{ background: "oklch(0.97 0.005 260)" }}
            >
              <User
                className="w-8 h-8"
                style={{ color: "oklch(0.28 0.12 260)" }}
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2
                  className="text-lg font-bold"
                  style={{ color: "oklch(0.28 0.12 260)" }}
                >
                  {currentMember.name}
                </h2>
                <Badge className={statusColor[currentMember.status]}>
                  {currentMember.status === "active"
                    ? "सक्रिय"
                    : currentMember.status === "pending"
                      ? "अनुमोदन लंबित"
                      : "अस्वीकृत"}
                </Badge>
              </div>
              <p
                className="text-xs mb-0.5"
                style={{ color: "oklch(0.48 0.03 260)" }}
              >
                सदस्य ID: {currentMember.id}
              </p>
              <p
                className="text-xs mb-0.5"
                style={{ color: "oklch(0.48 0.03 260)" }}
              >
                जिला: {currentMember.district} • ब्लॉक: {currentMember.block}
              </p>
              <p
                className="text-xs mb-0.5"
                style={{ color: "oklch(0.48 0.03 260)" }}
              >
                मोबाइल: {currentMember.mobile} • सदस्यता तिथि:{" "}
                {currentMember.joiningDate}
              </p>
              <p className="text-xs" style={{ color: "oklch(0.48 0.03 260)" }}>
                भूमिका: {currentMember.role}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Link to="/id-card">
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                data-ocid="dashboard.idcard.button"
              >
                <CreditCard className="w-3.5 h-3.5 mr-1" /> ID Card डाउनलोड
              </Button>
            </Link>
            <Link to="/certificate">
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                data-ocid="dashboard.certificate.button"
              >
                <FileText className="w-3.5 h-3.5 mr-1" /> प्रमाणपत्र डाउनलोड
              </Button>
            </Link>
            {currentMember.role !== "member" && (
              <Link to="/appointment">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  data-ocid="dashboard.appointment.button"
                >
                  <FileText className="w-3.5 h-3.5 mr-1" /> नियुक्ति पत्र
                </Button>
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="text-xs text-white"
                  style={{ background: "oklch(0.68 0.18 55)" }}
                  data-ocid="dashboard.apply_sahayata.dropdown_menu"
                >
                  सहायता आवेदन <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/apply/mrityu">मृत्यु सहायता</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/apply/bimari">बीमारी सहायता</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/apply/accident">दुर्घटना सहायता</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/apply/putri-vivah">पुत्री विवाह</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Family Members */}
        {currentMember.familyMembers.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
            <h3
              className="font-bold mb-3"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              परिवार सदस्य ({currentMember.familyMembers.length})
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">नाम</TableHead>
                  <TableHead className="text-xs">आयु</TableHead>
                  <TableHead className="text-xs">संबंध</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentMember.familyMembers.map((fm, i) => (
                  <TableRow
                    key={fm.id}
                    data-ocid={`dashboard.family.item.${i + 1}`}
                  >
                    <TableCell className="text-xs font-medium">
                      {fm.name}
                    </TableCell>
                    <TableCell className="text-xs">{fm.age}</TableCell>
                    <TableCell className="text-xs">{fm.relation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Payment History */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5">
          <h3
            className="font-bold mb-3"
            style={{ color: "oklch(0.28 0.12 260)" }}
          >
            भुगतान इतिहास
          </h3>
          {memberPayments.length === 0 ? (
            <p
              className="text-xs text-center py-4"
              style={{ color: "oklch(0.48 0.03 260)" }}
              data-ocid="dashboard.payments.empty_state"
            >
              कोई भुगतान नहीं
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">तिथि</TableHead>
                  <TableHead className="text-xs">राशि</TableHead>
                  <TableHead className="text-xs">UTR</TableHead>
                  <TableHead className="text-xs">स्थिति</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberPayments.map((p, i) => (
                  <TableRow
                    key={p.id}
                    data-ocid={`dashboard.payment.item.${i + 1}`}
                  >
                    <TableCell className="text-xs">{p.paymentDate}</TableCell>
                    <TableCell className="text-xs font-semibold">
                      ₹{p.amount}
                    </TableCell>
                    <TableCell className="text-xs font-mono">{p.utr}</TableCell>
                    <TableCell className="text-xs">
                      <Badge
                        className={
                          p.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : p.status === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                        }
                      >
                        {p.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Active Cases */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3
            className="font-bold mb-3"
            style={{ color: "oklch(0.28 0.12 260)" }}
          >
            सक्रिय आवेदन
          </h3>
          {memberCases.length === 0 ? (
            <p
              className="text-xs text-center py-4"
              style={{ color: "oklch(0.48 0.03 260)" }}
              data-ocid="dashboard.cases.empty_state"
            >
              कोई सक्रिय आवेदन नहीं
            </p>
          ) : (
            <div className="space-y-2">
              {memberCases.map((c, i) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: "oklch(0.97 0.005 260)" }}
                  data-ocid={`dashboard.case.item.${i + 1}`}
                >
                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "oklch(0.28 0.12 260)" }}
                    >
                      {caseTypeLabel[c.type]}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.48 0.03 260)" }}
                    >
                      {c.submittedAt.split("T")[0]}
                    </p>
                  </div>
                  <Badge
                    className={
                      c.status === "approved" || c.status === "disbursed"
                        ? "bg-green-100 text-green-700"
                        : c.status === "under_review"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                    }
                  >
                    {c.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
