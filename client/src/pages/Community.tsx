import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/configs/axios";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Community = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/api/project/published");
      setProjects(data.projects);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <section className="section-shell relative px-4 pb-20 pt-10 md:px-10 lg:px-16 xl:px-24">
      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        {loading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader2Icon className="size-7 animate-spin text-zinc-300" />
          </div>
        ) : projects.length > 0 ? (
          <div className="py-10 min-h-[80vh]">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="premium-chip mb-3 inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                  Community
                </p>
                <h1 className="text-3xl font-semibold text-gradient md:text-4xl">
                  Published Projects
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.36, delay: index * 0.05 }}
                >
                  <Link
                    to={`/view/${project.id}`}
                    target="_blank"
                    className="glass-card hover-lift group block cursor-pointer overflow-hidden rounded-2xl"
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

                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2 text-white text-sm">
                          <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-2.5 py-1.5 text-xs transition-all duration-300 hover:bg-white/20">
                            <span className="flex size-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-black">
                              {project.user?.name?.slice(0, 1)}
                            </span>
                            {project.user?.name}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="text-3xl font-semibold text-slate-200">
              No public projects yet
            </h1>
            <button
              onClick={() => navigate("/")}
              className="mt-5 rounded-xl border border-white/20 bg-white px-5 py-2 text-black font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-200"
            >
              Create New
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Community;
