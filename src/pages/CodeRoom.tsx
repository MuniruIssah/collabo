import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import * as monaco from "monaco-editor";

export default function Room() {
  const { id } = useParams<{ id: string }>();
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!id || !editorRef.current) return;

    const ydocument = new Y.Doc();
    const provider = new WebsocketProvider(
      "wss://demos.yjs.dev/ws",
      id,
      ydocument
    );
    const type = ydocument.getText("monaco");

    const editor = monaco.editor.create(editorRef.current, {
      value: "",
      language: "python",
      theme: "vs-dark",
    });

    new MonacoBinding(
      type,
      editor.getModel()!,
      new Set([editor]),
      provider.awareness
    );

    return () => {
      editor.dispose();
      provider.destroy();
    };
  }, [id]);

  return (
    <div style={{ height: "100vh", width: "100vw" }} ref={editorRef}></div>
  );
}
