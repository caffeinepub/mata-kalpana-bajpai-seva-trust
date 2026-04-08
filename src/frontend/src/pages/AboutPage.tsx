import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";

const missionCards = [
  {
    icon: "❤️",
    title: "मृत्यु सहायता",
    desc: "आकस्मिक निधन की स्थिति में Nominee को सीधे सहायता",
  },
  {
    icon: "🏥",
    title: "बीमारी सहायता",
    desc: "गंभीर रोग एवं अपरेशन हेतु उपलब्ध सहयोग",
  },
  {
    icon: "🚑",
    title: "दुर्घटना सहायता",
    desc: "दुर्घटना पीड़ित सदस्यों को तत्काल सहायता",
  },
  {
    icon: "💛",
    title: "पुत्री विवाह",
    desc: "बेटी के विवाह हेतु अलग सहायता एवं पंजीकरण",
  },
];

export default function AboutPage() {
  const { language } = useApp();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-14 px-4 text-white text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.28 0.12 260) 0%, oklch(0.35 0.14 260) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-4">🛞</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "hi" ? "सेवा की प्रेरणा" : "The Inspiration of Service"}
          </h1>
          <p className="text-lg opacity-80">माता श्रीमती कल्पना बाजपेई जी</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Section 1 */}
          <div
            className="rounded-2xl p-6 border-l-4"
            style={{
              borderColor: "oklch(0.68 0.18 55)",
              background: "oklch(0.98 0.01 55)",
            }}
          >
            <h2
              className="text-xl font-bold mb-3"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              परिचय
            </h2>
            <p
              className="text-sm leading-loose"
              style={{ color: "oklch(0.25 0.05 260)" }}
            >
              माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट सेवा, करुणा, संवेदना और जनहित की उस
              पवित्र भावना का डिजिटल विस्तार है, जिसे स्वर्गीय माता श्रीमती कल्पना बाजपेई
              जी ने अपने जीवनभर अपने व्यवहार, सहयोग और मानवीय मूल्यों से जिया।
            </p>
          </div>

          {/* Section 2 - 7 February */}
          <div className="rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ background: "oklch(0.95 0.05 55)" }}
              >
                7
              </div>
              <h2
                className="text-xl font-bold"
                style={{ color: "oklch(0.28 0.12 260)" }}
              >
                7 फरवरी — एक संकल्प का जन्म
              </h2>
            </div>
            <p
              className="text-sm leading-loose"
              style={{ color: "oklch(0.25 0.05 260)" }}
            >
              दिनांक 7 फरवरी को माता जी के देहावसान के पश्चात यह संकल्प लिया गया कि उनके
              द्वारा गरीबों, असहायों, श्रमिक परिवारों, बेटियों, बीमार व्यक्तियों, दुर्घटना
              पीड़ितों तथा संकटग्रस्त परिवारों की सहायता के जो संस्कार समाज में छोड़े गए, उन्हें
              एक संगठित, पारदर्शी, सार्वजनिक धर्मार्थ एवं डिजिटल सेवा मंच के रूप में आगे
              बढ़ाया जाए।
            </p>
          </div>

          {/* Section 3 - Mission */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "oklch(0.97 0.005 260)" }}
          >
            <h2
              className="text-xl font-bold mb-3"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              स्थापना का उद्देश्य
            </h2>
            <p
              className="text-sm leading-loose"
              style={{ color: "oklch(0.25 0.05 260)" }}
            >
              इसी प्रेरणा से इस ट्रस्ट की स्थापना की गई, ताकि समाज का प्रत्येक सहयोगी
              व्यक्ति सीधे समाज के ही किसी जरूरतमंद परिवार तक सहायता पहुँचा सके। यह मंच
              केवल आर्थिक सहयोग का माध्यम नहीं, बल्कि मानवीय संवेदना, सामाजिक एकता,
              परिवार सहयोग और जनविश्वास का सेवा सेतु है।
            </p>
          </div>

          {/* Section 4 - Network */}
          <div className="rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2
              className="text-xl font-bold mb-3"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              75 जनपद नेटवर्क
            </h2>
            <p
              className="text-sm leading-loose"
              style={{ color: "oklch(0.25 0.05 260)" }}
            >
              यह पोर्टल 75 जनपदों, जिला अध्यक्षों, ब्लॉक अध्यक्षों, क्षेत्रीय पदाधिकारियों,
              परिवार इकाईयों एवं सेवा समुदायों को एक डिजिटल प्रणाली में जोड़ते हुए समाज के
              लोगों को समाज के ही जरूरतमंद व्यक्तियों से जोड़ता है।
            </p>
          </div>

          {/* Section 5 - Philosophy */}
          <div
            className="rounded-2xl p-6 text-white text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.18 55) 0%, oklch(0.62 0.2 45) 100%)",
            }}
          >
            <p className="text-xl font-bold italic mb-2">
              “समाज के सहयोग से समाज के लिए सहायता”
            </p>
            <p className="text-sm opacity-90">
              जहाँ उपलब्ध जन-अनुदान, सेवा समुदाय और विश्वास की शक्ति सीधे पात्र
              beneficiary / नामित प्राप्तकर्ता तक पहुँचती है।
            </p>
          </div>

          {/* Closing */}
          <div className="text-center py-4">
            <p
              className="text-base font-semibold italic"
              style={{ color: "oklch(0.28 0.12 260)" }}
            >
              माता जी की स्मृति में यह केवल एक ट्रस्ट नहीं, बल्कि उनकी सेवा भावना को जन-जन
              तक जीवित रखने का आजीवन संकल्प है।
            </p>
          </div>
        </div>
      </section>

      {/* Mission Cards */}
      <section
        className="py-10 px-4"
        style={{ background: "oklch(0.97 0.005 260)" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">हमारी सेवाएँ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {missionCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-100"
              >
                <div className="text-3xl mb-2">{card.icon}</div>
                <h3
                  className="text-sm font-bold mb-1"
                  style={{ color: "oklch(0.28 0.12 260)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.48 0.03 260)" }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 text-center">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: "oklch(0.28 0.12 260)" }}
        >
          हमसे जुड़ें
        </h2>
        <p className="text-sm mb-6" style={{ color: "oklch(0.48 0.03 260)" }}>
          आज ही सदस्य बनें और 75 जनपद सेवा नेटवर्क का हिस्सा बनें
        </p>
        <Link to="/register">
          <Button
            className="text-white px-8 py-3 rounded-full font-semibold"
            style={{ background: "oklch(0.68 0.18 55)" }}
            data-ocid="about.join.primary_button"
          >
            अभी जुड़ें
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
