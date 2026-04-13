import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import ProjectPreview from "../components/ProjectPreview";
import type { Project } from "../types";
import api from "@/configs/axios";
import { toast } from "sonner";

const View = () => {
  const { projectId } = useParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCode = async () => {
    try {
      const { data } = await api.get(`/api/project/published/${projectId}`);
      setCode(data.code);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCode();
  }, []);

  if (loading) {
    return (
      <div className="section-shell flex h-screen items-center justify-center">
        <Loader2Icon className="size-7 animate-spin text-indigo-200" />
      </div>
    );
  }

  return (
    <div className="section-shell h-screen p-2 sm:p-3">
      <div className="glass-card flex h-full flex-col overflow-hidden rounded-2xl">
        <div className="border-b border-white/10 px-4 py-3 text-xs text-slate-400">
          Published Project
        </div>
        <div className="flex-1 p-2">
          {code && (
            <ProjectPreview
              project={{ current_code: code } as Project}
              isGenerating={false}
              showEditorPanel={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
