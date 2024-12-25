import React, { Ref } from 'react'

type Props = {
    consoleRef:  Ref<HTMLDivElement> | null,
    consoleOutput: string[]
}

const Console = ({consoleRef,consoleOutput}: Props) => {
  return (
    <div
    ref={consoleRef}
    className="transition-all w-full z-10 bottom-0 bg-[#2222] text-white p-4 pb-8 h-32 overflow-y-auto flex flex-col"
  >
    {consoleOutput.map((line, index) => (
      <div key={index}>{line}</div>
    ))}
  </div>
  )
}

export default Console