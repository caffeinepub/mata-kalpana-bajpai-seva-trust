import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DEFAULT_TRUST_UPI_ID, UP_DISTRICTS } from "../constants";
import type {
  AppStats,
  BeneficiaryCase,
  DistrictInfo,
  MemberProfile,
  PaymentRecord,
} from "../types";

interface AppContextType {
  currentMember: MemberProfile | null;
  setCurrentMember: (member: MemberProfile | null) => void;
  members: MemberProfile[];
  setMembers: (members: MemberProfile[]) => void;
  payments: PaymentRecord[];
  setPayments: (payments: PaymentRecord[]) => void;
  cases: BeneficiaryCase[];
  setCases: (cases: BeneficiaryCase[]) => void;
  stats: AppStats;
  districts: DistrictInfo[];
  setDistricts: (districts: DistrictInfo[]) => void;
  showCommunityPopup: boolean;
  setShowCommunityPopup: (show: boolean) => void;
  pendingMemberId: string | null;
  setPendingMemberId: (id: string | null) => void;
  // UPI ID - admin configurable
  trustUpiId: string;
  setTrustUpiId: (id: string) => void;
  // Language
  language: "hi" | "en";
  setLanguage: (lang: "hi" | "en") => void;
  // Photo helper
  getPhotoUrl: (hash?: string) => string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/** Returns a usable image URL from a stored hash/url, or null if unavailable */
export function getPhotoUrl(hash?: string): string | null {
  if (!hash) return null;
  if (
    hash.startsWith("http://") ||
    hash.startsWith("https://") ||
    hash.startsWith("/")
  ) {
    return hash;
  }
  // data URIs (from camera/file input stored as base64)
  if (hash.startsWith("data:")) return hash;
  return null;
}

const generateMockMembers = (): MemberProfile[] => [
  {
    id: "MKBR-2024-001",
    memberCode: "MKBR-2024-001",
    name: "रामेश्वर प्रसाद",
    fatherName: "शिवनाथ प्रसाद",
    mobile: "9876543210",
    age: 45,
    district: "लखनऊ",
    block: "मलिहाबाद",
    address: "ग्राम पोस्ट मलिहाबाद, लखनऊ",
    aadhaar: "XXXX-XXXX-1234",
    status: "active",
    joiningDate: "2024-01-15",
    role: "member",
    familyMembers: [
      {
        id: "FM-001",
        name: "सीता देवी",
        age: 40,
        relation: "पत्नी",
        aadhaar: "XXXX-XXXX-5678",
        address: "समान",
        fatherName: "रामलाल",
      },
    ],
    paymentStatus: "paid",
    totalAmount: 220,
    districtCode: "LKO",
    blockCode: "MLH",
  },
  {
    id: "MKBR-2024-002",
    memberCode: "MKBR-2024-002",
    name: "सुनीता देवी",
    fatherName: "मोहन लाल",
    mobile: "8765432109",
    age: 38,
    district: "वाराणसी",
    block: "सेवापुरी",
    address: "ग्राम खजुरी, वाराणसी",
    aadhaar: "XXXX-XXXX-2345",
    status: "pending",
    joiningDate: "2024-02-20",
    role: "member",
    familyMembers: [],
    paymentStatus: "pending",
    totalAmount: 110,
    districtCode: "VNS",
    blockCode: "SEV",
  },
  {
    id: "MKBR-2024-003",
    memberCode: "MKBR-2024-003",
    name: "अजय कुमार",
    fatherName: "राजेश कुमार",
    mobile: "7654321098",
    age: 52,
    district: "आगरा",
    block: "खेरागढ़",
    address: "ताज नगर, आगरा",
    aadhaar: "XXXX-XXXX-3456",
    status: "active",
    joiningDate: "2024-03-10",
    role: "district_officer",
    familyMembers: [
      {
        id: "FM-003",
        name: "प्रिया कुमारी",
        age: 24,
        relation: "पुत्री",
        aadhaar: "XXXX-XXXX-7890",
        address: "समान",
        fatherName: "अजय कुमार",
      },
      {
        id: "FM-004",
        name: "विकास कुमार",
        age: 22,
        relation: "पुत्र",
        aadhaar: "XXXX-XXXX-8901",
        address: "समान",
        fatherName: "अजय कुमार",
      },
    ],
    paymentStatus: "paid",
    totalAmount: 330,
    districtCode: "AGR",
    blockCode: "KHG",
  },
];

const generateMockPayments = (): PaymentRecord[] => [
  {
    id: "PAY-001",
    memberId: "MKBR-2024-001",
    memberName: "रामेश्वर प्रसाद",
    amount: 220,
    utr: "UTR123456789012",
    paymentDate: "2024-01-15",
    status: "approved",
    submittedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "PAY-002",
    memberId: "MKBR-2024-002",
    memberName: "सुनीता देवी",
    amount: 110,
    utr: "UTR234567890123",
    paymentDate: "2024-02-20",
    status: "pending",
    submittedAt: "2024-02-20T14:00:00Z",
  },
  {
    id: "PAY-003",
    memberId: "MKBR-2024-003",
    memberName: "अजय कुमार",
    amount: 330,
    utr: "UTR345678901234",
    paymentDate: "2024-03-10",
    status: "approved",
    submittedAt: "2024-03-10T09:15:00Z",
  },
];

const generateMockCases = (): BeneficiaryCase[] => [
  {
    id: "CASE-001",
    memberId: "MKBR-2024-001",
    memberName: "रामेश्वर प्रसाद",
    type: "bimari",
    status: "under_review",
    submittedAt: "2024-03-15T12:00:00Z",
    district: "लखनऊ",
    details: {
      patientName: "रामेश्वर प्रसाद",
      diagnosis: "हृदय रोग",
      hospital: "किंग जॉर्ज मेडिकल यूनिवर्सिटी",
      estimatedAmount: "₹50,000",
    },
    urgency: true,
  },
  {
    id: "CASE-002",
    memberId: "MKBR-2024-003",
    memberName: "अजय कुमार",
    type: "mrityu",
    status: "approved",
    submittedAt: "2024-02-28T08:00:00Z",
    district: "आगरा",
    details: {
      deceasedName: "राजेश कुमार",
      relation: "पिता",
      nomineeName: "अजय कुमार",
    },
  },
];

const generateDistrictData = (): DistrictInfo[] =>
  UP_DISTRICTS.slice(0, 20).map((name, i) => ({
    id: `DIST-${i + 1}`,
    name,
    code: name.substring(0, 3).toUpperCase(),
    memberCount: Math.floor(Math.random() * 200) + 50,
    blockCount: Math.floor(Math.random() * 10) + 5,
    telegramLink: "https://t.me/mkbrseva",
    whatsappLink: "https://wa.me/mkbrseva",
  }));

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentMember, setCurrentMember] = useState<MemberProfile | null>(
    () => {
      const saved = localStorage.getItem("mkbr_current_member");
      return saved ? JSON.parse(saved) : null;
    },
  );
  const [members, setMembersState] = useState<MemberProfile[]>(() => {
    const saved = localStorage.getItem("mkbr_members");
    return saved ? JSON.parse(saved) : generateMockMembers();
  });
  const [payments, setPaymentsState] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem("mkbr_payments");
    return saved ? JSON.parse(saved) : generateMockPayments();
  });
  const [cases, setCasesState] = useState<BeneficiaryCase[]>(() => {
    const saved = localStorage.getItem("mkbr_cases");
    return saved ? JSON.parse(saved) : generateMockCases();
  });
  const [districts] = useState<DistrictInfo[]>(generateDistrictData);
  const [showCommunityPopup, setShowCommunityPopup] = useState(false);
  const [pendingMemberId, setPendingMemberId] = useState<string | null>(null);

  const [trustUpiId, setTrustUpiIdState] = useState<string>(() => {
    return localStorage.getItem("mkbr_upi_id") || DEFAULT_TRUST_UPI_ID;
  });

  const [language, setLanguageState] = useState<"hi" | "en">(() => {
    return (localStorage.getItem("mkbr_language") as "hi" | "en") || "hi";
  });

  const setTrustUpiId = (id: string) => {
    setTrustUpiIdState(id);
    localStorage.setItem("mkbr_upi_id", id);
  };

  const setLanguage = (lang: "hi" | "en") => {
    setLanguageState(lang);
    localStorage.setItem("mkbr_language", lang);
  };

  const setMembers = (m: MemberProfile[]) => {
    setMembersState(m);
    localStorage.setItem("mkbr_members", JSON.stringify(m));
  };

  const setPayments = (p: PaymentRecord[]) => {
    setPaymentsState(p);
    localStorage.setItem("mkbr_payments", JSON.stringify(p));
  };

  const setCases = (c: BeneficiaryCase[]) => {
    setCasesState(c);
    localStorage.setItem("mkbr_cases", JSON.stringify(c));
  };

  useEffect(() => {
    if (currentMember) {
      localStorage.setItem(
        "mkbr_current_member",
        JSON.stringify(currentMember),
      );
    } else {
      localStorage.removeItem("mkbr_current_member");
    }
  }, [currentMember]);

  const stats: AppStats = {
    totalMembers: members.length + 1247,
    totalFamilies:
      members.reduce((acc, m) => acc + m.familyMembers.length, 0) + 3421,
    activeDistricts: 75,
    activeBlocks: 826,
    todayNewMembers: 47,
    totalBeneficiaries:
      cases.filter((c) => c.status === "approved" || c.status === "disbursed")
        .length + 312,
    totalVisitors: 28543,
    activeAdmins: 156,
    liveCases:
      cases.filter((c) => c.status === "under_review" || c.status === "pending")
        .length + 23,
  };

  return (
    <AppContext.Provider
      value={{
        currentMember,
        setCurrentMember,
        members,
        setMembers,
        payments,
        setPayments,
        cases,
        setCases,
        stats,
        districts,
        setDistricts: () => {},
        showCommunityPopup,
        setShowCommunityPopup,
        pendingMemberId,
        setPendingMemberId,
        trustUpiId,
        setTrustUpiId,
        language,
        setLanguage,
        getPhotoUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
