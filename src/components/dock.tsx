import { Icon2RN, iconAsProp } from "@/theme/icons";
import { cn } from "@/utils/cn";
import Tooltip from "@mui/material/Tooltip";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useDeferredValue, useRef, useState } from "react";
import Zoom from "@mui/material/Zoom";
import {
  isToolbarHorizontal,
  oppositePosition,
  ToolBarPositions,
} from "@/types/slice/layout";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";
import useFullSize from "@/hooks/useFullSize";

export type dockItemProps = {
  name: string;
  icon: iconAsProp;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export type dockProps = {
  position?: ToolBarPositions;
  items: dockItemProps[];
};

export const Dock = ({ items, position = "bottom" }: dockProps) => {
  const mousePosition = useMotionValue(Infinity);
  const h = isToolbarHorizontal(position);
  const { ref, size } = useFullSize();
  const width = useDeferredValue(size[h ? "width" : "height"]);
  const numItemsToShow = Math.floor((width - 150) / 50);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(items.length / numItemsToShow);

  const currentItems = items.slice(
    currentPage * numItemsToShow,
    (currentPage + 1) * numItemsToShow
  );

  return (
    <div className="size-full flex-center " ref={ref}>
      <motion.div
        onMouseMove={(e) => mousePosition.set(e[h ? "pageX" : "pageY"])}
        onMouseLeave={() => mousePosition.set(Infinity)}
        className={cn(
          "flex justify-start rounded-2xl backdrop-blur-sm bg-secondaryContainer-paper",
          h
            ? "flex-row mx-auto px-4 h-full max-w-full overflow-x-visible"
            : "flex-col my-auto py-4 w-full max-h-full overflow-y-visible"
        )}>
        {currentPage !== 0 && (
          <IconButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className={h ? "rotate-0" : "rotate-90"}
            disabled={currentPage === 0}>
            <Icon icon="mdi:chevron-left" />
          </IconButton>
        )}
        {currentItems.map((item, index) => (
          <DockIcon
            mouse={mousePosition}
            position={position}
            key={index}
            {...item}
          />
        ))}
        {currentPage !== totalPages - 1 && (
          <IconButton
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            className={h ? "rotate-0" : "rotate-90"}
            disabled={currentPage === totalPages - 1}>
            <Icon icon="mdi:chevron-right" />
          </IconButton>
        )}
      </motion.div>
    </div>
  );
};

type DockIconProps = {
  mouse: MotionValue;
  position?: ToolBarPositions;
} & dockItemProps;

function DockIcon({
  mouse,
  name,
  icon,
  onClick,
  position = "bottom",
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const h = isToolbarHorizontal(position);

  const distanceFromMouse = useTransform(mouse, (val) => {
    const emptyBounds = { x: 0, width: 0, y: 0, height: 0 };
    const bounds = ref.current?.getBoundingClientRect() ?? emptyBounds;
    return val - bounds[h ? "x" : "y"] - bounds[h ? "width" : "height"] / 2;
  });

  const maxDistance = 150;
  const minScale = 1;
  const maxScale = 1.75;
  const minMargin = 7;
  const maxMargin = 14;
  const springConfig = { mass: 0.1, stiffness: 150, damping: 12 };

  const scaleTransform = useTransform(
    distanceFromMouse,
    [-maxDistance, 0, maxDistance],
    [minScale, maxScale, minScale]
  );

  const marginTransform = useTransform(
    distanceFromMouse,
    [-maxDistance, 0, maxDistance],
    [minMargin, maxMargin, minMargin]
  );
  const margin = useSpring(marginTransform, springConfig);
  const marginTop = h ? 0 : margin;
  const marginLeft = h ? margin : 0;
  const scale = useSpring(scaleTransform, springConfig);

  return (
    <motion.div
      style={{
        marginLeft,
        marginTop,
        marginRight: marginLeft,
        marginBottom: marginTop,
      }}
      className="cursor-pointer relative"
      onClick={onClick}>
      <Tooltip
        TransitionComponent={Zoom}
        title={name}
        enterDelay={0}
        placement={oppositePosition[position]}>
        <motion.div
          ref={ref}
          style={{
            scale,
            transformOrigin: position,
            width: "40px",
          }}
          className={cn(
            "relative flex-center aspect-square rounded-full",
            "bg-white/20 shadow-lg backdrop-blur-md dark:bg-black/20 icon-full p-[20%]"
          )}>
          <Icon2RN icon={icon} />
        </motion.div>
      </Tooltip>
    </motion.div>
  );
}
