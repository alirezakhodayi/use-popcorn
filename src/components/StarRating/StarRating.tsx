import { useState } from "react";
import Star from "./Star";

interface IProps {
  maxRating?: number;
  defaultRating?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: string[];
  useMessages?: boolean;
  onSetRating: (rating: number) => void;
}
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = ["Terrible", "Bad", "Okay", "Good", "Amazing"],
  useMessages = false,
  defaultRating = 0,
  onSetRating,
}: IProps) {
  const [rating, setRating] = useState<number>(defaultRating);
  const [tempRating, setTempRating] = useState<number>(0);

  function handleRating(rate: number) {
    setRating(rate);
    onSetRating(rate);
  }

  function handleHoverIn(rating: number) {
    setTempRating(rating);
  }

  function handleHoverOut() {
    setTempRating(0);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };
  const isUsingMessages = useMessages && messages.length === maxRating;

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => handleHoverIn(i + 1)}
            onHoverOut={handleHoverOut}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {isUsingMessages
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

export { StarRating };
