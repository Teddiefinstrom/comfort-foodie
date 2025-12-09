import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = (items: any[], step = 20) => {
    const [visibleCount, setVisibleCount] = useState(20);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!loadMoreRef.current) return;
  
      const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
              setVisibleCount((prev) => 
                  prev >= items.length ? prev : prev + step
                  );
            }
          });
  
      observer.observe(loadMoreRef.current);
      return () => observer.disconnect();
    }, [items]);

    return {
        visibleItems: items.slice(0, visibleCount),
        loadMoreRef,
    };
};

export default useInfiniteScroll;