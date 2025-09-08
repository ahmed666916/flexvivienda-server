// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Public pages
import Home from './pages/home';
import About from './pages/about';
import Signup from './pages/Signup';
import LoginForm from './components/Login/LoginForm';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetailPage';
import OwnerListing from './pages/ownerListing';
import Blog from './pages/blog';
import Blog_detail from './pages/blog_details';
import ContactUs from './pages/ContactUs';
import SplitPage from './components/splitPage/SplitPage';
import MidStay from './pages/midStay';
import LongStay from './pages/longStay';
import Invest from './pages/invest';
import ApiTest from './components/ApiTest';
import Booking from './pages/booking';

// Admin pages
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProperties from './pages/admin/Properties';
import AdminOwners from './pages/admin/Owners';
import AdminBookings from './pages/admin/Bookings';
import AdminSubmissions from './pages/admin/Submissions';

// Owner pages
import OwnerLayout from './pages/owner/OwnerLayout';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import MyProperties from './pages/owner/MyProperties';
import PropertyWizard from './pages/owner/PropertyWizard';

// Auth context + guard
import { AuthProvider } from './auth/AuthContext';
import RequireAuth from './auth/RequireAuth';

import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <ApiTest /> {/* temporary sanity check */}

        <Routes>
          {/* --- Public routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/listing" element={<Listings />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/owner_listing" element={<OwnerListing />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog-detail/:id" element={<Blog_detail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/splitPage" element={<SplitPage />} />
          <Route path="/midStay" element={<MidStay />} />
          <Route path="/longStay" element={<LongStay />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/booking" element={<Booking />} />

          {/* --- Owner (owner/admin roles) --- */}
          <Route
            path="/owner"
            element={
              <RequireAuth allow={['owner', 'admin']}>
                <OwnerLayout>
                  <OwnerDashboard />
                </OwnerLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/owner/properties"
            element={
              <RequireAuth allow={['owner', 'admin']}>
                <OwnerLayout>
                  <MyProperties />
                </OwnerLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/owner/submit"
            element={
              <RequireAuth allow={['owner', 'admin']}>
                <OwnerLayout>
                  <PropertyWizard />
                </OwnerLayout>
              </RequireAuth>
            }
          />

          {/* --- Admin (admin only) --- */}
          <Route
            path="/admin"
            element={
              <RequireAuth allow={['admin']}>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/admin/properties"
            element={
              <RequireAuth allow={['admin']}>
                <AdminLayout>
                  <AdminProperties />
                </AdminLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/admin/owners"
            element={
              <RequireAuth allow={['admin']}>
                <AdminLayout>
                  <AdminOwners />
                </AdminLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <RequireAuth allow={['admin']}>
                <AdminLayout>
                  <AdminBookings />
                </AdminLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/admin/submissions"
            element={
              <RequireAuth allow={['admin']}>
                <AdminLayout>
                  <AdminSubmissions />
                </AdminLayout>
              </RequireAuth>
            }
          />
        </Routes>

        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
