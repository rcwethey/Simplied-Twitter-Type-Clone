//* Imported Dependencies
import React, {useState, useEffect } from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

//* Imported Components
import MyPopup  from '../util/mypopup';

const CommentButton = ({user, post:{ id, comments, commentCount}}) => {
  const [commented, setCommented] = useState(false);

  useEffect(() => {
    if(user && comments.find(comment => comment.username === user.username)){ setCommented(true) }
    else { setCommented(false) }
  }, [user, comments]);
    
  const buttontype = window.location.pathname === "/" ? (
    <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
      {user ? (
        commented ? (
          <Button color='yellow'>
            <MyPopup content="Comment on Post"> 
              <Icon name='comment'/> 
            </MyPopup>
          </Button> 
          ) : (
          <Button color='yellow' basic>
            <MyPopup content="Comment on Post"> 
              <Icon name='comment'/> 
            </MyPopup>
          </Button> 
          )
        ): (
        <Button color='yellow' basic>
          <MyPopup content="Comment on Post"> 
            <Icon name='comment'/> 
          </MyPopup>
        </Button>
        )
      }
      <Label basic color='yellow' pointing='left'>{commentCount}</Label>
    </Button>
    ) : (
    <Button labelPosition='right' as="div">
      {user ? (
        commented ? (
          <Button color='yellow'>
            <MyPopup content="Comment on Post"> 
              <Icon name='comment'/> 
            </MyPopup>
          </Button> 
          ) : (
          <Button color='yellow' basic>
            <MyPopup content="Comment on Post"> 
              <Icon name='comment'/> 
            </MyPopup>
          </Button> 
          ) 
        ) : (
          <Button color='yellow' basic>
            <MyPopup content="Comment on Post"> 
              <Icon name='comment'/> 
            </MyPopup>
          </Button>
        )
      }
      <Label basic color='yellow' pointing='left'>{commentCount}</Label>
    </Button>
  )

  return buttontype;
}

export default CommentButton;
