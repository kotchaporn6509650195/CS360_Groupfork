import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Category from './components/Category/Category';
import SingleProduct from './components/SingleProduct/SingleProduct';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ResetPassword from './components/Resetpassword/Resetpassword';
import ForgotPassword from './components/Forgotpassword/Forgotpassword';
import Newsletter from './components/Footer/Newsletter/Newsletter';
import AppContext from './utils/context';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Changepassword/Changepassword';
import { AuthProvider } from './AuthContext';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContext>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/category/:id" element={<Category />} />
                        <Route path="/product/:id" element={<SingleProduct />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} /> 
                        <Route path="/newsletter" element={<Newsletter />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/change-password" element={<ChangePassword />} />
                    </Routes>
                    <Footer />
                </AppContext>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
