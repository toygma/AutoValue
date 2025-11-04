"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";
import { averageRating } from "@/utils/helper";

import ReviewCard from "./reviewCard";
import StarRating from "./starRating";
import RatingDistribution from "./ratingDistribution";
import {
  RATING_LABELS,
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH,
} from "@/constants/carListing.constants";
import { Review } from "@/lib/generated/prisma/client";

interface ReviewsProps {
  id: string;
}

interface ReviewWithUser extends Review {
  user: {
    id: string;
    email: string | null;
  };
  comment: string;
}

const Reviews: React.FC<ReviewsProps> = ({ id }) => {
  const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: session } = useSession();

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get(`/api/reviews?carId=${id}`);
      setReviews(res.data);
    } catch {
      toast.error("Yorumlar yüklenirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    if (id) fetchReviews();
  }, [id]);

  const validateReview = (): string | null => {
    if (comment.trim().length < MIN_COMMENT_LENGTH)
      return `En az ${MIN_COMMENT_LENGTH} karakterlik bir yorum yazın.`;
    if (!rating) return "Lütfen bir puan seçin.";
    return null;
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validateReview();
    if (errorMsg) return toast.error(errorMsg);

    setIsLoading(true);
    try {
      await axiosInstance.post("/api/reviews", {
        carId: id,
        comment: comment.trim(),
        rating,
      });
      toast.success("Yorum gönderildi!");
      setComment("");
      setRating(0);
      await fetchReviews();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Bu yorumu silmek istediğinize emin misiniz?")) return;
    setDeletingId(reviewId);
    try {
      await axiosInstance.delete(`/api/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      toast.success("Yorum silindi!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Silme işlemi başarısız.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdateReview = async (
    id: string,
    comment: string,
    rating: number
  ) => {
    try {
      await axiosInstance.put(`/api/reviews/${id}`, { comment, rating });
      toast.success("Yorum güncellendi!");
      await fetchReviews();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Güncelleme hatası oluştu.");
    }
  };

  const avg = reviews.length ? averageRating(reviews.map((r) => r.rating)) : 0;
  return (
    <div className="min-h-screen py-12">
      <div className="px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-indigo-600" />
          Yorumlar
        </h2>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl font-bold text-indigo-600 mb-2">
              {avg.toFixed(1)}
            </div>
            <div className="flex justify-center mb-3">
              <StarRating rating={Math.round(avg)} readOnly />
            </div>
            <p className="text-gray-600">Toplam {reviews.length} yorum</p>
          </div>
          <RatingDistribution reviews={reviews} />
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Görüşlerini paylaş
            </h3>
          </div>

          <form onSubmit={handleSubmitReview} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Arabayı değerlendir
              </label>
              <div className="flex items-center gap-4">
                <StarRating rating={rating} onChange={setRating} size={32} />
                {rating > 0 && (
                  <span className="text-sm text-gray-600">
                    {RATING_LABELS[rating - 1]}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Görüşlerinizi paylaşın (en az {MIN_COMMENT_LENGTH} karakter)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Deneyimlerinizi paylaşın..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={5}
                maxLength={MAX_COMMENT_LENGTH}
              />
              <div className="mt-2 text-sm text-gray-500">
                {comment.length}/{MAX_COMMENT_LENGTH} karakter
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors"
              >
                {isLoading ? "Gönderiliyor..." : "Yorum Gönder"}
              </button>
            </div>
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
                <ReviewCard
                  key={review.id}
                  review={review}
                  onDelete={handleDeleteReview}
                  onUpdate={handleUpdateReview}
                  isDeleting={deletingId === review.id}
                  currentUserId={session?.user?.id}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                Henüz yorum yok. İlk yorum yapan siz olun!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
