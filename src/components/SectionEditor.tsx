import { memo, useState } from "react";
import type { ResumeSection, SectionType } from "../types/resume";
import { SECTION_TYPE_LABELS } from "../types/resume";
import { useResumeStore } from "../store/resumeStore";
import {
  EducationEditor,
  ExperienceEditor,
  ProjectsEditor,
  PortfolioEditor,
  SkillsEditor,
  CertificatesEditor,
  LanguagesEditor,
  SelfEvaluationEditor,
  CustomSectionEditor,
} from "../sections/index.tsx";

const sectionEditors: Record<SectionType, React.ComponentType<{ section: ResumeSection }>> = {
  education: EducationEditor,
  experience: ExperienceEditor,
  projects: ProjectsEditor,
  portfolio: PortfolioEditor,
  skills: SkillsEditor,
  certificates: CertificatesEditor,
  languages: LanguagesEditor,
  "self-evaluation": SelfEvaluationEditor,
  custom: CustomSectionEditor,
};

export const SectionEditor = memo(function SectionEditor({
  section,
  isFirst,
  isLast,
}: {
  section: ResumeSection;
  isFirst: boolean;
  isLast: boolean;
}) {
  const updateSection = useResumeStore((s) => s.updateSection);
  const removeSection = useResumeStore((s) => s.removeSection);
  const moveSectionUp = useResumeStore((s) => s.moveSectionUp);
  const moveSectionDown = useResumeStore((s) => s.moveSectionDown);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(section.title);

  const EditorComponent = sectionEditors[section.type];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {isRenaming ? (
            <input
              className="text-sm font-semibold border border-gray-300 rounded px-2 py-0.5 w-36 focus:outline-none focus:border-blue-400"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={() => {
                updateSection(section.id, { title: renameValue || section.title });
                setIsRenaming(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateSection(section.id, { title: renameValue || section.title });
                  setIsRenaming(false);
                }
              }}
              autoFocus
            />
          ) : (
            <span
              className="text-sm font-semibold text-gray-700 cursor-pointer hover:text-blue-500"
              onClick={() => {
                setRenameValue(section.title);
                setIsRenaming(true);
              }}
              title="点击重命名"
            >
              {section.title}
            </span>
          )}
          <span className="text-xs text-gray-400">{SECTION_TYPE_LABELS[section.type]}</span>
          <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={section.visible}
              onChange={(e) => updateSection(section.id, { visible: e.target.checked })}
              className="w-3 h-3"
            />
            显示
          </label>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => moveSectionUp(section.id)}
            disabled={isFirst}
            className="text-xs px-2 py-0.5 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            title="上移"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => moveSectionDown(section.id)}
            disabled={isLast}
            className="text-xs px-2 py-0.5 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            title="下移"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm(`确定删除模块「${section.title}」？`)) {
                removeSection(section.id);
              }
            }}
            className="text-xs px-2 py-0.5 rounded border border-red-200 text-red-400 hover:bg-red-50"
          >
            删除
          </button>
        </div>
      </div>
      <div className="p-4">
        <EditorComponent section={section} />
      </div>
    </div>
  );
});