import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slider, SliderProps, Switch } from "@mui/material";
import { toggleMode, set, numericalThemeValues } from "@/redux/slice/theme";
import { StateType } from "@/redux/store";

const Selector: React.FC = () => {
  const { mode, primaryColor } = useSelector((state: StateType) => state.theme);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleMode());
  };
  const numValues: numericalThemeValues[] = ["blur", "opacity", "roundness"];

  return (
    <>
      <div className="flex-center gap-4">
        <Switch checked={mode === "light"} onChange={toggle} />
        <input
          type="color"
          name="primary"
          id="primary"
          value={primaryColor}
          onChange={(e) =>
            dispatch(set({ value: e.target.value, type: "primaryColor" }))
          }
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        {numValues.map((val) => (
          <ChangeSlider
            valueLabelDisplay="auto"
            step={0.01}
            min={0}
            max={1}
            key={val}
            val={val}
          />
        ))}
      </div>
    </>
  );
};

type changeSliderProps = SliderProps & {
  val: numericalThemeValues;
};

function ChangeSlider({ val, ...props }: changeSliderProps) {
  const theme = useSelector((state: StateType) => state.theme);
  const dispatch = useDispatch();

  return (
    <Slider
      value={theme[val]}
      onChange={(_, value) => {
        dispatch(set({ value: value as number, type: val }));
      }}
      {...props}
    />
  );
}

export default Selector;
