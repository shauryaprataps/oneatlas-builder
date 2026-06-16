import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
        <AlertTriangle className="h-5 w-5" />
      </span>
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500">{message}</p>
      <button
        className="mt-4 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
        onClick={onRetry}
        type="button"
      >
        Retry
      </button>
    </div>
  );
}
