//* Imported Dependencies
import React, {useState} from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

//* Imported GraphQL
import {FETCH_POSTS_QUERY, DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION} from '../util/graphQL';

//* Imported Components
import MyPopup from '../util/mypopup';

const DeleteButton = ({postId, commentId, callback}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, { 
    update:(proxy) => {
      setConfirmOpen(false);
      if(!commentId){
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY});
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: {getPosts: data.getPosts.filter(p => p.id !== postId)}});
      }
      if(callback) callback();
    },
    variables: { postId, commentId }
  })

  const deleteButton = (
    <Button floated="right" as="div" to="/login" color="red" onClick={() => setConfirmOpen(true)}>
      <Icon name="trash alternate outline" style={{margin: 0}}/>
    </Button>
  )

  return (
    <>
      <MyPopup content="Delete Post">
        {deleteButton}
      </MyPopup>
      <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrMutation} />
    </>
  )
}



export default DeleteButton;
