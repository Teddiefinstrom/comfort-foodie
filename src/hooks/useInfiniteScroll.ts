import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = <T,>(items: T[], step = 20) => {
  const [visibleCount, setVisibleCount] = useState(step);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      if (visibleCount >= items.length) return;

      setIsLoadingMore(true);

      setTimeout(() => {
        setVisibleCount((prev) =>
          Math.min(prev + step, items.length)
        );
        setIsLoadingMore(false);
      }, 300);
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [items.length, visibleCount, step]);

  return {
    visibleItems: items.slice(0, visibleCount),
    loadMoreRef,
    isLoadingMore,
  };
};

export default useInfiniteScroll;
