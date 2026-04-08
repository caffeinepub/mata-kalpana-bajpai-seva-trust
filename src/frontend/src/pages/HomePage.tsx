import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Home, MapPin, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import TributeSlider from "../components/TributeSlider";
import { useApp } from "../context/AppContext";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const sahayataCards = [
  {
    emoji: "❤️",
    title: "मृत्यु सहायता",
    desc: "परिवार की आकस्मिक आपदा में Nominee के खाते में सिधा सहायता",
    link: "/apply/mrityu",
  },
  {
    emoji: "🏥",
    title: "गंभीर बीमारी सहायता",
    desc: "गंभीर रोग / अपरेशन की स्थिति में जन-सहयोग से सहायता",
    link: "/apply/bimari",
  },
  {
    emoji: "💛",
    title: "पुत्री विवाह सहायता",
    desc: "पुत्री के विवाह हेतु अलग सहायता — पत्र एवं अलग सहयोग",
    link: "/apply/putri-vivah",
  },
];

const districtSample = [
  { name: "लखनऊ", count: 187 },
  { name: "वाराणसी", count: 164 },
  { name: "आगरा", count: 143 },
  { name: "कानपुर नगर", count: 121 },
  { name: "प्रयागराज", count: 115 },
  { name: "गोरखपुर", count: 108 },
  { name: "मेरठ", count: 99 },
  { name: "आज़मगढ़", count: 96 },
];

export default function HomePage() {
  const { stats, language } = useApp();
  const [countersVisible, setCountersVisible] = useState(false);
  const countersRef = useRef<HTMLDivElement>(null);

  // Intersection observer for count-up
  useEffect(() => {
    const el = countersRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCountersVisible(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const c1 = useCountUp(stats.totalMembers, 2000, countersVisible);
  const c2 = useCountUp(stats.totalFamilies, 2200, countersVisible);
  const c3 = useCountUp(stats.activeDistricts, 1500, countersVisible);
  const c4 = useCountUp(stats.totalBeneficiaries, 1800, countersVisible);

  return (
    <div className="min-h-screen">
      {/* Tribute Photo Slider */}
      <TributeSlider language={language} />

      {/* Action Buttons row below slider */}
      <div
        className="py-4 px-4 flex flex-wrap gap-2.5 justify-center"
        style={{ background: "oklch(0.97 0.005 260)" }}
      >
        <Link to="/register">
          <Button
            className="text-sm font-semibold px-5 py-2 rounded-full"
            style={{ background: "oklch(0.68 0.18 55)", color: "white" }}
            data-ocid="home.join.primary_button"
          >
            अभी जुड़ें
          </Button>
        </Link>
        <Link to="/login">
          <Button
            variant="outline"
            className="text-sm font-semibold px-5 py-2 rounded-full border-primary text-primary"
            data-ocid="home.login.button"
          >
            लॉगिन
          </Button>
        </Link>
        <Link to="/apply/mrityu">
          <Button
            variant="outline"
            className="text-sm font-semibold px-5 py-2 rounded-full border-primary text-primary"
            data-ocid="home.help.button"
          >
            सहायता चाहिए
          </Button>
        </Link>
        <Link to="/district-directory">
          <Button
            variant="outline"
            className="text-sm font-semibold px-5 py-2 rounded-full border-primary text-primary"
            data-ocid="home.district.button"
          >
            जिला खोजें
          </Button>
        </Link>
      </div>

      {/* Live Counters */}
      <section
        ref={countersRef}
        className="py-10 px-4"
        style={{ background: "oklch(0.97 0.005 260)" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-center text-xl font-bold mb-6"
            style={{ color: "oklch(0.28 0.12 260)" }}
          >
            {language === "hi" ? "लाइव जानकारी" : "Live Statistics"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: language === "hi" ? "सदस्य" : "Members",
                value: c1,
                icon: <Users className="w-6 h-6" />,
                suffix: "+",
              },
              {
                label: language === "hi" ? "परिवार" : "Families",
                value: c2,
                icon: <Home className="w-6 h-6" />,
                suffix: "+",
              },
              {
                label: language === "hi" ? "जनपद" : "Districts",
                value: c3,
                icon: <MapPin className="w-6 h-6" />,
                suffix: "",
              },
              {
                label: language === "hi" ? "लाभार्थी" : "Beneficiaries",
                value: c4,
                icon: <Heart className="w-6 h-6" />,
                suffix: "+",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-100"
              >
                <div
                  className="flex justify-center mb-2"
                  style={{ color: "oklch(0.68 0.18 55)" }}
                >
                  {item.icon}
                </div>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: "oklch(0.28 0.12 260)" }}
                >
                  {item.value.toLocaleString("hi-IN")}
                  {item.suffix}
                </div>
                <div
                  className="text-xs font-medium"
                  style={{ color: "oklch(0.48 0.03 260)" }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="py-10 px-4 max-w-3xl mx-auto">
        <div
          className="rounded-2xl p-6 border-l-4"
          style={{
            borderColor: "oklch(0.68 0.18 55)",
            background: "oklch(0.98 0.01 55)",
          }}
        >
          <p
            className="text-sm font-medium mb-2"
            style={{ color: "oklch(0.68 0.18 55)" }}
          >
            “संस्थापक संदेश”
          </p>
          <blockquote
            className="text-base italic leading-relaxed mb-3"
            style={{ color: "oklch(0.28 0.12 260)" }}
          >
            ‘7 फरवरी को माता जी के देहावसान के बाद यह अनुभव हुआ कि उनका जीवन केवल
            परिवार तक सीमित नहीं था, बल्कि गरीबों, श्रमिकों और जरूरतमंदों के लिए समर्पित
            था। उसी सेवा भावना को स्थायी रूप देने के लिए यह ट्रस्ट और डिजिटल सेवा मंच
            बनाया गया है, ताकि समाज का सहयोग सीधे पात्र परिवारों तक पहुँच सके।’
          </blockquote>
          <p
            className="text-xs font-semibold"
            style={{ color: "oklch(0.28 0.12 260)" }}
          >
            — संस्थापक, माता कल्पना बाजपेई राष्ट्रीय सेवा ट्रस्ट
          </p>
        </div>
      </section>

      {/* Sahayata Services */}
      <section
        className="py-10 px-4"
        style={{ background: "oklch(0.97 0.005 260)" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">
            {language === "hi" ? "सहायता सेवाएँ" : "Support Services"}
          </h2>
          <p className="section-subtitle">
            {language === "hi"
              ? "जरूरत में सीधे आवेदन करें"
              : "Apply directly when needed"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sahayataCards.map((card, i) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-md transition-all"
                data-ocid={`home.sahayata.item.${i + 1}`}
              >
                <div className="text-3xl mb-3">{card.emoji}</div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: "oklch(0.28 0.12 260)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ color: "oklch(0.48 0.03 260)" }}
                >
                  {card.desc}
                </p>
                <Link to={card.link}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    data-ocid={`home.sahayata.apply.button.${i + 1}`}
                  >
                    आवेदन करें <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* District Growth */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">75 जनपदों में सेवा विस्तार</h2>
          <p className="section-subtitle">
            उत्तर प्रदेश के हर कोने में सेवा नेटवर्क सक्रिय
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {districtSample.map((d, i) => (
              <div
                key={d.name}
                className="rounded-xl p-3 text-center border border-slate-100 bg-white shadow-xs"
                data-ocid={`home.district.item.${i + 1}`}
              >
                <div
                  className="text-lg font-bold mb-0.5"
                  style={{ color: "oklch(0.28 0.12 260)" }}
                >
                  {d.count}+
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.48 0.03 260)" }}
                >
                  {d.name}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/district-directory">
              <Button
                variant="outline"
                className="text-sm"
                data-ocid="home.view_all_districts.button"
              >
                सभी जिले देखें <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <div
        className="py-3 px-4 text-center"
        style={{ background: "oklch(0.28 0.12 260)" }}
      >
        <p className="text-xs text-white opacity-70">
          ⚠️ यह पूर्णतः सार्वजनिक धर्मार्थ मंच है — कोई बीमा नहीं, कोई गारंटी नहीं
        </p>
      </div>

      <Footer />
    </div>
  );
}
