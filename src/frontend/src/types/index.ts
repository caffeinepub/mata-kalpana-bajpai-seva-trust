export interface MemberProfile {
  id: string;
  name: string;
  fatherName: string;
  mobile: string;
  age: number;
  district: string;
  block: string;
  address: string;
  aadhaar: string;
  aadhaarFrontHash?: string;
  aadhaarBackHash?: string;
  photoHash?: string;
  status: "pending" | "active" | "rejected";
  joiningDate: string;
  role:
    | "member"
    | "district_officer"
    | "block_officer"
    | "state_officer"
    | "admin";
  familyMembers: FamilyMember[];
  paymentStatus: "pending" | "paid" | "rejected";
  totalAmount: number;
  memberCode: string;
  districtCode: string;
  blockCode: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relation: string;
  aadhaar: string;
  aadhaarFrontHash?: string;
  aadhaarBackHash?: string;
  photoHash?: string;
  address: string;
  fatherName: string;
}

export interface PaymentRecord {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  utr: string;
  paymentDate: string;
  screenshotHash?: string;
  status: "pending" | "approved" | "rejected" | "hold";
  submittedAt: string;
  adminNote?: string;
}

export interface BeneficiaryCase {
  id: string;
  memberId: string;
  memberName: string;
  type: "mrityu" | "bimari" | "accident" | "vivah";
  status: "pending" | "under_review" | "approved" | "rejected" | "disbursed";
  submittedAt: string;
  district: string;
  details: Record<string, string>;
  urgency?: boolean;
}

export interface DistrictInfo {
  id: string;
  name: string;
  code: string;
  memberCount: number;
  telegramLink?: string;
  whatsappLink?: string;
  activeOfficer?: string;
  blockCount: number;
}

export interface AppStats {
  totalMembers: number;
  totalFamilies: number;
  activeDistricts: number;
  activeBlocks: number;
  todayNewMembers: number;
  totalBeneficiaries: number;
  totalVisitors: number;
  activeAdmins: number;
  liveCases: number;
}
