import moment from 'moment';
const authorImage = require('../assets/image2.jpg')
type PostProps = {
    // postId: string;
    postAuthor: string;
    body: string;
    // tags: string[];
    // likes: number;
    imageUrl: string;
    createdAt: string;
    // updatedAt: string;
}


export const Card = (post: PostProps) => {

    const urlWithoutParams: string = post.imageUrl.split('?')[0];

    const getTimePassed = (createdAt: string): string => {
        const startTime = moment();
        const duration = moment.duration(startTime.diff(moment(createdAt)));
        return duration.humanize();
    };

  return (
    <div className="bg-white border border-gray-300 rounded shadow-md w-6/12">
      {/* Card Header */}
      <div className="flex items-center p-3 border-b border-gray-300">
        <img
        // change this to display the image of the post author
          src={authorImage}
          alt="User Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <a href={`/chefs/${post.postAuthor}`}><span className="font-semibold text-lg">{post.postAuthor}</span></a>
      </div>

      {/* Card Body */}
      <div className="p-0 ">
        <img
          src={urlWithoutParams}
          alt="Post"
          className="w-full h-[60rem] object-cover"
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
