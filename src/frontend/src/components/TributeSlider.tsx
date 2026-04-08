import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TRUST_NAME } from "../constants";

interface SlideData {
  id: number;
  photo: string;
  captionHi: string;
  captionEn: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    photo:
      "/assets/picsart_26-02-01_17-25-55-963_2-019d6095-e732-709c-ab68-362a4f61f0da.jpg",
    captionHi: "उनकी सेवा, करुणा और संवेदना हमारी प्रेरणा है",
    captionEn: "Her service, compassion and sensitivity is our inspiration",
  },
  {
    id: 2,
    photo:
      "/assets/picsart_26-02-25_07-27-05-663-019d6095-e3a8-775f-a812-e97cf5f54bd8.jpg",
    captionHi: "7 फरवरी — माता जी का देहावसान, उनकी स्मृति में यह ट्रस्ट समर्पित है",
    captionEn: "7 February — In memory of Mata ji, this trust is dedicated",
  },
  {
    id: 3,
    photo:
      "/assets/picsart_26-03-10_06-21-30-621-019d6095-f82f-76f5-b9d6-adcca9d79774.jpg",
    captionHi: "गरीबों, असहायों और जरूरतमंदों की सेवा ही हमारा संकल्प है",
    captionEn: "Serving the poor, helpless and needy is our resolve",
  },
  {
    id: 4,
    photo:
      "/assets/file_000000003bac71fa9057c44a40f1fea9_2-019d6a82-b636-76e2-b96e-18715214fa09.png",
    captionHi: "75 जनपदों में फैला सेवा नेटवर्क, समाज के सहयोग से समाज के लिए",
    captionEn:
      "Service network spread across 75 districts, for society by society",
  },
  {
    id: 5,
    photo:
      "/assets/file_000000003bac71fa9057c44a40f1fea9_3-019d6a82-be0a-7767-a323-338ec0212278.png",
    captionHi: "परिवार, समुदाय और विश्वास — हमारी नींव",
    captionEn: "Family, community and trust — our foundation",
  },
  {
    id: 6,
    photo:
      "/assets/file_000000003bac71fa9057c44a40f1fea9_4-019d6a82-c8d9-768a-8212-29022dd6450a.png",
    captionHi: "माता जी के आशीर्वाद में, हम सेवा में अग्रसर हैं",
    captionEn: "With Mata ji's blessings, we continue our service",
  },
];

interface TributeSliderProps {
  language?: "hi" | "en";
}

export default function TributeSlider({ language = "hi" }: TributeSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const goNext = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo(current - 1);
  }, [current, goTo]);

  // Auto-advance 5s, paused on hover
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden tribute-slider-height"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Tribute slider"
      data-ocid="home.tribute_slider"
    >
      {/* Slides stack — absolute position, opacity crossfade */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: i === current ? 1 : 0,
            pointerEvents: i === current ? "auto" : "none",
            zIndex: i === current ? 1 : 0,
          }}
          aria-hidden={i !== current}
        >
          {/* Photo */}
          <img
            src={s.photo}
            alt={s.captionHi}
            className="w-full h-full object-cover"
            style={{ objectPosition: "top center" }}
            loading={i === 0 ? "eager" : "lazy"}
            draggable={false}
          />

          {/* Gradient overlay — dark at bottom, slight saffron tint */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,15,50,0.88) 0%, rgba(10,15,50,0.55) 40%, rgba(10,15,50,0.18) 70%, rgba(0,0,0,0.08) 100%)",
            }}
          />

          {/* Top saffron shimmer band */}
          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.68 0.18 55), oklch(0.75 0.22 50), oklch(0.68 0.18 55))",
            }}
          />
        </div>
      ))}

      {/* Caption content — fixed position over slides */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 px-5 tribute-slider-height">
        {/* Trust name badge */}
        <div
          className="mb-3 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide"
          style={{
            background: "rgba(0,0,0,0.35)",
            border: "1px solid oklch(0.68 0.18 55 / 0.6)",
            color: "oklch(0.88 0.16 55)",
            textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
          }}
        >
          🙏 {TRUST_NAME}
        </div>

        {/* Caption */}
        <p
          className="text-center font-bold leading-snug max-w-2xl transition-opacity duration-500"
          style={{
            fontSize: "clamp(1.1rem, 3vw, 1.8rem)",
            color: "white",
            textShadow: "0 2px 12px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.4)",
          }}
        >
          {language === "hi" ? slide.captionHi : slide.captionEn}
        </p>

        {/* Bilingual sub-caption */}
        {language === "hi" && (
          <p
            className="mt-2 text-center text-xs md:text-sm max-w-xl"
            style={{
              color: "rgba(255,255,255,0.75)",
              textShadow: "0 1px 6px rgba(0,0,0,0.8)",
            }}
          >
            {slide.captionEn}
          </p>
        )}

        {/* Dot indicators */}
        <div className="flex gap-2 mt-5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white"
              style={{
                width: i === current ? "1.75rem" : "0.5rem",
                height: "0.5rem",
                background:
                  i === current
                    ? "oklch(0.68 0.18 55)"
                    : "rgba(255,255,255,0.45)",
                boxShadow:
                  i === current ? "0 0 8px oklch(0.68 0.18 55 / 0.8)" : "none",
              }}
              data-ocid={`home.tribute_slider.dot.${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-white"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
        data-ocid="home.tribute_slider.prev"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-white"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
        data-ocid="home.tribute_slider.next"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Slide counter — top right */}
      <div
        className="absolute top-4 right-4 z-20 text-xs font-semibold px-2.5 py-1 rounded-full"
        style={{
          background: "rgba(0,0,0,0.35)",
          color: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(4px)",
        }}
      >
        {current + 1} / {slides.length}
      </div>
    </section>
  );
}
