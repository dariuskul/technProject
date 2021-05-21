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
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import { addReaction, removeReaction } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { reactionCount } from "../../../utils/calculateReactions";
import { reactionIdByUser } from "../../../utils/getReactionIdByUser";
import { useHistory } from "react-router";
const Post = ({ post, creator, role, removePost, created, userInfo }) => {
  const [readMore, setReadMore] = useState(false);
  const classes = useStyles();
  const user = useSelector((state) => state?.user?.user?.id);
  const [openModal, setOpenModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const form = useFormik({
    initialValues: {
      reaction: "",
      postId: post.id,
    },
    onSubmit: (values) => {
      const value = reactionIdByUser(user, post.reacts);
      if (value !== -1) {
        dispatch(removeReaction(value, post.id, user));
      } else {
        dispatch(addReaction(values));
      }
    },
  });
  const handleEmojiAddition = (emoji) => {
    form.values.reaction = emoji;
    form.submitForm();
  };

  const handleViewUserProfile = () => {
    if(user)
    history.push(`/user/${post.userId}`)
  }
  let subHeader;
  if(userInfo){
    subHeader = userInfo.firstName + ' ' + userInfo.lastName;
  }else{
    subHeader= post.user.firstName + ' ' + post.user.lastName;
  }
  return (
    <Card className={classes.main}>
      <CardHeader
        className={classes.cardHeader}
        title={post.title}
        subheader={
          <Button disabled={!user ? true : false} onClick={handleViewUserProfile} className={classes.creator}>{subHeader}</Button>
        }
      />

      <img src={post.photoUrl} className={classes.media} alt="" />
      <CardContent>
        <Typography className={classes.title} variant="body1" component="h1">
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
            user={user}
          />
        )}
      </CardContent>
      {user && 
      <>
      <CardActions disableSpacing>
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
        <IconButton onClick={() => handleEmojiAddition("Heart")}>
          <div className={classes.button}>
            <FavoriteIcon />
            <div className={classes.count}>{reactionCount(post, "Heart")}</div>
          </div>
        </IconButton>
        <IconButton onClick={() => handleEmojiAddition("Like")}>
          <div className={classes.button}>
            <ThumbUpIcon />
            <div className={classes.count}>{reactionCount(post, "Like")}</div>
          </div>
        </IconButton>
        <IconButton onClick={() => handleEmojiAddition("Laugh")}>
          <div className={classes.button}>
            <EmojiEmotionsIcon />
            <div className={classes.count}>{reactionCount(post, "Laugh")}</div>
          </div>
        </IconButton>
        <IconButton onClick={() => handleEmojiAddition("Smile")}>
          <div className={classes.button}>
            <SentimentSatisfiedIcon />
            <div className={classes.count}>{reactionCount(post, "Smile")}</div>
          </div>
        </IconButton>
        <IconButton onClick={() => handleEmojiAddition("Surprised")}>
          <div className={classes.button}>
            <MoodBadIcon />
            <div className={classes.count}>
              {reactionCount(post, "Surprised")}
            </div>
          </div>
        </IconButton>
      </CardActions>
      <ModalForm
        userId={creator}
        updateValues={post}
        open={openModal}
        setOpen={setOpenModal}
      /> 
      </>
      }
      
    </Card>
  );
};

export default Post;
