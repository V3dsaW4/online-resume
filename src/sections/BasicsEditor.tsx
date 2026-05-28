import { memo } from "react";
import { useResumeStore } from "../store/resumeStore";
import { PhotoUpload } from "../components/PhotoUpload";

export const BasicsEditor = memo(function BasicsEditor() {
  const basics = useResumeStore((s) => s.data.basics);
  const setBasics = useResumeStore((s) => s.setBasics);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <h3 className="font-semibold text-gray-800 text-sm">个人信息</h3>
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-0.5">姓名</label>
              <input
                className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                value={basics.name}
                onChange={(e) => setBasics({ name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-0.5">求职岗位</label>
              <input
                className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                value={basics.position}
                onChange={(e) => setBasics({ position: e.target.value })}
                placeholder="目标岗位 | 随时到岗"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-0.5">年龄</label>
              <input
                className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                value={basics.age}
                onChange={(e) => setBasics({ age: e.target.value })}
                placeholder="22"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-0.5">性别</label>
              <input
                className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                value={basics.gender}
                onChange={(e) => setBasics({ gender: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-0.5">电话</label>
              <input
                className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                value={basics.phone}
                onChange={(e) => setBasics({ phone: e.target.value })}
                placeholder="138-0000-0000"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-0.5">邮箱</label>
              <input
                className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                value={basics.email}
                onChange={(e) => setBasics({ email: e.target.value })}
                placeholder="you@example.com"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-500 mb-0.5">个人博客</label>
              <input
                className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                value={basics.blog}
                onChange={(e) => setBasics({ blog: e.target.value })}
                placeholder="https://yourblog.com"
              />
            </div>
          </div>
        </div>
        <PhotoUpload />
      </div>
    </div>
  );
});