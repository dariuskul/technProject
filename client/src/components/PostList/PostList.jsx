import { Container, Grid, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, removePost } from "../../redux/actions";
import { isLoggedIn } from "../../utils/isLoggedIn";
import ModalForm from "../ModalForm/ModalForm";
import Search from "../Search/Search";
import Post from "./Post/Post";
import useStyles from "./styles";
const PostList = ({viewProfile}) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const viewUser = useSelector((state)=> state?.communication?.user)
  const posts = useSelector((state) => state?.posts);
  const dispatch = useDispatch();
  const [created, setCreated] = useState("");



  useEffect(() => {

    const fetchData = async () => {
      dispatch(fetchPosts());
    };
    if(!viewProfile){
    fetchData();
    }

  }, [dispatch, created,viewProfile]);

  const deletePost = (id) => {
    dispatch(removePost(id));
  };
  return (
    <div className={classes.container}>
      <Container className={classes.inputContainer} maxWidth="xl">
        {(!viewProfile && isLoggedIn()) && (
          <Button
            onClick={() => setOpenModal(true)}
            color="primary"
            variant="outlined"
            className={classes.input}
          >
            Wanna share your insights about something, {user?.firstName}?
          </Button>
        )}
      </Container>
      <Container maxWidth="xl">
       {!viewProfile  && <Search/> }
        <Grid container spacing={3}>
          {posts.length ? posts?.map((post) => (
            <Grid key={post.id} item xs={12} sm={6}>
              <Post
                post={post}
                creator={user?.id}
                role={user?.role}
                removePost={deletePost}
                created={setCreated}
                userInfo={viewUser}
              />
            </Grid>
          )) : 'Loading...'}
        </Grid>
        <ModalForm
          open={openModal}
          setOpen={setOpenModal}
          userId={user?.id}
          setCreated={setCreated}
        />
      </Container>
    </div>
  );
};
export default PostList;
