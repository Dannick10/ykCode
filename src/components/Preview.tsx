import { ILanguageInterface } from '@/interfaces/LanguageInterface';
import React from 'react'

type Props = {
  dataLanguange: ILanguageInterface
}


const Preview = ({dataLanguange}: Props) => {

  const compileCode = () => `
  <html>
  <head>
    <style>${dataLanguange.css.value}</style>
  </head>
  <body>
    ${dataLanguange.html.value}
  </body>
  <script>
  const body = document.body
  ${dataLanguange.js.value}
  </script>
  </html>
  `

  return (
    <iframe
    id="preview"
    sandbox="allow-scripts allow-same-origin"
    srcDoc={compileCode()}
    style={{ width: "100%", height: "100%" }}
    className="flex flex-col"
  />
  )
}

export default Preview