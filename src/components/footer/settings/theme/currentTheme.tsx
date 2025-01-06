import useCurrentTheme from "@/hooks/useCurrentTheme";
import { numericalThemeValues } from "@/types/slice/theme";
import Button from "@mui/material/Button";
import Slider, { SliderProps } from "@mui/material/Slider";
import RenameTheme from "./renameTheme";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import SelectIconPack from "./iconPack";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import { HexPicker } from "@/components/color";
import SelectBackgroundImage from "./selectBackgroundImage";
import { changeTheme, deleteTheme, toggleCurrentMode } from "@/storage/theme";

function CurrentThemeSettings() {
  const theme = useCurrentTheme();
  const { delete_ } = useCurrentIcons();
  const numValues: numericalThemeValues[] = ["blur", "opacity", "roundness"];
  const toggle: MenuSwitchProps["items"] = [
    {
      onChange: () => toggleCurrentMode(),
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
                setColor={(color) =>
                  changeTheme({ ...theme, primaryColor: color })
                }
              />
            </div>
          </div>
          <div
            aria-label="opacity/blur/roundness"
            className="flex flex-col items-center gap-4">
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

          <SelectIconPack showLabel />
          <SelectBackgroundImage />
          <RenameTheme />
          <Button
            variant="outlined"
            onClick={() => deleteTheme(theme.id)}
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

  return (
    <div className="full-between">
      <div className="text-xl w-40 capitalize">{val}</div>
      <Slider
        value={theme[val]}
        onChange={(_, value) => {
          changeTheme({ ...theme, [val]: value as number });
        }}
        {...props}
      />
    </div>
  );
}

export default CurrentThemeSettings;
