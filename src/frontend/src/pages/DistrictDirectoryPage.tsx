import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import { UP_DISTRICTS } from "../constants";
import { useApp } from "../context/AppContext";

const ROLES = ["सभी", "जिला अध्यक्ष", "ब्लॉक अध्यक्ष", "सदस्य"];

const ROLE_MAP: Record<string, string> = {
  district_officer: "जिला अध्यक्ष",
  block_officer: "ब्लॉक अध्यक्ष",
  member: "सदस्य",
  admin: "Admin",
  state_officer: "राज्य अधिकारी",
};

const ROLE_COLORS: Record<string, string> = {
  district_officer: "oklch(0.68 0.18 55)",
  block_officer: "oklch(0.28 0.12 260)",
  member: "oklch(0.55 0.15 145)",
  admin: "oklch(0.55 0.2 25)",
  state_officer: "oklch(0.6 0.18 310)",
};

// Mock officers data
const MOCK_OFFICERS = UP_DISTRICTS.slice(0, 15).map((district, i) => ({
  id: `OFF-${i + 1}`,
  name: [
    "रामस्वरूप यादव",
    "शिवकुमार मिश्र",
    "प्रिया वर्मा",
    "सुरेन्द्र सिंह",
    "कमला देवी",
    "विनोद शर्मा",
    "रेखा गुप्ता",
    "अजय पांडेय",
    "दीपक रावत",
    "संगीता तिवारी",
    "रविशंकर शुक्ल",
    "नीरज सिंह",
    "আরতী দেবী",
    "हरीश वर्मा",
    "सुनील तिवारी",
  ][i],
  district,
  block: ["सदर", "तहसील", "ग्रामीण", "नगर"][i % 4],
  role: ["district_officer", "block_officer", "member"][i % 3] as
    | "district_officer"
    | "block_officer"
    | "member",
  mobile: `98${String(i).padStart(2, "0")}XXXX10`,
  joinDate: `2024-0${(i % 9) + 1}-15`,
}));

export default function DistrictDirectoryPage() {
  const { language } = useApp();
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchBlock, setSearchBlock] = useState("");
  const [searchRole, setSearchRole] = useState("सभी");
  const [searchName, setSearchName] = useState("");

  const filtered = useMemo(() => {
    return MOCK_OFFICERS.filter((o) => {
      if (
        searchDistrict &&
        searchDistrict !== "all" &&
        o.district !== searchDistrict
      )
        return false;
      if (searchBlock && !o.block.includes(searchBlock)) return false;
      if (searchRole !== "सभी" && ROLE_MAP[o.role] !== searchRole) return false;
      if (searchName && !o.name.includes(searchName)) return false;
      return true;
    });
  }, [searchDistrict, searchBlock, searchRole, searchName]);

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "oklch(0.28 0.12 260)" }}
        >
          {language === "hi" ? "जिला निर्देशिका" : "District Directory"}
        </h1>
        <p className="text-xs mb-6" style={{ color: "oklch(0.48 0.03 260)" }}>
          जिला, ब्लॉक और पद के अनुसार पदाधिकारी खोजें
        </p>

        {/* Search Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <Select value={searchDistrict} onValueChange={setSearchDistrict}>
                <SelectTrigger data-ocid="directory.district.select">
                  <SelectValue placeholder="जिला" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">सभी जिले</SelectItem>
                  {UP_DISTRICTS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                value={searchBlock}
                onChange={(e) => setSearchBlock(e.target.value)}
                placeholder="ब्लॉक"
                data-ocid="directory.block.input"
              />
            </div>
            <div>
              <Select value={searchRole} onValueChange={setSearchRole}>
                <SelectTrigger data-ocid="directory.role.select">
                  <SelectValue placeholder="पद" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="नाम खोजें"
                data-ocid="directory.name.search_input"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div
              className="col-span-full text-center py-10"
              style={{ color: "oklch(0.48 0.03 260)" }}
              data-ocid="directory.officers.empty_state"
            >
              कोई पदाधिकारी नहीं मिला
            </div>
          ) : (
            filtered.map((officer, i) => (
              <div
                key={officer.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:-translate-y-0.5 hover:shadow-md transition-all"
                data-ocid={`directory.officer.item.${i + 1}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{
                      background:
                        ROLE_COLORS[officer.role] || "oklch(0.28 0.12 260)",
                    }}
                  >
                    {officer.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "oklch(0.28 0.12 260)" }}
                    >
                      {officer.name}
                    </p>
                    <Badge
                      className="text-white text-xs"
                      style={{ background: ROLE_COLORS[officer.role] }}
                    >
                      {ROLE_MAP[officer.role]}
                    </Badge>
                  </div>
                </div>
                <div
                  className="space-y-1 text-xs"
                  style={{ color: "oklch(0.48 0.03 260)" }}
                >
                  <div className="flex justify-between">
                    <span>जिला:</span>
                    <span
                      className="font-medium"
                      style={{ color: "oklch(0.28 0.12 260)" }}
                    >
                      {officer.district}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>ब्लॉक:</span>
                    <span
                      className="font-medium"
                      style={{ color: "oklch(0.28 0.12 260)" }}
                    >
                      {officer.block}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>मोबाइल:</span>
                    <span className="font-mono">{officer.mobile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>सदस्यता:</span>
                    <span>{officer.joinDate}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-3 text-xs text-white"
                  style={{ background: "oklch(0.68 0.18 55)" }}
                  data-ocid={`directory.officer.join.button.${i + 1}`}
                >
                  जुड़ें
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
