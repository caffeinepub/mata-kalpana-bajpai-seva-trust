import { Link } from "@tanstack/react-router";
import { ExternalLink, Flame, Phone } from "lucide-react";
import { TRUST_HELPLINE, TRUST_REG_NO } from "../constants";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { language } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: "oklch(0.28 0.12 260)" }}
      className="text-white pt-10 pb-5"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.68 0.18 55)" }}
              >
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold">माता कल्पना बाजपेई</div>
                <div className="text-xs opacity-80">राष्ट्रीय सेवा ट्रस्ट</div>
              </div>
            </div>
            <p className="text-xs opacity-75 leading-relaxed">
              {language === "hi"
                ? "समाज के सहयोग से समाज के लिए"
                : "For Society, By Society"}
            </p>
            <p className="text-xs opacity-60 mt-2">Reg: {TRUST_REG_NO}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-semibold mb-3"
              style={{ color: "oklch(0.68 0.18 55)" }}
            >
              {language === "hi" ? "त्वरित लिंक" : "Quick Links"}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  {language === "hi" ? "होम" : "Home"}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  {language === "hi" ? "हमारे बारे में" : "About Us"}
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  {language === "hi" ? "पंजीकरण" : "Register"}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  {language === "hi" ? "शर्तें" : "Terms"}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  {language === "hi" ? "संपर्क" : "Contact"}
                </Link>
              </li>
              <li>
                <Link
                  to="/district-directory"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  {language === "hi" ? "जिला निर्देशिका" : "District Directory"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-sm font-semibold mb-3"
              style={{ color: "oklch(0.68 0.18 55)" }}
            >
              {language === "hi" ? "संपर्क" : "Contact"}
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 opacity-75">
                <Phone className="w-3.5 h-3.5" />
                <span>
                  {language === "hi" ? "हेल्पलाइन:" : "Helpline:"}{" "}
                  {TRUST_HELPLINE}
                </span>
              </div>
              <div className="flex items-center gap-2 opacity-75">
                <ExternalLink className="w-3.5 h-3.5" />
                <a
                  href="https://t.me/mkbrseva"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-100 transition-opacity"
                >
                  {language === "hi"
                    ? "Telegram: @mkbrseva"
                    : "Telegram: @mkbrseva"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-white/10 pt-4 mb-3">
          <p className="text-xs opacity-50 text-center leading-relaxed">
            {language === "hi"
              ? "यह सार्वजनिक धर्मार्थ जन-सहयोग मंच है। इसमें किसी भी प्रकार की बीमा, गारंटी, निवेश योजना, निश्चित राशि अथवा निश्चित प्रतिफल की कोई व्यवस्था नहीं है।"
              : "This is a public charitable support platform. There is no provision for any kind of insurance, guarantee, investment scheme, fixed amount or fixed return."}
          </p>
        </div>

        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-xs opacity-60">
            © {year} माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट • Reg: {TRUST_REG_NO}
          </p>
          <p className="text-xs opacity-40 mt-1">
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noreferrer"
              className="underline hover:opacity-70"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
