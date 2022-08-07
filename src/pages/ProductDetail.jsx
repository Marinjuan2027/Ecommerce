import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewsThunk } from "../store/slices/products.slice";
import { useNavigate, useParams } from "react-router-dom";
import { Card, ListGroup, Row } from "react-bootstrap";
import "../styles/loadingScreen.css";

const ProductDetail = () => {
  const allProduct = useSelector((state) => state.products);
  const [productDetail, SetProductDetail] = useState({});
  const [suggestedNews, setSuggestedNew] = useState([]);

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

  return (
    <div className="cursor">
      <h1>ProductDetail</h1>
      {/* <h1>{productDetail?.description}</h1>
      <img src={productDetail?.productImgs} alt="" />
      <ul>
        {suggestedNews.map((products) => (
          <li onClick={() => navigate(`/product/${products.id}`)}>
            {products.description}
          </li>
        ))}
      </ul> */}
      <Row className="g-4 abs-center">
        <Card style={{ width: "50%" }} className="border p-3 form">
          <Card.Body>
            <Card.Title>{productDetail?.title}</Card.Title>
            {/* <Card.Text>{productDetail?.description}</Card.Text> */}
          </Card.Body>
          <Card.Img
            variant="top"
            src={productDetail?.productImgs}
            className="img"
          />
          <ListGroup className="list-group-flush">
            {suggestedNews.map((products) => (
              <ListGroup.Item
                onClick={() => navigate(`/product/${products.id}`)}
              >
                {products.description}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Row>
    </div>
  );
};

export default ProductDetail;
