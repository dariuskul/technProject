import useStyles from "./style";
const Comment = ({ comment }) => {
  const classes = useStyles();
  const creator = comment?.user.firstName + " " + comment?.user.lastName;
  const commentContent = comment.content;
  const createdAt = new Date(comment.createdAt).toISOString().split("T")[0];
  return (
    <div className={classes.commentWrapper}>
      <div className={classes.header}>
        <h1 className={classes.h1}>{creator}</h1>
        <h2 className={classes.h1}>{createdAt}</h2>
      </div>
      <div className={classes.content}>{commentContent}</div>
    </div>
  );
};

export default Comment;
