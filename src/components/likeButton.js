//* Imported Dependencies
import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button, Label, Icon } from 'semantic-ui-react';
import { useMutation} from '@apollo/client';

//* Imported Components
import MyPopup from '../util/mypopup';

//* Imported GraphQL
import {LIKE_POST_MUTATION} from '../util/graphQL';

const LikeButton = ({user, post: {id, likeCount, likes}}) => {
  const [liked, setLiked] = useState(false); 
  const [likePost] = useMutation(LIKE_POST_MUTATION, { variables: {postId: id} })

  useEffect(() => {
    if(user && likes.find(like => like.username === user.username)){ setLiked(true) }
    else { setLiked(false) }
  }, [user, likes]);

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      {user ? (
        liked ? (
            <Button color='teal'>
              <MyPopup content="Like Post"> 
                <Icon name='heart'/> 
              </MyPopup>
            </Button> 
          ) : ( 
            <Button color='teal' basic>
              <MyPopup content="Like Post"> 
                <Icon name='heart'/> 
              </MyPopup>
            </Button> 
          )
        ):( 
          <Button as={Link} to="/login" color='teal' basic>
            <MyPopup content="Like Post"> 
              <Icon name='heart'/> 
            </MyPopup>
          </Button>
        )
      }
      <Label basic color='teal' pointing='left'>{likeCount}</Label>
    </Button>
  )
}

export default LikeButton;