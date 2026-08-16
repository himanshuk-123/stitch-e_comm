import React, { useState } from 'react';
import { X, Star, CheckCircle2, ThumbsUp, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ReviewsModalProps {
  onClose: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({ onClose }) => {
  const { selectedProduct, addReview } = useApp();
  const product = selectedProduct;

  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!product) return null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    addReview(product.id, {
      userName: newAuthor,
      rating: newRating,
      date: 'Just now',
      comment: newComment,
      verified: true,
      likes: 0,
    });

    setNewAuthor('');
    setNewComment('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-zinc-900 font-heading text-base">
              Customer Reviews ({product.numericReviews})
            </h3>
            <div className="flex items-center space-x-1 text-xs text-zinc-500 mt-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-zinc-900">{product.rating}</span>
              <span>out of 5.0 stars</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reviews List & Add Form */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-2.5 bg-orange-50 border border-orange-200 text-[#f95721] font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5"
            >
              <span>Write a Product Review</span>
            </button>
          ) : (
            <form onSubmit={handleSubmitReview} className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3">
              <h4 className="text-xs font-bold text-zinc-900">Add Your Review</h4>
              <input
                type="text"
                value={newAuthor}
                onChange={e => setNewAuthor(e.target.value)}
                placeholder="Your Name"
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none"
              />
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Write your feedback..."
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none h-20"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-xs text-zinc-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#f95721] text-white text-xs font-bold rounded-xl"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}

          {/* List */}
          <div className="space-y-3 pt-2">
            {product.reviews.map(rev => (
              <div key={rev.id} className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900">{rev.userName}</span>
                  <span className="text-[10px] text-zinc-400">{rev.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-zinc-600 leading-relaxed font-normal">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
