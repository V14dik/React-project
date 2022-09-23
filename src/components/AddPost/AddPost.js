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
import {
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  FormGroup,
} from "@mui/material";

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
      const response = await axios.post(url, data, {
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
    <Container>
      <Toast />
      <Typography gutterBottom align="center" component="h1" variant="h3">
        New post
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createPost(category.current.value, title.current.value, editorState);
        }}
      >
        <FormGroup component="form" sx={{ gap: "10px" }}>
          <TextField label="Category" inputRef={category}></TextField>
          <TextField label="Tittle" inputRef={title}></TextField>
          <label>Content</label>
          <Paper sx={{ minHeight: "400px" }}>
            <Editor
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              editorState={editorState}
              onEditorStateChange={setEditorState}
              editorStyle={{ padding: "10px" }}
            />
          </Paper>
          <div>
            <Button
              component="button"
              type="submit"
              variant="contained"
              size="large"
            >
              Add post
            </Button>
          </div>
        </FormGroup>
      </form>
    </Container>
  );
};
