import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Category from './pages/Category';
import Deals from './pages/Deals';
import Boxes from './pages/Boxes';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Delivery from './pages/Delivery';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
    return (
        <LanguageProvider>
            <CartProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            {/* Admin Routes - No Header/Footer */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route
                                path="/admin"
                                element={
                                    <ProtectedRoute>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Public Routes - With Header/Footer */}
                            <Route
                                path="*"
                                element={
                                    <div className="min-h-screen flex flex-col bg-background">
                                        <Header />
                                        <main className="flex-1">
                                            <Routes>
                                                <Route path="/" element={<Home />} />
                                                <Route path="/category" element={<Category />} />
                                                <Route path="/deals" element={<Deals />} />
                                                <Route path="/boxes" element={<Boxes />} />
                                                <Route path="/cart" element={<Cart />} />
                                                <Route path="/checkout" element={<Checkout />} />
                                                <Route path="/about" element={<About />} />
                                                <Route path="/delivery" element={<Delivery />} />
                                                <Route path="/contact" element={<Contact />} />
                                            </Routes>
                                        </main>
                                        <Footer />
                                        <WhatsAppButton />
                                    </div>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </CartProvider>
        </LanguageProvider>
    );
}

export default App;
