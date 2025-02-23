import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById, Product } from "../store/productSlice";
import { RootState, AppDispatch } from "../store/";
import { Container, Row, Col, Card } from "react-bootstrap";

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedProduct, loading, error } = useSelector((state: RootState) => ({
        selectedProduct: state.products.selectedProduct as Product | null,
        loading: state.products.loading as boolean,
        error: state.products.error as string
    }));

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    if (loading) return <p className="text-center my-5">Loading...</p>;
    if (error) return <p className="text-danger text-center my-5">Error: {error}</p>;
    if (!selectedProduct) return <p className="text-center my-5">Product not found.</p>;

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg p-4">
                        <Row>
                            <Col md={6} className="text-center">
                                <Card.Img
                                    variant="top"
                                    src={selectedProduct.image}
                                    alt={selectedProduct.title}
                                    className="img-fluid rounded"
                                />
                            </Col>
                            <Col md={6}>
                                <Card.Body>
                                    <Card.Title className="fw-bold">{selectedProduct.title}</Card.Title>
                                    <Card.Text className="text-muted">{selectedProduct.description}</Card.Text>
                                    <h4 className="text-primary">Price: ${selectedProduct.price}</h4>
                                    <p className="fw-semibold">Category: {selectedProduct.category}</p>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
