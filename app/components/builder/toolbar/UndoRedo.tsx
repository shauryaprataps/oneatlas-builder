export function UndoRedo() {
  return (
    <div className="flex overflow-hidden rounded-xl border border-gray-200">
      <button aria-label="Undo" className="border-r border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
        Undo
      </button>
      <button aria-label="Redo" className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
        Redo
      </button>
    </div>
  );
}
