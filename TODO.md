# TODO - Stage 8 Interactive Page Builder

## Plan summary
Implement per-page component instances with HTML5 drag-and-drop, live inspector editing, and delete/duplicate actions while keeping BuilderContext architecture.

## Steps
1. Update `app/components/builder/types.ts`: add `ComponentInstance` type; extend `Page` to store `instances`.
2. Update `app/components/builder/store/BuilderContext.tsx`: add `ui.selectedInstanceId`, add selection helper, and add instance CRUD helpers that update the selected page.
3. Update `app/components/builder/canvas/BuilderCanvas.tsx`:
   - render instances as real components on the canvas
   - implement HTML5 drag from ComponentLibrary items
   - on drop, create instance at drop coordinates in the selected page
   - select instance on click
4. Update `app/components/builder/inspector/ComponentInspector.tsx` and `InspectorPanel.tsx` to edit `ComponentInstance` fields live (text/width/height/padding/margin).
5. Add delete + duplicate UI actions in inspector.
6. Wire `ComponentLibrary` items to enable HTML5 drag with component id payload.
7. Run `npm run lint -- --max-warnings=0` and `npm run build`.
8. Produce screenshots of Design workspace after: add instance via drag/drop, edit in inspector, delete/duplicate.

## Progress
- Stage 7 fix completed.
- Stage 8 implementation pending code changes.

