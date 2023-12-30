import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Playground = () => {
  const [question, setQuestion] = useState("");
  const editorRef = useRef(null);

  const handleQuestion = (question) => {
    setQuestion(question);
  };

  return (
    <div>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCCE_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={question || ""}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          images_upload_url: `${import.meta.env.VITE_URL}/api/upload/image`,
        }}
        onEditorChange={handleQuestion}
      />
    </div>
  );
};

export default Playground;
