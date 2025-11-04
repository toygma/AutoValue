"use client";

import React from "react";
import { Review } from "@/lib/generated/prisma/client";

interface ReviewWithUser extends Review {
  rating: number;
}

const RatingDistribution: React.FC<{ reviews: ReviewWithUser[] }> = ({
  reviews,
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 md:col-span-2">
    <h3 className="font-semibold text-gray-900 mb-4">Oylama Dağılımı</h3>
    <div className="space-y-3">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => r.rating === star).length;
        const percentage =
          reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;

        return (
          <div key={star} className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-12">{star} ★</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 w-12 text-right">
              {percentage}%
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

export default RatingDistribution;
