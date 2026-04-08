import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Flame, Menu, X } from "lucide-react";
import { useState } from "react";
import { LANG } from "../constants";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { language, setLanguage, currentMember, setCurrentMember } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const L = LANG[language];

  const handleLogout = () => {
    setCurrentMember(null);
    setMobileOpen(false);
  };

  const sahayataLinks = [
    {
      path: "/apply/mrityu",
      label: language === "hi" ? "मृत्यु सहायता" : "Death Support",
    },
    {
      path: "/apply/bimari",
      label: language === "hi" ? "गंभीर बीमारी" : "Serious Illness",
    },
    {
      path: "/apply/accident",
      label: language === "hi" ? "दुर्घटना सहायता" : "Accident Support",
    },
    {
      path: "/apply/putri-vivah",
      label: language === "hi" ? "पुत्री विवाह" : "Daughter Marriage",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav.link"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.28 0.12 260)" }}
          >
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <div
              className="text-xs font-bold"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              माता कल्पना बाजपेई
            </div>
            <div className="text-xs" style={{ color: "oklch(0.68 0.18 55)" }}>
              राष्ट्रीय सेवा ट्रस्ट
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors"
            style={{ color: "oklch(0.28 0.12 260)" }}
            data-ocid="nav.home.link"
          >
            {L.home}
          </Link>
          <Link
            to="/about"
            className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors"
            style={{ color: "oklch(0.28 0.12 260)" }}
            data-ocid="nav.about.link"
          >
            {L.about}
          </Link>
          <Link
            to="/district-directory"
            className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors"
            style={{ color: "oklch(0.28 0.12 260)" }}
            data-ocid="nav.district.link"
          >
            {language === "hi" ? "जिला निर्देशिका" : "District Directory"}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors flex items-center gap-1"
                style={{ color: "oklch(0.28 0.12 260)" }}
                data-ocid="nav.sahayata.dropdown_menu"
              >
                {L.sahayata} <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {sahayataLinks.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link to={item.path} className="cursor-pointer">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLanguage(language === "hi" ? "en" : "hi")}
            className="text-xs font-bold px-2.5 py-1 rounded border transition-colors"
            style={{
              borderColor: "oklch(0.28 0.12 260)",
              color: "oklch(0.28 0.12 260)",
            }}
            data-ocid="nav.language.toggle"
          >
            {language === "hi" ? "EN" : "HI"}
          </button>
          <Link
            to="/admin"
            className="text-xs font-medium"
            style={{ color: "oklch(0.48 0.03 260)" }}
            data-ocid="nav.admin.link"
          >
            {L.admin}
          </Link>
          {currentMember ? (
            <>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  data-ocid="nav.dashboard.button"
                >
                  📋 {L.dashboard}
                </Button>
              </Link>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={handleLogout}
                data-ocid="nav.logout.button"
              >
                {L.logout}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-blue-800 text-blue-800"
                  data-ocid="nav.login.button"
                >
                  {L.login}
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="sm"
                  className="text-xs text-white"
                  style={{ background: "oklch(0.68 0.18 55)" }}
                  data-ocid="nav.signup.button"
                >
                  {L.signup}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.mobile.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-50"
            style={{ color: "oklch(0.28 0.12 260)" }}
            onClick={() => setMobileOpen(false)}
            data-ocid="nav.mobile.home.link"
          >
            {L.home}
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-50"
            style={{ color: "oklch(0.28 0.12 260)" }}
            onClick={() => setMobileOpen(false)}
            data-ocid="nav.mobile.about.link"
          >
            {L.about}
          </Link>
          <Link
            to="/district-directory"
            className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-50"
            style={{ color: "oklch(0.28 0.12 260)" }}
            onClick={() => setMobileOpen(false)}
            data-ocid="nav.mobile.district.link"
          >
            {language === "hi" ? "जिला निर्देशिका" : "District Directory"}
          </Link>
          <div className="pl-3 space-y-1">
            <div
              className="text-xs font-semibold py-1"
              style={{ color: "oklch(0.48 0.03 260)" }}
            >
              {L.sahayata}
            </div>
            {sahayataLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-3 py-1.5 text-sm rounded-md hover:bg-slate-50"
                style={{ color: "oklch(0.28 0.12 260)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 py-2">
            <button
              type="button"
              onClick={() => setLanguage(language === "hi" ? "en" : "hi")}
              className="text-xs font-bold px-2.5 py-1 rounded border"
              style={{
                borderColor: "oklch(0.28 0.12 260)",
                color: "oklch(0.28 0.12 260)",
              }}
              data-ocid="nav.mobile.language.toggle"
            >
              {language === "hi" ? "EN" : "HI"}
            </button>
            <Link
              to="/admin"
              className="text-xs font-medium"
              style={{ color: "oklch(0.48 0.03 260)" }}
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.mobile.admin.link"
            >
              {L.admin}
            </Link>
          </div>
          {currentMember ? (
            <div className="flex gap-2 px-3 pb-2">
              <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  data-ocid="nav.mobile.dashboard.button"
                >
                  {L.dashboard}
                </Button>
              </Link>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={handleLogout}
                data-ocid="nav.mobile.logout.button"
              >
                {L.logout}
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 px-3 pb-2">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  data-ocid="nav.mobile.login.button"
                >
                  {L.login}
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)}>
                <Button
                  size="sm"
                  className="text-xs text-white"
                  style={{ background: "oklch(0.68 0.18 55)" }}
                  data-ocid="nav.mobile.signup.button"
                >
                  {L.signup}
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
