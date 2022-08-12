import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesThunk } from "../store/slices/purchases.slice";

const Purchases = () => {
  const dispatch = useDispatch();

  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);
  return (
    <div className="container my-5">
      <h1>Purchases</h1>
      {purchases.map((purchase) => (
        <Card key={purchase.id} className="mb-5">
          <Card.Header>
            {new Date(purchase.createdAt).toLocaleDateString()}
          </Card.Header>
          <ul>
            {purchase.cart.products.map((product) => (
              <li key={product.id}>
                <Card.Body>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Card.Title>{product.title}</Card.Title>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <span>Quantity: {product.productsInCart.quantity}</span>
                      <span style={{ color: "black" }}>
                        Total: $
                        {product.price * product.productsInCart.quantity}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
};

export default Purchases;
