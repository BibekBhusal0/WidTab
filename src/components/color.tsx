import {
  ColorPicker,
  ColorArea as AriaColorArea,
  ColorAreaProps as AriaColorAreaProps,
  ColorSlider,
  SliderTrack as AriaSliderTrack,
  SliderTrackProps as AriaSliderTrackProps,
  ColorThumb as AriaColorThumb,
  ColorThumbProps as AriaColorThumbProps,
  ColorSwatch as AriaColorSwatch,
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  ColorSwatchPickerItemProps as AriaColorSwatchPickerItemProps,
  ColorSwatchPickerProps as AriaColorSwatchPickerProps,
  ColorField,
  ColorSwatchProps as AriaColorSwatchProps,
  ColorWheel as AriaColorWheel,
  ColorWheelProps as AriaColorWheelProps,
  ColorWheelTrack,
  SliderOutput,
  composeRenderProps,
  parseColor,
} from "react-aria-components";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import MenuPopover from "./popoverMenu";

function ColorArea({ className, ...props }: AriaColorAreaProps) {
  return (
    <AriaColorArea
      className={composeRenderProps(className, (className) =>
        cn(
          "size-[192px] shrink-0 rounded-md border border-border shadow-md",
          className
        )
      )}
      {...props}
    />
  );
}
function SliderTrack({ className, ...props }: AriaSliderTrackProps) {
  return (
    <AriaSliderTrack
      className={composeRenderProps(className, (className) =>
        cn("h-7 w-[192px] rounded-md border border-border ", className)
      )}
      {...props}
    />
  );
}
function ColorThumb({ className, ...props }: AriaColorThumbProps) {
  return (
    <AriaColorThumb
      className={composeRenderProps(className, (className) =>
        cn(
          "z-10 box-border size-5 rounded-[50%] border-2 border-text-primary shadow-md",
          "data-[focus-visible]:size-6",
          className
        )
      )}
      {...props}
    />
  );
}
function ColorSwatchPicker({
  className,
  ...props
}: AriaColorSwatchPickerProps) {
  return (
    <AriaColorSwatchPicker
      className={composeRenderProps(className, (className) =>
        cn("flex flex-wrap gap-2", className)
      )}
      {...props}
    />
  );
}
function ColorSwatchPickerItem({
  className,
  ...props
}: AriaColorSwatchPickerItemProps) {
  return (
    <AriaColorSwatchPickerItem
      className={composeRenderProps(className, (className) =>
        cn(
          "size-8 overflow-hidden rounded-md border-2 ring-offset-background transition-colors",
          "data-[selected]:border-text-primary",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-text-secondary",
          className
        )
      )}
      {...props}
    />
  );
}

interface ColorWheelProps
  extends Omit<AriaColorWheelProps, "outerRadius" | "innerRadius"> {
  outerRadius?: number;
  innerRadius?: number;
}
function ColorWheel({
  className,
  outerRadius = 100,
  innerRadius = 74,
  ...props
}: ColorWheelProps) {
  return (
    <AriaColorWheel
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      className={composeRenderProps(className, (className) => cn(className))}
      {...props}
    />
  );
}

function ColorSwatch({ className, ...props }: AriaColorSwatchProps) {
  return (
    <AriaColorSwatch
      className={composeRenderProps(className, (className) =>
        cn("size-8", className)
      )}
      {...props}
    />
  );
}
export type { ColorWheelProps };
export {
  SliderTrack,
  ColorSlider,
  ColorField,
  ColorWheelTrack,
  ColorPicker,
  ColorArea,
  SliderOutput,
  ColorThumb,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorWheel,
  ColorSwatch,
};

export interface HexPickerProps {
  color?: string;
  setColor?: (color: string) => any;
}
export function HexPicker({ color, setColor }: HexPickerProps) {
  const colors = ["#f00", "#0f0", "#0ff", "#00f", "#f0f"];
  let [_color, _setColor] = useState(parseColor(color || "#f00"));
  const c = _color.toString("hex");

  useEffect(() => {
    if (!setColor) return;
    setColor(c);
  }, [_color]);

  useEffect(() => {
    if (!color) return;
    _setColor(parseColor(color));
  }, [color]);

  return (
    <ColorPicker value={_color} onChange={_setColor}>
      <MenuPopover
        icon={
          <div className="flex flex-center gap-2">
            <ColorSwatch className="size-8 rounded-md border-2" />
            <div className="text-lg">{c}</div>
          </div>
        }>
        <div className="flex flex-center flex-col gap-2 p-3">
          <div>
            <ColorArea
              aria-label="HSB color area"
              colorSpace="hsb"
              xChannel="saturation"
              yChannel="brightness"
              className="h-[164px] rounded-b-none border-b-0">
              <ColorThumb className="z-50" />
            </ColorArea>
            <ColorSlider aria-label="HUE" colorSpace="hsb" channel="hue">
              <SliderTrack className="rounded-t-none border-t-0">
                <ColorThumb className="top-1/2" />
              </SliderTrack>
            </ColorSlider>
          </div>

          <ColorSwatchPicker aria-label="color swatches" className="w-[192px]">
            {colors.map((color) => (
              <ColorSwatchPickerItem key={color} color={color}>
                <ColorSwatch aria-label="color" />
              </ColorSwatchPickerItem>
            ))}
          </ColorSwatchPicker>
        </div>
      </MenuPopover>
    </ColorPicker>
  );
}
