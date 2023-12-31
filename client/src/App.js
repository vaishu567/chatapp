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
import StartCall from "./components/StartCall";
import CallLog from "./components/CallLog";
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
            <Route path="calllog" element={<CallLog />} />
            <Route path="create-groups" element={<CreateGroups />} />
            <Route path="groups" element={<Groups />} />
          </Route>
          <Route path="/call" element={<StartCall />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
