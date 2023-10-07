import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Account } from "./Accounts"

import EditChefForm from "./components/EditChefForm";
import { Amplify } from "aws-amplify"
import { awsconfig } from "./aws-exports";
import CreateAccountForm from "./components/CreateAccountForm";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./components/Login";
import { Home } from "./pages/Home";
import CreatePostForm from "./components/CreatePostForm";
Amplify.configure(awsconfig);

function App() {
  return (
    <div>

    <Router>
      <Account>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit" element={<EditChefForm />} />
        <Route path="/signup" element={<CreateAccountForm />} />
        <Route path="/createPost" element={<CreatePostForm />} />
        </Routes>
      </Account>
    </Router>
    </div>
  );
}

export default App;
