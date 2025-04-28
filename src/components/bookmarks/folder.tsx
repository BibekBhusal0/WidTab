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
    <div className="relative h-[30px] w-9">
      {/* Back part of the folder */}
      <div
        className={cn(
          "bg-primary-dark absolute bottom-0 left-0 h-[90%] w-full rounded-[1.8px]",
          "origin-bottom-left transform transition-transform",
          "after:absolute after:bottom-[99%] after:-left-[1px] after:bg-red-400 after:content-['']",
          "after:bg-primary-dark after:border-text-primary after:h-[20%] after:w-[40%] after:rounded-t-[1.8px] after:border after:border-b-0",
          border,
          { "skew-x-[10deg]": open }
        )}
      />

      {/* Front flap of the folder */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-[75%] w-full",
          "bg-primary-light rounded-[1.8px]",
          "origin-bottom-left transform transition-transform",
          border,
          { "-skew-x-[25deg]": open }
        )}
        children={
          <Icon2RN
            icon={icon}
            className="flex-center text-primary-contrast-text size-full px-[20%] py-[5%]"
          />
        }
      />
    </div>
  );
};

export const HoverFolder = ({ empty = false, icon }: hoverFolderProps) => {
  const paper = "absolute inset-1 rounded-2xl transition-all ease duration-300 origin-bottom";
  return (
    <div className="file relative z-50 size-full origin-bottom [perspective:1500px]">
      <div
        className={cn(
          "bg-primary-dark size-full origin-top rounded-2xl rounded-tl-none",
          "group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)]",
          "ease relative transition-all duration-300",
          "after:bg-primary-dark after:absolute after:bottom-[99%] after:left-0 after:h-[10%] after:w-[33.33%] after:rounded-t-2xl after:content-['']"
        )}
      />
      {!empty && (
        <>
          <div
            className={cn(paper, "bg-zinc-400 select-none group-hover:[transform:rotateX(-25deg)]")}
          />
          <div className={cn(paper, "bg-zinc-300 group-hover:[transform:rotateX(-35deg)]")} />
          <div className={cn(paper, "bg-zinc-200 group-hover:[transform:rotateX(-42deg)]")} />
        </>
      )}
      <div
        className={cn(
          "absolute bottom-0 h-[94%] w-full rounded-2xl rounded-tr-none",
          "from-primary-main to-primary-light bg-linear-to-t",
          "after:bg-primary-light after:absolute after:right-0 after:bottom-[99%] after:h-[10%] after:w-[48.67%] after:rounded-t-2xl after:content-['']",
          "ease transition-all duration-300 group-hover:[transform:rotateX(-48deg)_translateY(1px)]",
          "flex origin-bottom items-end"
        )}
        children={
          <Icon2RN
            icon={icon}
            className="flex-center text-primary-contrast-text size-full px-[20%] py-[5%]"
          />
        }
      />
    </div>
  );
};

export default Folder;
