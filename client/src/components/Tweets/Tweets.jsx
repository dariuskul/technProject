import { Button, Container, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchTweets } from "../../redux/actions";
import TwitterTweet from "./Tweet/TwitterTweet";
import useStyles from './styles'
import Search from "../Search/Search";
import { useHistory, useLocation } from "react-router";
import queryString from 'query-string'
const Tweets = () => {
    const dispatch = useDispatch();
    const {search,pathname} = useLocation();
    const history = useHistory();
    const {searchquery,page,next} = queryString.parse(search);
    const [searchTweet, setSearchTweet] = useState(searchquery ||'reactjs');
    const [tweetPage,setTweetPage] = useState(2);
    const [update,setUpdate] = useState('');
    const classes = useStyles();
    useEffect(()=> {
      if(searchquery && next){
        dispatch(fetchTweets(searchquery,page,next));
      }else if(searchquery){
        dispatch(fetchTweets(searchquery,page));
      }
        else{
            dispatch(fetchTweets('javascript',tweetPage));
        }
    },[dispatch,update,next,page])
    const tweets = useSelector((state)=> state?.tweets);
    const handleChange = (e) => {
        setSearchTweet(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdate(new Date());
        history.push(`/tweets?searchquery=${searchTweet}&page=${tweetPage}`)
    }

    const handleMore = (e) => {
        e.preventDefault();
        setUpdate(new Date());
        history.push(`/tweets?searchquery=${searchTweet}&page=${tweetPage}&next=${tweets?.search_metadata.next_id}`)
    }
    console.log(...tweets)
    return(
       <Container style={{marginTop: '3em'}} maxWidth='xl'>
           <Grid justify="center" direction="column" alignItems="center"  container spacing={4}>
           <Search handleChange={handleChange} handleSubmit={handleSubmit}/>
                {tweets.statuses ? 
                tweets.statuses.map((tweet)=>
                    <Grid justify="center" alignItems="center" item xs={12}>
                        <TwitterTweet id={tweet.id_str}/>
                    </Grid>
                ) : 'Loading'
                } 
             <Button onClick={handleMore} className={classes.button} >More</Button>
           </Grid>
       </Container>
    )
}
export default Tweets;