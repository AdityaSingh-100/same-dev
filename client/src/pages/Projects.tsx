import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import {
  ArrowBigDownDashIcon,
  ArrowLeftIcon,
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
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

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
      <div className="flex items-center justify-center h-screen bg-neutral-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 blur-xl opacity-30 animate-pulse" />
            <Loader2Icon className="relative size-8 animate-spin text-sky-300" />
          </div>
          <p className="text-sm text-slate-400 animate-pulse">Loading project...</p>
        </motion.div>
      </div>
    );
  }

  return project ? (
    <div className="flex h-screen w-full flex-col bg-neutral-950 text-white">
      {/* ─── Top Toolbar ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-20 border-b border-white/[0.06] bg-neutral-950/80 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between px-3 py-2.5 sm:px-4">
          {/* Left: Logo + Project info */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate("/projects")}
              className="group flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 text-xs text-slate-400 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.06] hover:text-slate-200"
            >
              <ArrowLeftIcon size={14} className="transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="hidden h-5 w-px bg-white/[0.08] sm:block" />

            <img
              src={assets.logo}
              alt="logo"
              className="hidden h-5 cursor-pointer sm:block"
              onClick={() => navigate("/")}
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-100 max-w-[180px] sm:max-w-xs">
                {project.name}
              </p>
              <p className="text-[11px] text-slate-500">
                {project.isPublished ? "Published" : "Draft"} · Last saved version
              </p>
            </div>
          </div>

          {/* Center: Device switcher */}
          <div className="hidden rounded-lg border border-white/[0.06] bg-white/[0.02] p-0.5 sm:flex sm:gap-0.5">
            {[
              { key: "phone" as const, icon: SmartphoneIcon, label: "Mobile" },
              { key: "tablet" as const, icon: TabletIcon, label: "Tablet" },
              { key: "desktop" as const, icon: LaptopIcon, label: "Desktop" },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setDevice(key)}
                title={label}
                className={`rounded-md px-2.5 py-1.5 transition-all duration-200 ${
                  device === key
                    ? "bg-white/10 text-sky-300 shadow-sm shadow-sky-500/10"
                    : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
                }`}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2 text-slate-400 transition-all duration-200 hover:bg-white/[0.06] hover:text-white sm:hidden"
            >
              {isMenuOpen ? <XIcon size={16} /> : <MessageSquareIcon size={16} />}
            </button>

            <button
              onClick={saveProject}
              disabled={isSaving}
              className="hidden items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-slate-300 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.06] hover:text-white disabled:opacity-50 sm:flex"
            >
              {isSaving ? (
                <Loader2Icon className="animate-spin" size={14} />
              ) : (
                <SaveIcon size={14} />
              )}
              Save
            </button>

            <Link
              target="_blank"
              to={`/preview/${projectId}`}
              className="hidden items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-slate-300 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.06] hover:text-white sm:inline-flex"
            >
              <FullscreenIcon size={14} /> Preview
            </Link>

            <button
              onClick={downloadCode}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 px-3 py-1.5 font-medium text-white shadow-lg shadow-sky-500/10 transition-all duration-200 hover:from-sky-500 hover:to-blue-500 hover:shadow-sky-500/20"
            >
              <ArrowBigDownDashIcon size={14} />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={togglePublish}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1.5 font-medium text-white shadow-lg shadow-emerald-500/10 transition-all duration-200 hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-500/20"
            >
              {project.isPublished ? (
                <EyeOffIcon size={14} />
              ) : (
                <EyeIcon size={14} />
              )}
              <span className="hidden sm:inline">
                {project.isPublished ? "Unpublish" : "Publish"}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── Main Content ─── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isMenuOpen={isMenuOpen}
          project={project}
          setProject={(p) => setProject(p)}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />

        {/* Preview */}
        <div className="flex-1 p-2 sm:p-3">
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
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-neutral-950">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-500 blur-xl opacity-20" />
        <XIcon className="relative size-10 text-red-400" />
      </div>
      <p className="text-xl font-medium text-slate-200">
        Unable to load project
      </p>
      <button
        onClick={() => navigate("/projects")}
        className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-all duration-200 hover:bg-white/10"
      >
        Back to Projects
      </button>
    </div>
  );
};

export default Projects;
