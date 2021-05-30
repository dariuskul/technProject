import { Button, Container, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "../../redux/actions";
import TwitterTweet from "./Tweet/TwitterTweet";
import useStyles from "./styles";
import Search from "../Search/Search";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
const Tweets = () => {
  const dispatch = useDispatch();
  const { search, pathname } = useLocation();
  const history = useHistory();
  const { searchquery, page, next } = queryString.parse(search);
  const [searchTweet, setSearchTweet] = useState(searchquery || "reactjs");
  const [tweetPage, setTweetPage] = useState(2);
  const [update, setUpdate] = useState("");
  const classes = useStyles();
  useEffect(() => {
    if (searchquery && next && page) {
      dispatch(fetchTweets(searchquery, tweetPage, next));
    } else if (searchquery && page) {
      dispatch(fetchTweets(searchquery, tweetPage, null));
    } else {
      dispatch(fetchTweets(searchTweet, tweetPage, null));
    }
  }, [dispatch, update, next, page]);
  const tweets = useSelector((state) => state?.tweets);
  const handleChange = (e) => {
    setSearchTweet(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdate(new Date());
    history.push(`/tweets?searchquery=${searchTweet}&page=${tweetPage}`);
  };

  const handleMore = (e) => {
    e.preventDefault();
    setUpdate(new Date());
    let lastIndexOfTweets = tweets.length - 1;
    console.log(tweets[lastIndexOfTweets]?.search_metadata.next_id);
    history.push(
      `/tweets?searchquery=${searchTweet}&page=${tweetPage}&next=${tweets[lastIndexOfTweets]?.search_metadata.next_id}`
    );
  };
  return (
    <Container style={{ marginTop: "3em" }} maxWidth="xl">
      <Search handleChange={handleChange} handleSubmit={handleSubmit} />
      <Grid justify="center" alignItems="center" container xl={12} xs={12}>
        {tweets?.map((index) =>
          index?.statuses?.map((tweet) => (
            <Grid justify="center" alignItems="center" item xl={12} xs={12}>
              <TwitterTweet id={tweet.id_str} />
            </Grid>
          ))
        )}

        {console.log(tweets[tweets.length - 1])}
        {tweets[tweets?.length - 1]?.statuses.length > 0 ? (
          <Button onClick={handleMore} className={classes.button}>
            More
          </Button>
        ) : (
          ""
        )}
      </Grid>
    </Container>
  );
};
export default Tweets;
