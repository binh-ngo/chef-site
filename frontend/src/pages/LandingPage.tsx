import Description from "../components/Description"
import PictureComponent from "../components/PictureComponent"

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="image-text font-extrabold text-8xl mt-10">Welcome!</p>
      <div className="flex flex-row justify-between mt-20">
        <div className="w-1/3 p-4">
          <p className="font-bold text-3xl text-gray-700">
            Before making a pivot into the software engineering field, I was a chef for around 5 years at some of the best restaurants in Hawaii.
          </p>
        </div>
        <div className="w-1/3 -mt-56">
          <PictureComponent />
        </div>
        <div className="w-1/3 p-4">
          <p className="font-bold text-3xl text-gray-700">
            This website is a sort of passion project for me to show off some really cool dishes from people I really respect.
          </p>
        </div>
      </div>
      <div className="-mt-32">
      <Description />
      </div>
    </div>
  )
}
