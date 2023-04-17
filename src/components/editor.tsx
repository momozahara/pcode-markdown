import React, { useEffect, useState } from "react";

import AceEditor from "react-ace";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";

import Components from "./renderer";

import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

import styles from "styles/app.module.css";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/ext-language_tools";

import "react-markdown-css/styles/markdown.css";
import "react-markdown-css/styles/katex.min.css";

const example = `# Example

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1920px-Markdown-mark.svg.png" width="128px" />

* [ ] check
* [x] check

[go to](#httpspcodedev) url anchor

\`\`\`js
console.log("GG")
\`\`\`

\`\`\`bash
cd /home/user
\`\`\`

*hello* \\
**hello** \\
***hello***

> Yes, Please.

### [https://pcode.dev](https://pcode.dev)

<br/>

Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$

<br/>

$$
R_{\\mu\\nu} - \\frac{1}{2}g_{\\mu\\nu} R = \\kappa T_{\\mu\\nu}
$$

<br/>

$$
\\pi
$$`;

const Editor = () => {
  const [markdownSource, setMarkdownSouce] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    let item = localStorage.getItem("markdownSource");
    if (item) {
      setMarkdownSouce(item);
    } else {
      setMarkdownSouce(example);
    }
  }, []);

  useEffect(() => {
    if (markdownSource.length !== 0) {
      localStorage.setItem("markdownSource", markdownSource);
    }
  }, [markdownSource]);

  return (
    <>
      <IconButton
        sx={{
          zIndex: "10",
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
        }}
        onClick={() => setShowPreview(!showPreview)}
      >
        <VisibilityIcon
          sx={{
            width: "2rem",
            height: "2rem",
          }}
        />
      </IconButton>
      <main className={styles.main}>
        {!showPreview ? (
          <AceEditor
            onChange={(value) => setMarkdownSouce(value)}
            mode="markdown"
            highlightActiveLine={false}
            editorProps={{
              $blockScrolling: true,
            }}
            fontSize="1rem"
            width="100vw"
            height="100vh"
            wrapEnabled={true}
            value={markdownSource}
            showPrintMargin={false}
          />
        ) : (
          <div
            className="wmde-markdown wmde-markdown-color"
            style={{
              width: "100vw",
              minHeight: "100vh",
              padding: "1.5rem",
            }}
          >
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              remarkPlugins={[remarkGfm, remarkMath]}
              components={Components}
            >
              {markdownSource}
            </ReactMarkdown>
          </div>
        )}
      </main>
    </>
  );
};

export default Editor;
