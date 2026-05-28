import { memo } from "react";
import { useResumeStore } from "../store/resumeStore";
import type { ResumeItem, ResumeSection } from "../types/resume";

interface FieldDef {
  key: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
  dateRange?: boolean;
}

interface ItemEditorProps {
  section: ResumeSection;
  fields: FieldDef[];
}

export const ItemEditor = memo(function ItemEditor({
  section,
  fields,
}: ItemEditorProps) {
  const addItem = useResumeStore((s) => s.addItem);
  const removeItem = useResumeStore((s) => s.removeItem);
  const updateItem = useResumeStore((s) => s.updateItem);

  const getValue = (item: ResumeItem, key: string): string => {
    if (key === "highlights") return item.highlights.join("\n");
    return (item as Record<string, unknown>)[key] as string || "";
  };

  const setValue = (itemId: string, key: string, value: string) => {
    if (key === "highlights") {
      updateItem(section.id, itemId, {
        highlights: value ? value.split("\n") : [],
      });
    } else {
      updateItem(section.id, itemId, { [key]: value } as Partial<ResumeItem>);
    }
  };

  return (
    <div className="space-y-2">
      {section.items.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">
              条目 #{section.items.indexOf(item) + 1}
            </span>
            <button
              type="button"
              onClick={() => removeItem(section.id, item.id)}
              className="text-xs text-red-400 hover:text-red-600"
            >
              删除
            </button>
          </div>
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-xs text-gray-400 mb-0.5">{field.label}</label>
              {field.dateRange ? (
                <div className="flex items-center gap-3 w-full">
                  <input
                    className="w-1/2 border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                    value={item.startDate}
                    onChange={(e) => {
                      const startDate = e.target.value;
                      const endDate = item.endDate;
                      const date = [startDate, endDate].filter(Boolean).join(" ~ ");
                      updateItem(section.id, item.id, { startDate, endDate, date } as Partial<ResumeItem>);
                    }}
                    placeholder="2025-04"
                  />
                  <span className="text-gray-400 text-sm flex-shrink-0">~</span>
                  <input
                    className="w-1/2 border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                    value={item.endDate}
                    onChange={(e) => {
                      const endDate = e.target.value;
                      const startDate = item.startDate;
                      const date = [startDate, endDate].filter(Boolean).join(" ~ ");
                      updateItem(section.id, item.id, { endDate, date } as Partial<ResumeItem>);
                    }}
                    placeholder="2026-04"
                  />
                </div>
              ) : field.multiline ? (
                <textarea
                  className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-400 resize-y"
                  rows={3}
                  value={getValue(item, field.key)}
                  onChange={(e) => setValue(item.id, field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              ) : (
                <input
                  className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                  value={getValue(item, field.key)}
                  onChange={(e) => setValue(item.id, field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addItem(section.id)}
        className="w-full py-2 text-sm text-blue-500 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
      >
        + 添加条目
      </button>
    </div>
  );
});