import { useState, useCallback } from "react";
import { EditorPanel } from "./components/EditorPanel";
import { PreviewPanel } from "./components/PreviewPanel";
import { MobileToggle } from "./components/MobileToggle";
import { ResumeTemplate } from "./templates/ResumeTemplate";
import { useResumeStore } from "./store/resumeStore";

export default function App() {
  const [mobileMode, setMobileMode] = useState<"editor" | "preview">("editor");
  const [isPrinting, setIsPrinting] = useState(false);
  const name = useResumeStore((s) => s.data.basics.name);

  const handleToggle = useCallback((mode: "editor" | "preview") => {
    setMobileMode(mode);
  }, []);

  const handlePrint = useCallback(() => {
    const originalTitle = document.title;
    document.title = name || "简历";
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
      document.title = originalTitle;
    }, 500);
  }, [name]);

  if (isPrinting) {
    return (
      <div className="print-only">
        <ResumeTemplate />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* 桌面端：左右分栏 */}
      <div className="hidden lg:flex flex-1 overflow-hidden">
        <div className="w-[480px] flex-shrink-0 border-r border-gray-200 h-full">
          <EditorPanel onPrint={handlePrint} />
        </div>
        <div className="flex-1 h-full">
          <PreviewPanel />
        </div>
      </div>

      {/* 移动端：切换显示 */}
      <div className="lg:hidden flex-1 overflow-hidden pb-12">
        {mobileMode === "editor" ? (
          <EditorPanel onPrint={handlePrint} />
        ) : (
          <PreviewPanel />
        )}
        <MobileToggle mode={mobileMode} onToggle={handleToggle} />
      </div>
    </div>
  );
}