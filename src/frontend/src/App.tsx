import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import CommunityPopup from "./components/CommunityPopup";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";

import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import { AccidentPage, BimariPage, MrityuPage } from "./pages/ApplyPages";
import AppointmentPage from "./pages/AppointmentPage";
import CertificatePage from "./pages/CertificatePage";
import DashboardPage from "./pages/DashboardPage";
import DistrictDirectoryPage from "./pages/DistrictDirectoryPage";
import HomePage from "./pages/HomePage";
import IDCardPage from "./pages/IDCardPage";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import PutriVivahPage from "./pages/PutriVivahPage";
import QRRotationPage from "./pages/QRRotationPage";
import RegisterPage from "./pages/RegisterPage";
import TermsPage from "./pages/TermsPage";

// Layout component
function RootLayout() {
  return (
    <AppProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <CommunityPopup />
      <Toaster richColors position="top-right" />
    </AppProvider>
  );
}

// Routes
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment",
  component: PaymentPage,
  validateSearch: (search: Record<string, unknown>) => ({
    memberId: String(search.memberId || ""),
    amount: String(search.amount || "110"),
  }),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const idCardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/id-card",
  component: IDCardPage,
});

const certificateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/certificate",
  component: CertificatePage,
});

const appointmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/appointment",
  component: AppointmentPage,
});

const mrityuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/apply/mrityu",
  component: MrityuPage,
});

const bimariRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/apply/bimari",
  component: BimariPage,
});

const accidentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/apply/accident",
  component: AccidentPage,
});

const putriVivahRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/apply/putri-vivah",
  component: PutriVivahPage,
});

const qrRotationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/qr-rotation",
  component: QRRotationPage,
});

const districtDirectoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/district-directory",
  component: DistrictDirectoryPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-trust-navy mb-4">संपर्क करें</h1>
        <p className="text-gray-600">हेल्पलाइन: 1800-XXX-XXXX</p>
      </div>
    </div>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  registerRoute,
  paymentRoute,
  loginRoute,
  dashboardRoute,
  idCardRoute,
  certificateRoute,
  appointmentRoute,
  mrityuRoute,
  bimariRoute,
  accidentRoute,
  putriVivahRoute,
  qrRotationRoute,
  districtDirectoryRoute,
  adminRoute,
  termsRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
