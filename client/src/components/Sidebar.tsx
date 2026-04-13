import React, { useEffect, useRef, useState } from "react";
import type { Message, Project, Version } from "../types";
import {
  BotIcon,
  EyeIcon,
  Loader2Icon,
  SendIcon,
  UserIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/configs/axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isMenuOpen: boolean;
  project: Project;
  setProject: (project: Project) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

const Sidebar = ({
  isMenuOpen,
  project,
  setProject,
  isGenerating,
  setIsGenerating,
}: SidebarProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/api/user/project/${project.id}`);
      setProject(data.project);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  const handleRollback = async (versionId: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to rollback to this version?",
      );
      if (!confirm) return;
      setIsGenerating(true);
      const { data } = await api.get(
        `/api/project/rollback/${project.id}/${versionId}`,
      );
      const { data: data2 } = await api.get(`/api/user/project/${project.id}`);
      toast.success(data.message);
      setProject(data2.project);
      setIsGenerating(false);
    } catch (error: any) {
      setIsGenerating(false);
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  const handleRevisions = async (e: React.FormEvent) => {
    e.preventDefault();
    let interval: number | undefined;
    try {
      setIsGenerating(true);
      interval = setInterval(() => {
        fetchProject();
      }, 10000);
      const { data } = await api.post(`/api/project/revision/${project.id}`, {
        message: input,
      });
      fetchProject();
      toast.success(data.message);
      setInput("");
      clearInterval(interval);
      setIsGenerating(false);
    } catch (error: any) {
      setIsGenerating(false);
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
      clearInterval(interval);
    }
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [project.conversation.length, isGenerating]);

  return (
    <div
      className={`h-full border-r border-white/[0.06] bg-neutral-950/60 backdrop-blur-xl transition-all duration-300 sm:max-w-sm ${
        isMenuOpen
          ? "max-sm:w-0 max-sm:overflow-hidden max-sm:border-none"
          : "w-full"
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-3 pt-4">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Conversation
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </div>

          <div className="flex flex-col gap-3 pb-4">
            {[...project.conversation, ...project.versions]
              .sort(
                (a, b) =>
                  new Date(a.timestamp).getTime() -
                  new Date(b.timestamp).getTime(),
              )
              .map((message) => {
                const isMessage = "content" in message;

                if (isMessage) {
                  const msg = message as Message;
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-start gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!isUser && (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-blue-600 shadow-lg shadow-sky-500/10">
                          <BotIcon className="size-3.5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                          isUser
                            ? "rounded-tr-md bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-500/10"
                            : "rounded-tl-md border border-white/[0.06] bg-white/[0.03] text-slate-200"
                        }`}
                      >
                        {msg.content}
                      </div>
                      {isUser && (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                          <UserIcon className="size-3.5 text-slate-400" />
                        </div>
                      )}
                    </motion.div>
                  );
                }

                const ver = message as Version;
                return (
                  <motion.div
                    key={ver.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="my-1 w-[92%] self-center rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="font-medium text-slate-200">Code updated</span>
                      <span className="text-[10px] text-slate-500 ml-auto">
                        {new Date(ver.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      {project.current_version_index === ver.id ? (
                        <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[10px] text-slate-400">
                          Current version
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRollback(ver.id)}
                          className="rounded-md bg-gradient-to-r from-sky-600 to-blue-600 px-2.5 py-1 text-[10px] font-medium text-white transition-all duration-200 hover:from-sky-500 hover:to-blue-500"
                        >
                          Roll back
                        </button>
                      )}
                      <Link
                        target="_blank"
                        to={`/preview/${project.id}/${ver.id}`}
                      >
                        <EyeIcon className="size-6 rounded-md border border-white/[0.06] bg-white/[0.03] p-1 text-slate-400 transition-all duration-200 hover:bg-white/[0.06] hover:text-white" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}

            {/* Typing indicator */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-start gap-2"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-blue-600 shadow-lg shadow-sky-500/10">
                    <BotIcon className="size-3.5 text-white" />
                  </div>
                  <div className="flex items-end gap-1 rounded-2xl rounded-tl-md border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                    <span
                      className="size-1.5 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: "0s" }}
                    />
                    <span
                      className="size-1.5 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="size-1.5 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messageRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-white/[0.06] p-3">
          <form onSubmit={handleRevisions} className="relative">
            <textarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              rows={3}
              placeholder="Describe changes to your website..."
              className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 pr-11 text-sm text-slate-100 outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-sky-500/30 focus:bg-white/[0.03]"
              disabled={isGenerating}
            />
            <button
              disabled={isGenerating || !input.trim()}
              className="absolute bottom-2.5 right-2.5 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 p-1.5 text-white shadow-lg shadow-sky-500/10 transition-all duration-200 hover:from-sky-500 hover:to-blue-500 disabled:opacity-40 disabled:shadow-none"
            >
              {isGenerating ? (
                <Loader2Icon className="size-5 animate-spin" />
              ) : (
                <SendIcon className="size-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
