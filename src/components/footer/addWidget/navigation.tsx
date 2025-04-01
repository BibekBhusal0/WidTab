import SimpleAddWidgetButton from "./simpleAddWidget";

function AddNavigation() {
  return (
    <div className="flex-center size-full flex-col gap-4 p-2">
      <SimpleAddWidgetButton widget={{ type: "navigation", values: { id: 0 } }} />
      <SimpleAddWidgetButton widget={{ type: "cylindrical-navigation", values: { id: 0 } }} />
    </div>
  );
}

export default AddNavigation;
