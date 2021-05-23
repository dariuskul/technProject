import { Container, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchTweets } from "../../redux/actions";
import TwitterTweet from "./Tweet/TwitterTweet";
import useStyles from './styles'
import Search from "../Search/Search";
const Tweets = () => {
    const dispatch = useDispatch();
    const [search,setSearch] = useState('javascript')
    useEffect(()=> {
        if(search)
        dispatch(fetchTweets(search));
    },[dispatch])
    const tweets = useSelector((state)=> state?.tweets?.statuses);
    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchTweets(search));
    }


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
           </Grid>
       </Container>
    )
}
export default Tweets;