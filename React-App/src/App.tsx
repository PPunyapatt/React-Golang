import {Route, Routes} from "react-router-dom";

import SignIn from './pages/Login';
import SignUp from './pages/SignUp';
import AllBlog from "./pages/allBlog"
import ResponsiveAppBar from "./components/header"
import RecipeReviewCard from "./components/card"
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/test" element={<ResponsiveAppBar />} />
        <Route path="/card" element={<RecipeReviewCard />} />
        <Route path="/blog" element={<AllBlog />} />
      </Routes>
    </>
  )
}

export default App
