import { memo } from "react";
import { useResumeStore } from "../store/resumeStore";
import type { ResumeItem, ResumeSection } from "../types/resume";
import "../styles/resume.css";
import "../styles/print.css";

function normalizeUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

function renderItemUrl(url: string, text: string) {
  if (!url) return <span>{text}</span>;
  return (
    <a href={normalizeUrl(url)} target="_blank" rel="noreferrer" className="text-inherit">
      {text || url}
    </a>
  );
}

const Header = memo(function Header() {
  const basics = useResumeStore((s) => s.data.basics);

  const contactParts: React.ReactNode[] = [];
  if (basics.age) contactParts.push(`${basics.age}岁`);
  if (basics.gender) contactParts.push(basics.gender);
  if (basics.phone) contactParts.push(`电话：${basics.phone}`);
  if (basics.email) {
    contactParts.push(
      <span key="email">
        邮箱：
        <a href={`mailto:${basics.email}`} className="text-inherit">
          {basics.email}
        </a>
      </span>,
    );
  }
  if (basics.blog) {
    contactParts.push(
      <span key="blog">
        博客：
        <a href={normalizeUrl(basics.blog)} target="_blank" rel="noreferrer" className="text-inherit">
          {basics.blog}
        </a>
      </span>,
    );
  }

  return (
    <header className="resume-header">
      <div className="resume-header-main">
        <div className="resume-header-left">
          <h1>{basics.name || "Your Name"}</h1>
          {basics.position && <p className="resume-meta">{basics.position}</p>}
          {contactParts.length > 0 && (
            <p className="resume-meta">{contactParts.map((part, i) => (
              <span key={i}>
                {part}
                {i < contactParts.length - 1 && <span className="resume-meta-sep">|</span>}
              </span>
            ))}</p>
          )}
        </div>
        {basics.photo && (
          <img className="resume-photo" src={basics.photo} alt="照片" />
        )}
      </div>
    </header>
  );
});

const EducationSection = memo(function EducationSection({ section }: { section: ResumeSection }) {
  if (!section.items.length) return null;

  return (
    <section className="resume-section">
      <h2>{section.title}</h2>
      {section.items.map((item) => (
        <div key={item.id} className="resume-edu-item">
          <div className="resume-proj-row">
            <span className="resume-proj-date">
              {item.startDate}
              {item.startDate && item.endDate && <span className="resume-date-sep">~</span>}
              {item.endDate}
            </span>
            <span className="resume-proj-company">
              <strong>{item.title}</strong>
            </span>
            <span className="resume-proj-role"><strong>{item.subtitle}</strong></span>
          </div>
          {item.description && (
            <p className="resume-proj-desc">{item.description}</p>
          )}
        </div>
      ))}
    </section>
  );
});

const CertificatesSection = memo(function CertificatesSection({ section }: { section: ResumeSection }) {
  if (!section.items.length) return null;

  return (
    <section className="resume-section">
      <h2>{section.title}</h2>
      {section.items.map((item) => (
        <div key={item.id} className="resume-block">
          {item.title && <p className="resume-proj-title">{item.title}</p>}
          {item.subtitle && <p className="resume-proj-desc">{item.subtitle}</p>}
        </div>
      ))}
    </section>
  );
});

const LanguagesSection = memo(function LanguagesSection({ section }: { section: ResumeSection }) {
  if (!section.items.length) return null;

  return (
    <section className="resume-section">
      <h2>{section.title}</h2>
      {section.items.map((item) => (
        <div key={item.id} className="resume-block">
          {item.title && <p className="resume-proj-title">{item.title}</p>}
          {item.subtitle && <p className="resume-proj-desc">{item.subtitle}</p>}
        </div>
      ))}
    </section>
  );
});

const PortfolioSection = memo(function PortfolioSection({ section }: { section: ResumeSection }) {
  if (!section.items.length) return null;
  const displayMode = section.displayMode || "default";

  return (
    <section className="resume-section">
      <h2>{section.title}</h2>
      {section.items.map((item) => (
        <div key={item.id} className="resume-portfolio-item">
          {displayMode === "default" ? (
            <>
              {item.title && <span className="resume-portfolio-title">{item.title}</span>}
              {(item.title && (item.subtitle || item.url)) && <span className="resume-portfolio-sep"> —— </span>}
              {item.subtitle && <span className="resume-portfolio-desc">{item.subtitle}</span>}
              {item.subtitle && item.url && <span className="resume-portfolio-link-gap"> </span>}
              {item.url && (
                <a href={normalizeUrl(item.url)} target="_blank" rel="noreferrer" className="resume-portfolio-link">
                  {item.url}
                </a>
              )}
            </>
          ) : (
            item.url ? (
              <a href={normalizeUrl(item.url)} target="_blank" rel="noreferrer" className="resume-portfolio-link-wrap">
                {item.title && <strong>{item.title}</strong>}
                {(item.title && item.subtitle) && <span className="resume-portfolio-sep"> —— </span>}
                {item.subtitle}
              </a>
            ) : (
              <>
                {item.title && <strong>{item.title}</strong>}
                {(item.title && item.subtitle) && <span className="resume-portfolio-sep"> —— </span>}
                {item.subtitle}
              </>
            )
          )}
        </div>
      ))}
    </section>
  );
});

const SelfEvaluationSection = memo(function SelfEvaluationSection({ section }: { section: ResumeSection }) {
  if (!section.items.length) return null;

  return (
    <section className="resume-section">
      <h2>{section.title}</h2>
      {section.items.map((item) => (
        <div key={item.id} className="resume-block">
          {item.description && <p className="resume-proj-desc">{item.description}</p>}
        </div>
      ))}
    </section>
  );
});

const SkillsSection = memo(function SkillsSection({ section }: { section: ResumeSection }) {
  if (!section.items.length) return null;

  return (
    <section className="resume-section">
      <h2>{section.title}</h2>
      {section.items.map((item) => (
        <div key={item.id} className="resume-block">
          {item.title && <p className="resume-proj-title">{item.title}</p>}
          {item.subtitle && <p className="resume-proj-desc">{item.subtitle}</p>}
        </div>
      ))}
    </section>
  );
});

const GenericSection = memo(function GenericSection({ section }: { section: ResumeSection }) {
  if (!section.items.length) return null;

  return (
    <section className="resume-section">
      <h2>{section.title}</h2>
      {section.items.map((item) => (
        <ItemBlock key={item.id} item={item} sectionType={section.type} />
      ))}
    </section>
  );
});

const ItemBlock = memo(function ItemBlock({
  item,
  sectionType,
}: {
  item: ResumeItem;
  sectionType: string;
}) {
  const hasProjLayout =
    sectionType === "experience" ||
    sectionType === "projects" ||
    sectionType === "certificates" ||
    sectionType === "languages" ||
    sectionType === "custom";

  if (!hasProjLayout) {
    return (
      <div className="resume-block">
        {item.title && <p className="resume-proj-title">{item.title}</p>}
        {item.description && <p className="resume-proj-desc">{item.description}</p>}
      </div>
    );
  }

  return (
    <article className="resume-block">
      <div className="resume-proj-row">
        <span className="resume-proj-date">
          {item.startDate}
          {item.startDate && item.endDate && <span className="resume-date-sep">~</span>}
          {item.endDate}
        </span>
        <span className="resume-proj-company">
          <strong>{renderItemUrl(item.url, item.title)}</strong>
        </span>
        <span className="resume-proj-role"><strong>{item.subtitle}</strong></span>
      </div>
      {item.description && (
        <p className="resume-proj-desc">{item.description}</p>
      )}
      {item.highlights.length > 0 && (
        <ul>
          {item.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}
      {item.techStack && (
        <p className="resume-tech-stack">
          <strong>技术栈：</strong>
          {item.techStack}
        </p>
      )}
    </article>
  );
});

function renderSection(section: ResumeSection) {
  if (!section.visible) return null;

  switch (section.type) {
    case "education":
      return <EducationSection key={section.id} section={section} />;
    case "skills":
      return <SkillsSection key={section.id} section={section} />;
    case "certificates":
      return <CertificatesSection key={section.id} section={section} />;
    case "languages":
      return <LanguagesSection key={section.id} section={section} />;
    case "portfolio":
      return <PortfolioSection key={section.id} section={section} />;
    case "self-evaluation":
      return <SelfEvaluationSection key={section.id} section={section} />;
    default:
      return <GenericSection key={section.id} section={section} />;
  }
}

export const ResumeTemplate = memo(function ResumeTemplate() {
  const sections = useResumeStore((s) => s.data.sections);
  const sortedSections = [...sections]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="resume-root">
      <main className="resume-page">
        <Header />
        {sortedSections.map(renderSection)}
      </main>
    </div>
  );
});