import { Container, Grid, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, removePost, searchBytitle } from "../../redux/actions";
import { isLoggedIn } from "../../utils/isLoggedIn";
import ModalForm from "../ModalForm/ModalForm";
import Search from "../Search/Search";
import Post from "./Post/Post";
import useStyles from "./styles";
const PostList = ({ viewProfile }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const viewUser = useSelector((state) => state?.communication?.user);
  const posts = useSelector((state) => state?.posts);
  const dispatch = useDispatch();
  const [created, setCreated] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPosts());
    };
    if (!viewProfile) {
      fetchData();
    }
  }, [dispatch, created, viewProfile]);

  const deletePost = (id) => {
    if (window.confirm("Do you really want to remove this post?")) {
      dispatch(removePost(id));
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchBytitle(search));
    } else {
      dispatch(searchBytitle("javascript"));
    }
  };
  return (
    <div className={classes.container}>
      <Container className={classes.inputContainer} maxWidth="xl">
        {!viewProfile && isLoggedIn(user) && (
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
        {!viewProfile && (
          <Search
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            search={search}
            setSearch={setSearch}
          />
        )}
        <Grid container spacing={3}>
          {posts.length ? (
            posts?.map((post) => (
              <Grid key={post.id} item xs={12} md={6}>
                <Post
                  post={post}
                  creator={user?.id}
                  role={user?.role}
                  removePost={deletePost}
                  created={setCreated}
                  userInfo={viewUser}
                />
              </Grid>
            ))
          ) : (
            <h3>No posts...</h3>
          )}
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
