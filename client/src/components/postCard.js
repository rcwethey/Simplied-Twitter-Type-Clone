//* Imported Dependencies
import React, { useContext } from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

//* Imported CSS
import '../App.css';

//* Imported Components
import { AuthContext } from '../context/auth'; 
import LikeButton from './likeButton';
import DeleteButton from './deleteButton';
import CommentButton from './commentButton';

const PostCard = ({post : { body, createdAt, username, id, likeCount, comments, commentCount, likes}}) => {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        {/* <Image floated='right' size='mini' src={profileImg}/> */}
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount}}/>
        <CommentButton  user={user} post={{id, comments, commentCount}} />
        {user && user.username === username  && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  )
}

export default PostCard;