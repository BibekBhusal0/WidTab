import useCurrentTheme from "@/hooks/useCurrentTheme";
import {
  changeTheme,
  deleteTheme,
  toggleCurrentMode,
} from "@/redux/slice/theme";
import { numericalThemeValues } from "@/types/slice/theme";
import Button from "@mui/material/Button";
import Slider, { SliderProps } from "@mui/material/Slider";
import Switch from "@mui/material/Switch";

import { useDispatch } from "react-redux";
import RenameTheme from "./renameTheme";
import useCurrentIcons from "@/hooks/useCurrentIcons";

function CurrentThemeSettings() {
  const theme = useCurrentTheme();
  const dispatch = useDispatch();
  const { delete_ } = useCurrentIcons();
  const numValues: numericalThemeValues[] = ["blur", "opacity", "roundness"];

  return (
    <div className="flex flex-col gap-4 px-3">
      <div className="between gap-5">
        <div className="text-xl">Dark Mode</div>
        <Switch
          checked={theme.mode === "dark"}
          onChange={() => dispatch(toggleCurrentMode())}
        />
      </div>
      {theme.editAble ? (
        <>
          <div className="between gap-5">
            <div className="text-xl">Primary Color</div>
            <input
              type="color"
              name="primary"
              id="primary"
              value={theme.primaryColor}
              onChange={(e) =>
                dispatch(
                  changeTheme({ ...theme, primaryColor: e.target.value })
                )
              }
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            {numValues.map((val) => (
              <ChangeSlider
                valueLabelDisplay="auto"
                step={0.01}
                min={val === "roundness" ? 0 : 0.5}
                max={1}
                key={val}
                val={val}
              />
            ))}
          </div>
          <RenameTheme />

          <Button
            variant="outlined"
            onClick={() => dispatch(deleteTheme(theme.id))}
            color="error"
            startIcon={delete_}
            //
          >
            Delete This Theme
          </Button>
        </>
      ) : (
        <div>
          Theme is not editable, You can click on add Theme which will duplicate
          this theme and edit the duplicate.
        </div>
      )}
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
    <div className="between w-full gap-4">
      <div className="text-xl w-40 capitalize">{val}</div>
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

export default CurrentThemeSettings;
