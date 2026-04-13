import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface EditorPanelProps {
  selectedElement: {
    tagName: string;
    className: string;
    text: string;
    styles: {
      padding: string;
      margin: string;
      backgroundColor: string;
      color: string;
      fontSize: string;
    };
  } | null;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

const EditorPanel = ({
  selectedElement,
  onUpdate,
  onClose,
}: EditorPanelProps) => {
  const [values, setValues] = useState(selectedElement);

  useEffect(() => {
    setValues(selectedElement);
  }, [selectedElement]);

  if (!selectedElement || !values) return null;

  const handleChange = (field: string, value: string) => {
    const newValues = { ...values, [field]: value };
    if (field in values.styles) {
      newValues.styles = { ...values.styles, [field]: value };
    }
    setValues(newValues);
    onUpdate({ [field]: value });
  };

  const handleStyleChange = (styleName: string, value: string) => {
    const newStyles = { ...values.styles, [styleName]: value };
    setValues({ ...values, styles: newStyles });
    onUpdate({ styles: { [styleName]: value } });
  };

  return (
    <div className="glass-card absolute right-4 top-4 z-50 w-88 animate-fade-in rounded-2xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide text-slate-100">
          Edit Element
        </h3>
        <button
          onClick={onClose}
          className="rounded-full border border-white/10 p-1.5 transition-colors hover:bg-white/10"
        >
          <X className="h-4 w-4 text-slate-300" />
        </button>
      </div>
      <div className="space-y-4 text-slate-100">
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Text Content
          </label>
          <textarea
            value={values.text}
            onChange={(e) => handleChange("text", e.target.value)}
            className="premium-input min-h-20 w-full rounded-lg p-2 text-sm text-slate-100 outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Class Name
          </label>
          <input
            type="text"
            value={values.className || ""}
            onChange={(e) => handleChange("className", e.target.value)}
            className="premium-input w-full rounded-lg p-2 text-sm text-slate-100 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Padding
            </label>
            <input
              type="text"
              value={values.styles.padding}
              onChange={(e) => handleStyleChange("padding", e.target.value)}
              className="premium-input w-full rounded-lg p-2 text-sm text-slate-100 outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Margin
            </label>
            <input
              type="text"
              value={values.styles.margin}
              onChange={(e) => handleStyleChange("margin", e.target.value)}
              className="premium-input w-full rounded-lg p-2 text-sm text-slate-100 outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Font Size
            </label>
            <input
              type="text"
              value={values.styles.fontSize}
              onChange={(e) => handleStyleChange("fontSize", e.target.value)}
              className="premium-input w-full rounded-lg p-2 text-sm text-slate-100 outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Background
            </label>
            <div className="premium-input flex items-center gap-2 rounded-lg p-1.5">
              <input
                type="color"
                value={
                  values.styles.backgroundColor === "rgba(0, 0, 0, 0)"
                    ? "#ffffff"
                    : values.styles.backgroundColor
                }
                onChange={(e) =>
                  handleStyleChange("backgroundColor", e.target.value)
                }
                className="h-6 w-6 cursor-pointer rounded"
              />
              <span className="truncate text-xs text-slate-400">
                {values.styles.backgroundColor}
              </span>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Text Color
            </label>
            <div className="premium-input flex items-center gap-2 rounded-lg p-1.5">
              <input
                type="color"
                value={values.styles.color}
                onChange={(e) => handleStyleChange("color", e.target.value)}
                className="h-6 w-6 cursor-pointer rounded"
              />
              <span className="truncate text-xs text-slate-400">
                {values.styles.color}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
