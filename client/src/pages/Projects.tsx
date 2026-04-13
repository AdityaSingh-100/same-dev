import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import {
  ArrowBigDownDashIcon,
  EyeIcon,
  EyeOffIcon,
  FullscreenIcon,
  LaptopIcon,
  Loader2Icon,
  MessageSquareIcon,
  SaveIcon,
  SmartphoneIcon,
  TabletIcon,
  XIcon,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import ProjectPreview, {
  type ProjectPreviewRef,
} from "../components/ProjectPreview";
import api from "@/configs/axios";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const Projects = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const [isGenerating, setIsGenerating] = useState(true);
  const [device, setDevice] = useState<"phone" | "tablet" | "desktop">(
    "desktop",
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const previewRef = useRef<ProjectPreviewRef>(null);

  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/api/user/project/${projectId}`);
      setProject(data.project);
      setIsGenerating(data.project.current_code ? false : true);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  const saveProject = async () => {
    if (!previewRef.current) return;
    const code = previewRef.current.getCode();
    if (!code) return;
    setIsSaving(true);
    try {
      const { data } = await api.put(`/api/project/save/${projectId}`, {
        code,
      });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  // download code ( index.html )
  const downloadCode = () => {
    const code = previewRef.current?.getCode() || project?.current_code;
    if (!code) {
      if (isGenerating) {
        return;
      }
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "index.html";
    document.body.appendChild(element);
    element.click();
  };

  const togglePublish = async () => {
    try {
      const { data } = await api.get(`/api/user/publish-toggle/${projectId}`);
      toast.success(data.message);
      setProject((prev) =>
        prev ? { ...prev, isPublished: !prev.isPublished } : null,
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchProject();
    } else if (!isPending && !session?.user) {
      navigate("/");
      toast("Please login to view your projects");
    }
  }, [session?.user]);

  useEffect(() => {
    if (project && !project.current_code) {
      const intervalId = setInterval(fetchProject, 10000);
      return () => clearInterval(intervalId);
    }
  }, [project]);

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <Loader2Icon className="size-7 animate-spin text-violet-200" />
        </div>
      </>
    );
  }
  return project ? (
    <div className="section-shell flex h-screen w-full flex-col px-2 pb-2 text-white sm:px-3">
      <div className="glass-card mt-2 flex flex-col gap-4 rounded-2xl px-4 py-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 sm:min-w-[18rem] text-nowrap">
          <img
            src="/favicon.svg"
            alt="logo"
            className="h-6 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="max-w-64 sm:max-w-xs">
            <p className="truncate text-sm font-medium capitalize text-slate-100">
              {project.name}
            </p>
            <p className="-mt-0.5 text-xs text-slate-400">
              Previewing last saved version
            </p>
          </div>
          <div className="sm:hidden flex-1 flex justify-end">
            {isMenuOpen ? (
              <MessageSquareIcon
                onClick={() => setIsMenuOpen(false)}
                className="size-6 cursor-pointer text-slate-300"
              />
            ) : (
              <XIcon
                onClick={() => setIsMenuOpen(true)}
                className="size-6 cursor-pointer text-slate-300"
              />
            )}
          </div>
        </div>

        <div className="hidden rounded-xl border border-white/10 bg-black/30 p-1 sm:flex sm:gap-1.5">
          <button
            onClick={() => setDevice("phone")}
            className={`rounded-lg p-1.5 transition-all duration-300 ${device === "phone" ? "bg-white/15 text-cyan-200" : "text-slate-400 hover:bg-white/10 hover:text-slate-200"}`}
          >
            <SmartphoneIcon className="size-4" />
          </button>

          <button
            onClick={() => setDevice("tablet")}
            className={`rounded-lg p-1.5 transition-all duration-300 ${device === "tablet" ? "bg-white/15 text-cyan-200" : "text-slate-400 hover:bg-white/10 hover:text-slate-200"}`}
          >
            <TabletIcon className="size-4" />
          </button>

          <button
            onClick={() => setDevice("desktop")}
            className={`rounded-lg p-1.5 transition-all duration-300 ${device === "desktop" ? "bg-white/15 text-cyan-200" : "text-slate-400 hover:bg-white/10 hover:text-slate-200"}`}
          >
            <LaptopIcon className="size-4" />
          </button>
        </div>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-2 text-xs sm:text-sm">
          <button
            onClick={saveProject}
            disabled={isSaving}
            className="hidden rounded-lg border border-white/15 bg-white/8 px-3 py-1.5 transition-all duration-300 hover:bg-white/14 max-sm:hidden sm:flex sm:items-center sm:gap-2"
          >
            {isSaving ? (
              <Loader2Icon className="animate-spin" size={15} />
            ) : (
              <SaveIcon size={15} />
            )}{" "}
            Save
          </button>
          <Link
            target="_blank"
            to={`/preview/${projectId}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/8 px-3 py-1.5 transition-all duration-300 hover:bg-white/14"
          >
            <FullscreenIcon size={14} /> Preview
          </Link>
          <button
            onClick={downloadCode}
            className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-200/20 bg-linear-to-r from-sky-600 to-blue-600 px-3 py-1.5 text-white transition-all duration-300 hover:from-sky-500 hover:to-blue-500"
          >
            <ArrowBigDownDashIcon size={14} /> Download
          </button>
          <button
            onClick={togglePublish}
            className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-200/20 bg-linear-to-r from-cyan-600 to-sky-600 px-3 py-1.5 text-white transition-all duration-300 hover:from-cyan-500 hover:to-sky-500"
          >
            {project.isPublished ? (
              <EyeOffIcon size={14} />
            ) : (
              <EyeIcon size={14} />
            )}
            {project.isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-auto pt-2">
        <Sidebar
          isMenuOpen={isMenuOpen}
          project={project}
          setProject={(p) => setProject(p)}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />

        <div className="flex-1 p-2 pl-0">
          <ProjectPreview
            ref={previewRef}
            project={project}
            isGenerating={isGenerating}
            device={device}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl font-medium text-gray-200">
        Unable to load project!
      </p>
    </div>
  );
};

export default Projects;
