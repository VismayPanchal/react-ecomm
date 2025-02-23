import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../store/productSlice";

const ProductsList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list: products, loading, error } = useSelector((state: RootState) => state.products);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Products</h2>

            {loading && <div className="alert alert-info">Loading products...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                {currentProducts.map((product: any) => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card">
                            <img src={product.image} className="card-img-top" alt={product.title} style={{ height: "250px", objectFit: "cover" }} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">${product.price}</p>
                                <a href={`/product/${product.id}`} className="btn btn-primary">
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <nav>
                <ul className="pagination justify-content-center mt-4">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage((prev) => prev - 1)}>
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage((prev) => prev + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ProductsList;
