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
      onMouseMove={(e) => mousePosition.set(e.pageX)}
      onMouseLeave={() => mousePosition.set(Infinity)}
      className={cn(
        "flex items-end gap-4",
        "rounded-2xl backdrop-blur-sm bg-secondaryContainer-paper",
        h ? "flex-row mx-auto px-4 h-full" : "flex-col my-auto py-4 w-full"
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
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
      y: 0,
      height: 0,
    };
    if (isCurrent()) console.log(bounds);

    return h
      ? val - bounds.x - bounds.width / 2
      : val - bounds.y - bounds.height / 2;
  });
  const dispatch = useDispatch();

  const maxDistance = 150;
  const minSize = 40;
  const maxSize = 70;
  const springConfig = { mass: 0.1, stiffness: 150, damping: 12 };

  const widthTransform = useTransform(
    distanceFromMouse,
    [-maxDistance, 0, maxDistance],
    [minSize, maxSize, minSize]
  );

  const width = useSpring(widthTransform, springConfig);

  return (
    <div
      className="cursor-pointer"
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
            width,
            height: width,
          }}
          className={cn(
            "relative flex aspect-square items-center justify-center rounded-full",
            "bg-white/20 shadow-lg backdrop-blur-md dark:bg-black/20 icon-full p-[20%]",
            { "text-primary-main": isCurrent() }
          )}>
          <Icon2RN icon={icon} />
        </motion.div>
      </Tooltip>
    </div>
  );
}
