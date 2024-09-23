import useCurrentTheme from "@/hooks/useCurrentTheme";
import { changeTheme, toggleCurrentMode } from "@/redux/slice/theme";
import { numericalThemeValues } from "@/types/slice/theme";
import { Slider, SliderProps, Switch } from "@mui/material";
import { useDispatch } from "react-redux";

function ThemeSettings() {
  const theme = useCurrentTheme();
  const dispatch = useDispatch();
  const numValues: numericalThemeValues[] = ["blur", "opacity", "roundness"];

  return (
    <div>
      <div className="text-4xl">Theme Settings</div>
      <div className="flex-justify-around">
        <div className="text-xl">Mode</div>
        <Switch
          checked={theme.mode === "light"}
          onChange={() => dispatch(toggleCurrentMode())}
        />
      </div>

      <div className="flex-justify-around">
        <div className="text-xl">Primary Color</div>
        <input
          type="color"
          name="primary"
          id="primary"
          value={theme.primaryColor}
          onChange={(e) =>
            dispatch(changeTheme({ ...theme, primaryColor: e.target.value }))
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
    </div>
  );
}

type changeSliderProps = SliderProps & {
  val: numericalThemeValues;
};

function ChangeSlider({ val, ...props }: changeSliderProps) {
  const theme = useCurrentTheme();
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between w-full gap-4">
      <div className="text-xl">{val}</div>
      <Slider
        value={theme[val]}
        onChange={(_, value) => {
          dispatch(changeTheme({ ...theme, [val]: value as number }));
        }}
        {...props}
      />
    </div>
  );
}

export default ThemeSettings;
