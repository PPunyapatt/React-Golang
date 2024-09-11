import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignIn from './pages/Login';
import SignUp from './pages/SignUp';
import AllBlog from "./pages/allBlog";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./context/PrivateRoute"
import './App.css';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/blog" element={<AllBlog />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
