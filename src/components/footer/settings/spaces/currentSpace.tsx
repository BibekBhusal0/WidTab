import useCurrentLayout from "@/hooks/useCurrentLayout";
import SettingHeader from "../settings-header";
import DuplicateThisSpace from "./duplicateSpace";
import DeleteThisSpace from "./deleteSpace";
import AddSpace from "./addSpace";
import RenameItem from "@/components/renameItem";
import { useDispatch, useSelector } from "react-redux";
import {
  currentSpaceChangeIcon,
  currentSpaceRename,
  toggleLocked,
} from "@/redux/slice/layout";
import { SelectIconMenu } from "@/components/select-icon";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import { StateType } from "@/redux/store";

function CurrentSpaceSetting() {
  const layout = useCurrentLayout();
  const dispatch = useDispatch();
  const { locked } = useSelector((state: StateType) => state.layout);

  const toggle: MenuSwitchProps["items"] = [
    {
      onChange: () => dispatch(toggleLocked()),
      title: "Lock Widgets",
      checked: locked,
    },
  ];

  if (!layout)
    return (
      <div className="w-full p-2 border-divider border-t-2 pb-4">
        <AddSpace />
      </div>
    );

  return (
    <>
      <SettingHeader>Current Space</SettingHeader>
      <div
        aria-label="Current Space Settings"
        className="w-full flex flex-col items-center gap-5 pb-4">
        {/* Lock */}
        <MenuSwitch plain items={toggle} />
        <div aria-label="rename" className="full-between">
          <div className="text-xl">Rename Space</div>
          <RenameItem
            initialText={layout.name}
            handleChange={(e: string) => {
              dispatch(currentSpaceRename(e));
            }}
            inputProps={{ placeholder: "Rename Space" }}
            wordLimit={20}
          />
        </div>

        <div aria-label="Icons" className="full-between icon-xl">
          <div className="text-xl">Change Icon</div>
          <div className="w-14 flex-center">
            <SelectIconMenu
              icon={layout.icon}
              setIcon={(icon: string) => dispatch(currentSpaceChangeIcon(icon))}
            />
          </div>
        </div>

        <DuplicateThisSpace />
        <AddSpace />
        <DeleteThisSpace />
      </div>
    </>
  );
}

export default CurrentSpaceSetting;
