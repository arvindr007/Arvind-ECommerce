import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./Layout/Layout";
import { useNavigate } from "react-router-dom";
import { Radio, Pagination } from "antd"; 
import { Prices } from "../components/Prices";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [radio, setRadio] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const productsPerPage = 6;

  // Get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Calculate index range for current page's products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="row mt-3">
        <div className="col-md-2">
          {/* Place your filters here */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-10">
          <h1>All Products</h1>
          <div className="d-flex flex-wrap">
            {currentProducts.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p.slug}`}
                className="product-link"
              >
                {/* Card styles */}
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 60)}</p>
                    <div className="card-name-price">
                      <button className="btn btn-info ms-1">
                        More Details
                      </button>
                      <button className="btn btn-dark ms-1">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="pagination">
            <Pagination
              current={currentPage}
              pageSize={productsPerPage}
              total={products.length}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;