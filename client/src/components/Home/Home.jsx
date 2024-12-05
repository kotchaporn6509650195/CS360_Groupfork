import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import "./Home.scss";

import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";
import Products from "../Products/Products";

const Home = () => {
    const {categories,setCategories, products, setProducts, user} = useContext(Context);
    const navigate = useNavigate();

    useEffect(()=>{
        getProducts();
        getCategories();    
    },[]);

    const getProducts = ()=>{
        fetchDataFromApi("/api/products?populate=*").then(res =>
           {
            console.log(res);
            setProducts(res);
           }
            );
    };

    const getCategories = ()=>{
        fetchDataFromApi("/api/categories?populate=*").then(res =>
           {
            console.log(res);
            setCategories(res);
           }
            );
    };

    return <div>
        <Banner/>
        <div className="main-content">
            <div className="layout">
            <Category categories={categories}/>
            <Products products={products} headingText="Popular Products"/>
            </div>
            {user && (
                <div className="user-info">
                    <span className="username">{"Hello " + user.username}</span>
                    <FaUserCircle onClick={() => navigate("/profile")} />
                </div>
            )}
        </div>   
    </div>;
};

export default Home;
