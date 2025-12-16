import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = (items: any[], step = 20) => {
    const [visibleCount, setVisibleCount] = useState(20);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setVisibleCount(step);
      }, [items, step]);

      useEffect(() => {
        if (!loadMoreRef.current) return;
    
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            if (visibleCount >= items.length) return;
    
            setIsLoadingMore(true);
    
            setTimeout(() => {
              setVisibleCount((prev) => Math.min(prev + step, items.length));
              setIsLoadingMore(false);
            }, 300);
          }
        });
    
        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
      }, [items, visibleCount, step]);
    

    return {
        visibleItems: items.slice(0, visibleCount),
        loadMoreRef,
        isLoadingMore
    };
};

export default useInfiniteScroll;