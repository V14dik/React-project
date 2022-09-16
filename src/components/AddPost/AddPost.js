import axios from "axios";
import React from "react";
import { useState } from "react";
import { startUrl } from "../../utils/url";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import { useDispatch } from "react-redux";
import { refreshToken } from "../../store/actions/user";
import { Toast } from "../UI/Toast/Toast";
import { toast } from "react-toastify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const AddPost = () => {
  const dispatch = useDispatch();
  const category = React.createRef();
  const title = React.createRef();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const addPost = async (title, category, content, accessToken) => {
    try {
      const data = {
        name: title,
        content,
        category,
      };
      const url = startUrl + "api/v1/articles/";
      await axios.post(url, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(refreshToken(localStorage.getItem("refreshToken")));
        accessToken = localStorage.getItem("accessToken");
        addPost(title, category, content, accessToken);
        return;
      }
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    }
  };

  const createPost = async (category, title, editor) => {
    const accessToken = localStorage.getItem("accessToken");
    const content = stateToHTML(editor.getCurrentContent());
    addPost(title, category, content, accessToken);
  };

  return (
    <div className="container">
      <div className="row ">
        <Toast />
        <form
          className="d-flex flex-column gap-2"
          data-color-mode="light"
          onSubmit={(event) => {
            event.preventDefault();
            createPost(
              category.current.value,
              title.current.value,
              editorState
            );
          }}
        >
          <h1>New post</h1>
          <label>Category</label>
          <input ref={category}></input>
          <label>Tittle</label>
          <input ref={title}></input>
          <label>Content</label>
          <div
            className=" border border-dark border-2"
            style={{ minHeight: "400px" }}
          >
            <Editor
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
          </div>

          <button className="btn btn-primary w-25">Add post</button>
        </form>
      </div>
    </div>
  );
};
