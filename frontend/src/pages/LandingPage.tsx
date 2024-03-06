import Description from "../components/Description"
import PictureComponent from "../components/PictureComponent"

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-slate-100 h-screen">
      <p className="image-text font-extrabold text-8xl mt-56">
        Welcome! <span className="block text-lg">Click on my picture!</span>
      </p>
      <div className="flex flex-col items-center">
        <div className="-mt-[10rem]">
          <PictureComponent />
        <div className="w-9/12 -mt-48 mx-auto pb-[10rem text-center">
          <p className="font-bold text-3xl text-gray-700">
            Before making a pivot into the software engineering field, I was a chef for around 5 years at some of the best restaurants in Hawaii.
          </p>
        </div>
        </div>
      </div>
      <div>
        <Description />
      </div>
    </div>
  )
}
