import { useGetSpaceAndIcon, SpaceMapping } from "@/hooks/useAllSpaceAndIcon";
import { Icon2RN } from "@/icons";
import { changeCurrentSpace } from "@/redux/slice/layout";
import { cn } from "@/utils/cn";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const Dock = () => {
  const items = useGetSpaceAndIcon();
  const mouseXPosition = useMotionValue(Infinity); // Create a motion value for mouse X position
  return (
    <motion.div
      onMouseMove={(e) => mouseXPosition.set(e.pageX)} // Update mouse X position on mouse move
      onMouseLeave={() => mouseXPosition.set(Infinity)} // Reset on mouse leave
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-white/10 px-4 pb-3 dark:bg-black/10 md:flex",
        "border border-gray-200/30 backdrop-blur-sm dark:border-gray-800/30"
      )}>
      {/* Render each dock icon */}
      {items.map((item, index) => (
        <DockIcon mouseX={mouseXPosition} key={index} {...item} />
      ))}
    </motion.div>
  );
};

// Component for individual icons in the dock
function DockIcon({
  mouseX,
  name,
  icon,
  space,
}: {
  mouseX: MotionValue; // Motion value for mouse position
} & SpaceMapping) {
  const ref = useRef<HTMLDivElement>(null); // Ref for measuring distance from mouse

  // Calculate the distance from the mouse to the icon
  const distanceFromMouse = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }; // Get icon bounds
    return val - bounds.x - bounds.width / 2; // Calculate distance from center
  });
  const dispatch = useDispatch();

  const minDistance = -150;
  const maxDistance = 150;
  const minSize = 40;
  const maxSize = 80;
  const minIconSize = 20;
  const maxIconSize = 40;
  const springConfig = { mass: 0.1, stiffness: 150, damping: 12 };

  const widthTransform = useTransform(
    distanceFromMouse,
    [minDistance, 0, maxDistance],
    [minSize, maxSize, minSize]
  );
  const heightTransform = useTransform(
    distanceFromMouse,
    [minDistance, 0, maxDistance],
    [minSize, maxSize, minSize]
  );
  const iconWidthTransform = useTransform(
    distanceFromMouse,
    [minDistance, 0, maxDistance],
    [minIconSize, maxIconSize, minIconSize]
  );
  const iconHeightTransform = useTransform(
    distanceFromMouse,
    [minDistance, 0, maxDistance],
    [minIconSize, maxIconSize, minIconSize]
  );

  const width = useSpring(widthTransform, springConfig);
  const height = useSpring(heightTransform, springConfig);
  const iconWidth = useSpring(iconWidthTransform, springConfig);
  const iconHeight = useSpring(iconHeightTransform, springConfig);
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  return (
    <div
      onClick={() => {
        dispatch(changeCurrentSpace(space));
      }}>
      <motion.div
        ref={ref} // Reference for measuring
        style={{ width, height }} // Set dynamic width and height
        onMouseEnter={() => setIsHovered(true)} // Handle mouse enter
        onMouseLeave={() => setIsHovered(false)} // Handle mouse leave
        className="relative flex aspect-square items-center justify-center rounded-full bg-white/20 text-black shadow-lg backdrop-blur-md dark:bg-black/20 dark:text-white">
        <AnimatePresence>
          {/* Tooltip that appears on hover */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }} // Initial animation state
              animate={{ opacity: 1, y: 0, x: "-50%" }} // Animation to visible state
              exit={{ opacity: 0, y: 2, x: "-50%" }} // Animation to exit state
              className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-gray-200 bg-white/80 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white">
              {name} {/* Tooltip text */}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: iconWidth, height: iconHeight }} // Set dynamic icon size
          className="flex items-center justify-center">
          <Icon2RN icon={icon} />
        </motion.div>
      </motion.div>
    </div>
  );
}
