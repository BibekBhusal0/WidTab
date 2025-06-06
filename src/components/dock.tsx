import { Icon2RN, iconAsProp } from "@/theme/icons";
import { cn } from "@/utils/cn";
import Tooltip from "@mui/material/Tooltip";
import { MotionValue, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useDeferredValue, useRef, useState } from "react";
import Zoom from "@mui/material/Zoom";
import { isToolbarHorizontal, oppositePosition, ToolBarPositions } from "@/types/slice/layout";
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
  const width = useDeferredValue(size[h ? "width" : "height"] - (h ? 200 : 100));
  const numItemsToShow = Math.floor(width / 60);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(items.length / numItemsToShow);

  const currentItems = items.slice(
    currentPage * numItemsToShow,
    (currentPage + 1) * numItemsToShow
  );

  return (
    <div className="flex-center size-full" ref={ref}>
      <motion.div
        onMouseMove={(e) => mousePosition.set(e[h ? "pageX" : "pageY"])}
        onMouseLeave={() => mousePosition.set(Infinity)}
        className={cn(
          "bg-secondary-container-paper flex justify-start rounded-2xl backdrop-blur-xs",
          h
            ? "mx-auto h-full max-w-full flex-row overflow-x-visible px-4"
            : "my-auto max-h-full w-full flex-col overflow-y-visible py-4"
        )}>
        {currentPage !== 0 && items.length !== 0 && (
          <IconButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className={h ? "rotate-0" : "rotate-90"}
            disabled={currentPage === 0}>
            <Icon icon="mdi:chevron-left" />
          </IconButton>
        )}
        {currentItems.map((item, index) => (
          <DockIcon mouse={mousePosition} position={position} key={index} {...item} />
        ))}
        {currentPage !== totalPages - 1 && items.length !== 0 && (
          <IconButton
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
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

function DockIcon({ mouse, name, icon, onClick, position = "bottom" }: DockIconProps) {
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
  const minMargin = 4;
  const maxMargin = 20;
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
      className="relative cursor-pointer"
      onClick={onClick}>
      <Tooltip
        TransitionComponent={Zoom}
        title={name}
        enterDelay={0}
        placement={oppositePosition[position]}>
        <motion.div
          ref={ref}
          style={{ scale, transformOrigin: position, width: "40px" }}
          className={cn(
            "flex-center icon-full relative aspect-square rounded-full p-[20%]",
            "bg-primary-2 shadow-lg shadow-[#00000022] backdrop-blur-md dark:shadow-[#ffffff22]"
          )}>
          <Icon2RN icon={icon} />
        </motion.div>
      </Tooltip>
    </motion.div>
  );
}
