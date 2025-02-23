import React from "react";

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        price: number;
        image: string;
    };
    onAddToCart: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="col-md-3">
            <div className="card shadow-sm">
                <img
                    src={product.image || "https://via.placeholder.com/250"}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body text-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text fw-bold text-success">${product.price}</p>
                    <button
                        className="btn btn-primary w-100"
                        onClick={() => onAddToCart(product.id)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
