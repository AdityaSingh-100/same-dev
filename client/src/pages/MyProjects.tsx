import React, { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/configs/axios";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

const MyProjects = () => {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/api/user/projects");
      setProjects(data.projects);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this project?",
      );
      if (!confirm) return;
      const { data } = await api.delete(`/api/project/${projectId}`);
      toast.success(data.message);
      fetchProjects();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (session?.user && !isPending) {
      fetchProjects();
    } else if (!isPending && !session?.user) {
      navigate("/");
      toast("Please login to view your projects");
    }
  }, [session?.user]);
  return (
    <section className="section-shell relative px-4 pb-20 pt-10 md:px-10 lg:px-16 xl:px-24">
      <div className="aurora-spot animate-aurora -left-10 top-24 h-72 w-72 bg-cyan-400/30" />
      <div className="aurora-spot animate-aurora right-0 top-52 h-72 w-72 bg-blue-500/28 [animation-delay:1.5s]" />

      <div className="mx-auto w-full max-w-[1400px]">
        {loading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader2Icon className="size-7 animate-spin text-indigo-200" />
          </div>
        ) : projects.length > 0 ? (
          <div className="py-10 min-h-[80vh]">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="premium-chip mb-3 inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                  Workspace
                </p>
                <h1 className="text-3xl font-semibold text-gradient md:text-4xl">
                  My Projects
                </h1>
              </div>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/20 bg-linear-to-r from-sky-600 to-blue-600 px-3 py-2 text-sm text-white transition-all duration-300 hover:scale-[1.02] hover:from-sky-500 hover:to-blue-500 sm:px-6"
              >
                <PlusIcon size={18} /> Create New
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <div
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="glass-card hover-lift group relative cursor-pointer overflow-hidden rounded-2xl"
                  >
                    <div className="relative h-44 w-full overflow-hidden border-b border-white/10 bg-slate-950/80">
                      {project.current_code ? (
                        <iframe
                          srcDoc={project.current_code}
                          className="absolute top-0 left-0 w-[1200px] h-[800px] origin-top-left pointer-events-none"
                          sandbox="allow-scripts allow-same-origin"
                          style={{ transform: "scale(0.25)" }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-500">
                          <p>No Preview</p>
                        </div>
                      )}
                    </div>

                    <div className="p-4 text-white">
                      <div className="flex items-start justify-between">
                        <h2 className="line-clamp-2 text-lg font-semibold">
                          {project.name}
                        </h2>
                        <button className="premium-chip ml-2 mt-1 rounded-full px-2.5 py-0.5 text-[11px] text-slate-200">
                          Website
                        </button>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                        {project.initial_prompt}
                      </p>

                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-6 flex items-center justify-between"
                      >
                        <span className="text-xs text-slate-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2 text-white text-sm">
                          <button
                            onClick={() => navigate(`/preview/${project.id}`)}
                            className="rounded-lg border border-white/10 bg-white/7 px-3 py-1.5 text-xs transition-all duration-300 hover:bg-white/14"
                          >
                            Preview
                          </button>

                          <button
                            onClick={() => navigate(`/projects/${project.id}`)}
                            className="rounded-lg border border-white/10 bg-white/7 px-3 py-1.5 text-xs transition-all duration-300 hover:bg-white/14"
                          >
                            Open
                          </button>
                        </div>
                      </div>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <TrashIcon
                        className="absolute right-3 top-3 size-7 scale-0 rounded-lg border border-red-200/20 bg-black/70 p-1.5 text-red-400 transition-all duration-300 group-hover:scale-100"
                        onClick={() => deleteProject(project.id)}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="text-3xl font-semibold text-slate-200">
              You have no projects yet
            </h1>
            <button
              onClick={() => navigate("/")}
              className="mt-5 rounded-xl border border-cyan-200/20 bg-linear-to-r from-sky-600 to-blue-600 px-5 py-2 text-white transition-all duration-300 hover:scale-[1.02] hover:from-sky-500 hover:to-blue-500"
            >
              Create New
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyProjects;
