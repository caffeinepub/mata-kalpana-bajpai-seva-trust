import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";

const TERMS_HI = [
  "यह मंच पूर्णतः सार्वजनिक धर्मार्थ, सामाजिक एवं जनहितकारी उद्देशों हेतु संचालित किया जा रहा है।",
  "ट्रस्ट किसी भी प्रकार की बीमा योजना, निवेश योजना, निश्चित प्रतिफल, गारंटीड सहायता राशि अथवा व्यावसायिक लाभ का वचन नहीं देता।",
  "वेबसाइट पर प्रदर्शित सभी सहायता अभियान केवल उपलब्ध सार्वजनिक जन-अनुदान, जिला सेवा समुदाय, परिवार सहयोग नेटवर्क तथा ट्रस्ट की स्वीकृत नीति के अनुसार संचालित होंगे।",
  "सहायता beneficiary, नामित प्राप्तकर्ता अथवा सत्यापित जरूरतमंद परिवार के बैंक खाते में उपलब्ध सहयोग के अनुपात में सीधे हस्तांतरित की जाएगी।",
  "ट्रस्ट केवल सत्यापित दस्तावेज़, पात्रता, जिला स्तर सत्यापन, उपलब्ध संसाधन और सेवा समुदाय से प्राप्त सहयोग के आधार पर ही सहायता स्वीकृत करेगा।",
  "किसी भी सदस्य, beneficiary, nominee या परिवार को निश्चित सहायता राशि का दावा प्राप्त नहीं होगा।",
  "यह मंच केवल समाज से समाज तक सहयोग पहुँचाने का एक पारदर्शी डिजिटल माध्यम है।",
];

const TERMS_EN = [
  "This platform is operated entirely for public charitable, social, and public welfare purposes.",
  "The Trust does not guarantee any insurance scheme, investment plan, fixed return, guaranteed support amount, or commercial profit.",
  "All support campaigns on the website will be conducted according to available public donations, district service community, family support network, and Trust's approved policy.",
  "Support will be directly transferred to the bank account of the beneficiary, nominee, or verified needy family in proportion to available contributions.",
  "The Trust will only approve assistance based on verified documents, eligibility, district-level verification, available resources, and support from the service community.",
  "No member, beneficiary, nominee, or family will be entitled to a fixed support amount.",
  "This platform is only a transparent digital medium to deliver support from society to society.",
];

export default function TermsPage() {
  const { language } = useApp();
  const terms = language === "hi" ? TERMS_HI : TERMS_EN;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-10 px-4 text-white text-center"
        style={{ background: "oklch(0.28 0.12 260)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            {language === "hi" ? "शर्तें एवं नियम" : "Terms & Conditions"}
          </h1>
          <p className="text-sm opacity-75">
            माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट
          </p>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {terms.map((term, idx) => (
              <div
                key={term.substring(0, 20)}
                className="flex gap-4 p-4 rounded-2xl"
                style={{
                  background: idx % 2 === 0 ? "oklch(0.97 0.005 260)" : "white",
                  border: "1px solid oklch(0.9 0.01 260)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5"
                  style={{ background: "oklch(0.68 0.18 55)" }}
                >
                  {idx + 1}
                </div>
                <p
                  className="text-sm leading-loose"
                  style={{ color: "oklch(0.25 0.05 260)" }}
                >
                  {term}
                </p>
              </div>
            ))}
          </div>

          {/* Important Notice */}
          <div
            className="mt-8 p-5 rounded-2xl border-2"
            style={{
              borderColor: "oklch(0.28 0.12 260)",
              background: "oklch(0.97 0.005 260)",
            }}
          >
            <h3
              className="font-bold mb-2"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              ❗ महत्वपूर्ण सूचना
            </h3>
            <p
              className="text-xs leading-loose"
              style={{ color: "oklch(0.35 0.06 260)" }}
            >
              {language === "hi"
                ? "इस मंच पर कोई भी प्रकार की बीमा, गारंटी, निवेश योजना, निश्चित राशि अथवा निश्चित प्रतिफल की कोई व्यवस्था नहीं है। यह केवल एक पारदर्शी सार्वजनिक धर्मार्थ जन-सहयोग मंच है।"
                : "There is no provision for any kind of insurance, guarantee, investment scheme, fixed amount or fixed return on this platform. This is only a transparent public charitable public support platform."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
