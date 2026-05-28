import { memo, useState } from "react";
import { useResumeStore } from "../store/resumeStore";
import { SECTION_TYPE_LABELS } from "../types/resume";
import type { SectionType } from "../types/resume";
import { BasicsEditor } from "../sections/BasicsEditor";
import { SectionEditor } from "./SectionEditor";
import { exportResumeData, importResumeData } from "../utils/importExport";

const SECTION_TYPES: SectionType[] = [
  "education",
  "experience",
  "projects",
  "portfolio",
  "skills",
  "certificates",
  "languages",
  "self-evaluation",
  "custom",
];

interface EditorPanelProps {
  onPrint: () => void;
}

export const EditorPanel = memo(function EditorPanel({ onPrint }: EditorPanelProps) {
  const data = useResumeStore((s) => s.data);
  const sections = useResumeStore((s) => s.data.sections);
  const addSection = useResumeStore((s) => s.addSection);
  const resetData = useResumeStore((s) => s.resetData);
  const importData = useResumeStore((s) => s.importData);
  const [importError, setImportError] = useState<string | null>(null);

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const handleReset = () => {
    if (confirm("确定重置所有数据？此操作不可恢复。")) {
      resetData();
    }
  };

  const handleExport = () => {
    exportResumeData(data);
  };

  const handleImport = async () => {
    try {
      const imported = await importResumeData();
      if (confirm("导入将覆盖当前所有数据，确定继续？")) {
        importData(imported);
        setImportError(null);
      }
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "导入失败");
      setTimeout(() => setImportError(null), 3000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
        <h1 className="text-lg font-bold text-gray-800">简历编辑器</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleImport}
            className="text-sm px-3 py-1.5 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            导入
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="text-sm px-3 py-1.5 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            导出
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="text-sm px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            导出 PDF
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="text-sm px-3 py-1.5 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            重置
          </button>
        </div>
      </div>

      {importError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mx-4 mt-3">
          <p className="text-xs text-red-700">{importError}</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <BasicsEditor />

        {sortedSections.map((section, index) => (
          <SectionEditor
            key={section.id}
            section={section}
            isFirst={index === 0}
            isLast={index === sortedSections.length - 1}
          />
        ))}

        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">添加模块</h3>
          <div className="flex flex-wrap gap-2">
            {SECTION_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => addSection(type)}
                className="text-xs px-3 py-1.5 rounded-lg border border-blue-200 text-blue-500 hover:bg-blue-50 transition-colors"
              >
                + {SECTION_TYPE_LABELS[type]}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-center justify-between">
          <p className="text-xs text-yellow-700">
            所有数据仅存储在本地浏览器，不会上传至任何服务器。
          </p>
          <a
            href="https://github.com/V3dsaW4/online-resume"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs text-yellow-700 hover:text-yellow-900 transition-colors flex-shrink-0 ml-3"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
});