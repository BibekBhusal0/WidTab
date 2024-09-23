import Settings from "./settings";

function Footer({ height }: { height: number }) {
  return (
    <div
      style={{ height: `${height}%` }}
      className="size-full between border-t-2">
      <Settings />
    </div>
  );
}

export default Footer;
