import useCurrentTheme from "@/hooks/useCurrentTheme";
import { changeTheme, deleteTheme, toggleCurrentMode } from "@/redux/slice/theme";
import { numericalThemeValues } from "@/types/slice/theme";
import Button from "@mui/material/Button";
import Slider, { SliderProps } from "@mui/material/Slider";
import { useDispatch } from "react-redux";
import RenameTheme from "./renameTheme";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import SelectIconPack from "./iconPack";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import { HexPicker } from "@/components/color";
import SelectBackgroundImage from "./selectBackgroundImage";

function CurrentThemeSettings() {
  const theme = useCurrentTheme();
  const dispatch = useDispatch();
  const { delete_ } = useCurrentIcons();
  const sliderProps: changeSliderProps[] = [
    { val: "blur", step: 0.01, min: 0, max: 1 },
    { val: "opacity", step: 0.01, min: 0, max: 1 },
    { val: "roundness", step: 0.01, min: 0.5, max: 1 },
    { val: "gap", step: 0.1, min: 2, max: 20 },
  ];

  const toggle: MenuSwitchProps["items"] = [
    {
      onChange: () => dispatch(toggleCurrentMode()),
      title: "Dark Mode",
      checked: theme.mode === "dark",
    },
  ];

  return (
    <div className="flex flex-col gap-4 px-3">
      {/* Dark mode toggle */}
      <MenuSwitch plain items={toggle} />

      {theme.editAble ? (
        <>
          <div aria-label="primary color" className="full-between">
            <div className="text-xl">Primary Color</div>
            <div className="w-36">
              <HexPicker
                color={theme.primaryColor}
                setColor={(color) => dispatch(changeTheme({ ...theme, primaryColor: color }))}
              />
            </div>
          </div>
          <div aria-label="opacity/blur/roundness" className="flex flex-col items-center gap-4">
            {sliderProps.map((props) => (
              <ChangeSlider {...props} key={props.val} />
            ))}
          </div>

          <SelectIconPack showLabel />
          <SelectBackgroundImage />
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
          Theme is not editable, You can click on add Theme which will duplicate this theme and edit
          the duplicate.
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
  const num = theme[val] === undefined ? 10 : theme[val];

  return (
    <div className="full-between">
      <div className="w-40 text-xl capitalize">{val}</div>
      <Slider
        value={num}
        onChange={(_, value) => {
          dispatch(changeTheme({ ...theme, [val]: value as number }));
        }}
        {...props}
      />
    </div>
  );
}

export default CurrentThemeSettings;
