import { useEffect, useRef, useState } from "react";

const useFullSize = (dependencies: any[] = []) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const width = ref.current.clientWidth;
        const height = ref.current.clientHeight;
        setSize({ width, height });
      }
    };

    const observer = new ResizeObserver(handleResize);
    if (ref.current) observer.observe(ref.current);
    handleResize();

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, ...dependencies]);
  return { ref, size, setSize };
};

export default useFullSize;
