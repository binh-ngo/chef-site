
export const Blur = () => {
  return (
    <div className='min-h-screen flex items-center justify-center px-16'>
    <div className='relative w-full max-w-lg'>
      <div className='absolute top-0 -left-4 3xl:w-72 3xl:h-72 lg:h-40 lg:w-40 3xs:w-20 3xs:h-20 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'>
      </div>
      <div className='absolute top-0 -right-4 3xl:w-72 3xl:h-72 lg:h-40 lg:w-40 3xs:w-20 3xs:h-20 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'>
      </div>
      <div className='absolute -bottom-8 left-20 3xl:w-72 3xl:h-72 lg:h-40 lg:w-40 3xs:w-20 3xs:h-20 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'>
      </div> 
      </div>
      </div> 
      )
}
