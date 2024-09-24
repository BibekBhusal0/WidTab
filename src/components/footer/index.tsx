import Lock from "./lock";
import Settings from "./settings";

function Footer({ height }: { height: number }) {
  return (
    <div
      style={{ height: `${height}%` }}
      className="size-full between border-t-2">
      <div className="flex-center">
        <Settings />
      </div>
      <div className="flex-center">
        <Lock />
      </div>
    </div>
  );
}

export default Footer;
