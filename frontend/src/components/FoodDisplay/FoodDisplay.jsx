import React, { useContext, useEffect, useState } from "react";
import "./FoodDisplay.css";

import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Skeleton from "./../Skeleton/Skeleton";

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (food_list.length > 0) {
      setLoading(false);
    }
    console.log(food_list);
  }, [food_list]);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {loading ? (
          <Skeleton />
        ) : (
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
}

export default FoodDisplay;
