"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import { createReview } from "@/app/actions/reviews";
import { MAX_REVIEW_BODY_LENGTH } from "@/lib/validations/review";

export default function WriteReviewForm({ productId, slug }: { productId: string; slug: string }) {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [body, setBody] = useState("");
  const [state, formAction] = useActionState(createReview.bind(null, productId, slug), undefined);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      setRating(0);
      setBody("");
    }
  }, [state]);

  if (status !== "authenticated") {
    return (
      <Link
        href={`/login?callbackUrl=/products/${slug}`}
        className="bg-brown text-white font-lato text-sm font-bold tracking-[0.5px] px-6 py-3.5 whitespace-nowrap"
      >
        WRITE A REVIEW
      </Link>
    );
  }

  const activeRating = hoverRating || rating;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-brown text-white font-lato text-sm font-bold tracking-[0.5px] px-6 py-3.5 whitespace-nowrap">
          WRITE A REVIEW
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>Share your experience with this product</DialogDescription>
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Rating</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-amber-400"
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                >
                  <Star size={24} fill={value <= activeRating ? "currentColor" : "none"} stroke="currentColor" />
                </button>
              ))}
            </div>
            <input type="hidden" name="rating" value={rating} />
            {state?.errors?.rating?.map((message) => (
              <span key={message} className="font-lato text-[13px] text-destructive">
                {message}
              </span>
            ))}
          </div>

          <FormField
            label="Title"
            name="title"
            type="text"
            placeholder="Sum up your review"
            required
            errors={state?.errors?.title}
          />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="body">Review</Label>
            <textarea
              id="body"
              name="body"
              required
              rows={4}
              maxLength={MAX_REVIEW_BODY_LENGTH}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell us what you liked or didn't like"
              className="flex w-full border border-border bg-transparent px-4 py-3 font-lato text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-brown disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
            <span className="font-lato text-xs text-gray-text self-end">
              {body.length}/{MAX_REVIEW_BODY_LENGTH}
            </span>
            {state?.errors?.body?.map((message) => (
              <span key={message} className="font-lato text-[13px] text-destructive">
                {message}
              </span>
            ))}
          </div>

          {state?.message && !state?.success && (
            <p className="font-lato text-sm text-destructive">{state.message}</p>
          )}

          <SubmitButton>Submit Review</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
