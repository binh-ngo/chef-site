import Description from "../components/Description"
import PictureComponent from "../components/PictureComponent"
const logo = require('../assets/clear-logo.png')

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-slate-600 h-screen">
      <p className="z-10 image-text font-extrabold lg:text-8xl lg:mt-9 3xs:text-5xl">
        Welcome!
      </p>
      <div className="flex flex-col items-center z-10">
        <div className="-mt-[13rem]">
          <PictureComponent />
          <div className="w-9/12 -mt-48 mx-auto pb-[10rem text-center">
            <p className="font-bold lg:text-3xl 3xs:text-lg 3xs:mb-6 image-text">
              Before moving to Seattle to pursue a passion in the software industry, I was a chef for 5 years at some of the best restaurants in Hawaii. Come and see what I'm working on right now.
            </p>
          </div>
        </div>
      </div>
      <div>
        <img src={logo} className="absolute inset-0 w-full h-full object-cover z-0 3xs:-mt-[8rem] 2xl:mt-[0rem]" alt="background" />
      </div>
      <div className="z-10">
        <Description />
      </div>
    </div>
  )
}
