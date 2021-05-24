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
    const {searchquery,page} = queryString.parse(search);
    const [searchTweet, setSearchTweet] = useState(searchquery ||'reactjs');
    const [tweetPage,setTweetPage] = useState(page || 2);
    const [update,setUpdate] = useState('');
    const classes = useStyles();
    useEffect(()=> {
      if(searchquery){
        console.log("YOLLO",tweetPage)
        dispatch(fetchTweets(searchquery,page));
      }
        else{
            dispatch(fetchTweets('javascript',tweetPage));
        }
    },[dispatch,update])
    const tweets = useSelector((state)=> state?.tweets?.statuses);
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
        setTweetPage(tweetPage*2)
        history.push(`/tweets?searchquery=${searchTweet}&page=${tweetPage}`)
    }
    console.log('page',page)
    return(
       <Container style={{marginTop: '3em'}} maxWidth='xl'>
           <Grid justify="center" direction="column" alignItems="center"  container spacing={4}>
           <Search handleChange={handleChange} handleSubmit={handleSubmit}/>
                {tweets ? 
                tweets.map((tweet)=>
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