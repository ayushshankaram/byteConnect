import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/Userpg";
import PostPage from "./pages/psts";
import Header from "./components/Header";
import HomePage from "./pages/home";
import AuthPage from "./pages/Auth";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/profupdate";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/pagechatting";

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <Box position="relative">
      <Container maxWidth="620px">
        <Header />
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/auth" />} />
        </Routes>

        {user && <CreatePost />}
      </Container>
    </Box>
  );
}

export default App;
