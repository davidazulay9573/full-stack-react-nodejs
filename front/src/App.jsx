import Home from "./pages/home";
import About from "./pages/about";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import SignUpEditor from "./pages/auth/sign-up-editor";
import Posts from "./pages/posts";
import EditCard from "./pages/posts/edit";
import DeleteCard from "./pages/posts/delete";
import PostCard from "./pages/posts/[post]";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import useTheme from "./lib/hooks/global-states/useTheme";
import { Routes, Route } from "react-router-dom";
import Users from "./pages/users";

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
          <Route path="sign-up-editor" element={<SignUpEditor />} />
          <Route
            path="posts"
            element={
              <ProtectedRoute is_only_editor>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute is_only_editor>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute is_only_editor>
                <EditCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts/delete/:id"
            element={
              <ProtectedRoute is_only_editor>
                <DeleteCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts/:id"
            element={
              <ProtectedRoute is_only_editor>
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
