import Home from './pages/home';
import About from './pages/about';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import SignUpBiz from './pages/sign-up-biz';
import MyCards from './pages/my-cards';
import AddCard from './pages/add-card';
import EditCard from './pages/edit-card';
import DeleteCard from './pages/delete-card';
import Card from './pages/card';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import useTheme from './hooks/useTheme';
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
            path="add-card"
            element={
              <ProtectedRoute is_only_biz>
                <AddCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-cards"
            element={
              <ProtectedRoute is_only_biz>
                {" "}
                <MyCards />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="my-cards/edit-card/:id"
            element={
              <ProtectedRoute is_only_biz>
                <EditCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-cards/delete-card/:id"
            element={
              <ProtectedRoute is_only_biz>
                <DeleteCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-cards/:id"
            element={
              <ProtectedRoute is_only_biz>
                <Card />
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
