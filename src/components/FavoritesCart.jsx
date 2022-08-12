import React, { useEffect } from "react";
import { Offcanvas, Button, Container, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyCart, getCartThunk } from "../store/slices/cart.slice";

const FavoritesCart = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  console.log(cart);

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const getTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += Number(product.price) * product.productsInCart.quantity;
    });
    return total;
  };

  const buy = () => {
    dispatch(buyCart());
    navigate("/Purchases");
  };

  return (
    <div>
      <Container>
        <Offcanvas placement="end" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>shopping cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card style={{ width: "18rem" }}>
              {/* <Card.Header>Shopping cart</Card.Header> */}
              {cart.map((cartItem) => (
                <ListGroup
                  variant="flush"
                  onClick={() => navigate(`/product/${cartItem.id}`)}
                  key={cartItem.id}
                >
                  <ListGroup.Item>{cartItem.title}</ListGroup.Item>
                  <ListGroup.Item>{cartItem.brand}</ListGroup.Item>
                  <ListGroup.Item>
                    {cartItem.productsInCart.quantity}
                  </ListGroup.Item>
                  <ListGroup.Item>{cartItem.price}</ListGroup.Item>
                </ListGroup>
              ))}
            </Card>
            <div>
              <h5>
                Total <p>$ {getTotal()}</p>
              </h5>
            </div>
            <Button onClick={buy}>Buy Cart</Button>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </div>
  );
};

export default FavoritesCart;
