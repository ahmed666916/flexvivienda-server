import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Navbar from './components/Navbar/Navbar';
import Footer from '../src/components/Footer/Footer'
import Signup from './pages/Signup';
import LoginForm from './components/Login/LoginForm';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetailPage';

function App() {
  return (
    <>
      <Router>
       <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/listing" element={<Listings />} />
          <Route path="/property_detail" element={<PropertyDetail />} />
        </Routes>


        <Footer />




      </Router>
    </>
  );
}

export default App;
