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
      className={`h-full rounded-2xl border border-white/10 bg-slate-950/65 backdrop-blur-xl transition-all sm:max-w-sm ${
        isMenuOpen
          ? "max-sm:w-0 max-sm:overflow-hidden max-sm:border-none"
          : "w-full"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto no-scrollbar px-3 pt-3">
          <p className="premium-chip mb-4 inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">
            Conversation
          </p>

          <div className="flex flex-col gap-4 pb-4">
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
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!isUser && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-200/20 bg-linear-to-br from-sky-600 to-blue-600">
                          <BotIcon className="size-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${isUser ? "rounded-tr-sm bg-linear-to-r from-sky-600 to-blue-600 text-white" : "rounded-tl-sm border border-white/10 bg-white/8 text-slate-100"}`}
                      >
                        {msg.content}
                      </div>
                      {isUser && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-800">
                          <UserIcon className="size-4 text-slate-200" />
                        </div>
                      )}
                    </div>
                  );
                }

                const ver = message as Version;
                return (
                  <div
                    key={ver.id}
                    className="glass-card my-2 w-[90%] self-center rounded-xl p-3 text-slate-100"
                  >
                    <div className="text-xs font-medium">
                      Code updated
                      <br />
                      <span className="text-[11px] font-normal text-slate-400">
                        {new Date(ver.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      {project.current_version_index === ver.id ? (
                        <button className="rounded-md border border-white/10 bg-white/7 px-2.5 py-1 text-[11px] text-slate-300">
                          Current version
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRollback(ver.id)}
                          className="rounded-md border border-cyan-200/20 bg-linear-to-r from-sky-600 to-blue-600 px-2.5 py-1 text-[11px] text-white transition-all duration-300 hover:from-sky-500 hover:to-blue-500"
                        >
                          Roll back
                        </button>
                      )}
                      <Link
                        target="_blank"
                        to={`/preview/${project.id}/${ver.id}`}
                      >
                        <EyeIcon className="size-6 rounded-md border border-white/10 bg-white/7 p-1 transition-all duration-300 hover:bg-white/14" />
                      </Link>
                    </div>
                  </div>
                );
              })}

            {isGenerating && (
              <div className="flex items-start gap-2.5 justify-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-200/20 bg-linear-to-br from-sky-600 to-blue-600">
                  <BotIcon className="size-4 text-white" />
                </div>
                <div className="flex h-full items-end gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <span
                    className="size-2 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="size-2 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="size-2 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            )}

            <div ref={messageRef} />
          </div>
        </div>

        <form onSubmit={handleRevisions} className="m-3 relative">
          <div className="relative">
            <textarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              rows={4}
              placeholder="Describe your website or request changes..."
              className="premium-input w-full resize-none rounded-xl p-3 pr-11 text-sm text-slate-100 outline-none transition-all duration-300 placeholder:text-slate-500"
              disabled={isGenerating}
            />
            <button
              disabled={isGenerating || !input.trim()}
              className="absolute bottom-2.5 right-2.5 rounded-full border border-cyan-200/20 bg-linear-to-r from-sky-600 to-blue-600 text-white transition-all duration-300 hover:from-sky-500 hover:to-blue-500 disabled:opacity-60"
            >
              {isGenerating ? (
                <Loader2Icon className="size-7 p-1.5 animate-spin text-white" />
              ) : (
                <SendIcon className="size-7 p-1.5 text-white" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
