import { memo } from "react";

interface MobileToggleProps {
  mode: "editor" | "preview";
  onToggle: (mode: "editor" | "preview") => void;
}

export const MobileToggle = memo(function MobileToggle({
  mode,
  onToggle,
}: MobileToggleProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex no-print lg:hidden">
      <button
        type="button"
        onClick={() => onToggle("editor")}
        className={`flex-1 py-3 text-sm font-medium transition-colors ${
          mode === "editor"
            ? "text-blue-500 border-t-2 border-blue-500"
            : "text-gray-400"
        }`}
      >
        编辑
      </button>
      <button
        type="button"
        onClick={() => onToggle("preview")}
        className={`flex-1 py-3 text-sm font-medium transition-colors ${
          mode === "preview"
            ? "text-blue-500 border-t-2 border-blue-500"
            : "text-gray-400"
        }`}
      >
        预览
      </button>
    </div>
  );
});