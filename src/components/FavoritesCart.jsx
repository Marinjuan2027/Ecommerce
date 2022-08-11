import React, { useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
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

  return (
    <div>
      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Button onClick={() => dispatch(buyCart())}>Buy Cart</Button>
          <ul>
            {cart.map((cartItem) => (
              <li
                onClick={() => navigate(`/product/${cartItem.id}`)}
                key={cartItem.id}
              >
                <div>{cartItem.title}</div>
                <div>{cartItem.brand}</div>
                <div>{cartItem.price}</div>
                <div>{cartItem.productsInCart.quantity}</div>
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default FavoritesCart;
