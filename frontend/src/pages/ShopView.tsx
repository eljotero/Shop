import { useState, useEffect} from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { addToCart } from "../redux/slicers/cartSlicer";
import Promocode from "../components/Promocode";
import Navbar from "../components/Navbar";
import Cart from '../components/Cart';
import Sorting from "../components/Sorting";
import Footer from "../components/Footer";
import "../css/Shop.css";

function ShopView() {
  const dispatch = useDispatch();
  interface Category {
    categoryId: number;
    categoryName: string;
  }
  
  interface Product {
    category: Category;
    productPrice: number;
    productWeight: number;
    productId: number;
    productName: string;
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/products`)
      .then(response => {
        setProducts(response.data);
        console.log(products);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [visibleProducts, setVisibleProducts] = useState(products);

  useEffect(() => {
    setVisibleProducts(products);
  }, [products]);

  function goToProductPage(id: number) {
    window.location.href = `/product/${id}`;
  }

  const filters = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    const filteredProducts = products.filter((product: Product) => {
      if (filters.categories.length > 0 && !filters.categories.find((category: Category) => category.categoryId === product.category.categoryId)){
        return false;
      }
      if (filters.minPrice > 0 && product.productPrice < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice > 0 && product.productPrice > filters.maxPrice) {
        return false;
      }
      if (filters.minWeight > 0 && product.productWeight < filters.minWeight) {
        return false;
      }
      if (filters.maxWeight > 0 && product.productWeight > filters.maxWeight) {
        return false;
      }
      return true;
    });

    setVisibleProducts(filteredProducts);
  }, [filters]);
  

  let windowWidth = Math.round(window.innerWidth / 7);
  let windowHeight = Math.round(window.innerHeight / 5.5);

  return (
    <>
      <Promocode />
      <Navbar />
      <div className="shopContainer">
        <Sorting/>
        <div className="productsContainer">
        {visibleProducts.map((product: Product) => (
          <div key={product.productId} className="productCard">
            <img alt="Picture" src={`https://picsum.photos/${windowWidth}/${windowHeight}`} onClick={() => goToProductPage(product.productId)} />
            <p>{product.productName}</p>
            <div className="buttonPriceContainer">
              <p>{product.productPrice} PLN</p>
              <button onClick={() => dispatch(addToCart({productId: product.productId,productName: product.productName, productPrice: product.productPrice, quantity: 1}))}>Buy</button>
            </div>
          </div>
        ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShopView;

