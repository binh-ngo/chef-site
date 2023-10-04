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
Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <Account>
      <Login />
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<EditChefForm />} />
        <Route path="/signup" element={<CreateAccountForm />} />
        </Routes>
      </Account>
    </Router>
  );
}

export default App;
