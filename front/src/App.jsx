import Home from "./pages";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import SignUpEditor from "./pages/auth/sign-up-editor";
import Users from "./pages/users";
import UserPage from "./pages/users/[user]";
import Posts from "./pages/posts";
import PostPage from "./pages/posts/[post]";
import AddPost from "./pages/posts/add";
import EditPost from "./pages/posts/edit";
import DeletePost from "./pages/posts/delete";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import useTheme from "./lib/hooks/global-states/useTheme";
import { Routes, Route } from "react-router-dom";

function App() {
  const [theme] = useTheme();
  return (
    <div className={`app d-flex flex-column min-vh-100 ${theme}`}>
      <main className="flex-fill m-2">
        <NavBar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="auth/sign-in" element={<SignIn />} />
          <Route path="auth/sign-up" element={<SignUp />} />
          <Route path="auth/sign-up-editor" element={<SignUpEditor />} /> 
          <Route path="users" element={<ProtectedRoute>  <Users /> </ProtectedRoute>} />
          <Route  path="users/:id"  element={<ProtectedRoute>  <UserPage />  </ProtectedRoute> }/>
          <Route  path="posts"  element={<ProtectedRoute> <Posts /> </ProtectedRoute>  }/>
          <Route path="posts/:id" element={<ProtectedRoute> <PostPage /> </ProtectedRoute>  } />
          <Route path="posts/add" element={<ProtectedRoute is_only_editor> <AddPost /> </ProtectedRoute> }/>
          <Route path="posts/edit/:id" element={<ProtectedRoute is_only_editor>  <EditPost /> </ProtectedRoute> }/>
          <Route path="posts/delete/:id" element={<ProtectedRoute is_only_editor> <DeletePost /> </ProtectedRoute> } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
