import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignIn from './pages/Login';
import SignUp from './pages/SignUp';
import AllBlog from "./pages/allBlog";
import WriteBlog from "./pages/newStory";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./context/PrivateRoute"
import './App.css';
import MyBlog from "./pages/myBlog";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/blog" element={<AllBlog />} />
            <Route path="/new-story" element={<WriteBlog />} />
            <Route path="/myblog" element={<MyBlog />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
