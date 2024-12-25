"use client";

import Editor from "@/components/NoteEditor";
import useEditor from "@/hooks/useEditor";
import Console from "@/components/Console";
import Preview from "@/components/Preview";

export default function Home() {
  const {
    SetviewCOnsole,
    consoleOutput,
    setConsoleOutput,
    setDataLanguange,
    dataLanguange,
    handleEditorChange,
    viewConsole,
    viewLanguange,
    SetviewLanguange,
    consoleRef,
    handleViewEdit,
    viewEdit,
  } = useEditor();

  return (
    <div className="codepen-clone flex flex-col h-screen">
      <div className="w-full justify-between px-2 flex gap-4">
        <div className="flex gap-4">
          {[
            { lang: "html", label: "HTML", color: "text-orange-600" },
            { lang: "css", label: "CSS", color: "text-blue-600" },
            { lang: "js", label: "JS", color: "text-yellow-600" },
          ].map(({ lang, label, color }) => (
            <p
              key={lang}
              className={`${color} cursor-pointer transition-all ${
                viewLanguange === lang
                  ? "bg-white rounded-md px-2 min-w-16 text-center flex justify-center items-center"
                  : ""
              }`}
              onClick={() => SetviewLanguange(lang)}
            >
              {label}
            </p>
          ))}
        </div>

        <div className="relative">
          <div
            className="cursor-pointer px-4 py-2 rounded-md"
            tabIndex={0}
            onClick={() => handleViewEdit()}
          >
            ...
          </div>
          {viewEdit && (
            <div
              className="absolute top-8 justify-start right-0  z-50 bg-white shadow-md rounded-md mt-2 transition-all"
              onClick={() =>
                setDataLanguange((prev) => ({
                  ...prev,
                  [viewLanguange]: { value: "" },
                }))
              }
            >
              <ul className="text-black min-w-[120px] text-center">
                <li
                  className="hover:bg-gray-200 cursor-pointer py-2"
                  onClick={handleViewEdit}
                >
                  limpar{" "}
                  {viewLanguange === "html"
                    ? "HTML"
                    : viewLanguange === "css"
                    ? "CSS"
                    : "JS"}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#0E0E0E] flex flex-wrap resize-y overflow-auto max-h-[300px]">
        {viewLanguange === "html" && (
          <Editor
            language="html"
            value={String(dataLanguange.html.value)}
            SetLanguage={(value) => handleEditorChange(String(value), "html")}
            defaultValue=""
          />
        )}
        {viewLanguange === "css" && (
          <Editor
            language="css"
            value={String(dataLanguange.css.value)}
            SetLanguage={(value) => handleEditorChange(String(value), "css")}
            defaultValue=""
          />
        )}
        {viewLanguange === "js" && (
          <Editor
            language="javascript"
            value={String(dataLanguange.js.value)}
            SetLanguage={(value) => handleEditorChange(String(value), "js")}
            defaultValue=""
          />
        )}
      </div>

      <div className="w-full flex-1 bg-[#0E0E0E] border-t-8 py-2 border-2 border-[#0A0A0A]">
        <div className="h-full relative flex ">
          <Preview dataLanguange={dataLanguange} />
        </div>

        <div
          className={`flex flex-col justify-end items-center  bottom-0 left-0 bg-[#0A0A0A] transition-all rounded `}
        >
          <div className="text-sm  flex justify-between items-center w-full py-2 px-8">
            <div>
              <button
                className="bg-blue-800 min-w-32 p-2 rounded-md"
                onClick={() => {
                  SetviewCOnsole(!viewConsole);
                }}
              >
                Console
              </button>
            </div>
            <div className="flex gap-4">
              {viewConsole && (
                <button
                  className="bg-red-800 p-2 rounded-md"
                  onClick={() => setConsoleOutput([])}
                >
                  Limpar console
                </button>
              )}
            </div>
          </div>

          {viewConsole && (
            <Console consoleRef={consoleRef} consoleOutput={consoleOutput} />
          )}
        </div>
      </div>
    </div>
  );
}
