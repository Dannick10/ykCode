"use client";

import { useEffect, useRef, useState } from "react";
import { LanguageInterface } from "@/interfaces/LanguageInterface";

const useEditor = () => {
  const [dataLanguange, setDataLanguange] = useState<LanguageInterface>({
    html: {
      value: `
    <h1></h1>
    <p></p>
    `,
    },
    css: {
      value: `   body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      h1 {
        color: #1f1f1f;
      }
      p {
        color: #2f2f2f;
        font-size: 1.2rem;
      }`,
    },
    js: {
      value: `const title = "Bem vindo ao ykCODE!";
const subtitle = "editor de código online";
let index = 0;

const typeWriter = (element, text,speed) => {
  let charIndex = 0; 
  const typing = () => {
    if (charIndex < text.length) {
      element.innerHTML += text.charAt(charIndex);
      charIndex++;
      setTimeout(typing, speed);
    }
  };
  typing();
};

const h1 = document.querySelector("h1");
const p = document.querySelector("p");

typeWriter(h1, title,100);
typeWriter(p, subtitle,300);
    `,
    },
  });
  const consoleRef = useRef<HTMLDivElement>(null);
  const [viewLanguange, SetviewLanguange] = useState<string>("html");

  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [viewConsole, SetviewCOnsole] = useState<boolean>(false);

  const redirectConsoleLog = () => {
    const originalLog = console.log;

    console.log = (...args) => {
      setConsoleOutput((prev) => [...prev, args.join(" ")]);
      originalLog(...args);
    };
  };

  const executeCode = () => {
    try {
      redirectConsoleLog();
      const userCode = dataLanguange.js.value;
      eval(userCode);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setConsoleOutput((prev) => [...prev, `${error.message}`]);
      } else {
        setConsoleOutput((prev) => [...prev, "unknown error"]);
      }
    }
  };

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
    executeCode();
  }, [dataLanguange]);

  const handleEditorChange = (newValue: string, language: string) => {
    if (newValue !== undefined) {
      setDataLanguange((prevState) => ({
        ...prevState,
        [language]: { value: newValue },
      }));
    }
  };

  return {
    consoleRef,
    dataLanguange,
    viewLanguange,
    consoleOutput,
    SetviewLanguange,
    setConsoleOutput,
    viewConsole,
    SetviewCOnsole,
    handleEditorChange,
  };
};

export default useEditor;
