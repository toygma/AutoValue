"use client";

import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onChange,
  readOnly = false,
  size = 24,
}) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => !readOnly && onChange?.(star)}
        disabled={readOnly}
        className={`transition-transform ${
          !readOnly && "hover:scale-110 cursor-pointer"
        }`}
        aria-label={`${star} yıldız`}
      >
        <Star
          size={size}
          className={`transition-colors ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      </button>
    ))}
  </div>
);

export default StarRating;
