"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { getWishlistIds, toggleWishlistItem } from "@/app/actions/wishlist";

type WishlistContextValue = {
  ids: Set<string>;
  isLoading: boolean;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export default function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const isAuthed = status === "authenticated";
  const router = useRouter();
  const pathname = usePathname();

  const [ids, setIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!isAuthed) {
      setIds(new Set());
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      const wishlistIds = await getWishlistIds();
      if (!cancelled) {
        setIds(new Set(wishlistIds));
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status, isAuthed]);

  const toggleWishlist = (productId: string) => {
    if (!isAuthed) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });

    void toggleWishlistItem(productId).then(({ ids: serverIds }) => {
      setIds(new Set(serverIds));
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        ids,
        isLoading,
        isWishlisted: (productId) => ids.has(productId),
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    console.warn("useWishlist is being called outside of a WishlistProvider. Using fallback.");
    return {
      ids: new Set<string>(),
      isLoading: false,
      isWishlisted: () => false,
      toggleWishlist: () => {},
    };
  }
  return ctx;
}
