import { memo } from "react";
import type { ResumeSection } from "../types/resume";
import { useResumeStore } from "../store/resumeStore";
import { ItemEditor } from "../components/ItemEditor";

export const EducationEditor = memo(function EducationEditor({
  section,
}: {
  section: ResumeSection;
}) {
  return (
    <ItemEditor
      section={section}
      fields={[
        { key: "date", label: "时间", placeholder: "2021-09 ~ 2025-06", dateRange: true },
        { key: "title", label: "学校", placeholder: "XX大学" },
        { key: "subtitle", label: "专业", placeholder: "计算机科学与技术" },
        { key: "description", label: "描述", placeholder: "主修课程、奖学金等", multiline: true },
      ]}
    />
  );
});

export const ExperienceEditor = memo(function ExperienceEditor({
  section,
}: {
  section: ResumeSection;
}) {
  return (
    <ItemEditor
      section={section}
      fields={[
        { key: "date", label: "时间", placeholder: "2024-06 ~ 2024-09", dateRange: true },
        { key: "title", label: "公司/团队", placeholder: "公司名称" },
        { key: "subtitle", label: "角色", placeholder: "前端开发" },
        { key: "url", label: "链接", placeholder: "https://..." },
        { key: "description", label: "描述", placeholder: "项目/工作描述" },
        { key: "highlights", label: "亮点", placeholder: "一项一行", multiline: true },
        { key: "techStack", label: "技术栈", placeholder: "React、TypeScript" },
      ]}
    />
  );
});

export const ProjectsEditor = memo(function ProjectsEditor({
  section,
}: {
  section: ResumeSection;
}) {
  return (
    <ItemEditor
      section={section}
      fields={[
        { key: "date", label: "时间", placeholder: "2024-01 ~ 2024-03", dateRange: true },
        { key: "title", label: "项目名称", placeholder: "项目名称" },
        { key: "subtitle", label: "角色", placeholder: "独立开发" },
        { key: "url", label: "链接", placeholder: "https://github.com/..." },
        { key: "description", label: "描述", placeholder: "一句话描述项目" },
        { key: "highlights", label: "亮点", placeholder: "一项一行", multiline: true },
        { key: "techStack", label: "技术栈", placeholder: "React、TypeScript" },
      ]}
    />
  );
});

export const SkillsEditor = memo(function SkillsEditor({
  section,
}: {
  section: ResumeSection;
}) {
  return (
    <ItemEditor
      section={section}
      fields={[
        { key: "title", label: "技能分类", placeholder: "编程语言" },
        { key: "subtitle", label: "技能列表", placeholder: "如：Python、TypeScript、Go" },
      ]}
    />
  );
});

export const CertificatesEditor = memo(function CertificatesEditor({
  section,
}: {
  section: ResumeSection;
}) {
  return (
    <ItemEditor
      section={section}
      fields={[
        { key: "title", label: "颁发机构", placeholder: "教育部" },
        { key: "subtitle", label: "证书名称", placeholder: "用逗号分隔，如：CET-4、CET-6" },
      ]}
    />
  );
});

export const LanguagesEditor = memo(function LanguagesEditor({
  section,
}: {
  section: ResumeSection;
}) {
  return (
    <ItemEditor
      section={section}
      fields={[
        { key: "title", label: "语言", placeholder: "英语" },
        { key: "subtitle", label: "水平", placeholder: "CET-6 / 流利" },
      ]}
    />
  );
});

export const PortfolioEditor = memo(function PortfolioEditor({
  section,
}: {
  section: ResumeSection;
}) {
  const updateSection = useResumeStore((s) => s.updateSection);
  const displayMode = section.displayMode || "default";

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-400">显示模式：</span>
        <button
          type="button"
          onClick={() => updateSection(section.id, { displayMode: "default" })}
          className={`text-xs px-2 py-1 rounded border transition-colors ${
            displayMode === "default"
              ? "bg-blue-50 border-blue-300 text-blue-600"
              : "border-gray-200 text-gray-400 hover:bg-gray-50"
          }`}
        >
          默认
        </button>
        <button
          type="button"
          onClick={() => updateSection(section.id, { displayMode: "link-wrap" })}
          className={`text-xs px-2 py-1 rounded border transition-colors ${
            displayMode === "link-wrap"
              ? "bg-blue-50 border-blue-300 text-blue-600"
              : "border-gray-200 text-gray-400 hover:bg-gray-50"
          }`}
        >
          链接包裹
        </button>
      </div>
      <ItemEditor
        section={section}
        fields={[
          { key: "title", label: "作品名称", placeholder: "个人博客" },
          { key: "subtitle", label: "描述", placeholder: "技术分享博客" },
          { key: "url", label: "链接", placeholder: "https://..." },
        ]}
      />
    </div>
  );
});

export const SelfEvaluationEditor = memo(function SelfEvaluationEditor({
  section,
}: {
  section: ResumeSection;
}) {
  return (
    <ItemEditor
      section={section}
      fields={[
        { key: "description", label: "描述", placeholder: "请输入自我评价", multiline: true },
      ]}
    />
  );
});

export const CustomSectionEditor = memo(function CustomSectionEditor({
  section,
}: {
  section: ResumeSection;
}) {
  return (
    <ItemEditor
      section={section}
      fields={[
        { key: "date", label: "时间", placeholder: "2024", dateRange: true },
        { key: "title", label: "标题", placeholder: "标题" },
        { key: "subtitle", label: "副标题", placeholder: "副标题" },
        { key: "url", label: "链接", placeholder: "https://..." },
        { key: "description", label: "描述", placeholder: "描述内容" },
        { key: "highlights", label: "亮点", placeholder: "一项一行", multiline: true },
        { key: "techStack", label: "技术栈", placeholder: "技术栈" },
      ]}
    />
  );
});