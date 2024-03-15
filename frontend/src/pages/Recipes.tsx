import { useEffect, useState } from 'react';
import moment from 'moment';
import { ddbGetAllPosts, ddbGetPublishedPosts } from '../graphql/posts';
import { Card } from '../components/Card';
import { Blur } from '../components/Blur';
import Navbar from '../components/Navbar';

export type ddbGetAllQueryResponse = {
  postId: string;
  postAuthor: string;
  authorId: string;
  body: string;
  tags: string[];
  likes: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  publishDate: string;
}

export const Recipes = () => {
  const [posts, setPosts] = useState<ddbGetAllQueryResponse[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await ddbGetAllPosts("BinhNgo");
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
        <Navbar />
        <div className='flex flex-col items-center w-full bg-slate-600 pb-20'>
          {sortedPosts.map((post: ddbGetAllQueryResponse, index) => (
            <div key={index} className='relative'>
              <div className='z-10 absolute -top-[25rem] -left-[18rem] 3xl:-top-72 3xl:left-32'>
                <Blur />
              </div>
              <Card
                postAuthor={post.postAuthor}
                body={post.body}
                imageUrl={post.imageUrl}
                createdAt={post.createdAt}
                authorId={post.authorId}
              />
              <div className='z-10 absolute -bottom-[0rem] 3xs:right-30  md:-bottom-[5rem] md:-right-[18rem] 3xl:right-80'>
                <Blur />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <>
      {renderQuestions()}
    </>
  )
};
