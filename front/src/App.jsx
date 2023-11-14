import Home from "./pages/home";
import About from "./pages/about";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import SignUpBiz from "./pages/auth/sign-up-biz";
import Myposts from "./pages/posts";
import AddPost from "./pages/posts/add";
import EditCard from "./pages/posts/edit";
import DeleteCard from "./pages/posts/delete";
import PostCard from "./pages/posts/[post]";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import useTheme from "./lib/hooks/useTheme";
import { Routes, Route } from "react-router-dom";

function App() {
  const [theme] = useTheme();
  return (
    <div className={`app d-flex flex-column min-vh-100 ${theme}`}>
      <main className="flex-fill m-2">
        <NavBar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-up-biz" element={<SignUpBiz />} />
          <Route
            path="posts/add"
            element={
            
              <ProtectedRoute is_only_biz>
                HELLO
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts"
            element={
              <ProtectedRoute is_only_biz>
                <Myposts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute is_only_biz>
                <EditCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts/delete/:id"
            element={
              <ProtectedRoute is_only_biz>
                <DeleteCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts/:id"
            element={
              <ProtectedRoute is_only_biz>
                <PostCard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
