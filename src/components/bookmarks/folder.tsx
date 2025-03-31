import { Icon2RN, iconAsProp } from "@/theme/icons";
import { cn } from "@/utils/cn";

type folderProps = {
  open?: boolean;
  icon?: iconAsProp;
};

type hoverFolderProps = {
  empty?: boolean;

  icon?: iconAsProp;
};
const Folder = ({ open = false, icon }: folderProps) => {
  const border = "border-text-primary border";
  return (
    <div className="relative w-9 h-[30px]">
      {/* Back part of the folder */}
      <div
        className={cn(
          "absolute bg-primary-dark rounded-[1.8px] h-[90%] bottom-0 left-0 w-full",
          "transition-transform transform origin-bottom-left",
          "after:absolute after:content-[''] after:bottom-[99%] after:bg-red-400 after:-left-[1px]",
          "after:w-[40%] after:h-[20%] after:bg-primary-dark after:rounded-t-[1.8px] after:border after:border-text-primary after:border-b-0",
          border,
          { "skew-x-[10deg]": open }
        )}
      />

      {/* Front flap of the folder */}
      <div
        className={cn(
          "absolute bottom-0 left-0 w-full h-[75%]",
          "bg-primary-light rounded-[1.8px]",
          "transition-transform transform origin-bottom-left",
          border,
          { "-skew-x-[25deg]": open }
        )}
        children={
          <Icon2RN
            icon={icon}
            className="flex-center size-full px-[20%] py-[5%] text-primary-contrast-text"
          />
        }
      />
    </div>
  );
};

export const HoverFolder = ({ empty = false, icon }: hoverFolderProps) => {
  const paper =
    "absolute inset-1 rounded-2xl transition-all ease duration-300 origin-bottom";
  return (
    <div className="file relative size-full  origin-bottom [perspective:1500px] z-50">
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
          "bg-linear-to-t from-primary-main to-primary-light",
          "after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[48.67%] after:h-[10%] after:bg-primary-light after:rounded-t-2xl ",
          "transition-all ease duration-300 group-hover:[transform:rotateX(-48deg)_translateY(1px)]",
          "origin-bottom flex items-end"
        )}
        children={
          <Icon2RN
            icon={icon}
            className="flex-center size-full px-[20%] py-[5%] text-primary-contrast-text"
          />
        }
      />
    </div>
  );
};

export default Folder;
