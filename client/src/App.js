import "./App.css";
import MainContainer from "./components/MainContainer";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import ChatArea from "./components/ChatArea";
import OnlineUsers from "./components/OnlineUsers";
import CreateGroups from "./components/CreateGroups";
import Groups from "./components/Groups";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<MainContainer />}>
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="chat" element={<ChatArea />} />
            <Route path="users" element={<OnlineUsers />} />
            <Route path="create-groups" element={<CreateGroups />} />
            <Route path="groups" element={<Groups />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
