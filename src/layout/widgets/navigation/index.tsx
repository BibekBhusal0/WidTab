import { Icon2RN, iconAsProp } from "@/icons";
import { controlledWidgetValues, StaticPagesType } from "@/types/slice/widgets";
import { cn } from "@/utils/cn";
import {
  type PanInfo,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import SimpleWidget from "../simpleWidget";
import { staticPagesIcon } from "@/components/footer/settings/spaces/allStaticSpaces";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import Button from "@mui/material/Button";
import { useState } from "react";
import useFullSize from "@/hooks/useFullSize";
import { CurrentSpaceType } from "@/types/slice/layout";
import { changeCurrentSpace } from "@/redux/slice/layout";
import { useTheme } from "@mui/material/styles";
import alphaColor from "@/utils/alpha";

type SpaceMapping = { name: string; icon: iconAsProp; space: CurrentSpaceType };

export function CylindricalNavigation() {
  const {
    ref,
    size: { width, height },
  } = useFullSize();
  const themedIcons = useCurrentIcons();
  const {
    palette: { primaryContainer, divider },
  } = useTheme();
  const staticIcons: SpaceMapping[] = Object.entries(staticPagesIcon).map(
    ([space, { icon, name }]) => {
      return {
        name,
        icon: themedIcons[icon],
        space: { id: space as StaticPagesType, type: "static" },
      };
    }
  );
  const { allSpaces, currentSpace } = useSelector(
    (state: StateType) => state.layout
  );
  const dynamicIcons: SpaceMapping[] = allSpaces.map(({ name, icon, id }) => {
    return { name, icon, space: { id, type: "dynamic" } };
  });
  const dispatch = useDispatch();
  const IconList = [...dynamicIcons, ...staticIcons];

  const cylinderWidth = width * 2.7;
  const faceCount = IconList.length;
  const faceWidth = cylinderWidth / faceCount;
  const dragFactor = 0.03;
  const radius = cylinderWidth / (2 * Math.PI);
  const [selected, setSelected] = useState(IconList[0]);
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const isCurrent = (space?: CurrentSpaceType) => {
    if (!space) return false;
    return space.id === currentSpace.id && space.type === currentSpace.type;
  };
  const changeSpace = () => {
    if (isCurrent(selected?.space) || !selected) return;
    console.log("changing");
    dispatch(changeCurrentSpace(selected.space));
  };

  const handleDrag = (_: unknown, info: PanInfo) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const newRotation = rotation.get() + info.velocity.x * dragFactor;
    const anglePerFace = 360 / faceCount;
    const fullRotations = Math.floor(newRotation / 360);
    const angle = newRotation % 360;
    const closestFaceAngle = Math.round(angle / anglePerFace) * anglePerFace;

    controls.start({
      rotateY: closestFaceAngle + fullRotations * 360,
      transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
    });

    const newIndex = faceCount - Math.round((angle * faceCount) / 360);
    setSelected(IconList[newIndex === faceCount ? 0 : newIndex]);
  };
  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  return (
    <div
      className="size-full flex items-center justify-evenly flex-col p-2 gap-3"
      ref={ref}>
      <div
        style={{
          height: Math.min(100, height - 20),
        }}
        className="relative w-full">
        <div
          className="flex h-full items-center justify-center"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            transform: "rotateX(0deg)",
          }}>
          <motion.div
            animate={controls}
            className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
            drag="x"
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{
              transform: transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}>
            {IconList.map((item, index) => {
              return (
                <div
                  className="absolute flex-center h-full origin-center p-2"
                  key={index}
                  style={{
                    width: `${faceWidth}px`,
                    transform: `rotateY(${
                      index * (360 / faceCount)
                    }deg) translateZ(${radius}px)`,
                  }}>
                  <div
                    style={{
                      borderColor: alphaColor(divider, 0.2),
                      borderWidth: "2px",
                      backgroundColor: alphaColor(
                        primaryContainer.default,
                        isCurrent(item.space) ? 0.9 : 0.8
                      ),
                    }}
                    className={cn(
                      "group flex-center size-full rounded-xl",
                      "mx-auto p-4",
                      "transition-transform hover:scale-110"
                    )}>
                    <div className="size-full icon-full transition-transform group-hover:scale-150">
                      <Icon2RN icon={item.icon} />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <Button
        variant="outlined"
        className="text-xl text-center"
        onClick={changeSpace}>
        Go to {selected?.name || "Space"}
      </Button>
    </div>
  );
}

export function NavigationWidget({ id }: controlledWidgetValues) {
  return (
    <SimpleWidget id={id} type="navigation">
      <CylindricalNavigation />
    </SimpleWidget>
  );
}
