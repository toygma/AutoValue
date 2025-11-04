"use client";

import React, { useState } from "react";
import { User, Calendar, Trash2, Edit2, X, Save } from "lucide-react";
import { Review } from "@/lib/generated/prisma/client";
import StarRating from "./StarRating";
import { formatDate } from "@/utils/helper";

interface ReviewWithUser extends Review {
  user: {
    id: string;
    email: string | null;
  };
  comment: string;
}

interface Props {
  review: ReviewWithUser;
  onDelete: (id: string) => void;
  onUpdate: (id: string, comment: string, rating: number) => Promise<void>;
  isDeleting: boolean;
  currentUserId?: string;
}

const ReviewCard: React.FC<Props> = ({
  review,
  onDelete,
  onUpdate,
  isDeleting,
  currentUserId,
}) => {
  const isOwner = currentUserId === review.userId;

  const [isEditing, setIsEditing] = useState(false);
  const [localComment, setLocalComment] = useState(review.comment);
  const [localRating, setLocalRating] = useState(review.rating);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (localComment.trim().length < 10) {
      alert("Yorum en az 10 karakter olmalı.");
      return;
    }
    setIsSaving(true);
    await onUpdate(review.id, localComment.trim(), localRating);
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
          <User className="w-6 h-6 text-indigo-600" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">
              {review.user?.email ?? "Anonim"}
            </h4>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {formatDate(review.createdAt)}
              </div>

              {isOwner && !isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 rounded-lg transition"
                    title="Yorumu düzenle"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => onDelete(review.id)}
                    disabled={isDeleting}
                    className="p-2 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition disabled:opacity-50"
                    title="Yorumu sil"
                  >
                    {isDeleting ? (
                      <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <StarRating
                rating={localRating}
                onChange={setLocalRating}
                size={20}
              />

              <textarea
                value={localComment}
                onChange={(e) => setLocalComment(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 resize-none"
              />

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold disabled:bg-gray-400"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Kaydediliyor..." : "Kaydet"}
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold"
                >
                  <X className="w-4 h-4" />
                  İptal
                </button>
              </div>
            </div>
          ) : (
            <>
              <StarRating rating={review.rating} readOnly size={18} />
              <p className="text-gray-700 leading-relaxed mt-2">
                {review.comment}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
