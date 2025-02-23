import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { RootState, AppDispatch } from "../store";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { list, loading, error } = useSelector((state: RootState) => state.products);

    // Fetch products when component mounts
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Featured Products</h2>

            {loading && <Spinner animation="border" />}
            {error && <p className="text-danger">{error}</p>}

            <Row>
                {list.slice(6, 10).map((product: any) => (
                    <Col key={product.id} md={3} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image} alt={product.title} height="200" />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>${product.price}</Card.Text>
                                <Button variant="primary" onClick={() => navigate(`/product/${product.id}`)}>
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;
