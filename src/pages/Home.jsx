import React, { useEffect, useState } from "react";
import {
  filterCategoryThunk,
  filterHeadLineThunk,
  getNewsThunk,
} from "../store/slices/products.slice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Card,
  Col,
  InputGroup,
  Form,
  Button,
  ListGroup,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);

  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getNewsThunk());
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  return (
    <div className="cursor mt-5">
      <Row>
        {/* <Col lg={3}>
          <ListGroup>
          {categories.map((category) => (
          <ListGroup.Item
          <ListGroup.Item
          key={category.id}
          onClick={() => dispatch(filterCategoryThunk(category.id))}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col> */}
        <Col lg={3} className="mb-5">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((category) => (
                <Dropdown.Item
                  href=""
                  key={category.id}
                  onClick={() => dispatch(filterCategoryThunk(category.id))}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col>
          <h1>Home</h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="what are you looking for"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <Button
              variant="outline-secondary"
              onClick={() => dispatch(filterHeadLineThunk(searchValue))}
            >
              Button
            </Button>
          </InputGroup>

          <Row xs={1} md={2} lg={3} className="g-4 m-0 text-center">
            {products.map((product) => (
              <Col key={product.id}>
                <Card onClick={() => navigate(`/product/${product.id}`)}>
                  <Card.Img
                    variant="top"
                    src={product.productImgs}
                    className="img"
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
