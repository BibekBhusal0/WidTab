import SimpleAddWidgetButton from "./simpleAddWidget";

function DateTime() {
  return (
    <div className="flex-center flex-col p-2 gap-4 size-full">
      <SimpleAddWidgetButton widget={{ type: "calendar", values: { id: 0 } }} />
      <SimpleAddWidgetButton widget={{ type: "clock", values: { id: 0 } }} />
    </div>
  );
}

export default DateTime;
