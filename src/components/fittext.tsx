
import React, { useState, useRef, useCallback, useEffect } from "react";

type FitTextProps = {
  children: React.ReactNode;
  min?: number;
  max?: number;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

const FitText: React.FC<FitTextProps> = ({
  children,
  min = 10,
  max = 100,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [fontSize, setFontSize] = useState(max);

  const calculateFontSize = useCallback(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const tempText = document.createElement("span");
    const styles = window.getComputedStyle(text);

    const initialFontSize = parseFloat(styles.fontSize) || 16;
    const initialLineHeight =
      parseFloat(styles.lineHeight) || initialFontSize * 1.2;
    const lineHeightRatio = initialLineHeight / initialFontSize;

    tempText.style.fontFamily = styles.fontFamily;
    tempText.style.fontWeight = styles.fontWeight;
    tempText.style.fontStyle = styles.fontStyle;
    tempText.style.letterSpacing = styles.letterSpacing;
    tempText.style.whiteSpace = styles.whiteSpace;
    tempText.style.position = "absolute";
    tempText.style.visibility = "hidden";
    tempText.textContent = text.textContent;
    tempText.className = text.className;

    document.body.appendChild(tempText);

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    if (containerWidth <= 0 || containerHeight <= 0) {
      document.body.removeChild(tempText);
      return;
    }

    let low = Math.min(min, max);
    let high = Math.max(min, max);
    let bestSize = low;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      tempText.style.fontSize = `${mid}px`;
      tempText.style.lineHeight = `${lineHeightRatio * mid}px`;

      tempText.getBoundingClientRect();

      const textWidth = tempText.scrollWidth;
      const textHeight = tempText.scrollHeight;

      if (textWidth <= containerWidth && textHeight <= containerHeight) {
        bestSize = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    document.body.removeChild(tempText);
    setFontSize(bestSize);
  }, [min, max, children]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(calculateFontSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [calculateFontSize]);

  useEffect(() => {
    calculateFontSize();
  }, [calculateFontSize]);

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
      {...props}
    >
      <span
        ref={textRef}
        style={{
          fontSize: `${fontSize}px`,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
    </div>
  );
};

export default FitText;
