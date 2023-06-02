import {Routes,Route} from 'react-router-dom'
import { useState } from 'react';
import NavBar from './components/NavBar'
import Footer from './components/Footer';
import Home from './pages/home';
import About from './pages/about'
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import SignUpBiz from './pages/sign-up-biz';

function App() {
  const [colorsMode,setColorsMode] = useState('light')
  return (
    <div className={`app d-flex flex-column min-vh-100 `}>
      <main className="flex-fill m-4 text-center">
        <NavBar /> 
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-up-biz" element={<SignUpBiz />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
