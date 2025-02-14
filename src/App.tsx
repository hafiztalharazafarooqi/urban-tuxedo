import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthPage from "./components/Pages/Auth";
import Home from "./components/Pages/Home";
import Product from "./components/Pages/Product";
import ProductDetail from "./components/Pages/product-details";
import Navigation from "./components/Shared/Navigation";
import Footer from "./components/Shared/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/*"
            element={
              <div className="flex flex-1 flex-col justify-between">
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Product />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                </Routes>
                <Footer />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
    // <>
    //   <Navigation />
    //   <Product />
    //   <Footer />
    // </>
  );
}

export default App;
