import { memo, useRef, useEffect, useState } from "react";
import { ResumeTemplate } from "../templates/ResumeTemplate";

export const PreviewPanel = memo(function PreviewPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerWidth = container.clientWidth - 32;
      const pageWidth = 210 * 3.7795275591;
      const newScale = Math.min(1, containerWidth / pageWidth);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0 no-print">
        <h2 className="text-sm font-semibold text-gray-600">实时预览</h2>
        <span className="text-xs text-gray-400">A4 尺寸预览</span>
      </div>
      <div ref={containerRef} className="flex-1 overflow-y-auto bg-gray-300 p-4 flex justify-center">
        <div
          style={{
            transformOrigin: "top center",
            transform: `scale(${scale})`,
            marginBottom: `${(scale - 1) * 297 * 3.7795275591}px`,
          }}
        >
          <ResumeTemplate />
        </div>
      </div>
    </div>
  );
});