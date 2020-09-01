//* Imported Dependencies
import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

//* Imported Components
import { useForm } from '../util/hooks';

//* Imported GraphQL
import {FETCH_POSTS_QUERY, CREATE_POST_MUTATION} from '../util/graphQL';

const PostForm = () => {
  const {values, onChange, onSubmit} = useForm(createPostCallBack, { body: ''});
  const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
    variables: values, 
    update: (proxy, result) => {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      proxy.writeQuery({ query:FETCH_POSTS_QUERY, 
        data: { getPosts:[result.data.createPost, ...data.getPosts]} 
      });
      values.body = ''; 
    },
    //refetchQueries: [{query: FETCH_POSTS_QUERY}],
    onError: err => { console.log('PostForm err', err); }
  });

  function createPostCallBack(){ createPost(); }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="What are you thinking?"
            name="body"
            type="text"
            onChange={onChange}
            error={error ? true : false}
            value={values.body}
            />
          <Button type="submit" color="teal">Submit</Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20}}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  )
}

export default PostForm;