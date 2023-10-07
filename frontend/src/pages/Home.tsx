import { useEffect, useState } from 'react';
import moment from 'moment';
import { ddbGetAllPostsFromAllChefs } from '../graphql/posts';
import { Card } from '../components/Card';

type ddbGetAllQueryResponse = {
  postId: string;
  postAuthor: string;
  authorId: string;
  body: string;
  tags: string[];
  likes: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const Home = () => {
  const [posts, setPosts] = useState<ddbGetAllQueryResponse[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
        const response = await ddbGetAllPostsFromAllChefs();
        setPosts(response); 
        console.log(response);
    };
    fetchQuestions();
}, []);

const renderQuestions = () => {
  const sortedPosts = posts.sort(
    (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
  );

  return (
    <>
    <div className='flex flex-col items-center w-full mt-16'>
      {sortedPosts.map((post: ddbGetAllQueryResponse, index) => (
        <Card
          key={index}
          postAuthor={post.postAuthor}
          body={post.body}
          imageUrl={post.imageUrl}
          createdAt={post.createdAt}
          authorId={post.authorId}
          />
      ))}
    </div>
          </>
  );
}
return (
  <>
    {renderQuestions()}
  </>
 )
};
