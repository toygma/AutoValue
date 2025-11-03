"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Star,
  User,
  Trash2,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { averageRating, formatDate } from "@/utils/helper";

// ---- Star Rating Component ----
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
      >
        <Star
          size={size}
          className={`transition-colors ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      </button>
    ))}
  </div>
);

// ---- Review Type ----
interface Review {
  _id: string;
  user: { name: string; image?: string };
  rating: number;
  comment: string;
  createdAt: string;
}

// ---- Main Reviews Component ----
const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      _id: "1",
      user: { name: "John Doe" },
      rating: 4,
      comment: "Great experience overall!",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      user: { name: "Jane Smith" },
      rating: 3,
      comment: "Good, but could be better.",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim().length < 10) return alert("Please write at least 10 characters.");

    setIsLoading(true);

    const newReview: Review = {
      _id: Date.now().toString(),
      user: { name: "Anonymous" },
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setReviews((prev) => [newReview, ...prev]);
      setComment("");
      setRating(0);
      setIsLoading(false);
    }, 800);
  };

  const handleDeleteReview = (id: string) => {
    setDeleteLoading(true);
    setDeletingId(id);

    setTimeout(() => {
      setReviews((prev) => prev.filter((r) => r._id !== id));
      setDeleteLoading(false);
      setDeletingId(null);
    }, 700);
  };

 

 
  return (
    <div className="min-h-screen py-12">
      <div className="px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-indigo-600" />
            Yorumlar
          </h2>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl font-bold text-indigo-600 mb-2">
              {averageRating(reviews.map(r => r.rating)).toFixed(1)}
            </div>
            <div className="flex justify-center mb-3">
              <StarRating rating={Math.round(averageRating(reviews.map(r => r.rating)))} readOnly />
            </div>
            <p className="text-gray-600">Toplam {reviews.length} yorum</p>
          </div>

          {/* Rating Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-4">
              Oylama
            </h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length;
                const percentage =
                  reviews.length > 0
                    ? Math.round((count / reviews.length) * 100)
                    : 0;

                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-12">
                      {star} ★
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Görüşlerini paylaş.
          </h3>

          <form onSubmit={handleSubmitReview} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Arabayı değerlendir
              </label>
              <div className="flex items-center gap-4">
                <StarRating rating={rating} onChange={setRating} size={32} />
                {rating > 0 && (
                  <span className="text-sm text-gray-600">
                    {["Poor", "Fair", "Good", "Very Good", "Excellent"][rating - 1]}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Görüşlerini paylaş (en az 10 karakter)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Deneyimlerinizi diğer kişilerle paylaşın..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={5}
                maxLength={500}
              />
              <div className="mt-2 text-sm text-gray-500">
                {comment.length}/500 karakter
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors"
            >
              {isLoading ? "Gönderiliyor..." : "Yorum Gönder"}
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Yorumlar ({reviews.length})
          </h3>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      {review.user.image ? (
                        <Image
                          src={review.user.image}
                          alt={review.user.name}
                          width={500}
                          height={500}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-indigo-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {review.user.name}
                        </h4>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {formatDate(review?.createdAt)}
                          </div>
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            disabled={deleteLoading && deletingId === review._id}
                            className="p-2 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition disabled:opacity-50"
                            title="Delete review"
                          >
                            {deleteLoading && deletingId === review._id ? (
                              <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <StarRating rating={review.rating} readOnly size={18} />
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Henüz yorum yok. İlk yorum yapan siz olun!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
