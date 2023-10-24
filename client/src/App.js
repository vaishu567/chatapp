import "./App.css";
import MainContainer from "./components/MainContainer";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import ChatArea from "./components/ChatArea";
// import OnlineUsers from "./components/OnlineUsers";
import CreateGroups from "./components/CreateGroups";
import Groups from "./components/Groups";
import Users from "./components/Users";
import Test from "./components/Test";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<MainContainer />}>
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="chat/:_id" element={<ChatArea />} />
            <Route path="users" element={<Users />} />
            <Route path="create-groups" element={<CreateGroups />} />
            <Route path="groups" element={<Groups />} />
          </Route>
          <Route path="/emoji" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
