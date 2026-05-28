import type { ResumeData } from "../types/resume";

export function exportResumeData(data: ResumeData): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `resume_${date}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importResumeData(): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error("未选择文件"));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string) as ResumeData;
          if (!data.basics || !Array.isArray(data.sections)) {
            reject(new Error("文件格式不正确"));
            return;
          }
          resolve(data);
        } catch {
          reject(new Error("文件解析失败，请确保是有效的 JSON 文件"));
        }
      };
      reader.onerror = () => reject(new Error("文件读取失败"));
      reader.readAsText(file);
    };

    input.click();
  });
}
