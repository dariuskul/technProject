import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import React from 'react'
import useStyles from './styles'
const Post = (props) => {
    console.log("Post")
    const classes = useStyles();
    return(
        <Card>
            <CardHeader
            className={classes.cardHeader}
            title = {props.title}
            subheader= {props.createdAt}
            />
            <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                   {props.description}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteIcon/>
                </IconButton>
            </CardActions>
        </Card>
    )

}

export default Post;