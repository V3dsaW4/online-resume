import { memo, useRef } from "react";
import { useResumeStore } from "../store/resumeStore";
import { compressImage } from "../utils/image";

export const PhotoUpload = memo(function PhotoUpload() {
  const photo = useResumeStore((s) => s.data.basics.photo);
  const setBasics = useResumeStore((s) => s.setBasics);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await compressImage(file);
      setBasics({ photo: base64 });
    } catch {
      alert("图片处理失败，请重试");
    }
  };

  const handleRemove = () => {
    setBasics({ photo: "" });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-20 h-[106px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
        {photo ? (
          <img src={photo} alt="头像" className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-gray-400 text-center px-1">证件照</span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="photo-upload"
      />
      <div className="flex gap-1">
        <label
          htmlFor="photo-upload"
          className="text-xs text-blue-500 cursor-pointer hover:text-blue-600 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-50"
        >
          上传
        </label>
        {photo && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs text-red-400 hover:text-red-600 px-2 py-0.5 rounded border border-red-200 hover:bg-red-50"
          >
            删除
          </button>
        )}
      </div>
    </div>
  );
});