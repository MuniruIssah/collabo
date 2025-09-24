import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [rooms, setRooms] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("rooms") || "[]")
  );
  const navigate = useNavigate();

  const addRoom = () => {
    const id = `tfscollabo-${crypto.randomUUID()}`;
    setRooms((prev) => [...prev, id]);
    navigate(`/room/${id}`);
  };

  const deleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((r) => r !== id));
  };

  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex flex-col gap-10 items-center my-10">
        <h1 className="pacifico-regular text-7xl font-bold font-mono">
          Code-llaboration
        </h1>

        <button
          onClick={addRoom}
          className="px-8 py-3 text-sm rounded bg-yellow-900 hover:bg-yellow-700 transition mb-8"
        >
          Create New Room
        </button>
      </div>

      <h2 className="text-3xl font-semibold font-mono mb-8 pacifico-regular">Saved Code-llabs</h2>

      {rooms.length === 0 ? (
        <p className="text-gray-400">
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
  );
}
