import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewsThunk } from "../store/slices/products.slice";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  ListGroup,
  Row,
  InputGroup,
  Button,
  Form,
} from "react-bootstrap";
import "../styles/loadingScreen.css";
import { addCartThunk } from "../store/slices/cart.slice";

const ProductDetail = () => {
  const allProduct = useSelector((state) => state.products);
  const [productDetail, SetProductDetail] = useState({});
  const [suggestedNews, setSuggestedNew] = useState([]);
  const [quantity, setQuantity] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNewsThunk());
  }, []);

  useEffect(() => {
    const products = allProduct.find(
      (newsProduct) => newsProduct.id === Number(id)
    );
    SetProductDetail(products);

    const filteredNews = allProduct.filter(
      (newsProduct) => newsProduct.category.id === products?.category.id
    );
    setSuggestedNew(filteredNews);
  }, [allProduct, id]);

  const addCart = () => {
    alert("Añadido al carrito");
    const car = {
      id: productDetail.id,
      quantity: quantity,
    };
    dispatch(addCartThunk(car));
  };

  return (
    <div className="cursor">
      <div>
        <h5>Add news to cart</h5>

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Rate"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button
            onClick={addCart}
            variant="outline-secondary"
            id="button-addon2"
          >
            Add
          </Button>
        </InputGroup>
      </div>

      <Row className="g-4 abs-center">
        <Card style={{ width: "50%" }} className="border p-3 form">
          <Card.Img
            variant="top"
            src={productDetail?.productImgs}
            className="img"
          />
          <Card.Body>
            <Card.Title>{productDetail?.title}</Card.Title>
            <Card.Text>{productDetail?.description}</Card.Text>
          </Card.Body>
          <ListGroup>
            <span>Price: {productDetail?.price}</span>
          </ListGroup>
          <ListGroup className="list-group-flush">
            {suggestedNews.map((products) => (
              <ListGroup.Item
                onClick={() => navigate(`/product/${products.id}`)}
                key={products.id}
              >
                {products.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Row>
    </div>
  );
};

export default ProductDetail;
