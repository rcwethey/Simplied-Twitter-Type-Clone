//* Imported Dependecies
import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition} from 'semantic-ui-react';

//* Imported Components
import PostCard from '../components/postCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/postForm';

//* Imported GraphQL
import {FETCH_POSTS_QUERY} from '../util/graphQL';

const Home = () => {
  const { user } = useContext(AuthContext);
  let posts = '';
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  if (data) posts = { data: data.getPosts };

  const displayMessages = () => {
    return ( 
      <Transition.Group>
      {posts.data && posts.data.map(post => (
        <Grid.Column key={post.id} style={{ marginBottom: 20 }} className={loading ? 'loading': ''}>
          <PostCard post={post} />
        </Grid.Column> 
      ))}
      </Transition.Group>
    )
  }

  return (
    <Grid columns={1} className='card-container' centered>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      {user && (
        <Grid.Column>
          <PostForm />
        </Grid.Column>
      )}
      {displayMessages()}
    </Grid>
  )
}

export default Home;