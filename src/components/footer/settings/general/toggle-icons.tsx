import { toggleIcon } from "@/redux/slice/layout";
import { StateType } from "@/redux/store";
import { allRemovableToolbarIcons } from "@/types/slice/layout";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";

function ToggleIcons() {
  const { toolBarIcons } = useSelector((state: StateType) => state.layout);
  const dispatch = useDispatch();

  return (
    <div className="flex-center flex-col gap-4 px-4">
      {allRemovableToolbarIcons.map((icon) => (
        <div key={icon} className="full-between">
          <div className="text-xl capitalize">{icon} </div>
          <Switch
            key={icon}
            checked={toolBarIcons.includes(icon)}
            onChange={() => dispatch(toggleIcon(icon))}
          />
        </div>
      ))}
    </div>
  );
}

export default ToggleIcons;
