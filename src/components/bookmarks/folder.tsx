import { cn } from "@/utils/cn";

const Folder = ({ open = false }: { open?: boolean }) => {
  const commonCls = "transition transform overflow-visible origin-bottom-left";
  return (
    <div className={cn(commonCls, "group relative")}>
      <svg
        width="36"
        height="30"
        viewBox="0 0 36 30"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          commonCls,
          "group size-full relative stroke-text-primary"
        )}>
        <path
          className={cn(commonCls, "fill-primary-dark", {
            "skew-x-[10deg]": open,
          })}
          d="M0 1.8C0 0.805886 0.805887 0 1.8 0H11.5284C12.1887 0 12.796 0.361581 13.1108 0.942101L14.2492 3.04205C14.564 3.62257 15.1713 3.98415 15.8316 3.98415H34.2C35.1941 3.98415 36 4.79003 36 5.78415V27.9C36 28.8941 35.1941 29.7 34.2 29.7H1.8C0.805886 29.7 0 28.8941 0 27.9V1.8Z"
        />
        <rect
          className={cn(commonCls, "fill-primary-light", {
            "-skew-x-[25deg]": open,
          })}
          y="10"
          width="36"
          height="19.7"
          rx="1.8"
        />
      </svg>
    </div>
  );
};

export const HoverFolder = ({ empty = false }: { empty?: boolean }) => {
  const paper =
    "absolute inset-1 rounded-2xl transition-all ease duration-300 origin-bottom";
  return (
    <div className="file relative size-full cursor-pointer origin-bottom [perspective:1500px] z-50">
      <div
        className={cn(
          "bg-primary-dark size-full origin-top rounded-2xl rounded-tl-none",
          "group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)]",
          "transition-all ease duration-300 relative",
          "after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-[33.33%] after:h-[10%] after:bg-primary-dark after:rounded-t-2xl"
        )}
      />
      {!empty && (
        <>
          <div
            className={cn(
              paper,
              "select-none group-hover:[transform:rotateX(-25deg)] bg-zinc-400"
            )}
          />
          <div
            className={cn(
              paper,
              "group-hover:[transform:rotateX(-35deg)] bg-zinc-300"
            )}
          />
          <div
            className={cn(
              paper,
              "group-hover:[transform:rotateX(-42deg)] bg-zinc-200"
            )}
          />
        </>
      )}
      <div
        className={cn(
          "absolute bottom-0 rounded-2xl rounded-tr-none w-full h-[94%]",
          "bg-gradient-to-t from-primary-main to-primary-light",
          "after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[48.67%] after:h-[10%] after:bg-primary-light after:rounded-t-2xl ",
          "transition-all ease duration-300 group-hover:[transform:rotateX(-48deg)_translateY(1px)]",
          "origin-bottom flex items-end"
        )}
      />
    </div>
  );
};

export default Folder;
