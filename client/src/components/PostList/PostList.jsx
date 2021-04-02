import { Container, Grid } from '@material-ui/core'
import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
const posts = [{"creator": "Test1","title": "My little ponny", "description": "My little ponny and Petasiusasdasdasdasdasdasdasdadasdasdasdasdadadada", "createdAt":"2017-08-09"},{"creator": "Test1","title": "My little ponny", "description": "My little ponny and Petasiusasdasdasdasdasdasdasdadasdasdasdasdadadada", "createdAt":"2017-08-09"}];
const PostList = () => {
    const classes = useStyles();
    return(
    <Container className={classes.container} maxWidth='lg'>
    <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
        <Post title={posts[0].title} description={posts[0].description} createdAt={posts[0].createdAt}/>
        </Grid>
        <Grid item lg={6} xs={12}>
        <Post title={posts[0].title} description={posts[0].description} createdAt={posts[0].createdAt}/>
        </Grid>
        <Grid item lg={6} xs={12}>
        <Post title={posts[0].title} description={posts[0].description} createdAt={posts[0].createdAt}/>
        </Grid>
    </Grid>
    </Container>
    )

}
export default PostList;
