import { Typography, Paper, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

export function ShortPost(props) {
  const post = props.post;
  return (
    <Paper elevation={5} sx={{ padding: "10px", position: "relative" }}>
      <Typography
        gutterBottom
        align="center"
        variant="h6"
        component="label"
        sx={{ mr: "30px" }}
      >
        {post.name}
      </Typography>
      <Link to={`/edit_post/${post.id}`} style={{ color: "#000" }}>
        <EditIcon
          sx={{
            flexGrow: 1,
            position: "absolute",
            top: "11px",
            right: "10px",
          }}
        />
      </Link>

      <Stack direction="row">
        <Chip label={post.category} size="small" />
      </Stack>

      <Typography
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></Typography>
    </Paper>
  );
}
