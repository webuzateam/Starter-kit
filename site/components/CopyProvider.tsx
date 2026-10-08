"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type CopyState = { copied: string | null; copy: (text: string) => void };

const CopyContext = createContext<CopyState | null>(null);

async function writeClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Доступ к буферу запрещён — пробуем запасной путь ниже.
    }
  }
  // Запасной путь для браузеров без Clipboard API, вне HTTPS или при запрете доступа.
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  if (!ok) throw new Error("copy failed");
}

export function CopyProvider({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback((text: string) => {
    window.clearTimeout(timer.current);
    writeClipboard(text)
      .then(() => {
        setCopied(text);
        setMessage(`Скопировано: ${text}`);
      })
      .catch(() => {
        setCopied(null);
        setMessage("Не удалось скопировать — выделите текст вручную");
      })
      .finally(() => {
        timer.current = window.setTimeout(() => {
          setCopied(null);
          setMessage(null);
        }, 2200);
      });
  }, []);

  return (
    <CopyContext.Provider value={{ copied, copy }}>
      {children}
      <div className={`copy-toast ${message ? "show" : ""}`} role="status" aria-live="polite">{message}</div>
    </CopyContext.Provider>
  );
}

export function useCopy() {
  const context = useContext(CopyContext);
  if (!context) throw new Error("useCopy must be used inside CopyProvider");
  return context;
}

type CopyButtonProps = {
  text: string;
  className?: string;
  /** Содержимое кнопки в обычном состоянии. */
  children: ReactNode;
  /** Содержимое сразу после успешного копирования. */
  copiedChildren?: ReactNode;
  label?: string;
};

export function CopyButton({ text, className, children, copiedChildren, label }: CopyButtonProps) {
  const { copied, copy } = useCopy();
  return (
    <button type="button" className={className} onClick={() => copy(text)} aria-label={label ?? `Скопировать: ${text}`}>
      {copied === text && copiedChildren !== undefined ? copiedChildren : children}
    </button>
  );
}
