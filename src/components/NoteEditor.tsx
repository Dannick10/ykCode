import React from 'react';
import Editor from '@monaco-editor/react';

type Props = {
  language: string; 
  defaultValue?: string;
  SetLanguage: (value: string | undefined) => void;
  height?: number | string;
  value: string;
};

const NoteEditor = ({ language, value, defaultValue, height=300,  SetLanguage }: Props) => {

  return (
    <Editor
      height={height}
      value={value}
      onChange={SetLanguage}
      theme='vs-dark'
      defaultValue={defaultValue}
      defaultLanguage={language}
    
      />
  );
};

export default NoteEditor;
