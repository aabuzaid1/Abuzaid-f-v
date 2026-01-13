import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import Deals from './pages/Deals';
import Boxes from './pages/Boxes';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Delivery from './pages/Delivery';
import Contact from './pages/Contact';

function App() {
    return (
        <LanguageProvider>
            <CartProvider>
                <BrowserRouter>
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
                    </div>
                </BrowserRouter>
            </CartProvider>
        </LanguageProvider>
    );
}

export default App;
