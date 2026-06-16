import type { ReactNode } from "react";

interface NodeCanvasProps {
  children?: ReactNode;
}

export function NodeCanvas({ children }: NodeCanvasProps) {
  return (
    <div className="min-h-[30rem] overflow-auto rounded-xl bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px] p-8">
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}
