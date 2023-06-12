import { useState } from "react";
import "./StarRating.scss";

const StarRating = () => {
    const size = [...Array(5)].map((item, index) => index+1);
    const [rating, setRating] = useState(1);
    const [hover, setHover] = useState(0);
    return (
      <div className="star-rating">
        {size.map((star) => {
          return (
            <span
              key={star}
              className={star <= hover || star <= rating ? "on" : "off"}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(rating)}
            >
              <i className="star">&#9733;</i>
            </span>
          );
        })}
      </div>
    );
  };

export default StarRating;
