import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [rooms, setRooms] = useState<string[]>([]);
  const navigate = useNavigate();

  // Load saved rooms from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("rooms") || "[]");
    setRooms(saved);
  }, []);

  // Init Monaco editor
  useEffect(() => {
    if (!editorRef.current) return;
    const editor = monaco.editor.create(editorRef.current, {
      value:
        "Welcome to Code-llaborate\nClick the button above to create and join a new code-lab, or join one below",
      theme: "vs-dark",
      automaticLayout: true,
      fontSize:18,
      minimap: { enabled: false },
    });
    return () => editor.dispose();
  }, []);

  const createRoom = () => {
    const id = `tfscollabo-${crypto.randomUUID()}`;
    const newRooms = [...rooms, id];
    setRooms(newRooms);
    localStorage.setItem("rooms", JSON.stringify(newRooms));
    navigate(`/room/${id}`);
  };

  const deleteRoom = (id: string) => {
    const updated = rooms.filter((r) => r !== id);
    setRooms(updated);
    localStorage.setItem("rooms", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="pacifico-regular text-2xl font-bold font-mono">
          Code-llaborate
        </h1>{" "}
        <button
          onClick={createRoom}
          className="px-4 text-sm py-2 bg-neutral-900 hover:bg-slate-800 text-white"
        >
          New Code-llab
        </button>
      </div>

      {/* Monaco editor */}
      <div className="border border-black overflow-hidden h-60">
        <div ref={editorRef} className="w-full h-full" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold my-8 pacifico-regular">
          Saved Code-llabs
        </h2>
        {rooms.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No rooms yet. Click “Create New Room” to start.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((r) => (
              <div
                key={r}
                onClick={() => navigate(`/room/${r}`)}
                className="bg-black rounded-lg p-4 flex flex-col justify-between shadow-md"
              >
                <small className="block mb-2 text-slate-400">Code Room</small>
                <p className="font-mono break-all text-sm mb-5">{r}</p>
                <div className="flex gap-3">
                  <a
                    href={`/room/${r}`}
                    className="flex-1 text-center bg-yellow-800 hover:bg-yellow-900 transition px-3 py-2 rounded-md text-sm"
                  >
                    Join
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRoom(r);
                    }}
                    className="bg-red-800 hover:bg-red-700 transition px-3 py-2 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
