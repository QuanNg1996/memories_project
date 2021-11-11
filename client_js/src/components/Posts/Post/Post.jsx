import React from 'react';
import useStyles from './styles';
import { 
  Card,
  CardActions, 
  CardContent, 
  CardMedia, 
  Button, 
  Typography 
} from '@material-ui/core';
import { 
  ThumbUpAlt as ThumbUpAltIcon,
  ThumbDownAlt as ThumbDownAltIcon,
  Delete as DeleteIcon,
  MoreHoriz as MoreHorizIcon
} from '@material-ui/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost, likePost, dislikePost } from '../../../actions/posts';

const buttonStyle = {
  color: 'white',
};

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(post);

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="h6">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={buttonStyle} size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag}`)}</Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;Like:&nbsp;
          {post.likeCount}
        </Button>
        <Button color="primary" onClick={() => dispatch(dislikePost(post._id))}>
          <ThumbDownAltIcon fontSize="small" />
          &nbsp;Dislike:&nbsp;
          {post.dislikeCount}
        </Button>
        <Button color="primary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;