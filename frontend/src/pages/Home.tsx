import { useEffect, useState } from 'react';
import moment from 'moment';
import { ddbGetAllPosts } from '../graphql/posts';
import Navbar from '../components/Navbar';
import { ddbGetAllQueryResponse } from './Recipes';
const profile = require('../assets/profile.webp')

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<ddbGetAllQueryResponse[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await ddbGetAllPosts("BinhNgo");
      setPosts(response);
      console.log(response);
    };
    fetchQuestions();
  }, []);

  const removeParams = (url:string) => {
    return url.split('?')[0];
  }

  const renderQuestions = () => {
    const sortedPosts = posts.sort(
      (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
    );

    return (
      <>
        <div className='flex flex-wrap justify-center w-full p-10 mt-[4rem]'>
          {sortedPosts.map((post: ddbGetAllQueryResponse, index) => (
            <div key={index} className='relative 2xl:w-1/2 3xs:w-full 3xs:mt-12 px-2'>
              <img className="w-full object-cover m-2 rounded-lg shadow-lg
                    3xs:h-[30rem]
                    lg:h-[40rem]
                    3xl:h-[50rem]" src={removeParams(post.imageUrl)} alt={post.body}/>
              <div className='z-10 absolute -bottom-[0rem] 3xs:right-30  md:-bottom-[5rem] md:-right-[18rem] 3xl:right-80'>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 mt-[7rem]">
        <div className="flex items-center justify-center">
          <img
            className="w-60 h-70 rounded-full"
            src={profile}
            alt="Profile Picture"
            />
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-800">Binh-Nguyen Ngo</h1>
          <p className="text-gray-600">Private Chef and budding Software Developer</p>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-800">About Me</h2>
          <p className="text-gray-600">
            I was born and raised in Hawaii and my entire family had a huge background 
            in the culinary industry. I worked my way up from a prep cook to a sous chef 
            at some of the best restaurants in Hawaii such as Senia, Miro Kaimuki, and 
            Nami Kaze. I moved to Seattle to pursue a passion in the software industry
            hoping to build useful applications that can help people in their daily lives.
            While on this journey, I started my own business as a private chef, showcasing 
            the many years of work put into my craft.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-800">Cuisines</h2>
          <ul className="mt-2 text-gray-600">
            <li>Vietnamese</li>
            <li>Japanese</li>
            <li>Local Hawaiian</li>
            <li>Asian Fusion</li>
          </ul>
        </div>
      </div>
    </div>
    {renderQuestions()}
  </>
  );
};

