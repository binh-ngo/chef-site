import { BsGithub, BsLinkedin } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";

function Description() {
  return (
    <div className="text-sky-200 pt-0 text-left flex flex-row">
      <ul className="list-none w-6/12 text-center flex flex-row">
        <li className="mt-3 mx-2">
          <a href="https://www.binhngo.me" className="text-4xl font-semibold hover:text-blue-300">
            <CgWebsite />
          </a>
        </li>
        <li className="mt-3 mx-2">
          <a href="https://www.linkedin.com/in/binh-nguyen-ngo/" className="text-4xl font-semibold hover:text-blue-300">
          <BsLinkedin />
          </a>
        </li>
        <li className="mt-3 mx-2"> 
          <a href="https://github.com/binh-ngo" className="text-4xl font-semibold hover:text-blue-300">
          <BsGithub />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Description;