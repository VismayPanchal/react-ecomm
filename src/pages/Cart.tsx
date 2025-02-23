import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchCart, removeItemFromCart } from "../store/cartSlice";
import { Button, Container, Table } from "react-bootstrap";

const Cart: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.cart);

    // Fetch cart items when component mounts
    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    // Remove item handler
    const handleRemove = (id: number) => {
        dispatch(removeItemFromCart(id));
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Your Shopping Cart</h2>

            {loading && <p>Loading cart items...</p>}
            {error && <p className="text-danger">{error}</p>}

            {items.length === 0 && !loading ? (
                <p>Your cart is empty.</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img src={item.image} alt={item.title} width="50" height="50" />
                                </td>
                                <td>{item.title}</td>
                                <td>${item.price}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemove(item.id)}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default Cart;
