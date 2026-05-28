export interface Basics {
  name: string;
  position: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  blog: string;
  photo: string;
}

export type SectionType =
  | "education"
  | "experience"
  | "projects"
  | "portfolio"
  | "skills"
  | "certificates"
  | "languages"
  | "self-evaluation"
  | "custom";

export interface ResumeItem {
  id: string;
  date: string;
  startDate: string;
  endDate: string;
  title: string;
  subtitle: string;
  url: string;
  description: string;
  highlights: string[];
  techStack: string;
  label: string;
  summary: string;
}

export interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  order: number;
  displayMode?: string;
  items: ResumeItem[];
}

export interface ResumeData {
  basics: Basics;
  sections: ResumeSection[];
}

export const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  education: "教育经历",
  experience: "工作经历",
  projects: "项目经验",
  portfolio: "个人作品",
  skills: "技能",
  certificates: "证书",
  languages: "语言能力",
  "self-evaluation": "自我评价",
  custom: "自定义模块",
};

export function createDefaultBasics(): Basics {
  return {
    name: "Your Name",
    position: "目标岗位 | 随时到岗",
    age: "",
    gender: "",
    phone: "",
    email: "",
    blog: "",
    photo: "",
  };
}

export function createDefaultItem(): ResumeItem {
  return {
    id: "",
    date: "",
    startDate: "",
    endDate: "",
    title: "",
    subtitle: "",
    url: "",
    description: "",
    highlights: [],
    techStack: "",
    label: "",
    summary: "",
  };
}

export function createDefaultSection(
  type: SectionType,
  order: number,
  title?: string,
): ResumeSection {
  return {
    id: "",
    type,
    title: title || SECTION_TYPE_LABELS[type],
    visible: true,
    order,
    items: [],
  };
}