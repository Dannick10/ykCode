"use client";

import Editor from "@/components/NoteEditor";
import useEditor from "@/hooks/useEditor";

export default function Home() {
  const {
    SetviewCOnsole,
    consoleOutput,
    setConsoleOutput,
    dataLanguange,
    handleEditorChange,
    viewConsole,
    viewLanguange,
    SetviewLanguange,
    consoleRef,
  } = useEditor();

  const compileCode = () => `
  <html>
  <head>
    <style>${dataLanguange.css.value}</style>
  </head>
  <body>
    ${dataLanguange.html.value}
  </body>
  <script>${dataLanguange.js.value}</script>
</html>
`;

  return (
    <div className="codepen-clone flex flex-col h-screen">
      <div className="w-full flex gap-4">
        {[
          { lang: "html", label: "HTML", color: "text-orange-600" },
          { lang: "css", label: "CSS", color: "text-blue-600" },
          { lang: "js", label: "JS", color: "text-yellow-600" },
        ].map(({ lang, label, color }) => (
          <p
            key={lang}
            className={`${color} cursor-pointer transition-all ${
              viewLanguange === lang
                ? "bg-white rounded-md px-2 min-w-16 text-center"
                : ""
            }`}
            onClick={() => SetviewLanguange(lang)}
          >
            {label}
          </p>
        ))}
      </div>

      <div className="bg-[#0E0E0E] flex flex-wrap resize-y overflow-auto max-h-[300px]">
        {viewLanguange === "html" && (
          <Editor
            language="html"
            value={dataLanguange.html.value}
            SetLanguage={(value) => handleEditorChange(String(value), "html")}
            defaultValue=""
          />
        )}
        {viewLanguange === "css" && (
          <Editor
            language="css"
            value={dataLanguange.css.value}
            SetLanguage={(value) => handleEditorChange(String(value), "css")}
            defaultValue=""
          />
        )}
        {viewLanguange === "js" && (
          <Editor
            language="javascript"
            value={dataLanguange.js.value}
            SetLanguage={(value) => handleEditorChange(String(value), "js")}
            defaultValue=""
          />
        )}
      </div>

      <div className="w-full flex-1 bg-[#0E0E0E] border-t-8 py-2 border-2 border-[#0A0A0A]">
        <div className="h-full relative flex ">
          <iframe
            id="preview"
            sandbox="allow-scripts allow-same-origin"
            srcDoc={compileCode()}
            style={{ width: "100%", height: "100%" }}
            className="flex flex-col"
          />
        </div>

        <div
          className={`flex flex-col justify-end items-center absolute bottom-0 left-0 bg-[#0A0A0A] transition-all ${
            viewConsole ? "fixed w-full" : ""
          }`}
        >
          <div
            className="text-sm py-2 cursor-pointer flex justify-between items-center w-full px-8"
          >
            <h2 onClick={() => SetviewCOnsole(!viewConsole)}>Console</h2>
            {viewConsole && (
              <button className="bg-red-800 p-2 rounded-md" onClick={() => setConsoleOutput([])}>
                Limpar console
              </button>
            )}
          </div>

          {viewConsole && (
            <div
              ref={consoleRef}
              className="transition-all w-full z-10 bottom-0 bg-[#2222] text-white p-4 pb-8 h-32 overflow-y-auto flex flex-col"
            >
              {consoleOutput.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
