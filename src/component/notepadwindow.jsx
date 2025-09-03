import { useState } from "react";

const NotePadWindow = () => {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [verification, setVerification] = useState("");
  const [issue, setIssue] = useState("");
  const [resolution, setResolution] = useState("");

  const handleCopyAll = (e) => {
    const doc = e?.target?.ownerDocument || document;
    const win = doc.defaultView || window;

    const content = `
Name/Caller: ${name}
Relationship to account holder: ${relationship}
Verification: ${verification}

Issue/Concern:
${issue}

Resolution Provided:
${resolution}
  `.trim();

    try {
      if (win.navigator?.clipboard?.writeText) {
        win.navigator.clipboard.writeText(content).then(() => {
          alert("Copied all fields!");
        });
        return;
      }
    } catch {}

    // fallback for older browsers
    try {
      const ta = doc.createElement("textarea");
      ta.value = content;
      doc.body.appendChild(ta);
      ta.select();
      doc.execCommand("copy");
      doc.body.removeChild(ta);
      alert("Copied all fields (fallback)!");
    } catch (err) {
      alert("Failed to copy notes: " + err);
    }
  };

  const handleClearAll = () => {
    setName("");
    setRelationship("");
    setVerification("");
    setIssue("");
    setResolution("");
  };

  return (
    <div className="h-full w-full p-4 flex flex-col">
      <h1 className="text-lg font-bold mb-2">Real Notepad</h1>

      {/* Top inputs */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-semibold">Name/Caller:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter name or caller"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">
            Relationship to account holder:
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter relationship"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Verification:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter verification details"
            value={verification}
            onChange={(e) => setVerification(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom expanding area */}
      <div className="flex-1 mt-4 flex flex-col space-y-3">
        <div className="flex-1 flex flex-col">
          <label className="block text-sm font-semibold">Issue/Concern:</label>
          <textarea
            className="flex-1 border p-2 rounded resize-none"
            placeholder="Enter issue or concern"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col flex-1">
          <label className="block text-sm font-semibold mb-1">
            Resolution Provided:
          </label>
          <textarea
            className="border p-2 rounded resize-none flex-1"
            placeholder="Enter resolution provided"
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleCopyAll}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Copy All
        </button>
        <button
          onClick={handleClearAll}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default NotePadWindow;
