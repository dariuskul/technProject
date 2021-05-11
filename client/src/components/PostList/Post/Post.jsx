import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import useStyles from "./styles";
import ModalForm from "../../ModalForm/ModalForm";
import DeleteIcon from "@material-ui/icons/Delete";
import Comments from "../../CommentList/CommentList";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { useFormik } from "formik";
import { FacebookCounter, FacebookSelector } from "react-reactions";
const Post = ({ post, creator, role, removePost, created }) => {
  const [readMore, setReadMore] = useState(false);
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const emojiTypes = {
    Like: "Like",
    Heart: "Heart",
    Laugh: "Laugh",
    Surprised: "Surprised",
  };
  const form = useFormik({
    initialValues: {
      emoji: "",
    },
    onSubmit: (values) => {
      alert(values);
    },
  });
  const counters = [
    {
      emoji: "like", // String name of reaction
      by: "Case Sandberg", // String of persons name
    },
  ];
  return (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title={post.title}
        subheader={post.user.username}
      />

      <img src={post.photoUrl} className={classes.media} alt="" />
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {post.description}
        </Typography>
      </CardContent>
      <CardContent>
        {readMore ? post.content : post.content.substring(0, 100)}
        {post.content.length > 100 && (
          <Button onClick={() => setReadMore(!readMore)}>
            {readMore ? "Read less" : "Read more"}
          </Button>
        )}

        {showComments && (
          <Comments
            comments={post?.comments}
            post={post}
            open={showComments}
            setOpen={setShowComments}
            created={created}
          />
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        {post.userId === creator && (
          <IconButton onClick={() => setOpenModal(true)}>
            <EditIcon />
          </IconButton>
        )}
        {(post.userId === creator || role === "Admin") && (
          <IconButton onClick={() => removePost(post.id)}>
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton onClick={() => setShowComments(true)}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <div style={{ width: "100%" }}>
          <FacebookCounter counters={counters} />
        </div>
      </CardActions>

      <ModalForm
        userId={creator}
        updateValues={post}
        open={openModal}
        setOpen={setOpenModal}
      />
    </Card>
  );
};

export default Post;
