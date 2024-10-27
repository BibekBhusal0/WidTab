import { useGetSpaceAndIcon, SpaceMapping } from "@/hooks/useAllSpaceAndIcon";
import { Icon2RN } from "@/icons";
import { changeCurrentSpace } from "@/redux/slice/layout";
import { cn } from "@/utils/cn";
import Tooltip from "@mui/material/Tooltip";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Zoom from "@mui/material/Zoom";
import {
  CurrentSpaceType,
  isToolbarHorizontal,
  oppositePosition,
} from "@/types/slice/layout";
import { StateType } from "@/redux/store";

export const Dock = () => {
  const items = useGetSpaceAndIcon();
  const mousePosition = useMotionValue(Infinity);
  const { toolBarPosition } = useSelector((state: StateType) => state.layout);
  const h = isToolbarHorizontal(toolBarPosition);

  return (
    <motion.div
      onMouseMove={(e) => mousePosition.set(e[h ? "pageX" : "pageY"])}
      onMouseLeave={() => mousePosition.set(Infinity)}
      className={cn(
        "flex items-end",
        "rounded-2xl backdrop-blur-sm bg-secondaryContainer-paper",
        h ? "flex-row mx-auto px-4 h-full" : "flex-col my-auto py-4 pl-0 w-full"
      )}>
      {items.map((item, index) => (
        <DockIcon mouse={mousePosition} key={index} {...item} />
      ))}
    </motion.div>
  );
};

type DuckIconProps = { mouse: MotionValue } & SpaceMapping;
function DockIcon({ mouse, name, icon, space }: DuckIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { currentSpace, toolBarPosition } = useSelector(
    (state: StateType) => state.layout
  );
  const h = isToolbarHorizontal(toolBarPosition);
  const isCurrent = (s: CurrentSpaceType = space) => {
    return s.id === currentSpace.id && s.type === currentSpace.type;
  };

  const distanceFromMouse = useTransform(mouse, (val) => {
    const emptyBounds = { x: 0, width: 0, y: 0, height: 0 };
    const bounds = ref.current?.getBoundingClientRect() ?? emptyBounds;
    return val - bounds[h ? "x" : "y"] - bounds[h ? "width" : "height"] / 2;
  });

  const dispatch = useDispatch();

  const maxDistance = 150;
  const minScale = 1;
  const maxScale = 1.75;
  const minMargin = 10;
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
      className="cursor-pointer relative"
      onClick={() => {
        dispatch(changeCurrentSpace(space));
      }}>
      <Tooltip
        TransitionComponent={Zoom}
        title={name}
        placement={oppositePosition[toolBarPosition]}>
        <motion.div
          ref={ref}
          style={{
            scale,
            transformOrigin: toolBarPosition,
            width: "40px",
          }}
          className={cn(
            "relative flex-center aspect-square rounded-full",
            "bg-white/20 shadow-lg backdrop-blur-md dark:bg-black/20 icon-full p-[20%]",
            { "text-primary-main": isCurrent() }
          )}>
          <Icon2RN icon={icon} />
        </motion.div>
      </Tooltip>
    </motion.div>
  );
}
