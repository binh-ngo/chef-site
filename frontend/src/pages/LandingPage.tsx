import Description from "../components/Description"
import PictureComponent from "../components/PictureComponent"

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center text-center bg-slate-100 h-screen">
      <p className="image-text font-extrabold 
                    3xs:text-6xl 3xs:mb-20 3xs:mt-10
                    2xs:text-8xl 2xs:mb-24 2xs:ml-24 
                    xl:text-8xl xl:mt-10
                    2xl:mr-14">
                      Welcome! <span className="block 3xs:text-sm 2xs:text-lg">Click on my picture!</span></p>
      <div className="flex flex-col">
        <div className="min-w-screen -mt-56 flex
                        3xl:ml-[30rem] 3xl:-mt-72
                        2xl:-mt-80
                        lg:ml-[27.5rem] lg:-mt-72
                        3xs:h-10 3xs:w-10 3xs:ml-5 3xs:mb-24 3xs:-mt-80
                        2xs:-mt-80 2xs:ml-0 2xs:mb-10">
          <PictureComponent />
        </div>
        <div className="w-1/3 p-4
                        3xs:w-full 3xs:mt-32
                        2xs:mt-72 2xs:ml-10
                        3xl:mt-80">
          <p className="font-bold text-3xl text-gray-700 mr-10
                        3xs:text-sm 3xs:mt-80 3xs:ml-8
                        2xs:text-xl
                        lg:mt-64 lg:ml-0
                        2xl:mt-72 ">
          Before making a pivot into the software engineering field, I was a chef for around 5 years at some of the best restaurants in Hawaii.
          </p>
        </div>
        <div className="w-1/3 p-4
                        3xs:w-full
                        2xs:ml-10">
          <p className="font-bold text-3xl text-gray-700 mr-10
                        3xs:text-sm 3xs:ml-8
                        2xs:text-xl">
            This website is a sort of passion project for me to show off some really cool dishes from people I really respect.
          </p>
        </div>
      </div>
      <div className="3xs:-mt-0 2xs:ml-20 3xl:ml-24">
      <Description />
      </div>
    </div>
  )
}
