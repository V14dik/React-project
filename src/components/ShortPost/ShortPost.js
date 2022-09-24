import { Typography, Paper, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import { Stack } from "@mui/system";

export function ShortPost(props) {
  const post = props.post;
  return (
    <Paper elevation={3} sx={{ padding: "10px", position: "relative" }}>
      <Typography
        gutterBottom
        align="center"
        variant="h6"
        component="label"
        sx={{ mr: "30px" }}
      >
        {post.name}
      </Typography>

      <EditIcon
        sx={{
          flexGrow: 1,
          position: "absolute",
          top: "11px",
          right: "10px",
        }}
      />
      <Stack direction="row">
        <Chip label={post.category} size="small" />
      </Stack>

      <Typography
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></Typography>
    </Paper>
  );
}
