import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesThunk } from "../store/slices/purchases.slice";

const Purchases = () => {
  const dispatch = useDispatch();

  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);
  return (
    <div>
      <h1>Purchases</h1>
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase.id}>
            <div>{purchase.createdAt}</div>
            {purchase.cart.products.map((product) => (
              <div key={product.id}>{product.title}</div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purchases;
