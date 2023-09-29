import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startUrl } from "../../utils/url";
import { refreshToken } from "../../store/actions/user";
import { Container, Grid } from "@mui/material";
import { ShortPost } from "../ShortPost/ShortPost";

export function HomePage() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const url = startUrl + "api/v1/articles/";
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPosts(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(refreshToken(localStorage.getItem("refreshToken")));
        getPosts();
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getPosts();
    }
  }, []);

  return (
    <Container maxWidth="lg">
      {posts.length ? (
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", padding: "20px" }}
        >
          {posts.reverse().map((post, index) => {
            return (
              <Grid item sm={12} key={index} sx={{ margin: "auto" }}>
                <ShortPost post={post} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
