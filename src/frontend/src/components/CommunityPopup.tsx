import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function CommunityPopup() {
  const {
    showCommunityPopup,
    setShowCommunityPopup,
    currentMember,
    districts,
  } = useApp();

  const districtLink = currentMember
    ? districts.find((d) => d.name === currentMember.district)?.telegramLink ||
      "https://t.me/mkbrseva"
    : "https://t.me/mkbrseva";

  const handleClose = () => setShowCommunityPopup(false);

  return (
    <Dialog open={showCommunityPopup} onOpenChange={setShowCommunityPopup}>
      <DialogContent className="max-w-md" data-ocid="community.dialog">
        <DialogHeader>
          <DialogTitle
            className="text-center text-lg"
            style={{ color: "oklch(0.28 0.12 260)" }}
          >
            🎉 बधाई हो!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-2">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "oklch(0.95 0.05 55)" }}
          >
            <span className="text-2xl">✅</span>
          </div>
          <p
            className="text-sm font-medium mb-1"
            style={{ color: "oklch(0.28 0.12 260)" }}
          >
            आपकी membership approve हो गई!
          </p>
          <p className="text-xs mb-5" style={{ color: "oklch(0.48 0.03 260)" }}>
            अब अपने जिला समुदाय से जुड़ें और ट्रस्ट की सेवाओं का लाभ उठाएं।
          </p>
          <div className="space-y-2">
            <a href={districtLink} target="_blank" rel="noreferrer">
              <Button
                className="w-full text-white text-sm"
                style={{ background: "oklch(0.28 0.12 260)" }}
                data-ocid="community.district_telegram.button"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                जिला Telegram Group
              </Button>
            </a>
            <a href="https://t.me/mkbrseva_up" target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                className="w-full text-sm"
                data-ocid="community.state_channel.button"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                राज्य Channel
              </Button>
            </a>
            <a
              href="https://t.me/mkbrseva_national"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="w-full text-sm"
                data-ocid="community.national_channel.button"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                National Updates Channel
              </Button>
            </a>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 p-1 rounded-md hover:bg-slate-100"
          data-ocid="community.close_button"
        >
          <X className="w-4 h-4" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
