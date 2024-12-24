"use client";

import { useEffect, useRef, useState } from "react";
import { LanguageInterface } from "@/interfaces/LanguageInterface";

const useEditor = () => {
  const [dataLanguange, setDataLanguange] = useState<LanguageInterface>({
    html: { value: "ola" },
    css: { value: "" },
    js: { value: "" },
  });
  const consoleRef = useRef<HTMLDivElement >(null);
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

        redirectConsoleLog()
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
