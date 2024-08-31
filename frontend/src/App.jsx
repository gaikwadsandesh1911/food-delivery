import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import VerifyOrder from "./pages/verifyOrder/VerifyOrder";
import MyOrders from "./pages/myOrders/MyOrders";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} showLogin={showLogin} /> : <> </>}

      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/verify-order" element={<VerifyOrder />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
      <ScrollToTopButton/>
    </>
  );
};

export default App;
