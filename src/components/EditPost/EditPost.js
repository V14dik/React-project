import React, { useEffect } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  FormGroup,
} from "@mui/material";
import { Toast } from "../UI/Toast/Toast";
import { convertFromHTML, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { refreshToken } from "../../store/actions/user";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { startUrl } from "../../utils/url";
import axios from "axios";
import { useDispatch } from "react-redux";
import { stateToHTML } from "draft-js-export-html";

export function EditPost() {
  const [post, setPost] = useState();
  const dispatch = useDispatch();
  const category = React.createRef();
  const title = React.createRef();
  const navigate = useNavigate();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const postId = useParams().id;

  const getPost = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const url = startUrl + `/api/v1/articles/${postId}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPost(response.data);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(response.data.content)
          )
        )
      );
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(refreshToken(localStorage.getItem("refreshToken")));
        getPost();
      }
    }
  };

  const changePost = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const content = stateToHTML(editorState.getCurrentContent());
    try {
      const url = startUrl + `/api/v1/articles/${postId}/`;
      const data = {
        name: title.current.value,
        content,
        category: category.current.value,
      };
      const response = await axios.put(url, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(refreshToken(localStorage.getItem("refreshToken")));
        changePost();
        return;
      }
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Container>
      <Toast />
      {post ? (
        <>
          <Typography gutterBottom align="center" component="h1" variant="h3">
            Edit post
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              changePost();
              navigate(-1);
            }}
          >
            <FormGroup component="form" sx={{ gap: "10px" }}>
              <TextField
                label="Category"
                inputRef={category}
                defaultValue={post.category}
              ></TextField>
              <TextField
                label="Tittle"
                inputRef={title}
                defaultValue={post.name}
              ></TextField>
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
                  Save
                </Button>
              </div>
            </FormGroup>
          </form>
        </>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
