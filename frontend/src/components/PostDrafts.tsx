import { useEffect, useState } from 'react';
import moment from 'moment';
import { ddbGetUnpublishedPosts, ddbPublishPost } from '../graphql/posts';
import { Card } from './Card';
import { Blur } from './Blur';

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
  published: boolean;
  publishDate: string;
}

export const PostDrafts = () => {
  const [posts, setPosts] = useState<ddbGetAllQueryResponse[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await ddbGetUnpublishedPosts();
      setPosts(response);
      console.log(response);
    };
    fetchQuestions();
  }, []);

  const renderQuestions = () => {
    const sortedPosts = posts.sort(
      (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
    );

  const publishPost = async(postId: string) => {
    try {
      const response = await ddbPublishPost(postId);
      console.log(response);
    } catch (err) {
      console.log(`err: ${JSON.stringify(err, null, 2)}`);
    }
  }

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
                  <button onClick={() => publishPost(post.postId!)} className="w-full bg-blue-500 hover-bg-blue-600 text-white font-semibold py-2 rounded-lg">Publish Post</button>
                </div>
              <div className='absolute -bottom-80 3xs:right-30 lg:right-48 3xl:right-80'>
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
