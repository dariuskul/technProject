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
const Post = ({ post, creator }) => {
  const [readMore, setReadMore] = useState(false);
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
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
