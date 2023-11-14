import Home from "./pages/home";
import About from "./pages/about";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import SignUpBiz from "./pages/auth/sign-up-biz";
import MyCards from "./pages/cards";
import AddCard from "./pages/cards/add";
import EditCard from "./pages/cards/edit";
import DeleteCard from "./pages/cards/delete";
import Card from "./pages/cards/[card]";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import useTheme from "./hooks/useTheme";
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
            path="cards/add"
            element={
              <ProtectedRoute is_only_biz>
                <AddCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="cards"
            element={
              <ProtectedRoute is_only_biz>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="cards/edit/:id"
            element={
              <ProtectedRoute is_only_biz>
                <EditCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="cards/delete/:id"
            element={
              <ProtectedRoute is_only_biz>
                <DeleteCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="cards/:id"
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
