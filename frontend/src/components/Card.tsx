import moment from 'moment';
import { useEffect, useState } from 'react';
import { ddbGetChefById } from '../graphql/chefs';
type PostProps = {
    // postId: string;
    postAuthor: string;
    body: string;
    authorId: string;
    // tags: string[];
    // likes: number;
    imageUrl: string;
    createdAt: string;
    // updatedAt: string;
}


export const Card = (post: PostProps) => {
  const [profilePicture, setProfilePicture] = useState('');

    // const urlWithoutParams: string = post.imageUrl.split('?')[0];

    const removeParams = (url:string) => {
      return url.split('?')[0];
    }

    const getTimePassed = (createdAt: string): string => {
        const startTime = moment();
        const duration = moment.duration(startTime.diff(moment(createdAt)));
        return duration.humanize();
    };

    useEffect(() => {
      if (post.postAuthor && post.authorId) {
        const getImageUrl = async () => {
          const chef = await ddbGetChefById(post.postAuthor, post.authorId);
          const chefImageUrl = chef?.imageUrl; 
          setProfilePicture(chefImageUrl || '');
        };
        
        getImageUrl();
      }
    }, [post.postAuthor, post.authorId]);

  return (
    <div className="bg-white border border-gray-300 rounded shadow-lg w-6/12 my-5
                    3xs:w-[23rem] 
                    3xl:w-[40rem]">
      {/* Card Header */}
      <div className="flex items-center p-3 border-b border-gray-300">
        <img
        // change this to display the image of the post author
          src={removeParams(profilePicture)}
          alt="User Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <a href={`/chefs/${post.postAuthor}`}><span className="font-semibold text-lg">{post.postAuthor}</span></a>
      </div>

      {/* Card Body */}
      <div className="p-0 ">
        <img
          src={removeParams(post.imageUrl)}
          alt="Post"
          className="w-full object-cover 
                    3xs:h-[30rem]
                    3xl:h-[50rem]"
        />
      </div>

      {/* Card Footer */}
      <div className="p-3">
        <p className="text-xl"><a href={`/chefs/${post.postAuthor}`}><span className='font-bold text-2xl'>{`${post.postAuthor}`}</span></a> {`${post.body}`}</p>
        <p className="text-sm">{`${getTimePassed(post.createdAt)} ago`} </p>
      </div>
    </div>
  );
};
