"use client";

import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface Toast extends ToastInput {
  id: string;
}

interface ToastContextValue {
  toast: (input: ToastInput) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<
  ToastVariant,
  { icon: typeof Info; className: string }
> = {
  success: { icon: CheckCircle2, className: "text-emerald-600 bg-emerald-50" },
  error: { icon: AlertCircle, className: "text-red-600 bg-red-50" },
  info: { icon: Info, className: "text-blue-600 bg-blue-50" },
  warning: { icon: TriangleAlert, className: "text-amber-600 bg-amber-50" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { ...input, id }]);
    return id;
  }, []);

  const value = useMemo(
    () => ({ toast, dismissToast }),
    [dismissToast, toast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2"
      >
        {toasts.map((item) => {
          const variant = item.variant ?? "info";
          const { icon: Icon, className } = toastStyles[variant];

          return (
            <div
              key={item.id}
              className="pointer-events-auto flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-xl shadow-gray-950/10"
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${className}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                {item.description && (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {item.description}
                  </p>
                )}
              </div>
              <button
                aria-label="Dismiss notification"
                className="h-fit rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => dismissToast(item.id)}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider.");
  }

  return context;
}
