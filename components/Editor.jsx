import dynamic from "next/dynamic";
import { useState } from "react";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function Editor() {
  const [editorText, setEditorText] = useState("");

  return (
    <div style={{ width: "90%", margin: "100px auto" }}>
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        onChange={(html) => setEditorText(() => html)}
        theme="snow"
        placeholder="Start typing ...."
      />

      <div style={{ margin: "100px 0" }}>
        <h1>HTML Start ============================</h1> {editorText}
      </div>
      <h1>Preview Start ============================</h1>

      <div dangerouslySetInnerHTML={{ __html: editorText }} />
    </div>
  );
}
