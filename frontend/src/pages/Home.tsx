import { useEffect, useState } from 'react';
import moment from 'moment';
import { ddbGetAllPostsFromAllChefs } from '../graphql/posts';
import { Card } from '../components/Card';
import { Blur } from '../components/Blur';

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
            <>
              <div className='absolute -top-80 left-10 3xl:-top-72 3xl:left-32'>
                <Blur />
              </div>
              <div>
              <Card
                key={index}
                postAuthor={post.postAuthor}
                body={post.body}
                imageUrl={post.imageUrl}
                createdAt={post.createdAt}
                authorId={post.authorId}
                />
                </div>
              <div className='absolute -bottom-80 3xs:right-30 3xl:right-80'>
                <Blur />
              </div>
            </>
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
