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
import OwnerListing from './pages/ownerListing'
import Blog from './pages/blog'
import Blog_detail from './pages/blog_details';
import ContactUs from './pages/ContactUs';
import SplitPage from './components/splitPage/SplitPage'
import MidStay from './pages/midStay'
import LongStay from './pages/longStay'
import Invest from './pages/invest'
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';




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
          <Route path="/owner_listing" element={<OwnerListing />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog-detail" element={<Blog_detail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/splitPage" element={<SplitPage />} />
          <Route path="/midStay" element={<MidStay />} />
          <Route path="/LongStay" element={<LongStay />} />
          <Route path="/invest" element={<Invest />} />
        </Routes>


        <Footer />




      </Router>
    </>
  );
}

export default App;
