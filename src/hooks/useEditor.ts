"use client";

import { useEffect, useRef, useState } from "react";
import { ILanguageInterface } from "@/interfaces/LanguageInterface";

const useEditor = () => {
  const [dataLanguange, setDataLanguange] = useState<ILanguageInterface>({
    html: {
      language: "html",
      label: "HTML",
      color: "text-orange-600",
      value: `<h1 data-time="50">Bem vindo ao ykCODE</h1>
<p data-time="100">crie, edite e visualize seu código em tempo real</p>
   <div>
         <span data-time="10">feito com ❤️ por DanielRocha</span>
        
   </div>
`,
    },
    css: {
      language: "css",
      label: "CSS",
      color: "text-blue-600",
      value: `body {
font-family: Arial, sans-serif;
background-color: #f0f0f0;
margin: 0;
padding: 0;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 20px;
height: 100vh;
}
      
h1 {
color: #1F1F1F;
}
      
p {
color: #2f2f2f;
 font-size: 1.2rem;
}

p:after{
  content:"|";
  opacity: 0;
  animation: blink .5s infinite ;
}

@keyframes blink{
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
      
div {
display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
background-color: #1f1f1f;
padding: 10px 50px;
 border-radius: 20px;
color: white;
}
      
a {
  color: #e93939;
 }
`,
    },
    js: {
      language: "js",
      label: "JS",
      color: "text-yellow-600",
      value: `let index = 0;

      const typeWriter = (element, text) => {
        element.innerHTML = "";
        const speed = parseInt(element.dataset.time);
      
        let charIndex = 0;
        const typing = () => {
          if (charIndex < text.length) {
            element.innerHTML += text.charAt(charIndex);
            charIndex++;
            setTimeout(typing, speed, speed);
          }
        };
        typing();
      };
      
      const h1 = document.querySelector("h1");
      const p = document.querySelector("p");
      const span = document.querySelector("span");
      const a = document.querySelector("a");
      
      typeWriter(h1, h1.innerHTML);
      typeWriter(p, p.innerHTML);
      typeWriter(span, span.innerHTML)
      typeWriter(a, a.innerHTML)`,
    },
  });

  const consoleRef = useRef<HTMLDivElement>(null);
  const [viewLanguange, SetviewLanguange] = useState<string>("html");

  const [viewEdit, SetviewEdit] = useState<boolean>(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [viewConsole, SetviewCOnsole] = useState<boolean>(false);

  const redirectConsoleLog = (
    setOutput: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const originalLog = console.log;

    console.log = (...args) => {
      setOutput((prev) => [...prev, args.join(" ")]);
      originalLog(...args);
    };
  };

  const executeCode = (
    dataLanguange: ILanguageInterface,
    setOutput: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    try {
      redirectConsoleLog(setOutput);
      const JsCode = dataLanguange.js.value;
      eval(String(JsCode));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setConsoleOutput((prev) => [...prev, `${error.message}`]);
      }
    }
  };

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
    executeCode(dataLanguange, setConsoleOutput);
  }, [dataLanguange]);

  const handleEditorChange = (newValue: string, language: string) => {
    if (newValue !== undefined) {
      setDataLanguange((prevState) => ({
        ...prevState,
        [language]: { value: newValue.replace( /document\./g, 
        'body').replace(/window\./g, 'body')},
      }));
    }
  };

  const handleViewEdit = () => {
    SetviewEdit(!viewEdit);
  };

  return {
    consoleRef,
    dataLanguange,
    viewLanguange,
    consoleOutput,
    SetviewLanguange,
    setConsoleOutput,
    setDataLanguange,
    viewConsole,
    SetviewCOnsole,
    handleEditorChange,
    handleViewEdit,
    viewEdit,
  };
};

export default useEditor;
