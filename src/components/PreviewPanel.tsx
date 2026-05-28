import { memo } from "react";
import { ResumeTemplate } from "../templates/ResumeTemplate";

export const PreviewPanel = memo(function PreviewPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0 no-print">
        <h2 className="text-sm font-semibold text-gray-600">实时预览</h2>
        <span className="text-xs text-gray-400">A4 尺寸预览</span>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-300 p-4 flex justify-center">
        <ResumeTemplate />
      </div>
    </div>
  );
});