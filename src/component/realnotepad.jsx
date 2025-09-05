import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NotePadWindow from "./notepadwindow";

const RealNotePad = () => {
  const [container, setContainer] = useState(null);
  const [newWindow, setNewWindow] = useState(null);

  const openNewWindow = () => {
    const newWin = window.open("", "", "width=230,height=450");
    const div = newWin.document.createElement("div");
    newWin.document.body.appendChild(div);

    setContainer(div);
    setNewWindow(newWin);
  };

  // Close child window if parent unmounts
  useEffect(() => {
    return () => newWindow?.close();
  }, [newWindow]);

  return (
    <>
      <button
        onClick={openNewWindow}
        className="px-4 py-2 rounded-full  text-white font-semibold shadow hover:bg-blue-600 transition"
      >
        real notepad
      </button>

      {container && createPortal(<NotePadWindow />, container)}
    </>
  );
};

export default RealNotePad;
