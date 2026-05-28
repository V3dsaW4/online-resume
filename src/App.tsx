import { useState, useCallback } from "react";
import { EditorPanel } from "./components/EditorPanel";
import { PreviewPanel } from "./components/PreviewPanel";
import { MobileToggle } from "./components/MobileToggle";
import { ResumeTemplate } from "./templates/ResumeTemplate";

export default function App() {
  const [mobileMode, setMobileMode] = useState<"editor" | "preview">("editor");
  const [isPrinting, setIsPrinting] = useState(false);

  const handleToggle = useCallback((mode: "editor" | "preview") => {
    setMobileMode(mode);
  }, []);

  const handlePrint = useCallback(() => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  }, []);

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