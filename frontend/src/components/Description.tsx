
function Description() {
  return (
    <div className="text-white bg-gray-800 py-8 text-left flex flex-row">
      <div className=" w-6/12 ml-8">
      <h3 className="text-2xl font-semibold mb-4">What is Foodie Share?</h3>
      <p className="text-lg">
        Foodie Share is the ultimate platform for food enthusiasts and photographers to showcase their culinary creations.
        Whether you're a professional chef or a home cook, share your passion for food with the world.
      </p>
      </div>
      <ul className="list-none text-lg text-white w-6/12 text-center">
        <li className="my-3">
          <a href="https://www.binhngo.me" className="text-white text-xl font-semibold hover:text-blue-500">
            Portfolio
          </a>
        </li>
        <li className="my-3">
          <a href="https://www.linkedin.com/in/binh-nguyen-ngo/" className="text-white text-xl font-semibold hover:text-blue-500">
            LinkedIn
          </a>
        </li>
        <li className="my-3"> 
          <a href="https://github.com/binh-ngo" className="text-white text-xl font-semibold hover:text-blue-500">
            Github
          </a>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
}

export default Description;