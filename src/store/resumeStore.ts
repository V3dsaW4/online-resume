import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Basics, ResumeData, ResumeItem, ResumeSection, SectionType } from "../types/resume";
import { createDefaultBasics, createDefaultItem, createDefaultSection, SECTION_TYPE_LABELS } from "../types/resume";
import { generateId, reorderArray } from "../utils/helpers";

const STORAGE_KEY = "resume_data_v1";

function buildDefaultData(): ResumeData {
  const sections: ResumeSection[] = [
    createDefaultSection("education", 0),
    createDefaultSection("experience", 1),
    createDefaultSection("projects", 2),
    createDefaultSection("portfolio", 3),
    createDefaultSection("skills", 4),
    createDefaultSection("certificates", 5),
    createDefaultSection("languages", 6),
    createDefaultSection("self-evaluation", 7),
  ].map((s) => ({ ...s, id: generateId() }));

  return {
    basics: createDefaultBasics(),
    sections,
  };
}

interface ResumeStore {
  data: ResumeData;
  setBasics: (basics: Partial<Basics>) => void;
  addSection: (type: SectionType) => void;
  removeSection: (sectionId: string) => void;
  updateSection: (sectionId: string, updates: Partial<ResumeSection>) => void;
  moveSectionUp: (sectionId: string) => void;
  moveSectionDown: (sectionId: string) => void;
  addItem: (sectionId: string) => void;
  removeItem: (sectionId: string, itemId: string) => void;
  updateItem: (sectionId: string, itemId: string, updates: Partial<ResumeItem>) => void;
  moveItemUp: (sectionId: string, itemId: string) => void;
  moveItemDown: (sectionId: string, itemId: string) => void;
  resetData: () => void;
  importData: (data: ResumeData) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: buildDefaultData(),

      setBasics: (basics) =>
        set((state) => ({
          data: { ...state.data, basics: { ...state.data.basics, ...basics } },
        })),

      addSection: (type) =>
        set((state) => {
          const maxOrder = state.data.sections.reduce(
            (max, s) => Math.max(max, s.order),
            -1,
          );
          const newSection: ResumeSection = {
            ...createDefaultSection(type, maxOrder + 1, SECTION_TYPE_LABELS[type]),
            id: generateId(),
          };
          return {
            data: { ...state.data, sections: [...state.data.sections, newSection] },
          };
        }),

      removeSection: (sectionId) =>
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.filter((s) => s.id !== sectionId),
          },
        })),

      updateSection: (sectionId, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map((s) =>
              s.id === sectionId ? { ...s, ...updates } : s,
            ),
          },
        })),

      moveSectionUp: (sectionId) =>
        set((state) => {
          const sorted = [...state.data.sections].sort((a, b) => a.order - b.order);
          const idx = sorted.findIndex((s) => s.id === sectionId);
          if (idx <= 0) return state;
          const reordered = reorderArray(sorted, idx, idx - 1);
          return {
            data: {
              ...state.data,
              sections: reordered.map((s, i) => ({ ...s, order: i })),
            },
          };
        }),

      moveSectionDown: (sectionId) =>
        set((state) => {
          const sorted = [...state.data.sections].sort((a, b) => a.order - b.order);
          const idx = sorted.findIndex((s) => s.id === sectionId);
          if (idx < 0 || idx >= sorted.length - 1) return state;
          const reordered = reorderArray(sorted, idx, idx + 1);
          return {
            data: {
              ...state.data,
              sections: reordered.map((s, i) => ({ ...s, order: i })),
            },
          };
        }),

      addItem: (sectionId) =>
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map((s) =>
              s.id === sectionId
                ? { ...s, items: [...s.items, { ...createDefaultItem(), id: generateId() }] }
                : s,
            ),
          },
        })),

      removeItem: (sectionId, itemId) =>
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map((s) =>
              s.id === sectionId
                ? { ...s, items: s.items.filter((it) => it.id !== itemId) }
                : s,
            ),
          },
        })),

      updateItem: (sectionId, itemId, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((it) =>
                      it.id === itemId ? { ...it, ...updates } : it,
                    ),
                  }
                : s,
            ),
          },
        })),

      moveItemUp: (sectionId, itemId) =>
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map((s) => {
              if (s.id !== sectionId) return s;
              const idx = s.items.findIndex((it) => it.id === itemId);
              if (idx <= 0) return s;
              return { ...s, items: reorderArray(s.items, idx, idx - 1) };
            }),
          },
        })),

      moveItemDown: (sectionId, itemId) =>
        set((state) => ({
          data: {
            ...state.data,
            sections: state.data.sections.map((s) => {
              if (s.id !== sectionId) return s;
              const idx = s.items.findIndex((it) => it.id === itemId);
              if (idx < 0 || idx >= s.items.length - 1) return s;
              return { ...s, items: reorderArray(s.items, idx, idx + 1) };
            }),
          },
        })),

      resetData: () => set({ data: buildDefaultData() }),

      importData: (data) => set({ data }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
    },
  ),
);