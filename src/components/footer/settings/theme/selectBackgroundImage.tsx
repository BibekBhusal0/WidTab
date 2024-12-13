import useCurrentTheme from "@/hooks/useCurrentTheme";
import { cn } from "@/utils/cn";
import MenuPopover from "@/components/popoverMenu";
import field from "@/assets/img/field.jpg";
import night from "@/assets/img/night.jpg";
import { useDispatch } from "react-redux";
import { setBackgroundImage } from "@/redux/slice/theme";
import Button from "@mui/material/Button";
import { useState } from "react";

function SelectBackgroundImage() {
  const { image } = useCurrentTheme();
  const img = <img src={image} className="size-20 object-cover" />;
  return (
    <div className={cn("flex flex-center gap-3", image && "flex-col")}>
      <div className="text-xl">Background Image</div>
      <MenuPopover
        menuProps={{
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
          transformOrigin: { vertical: "bottom", horizontal: "left" },
        }}
        icon={
          image ? (
            img
          ) : (
            <div className="flex w-full flex-center">No Image Selected</div>
          )
        }>
        <PopoverContent />
      </MenuPopover>
    </div>
  );
}
function PopoverContent() {
  const [images, setImages] = useState([field, night]);
  const dispatch = useDispatch();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files;
    console.log(f);
    if (!f) return;
    if (f.length > 0) {
      const imageUrl = URL.createObjectURL(f[0]);
      setImages((prev) => [...prev, imageUrl]);
    }
  };
  const dim = "w-72 max-h-96";
  return (
    <div className={dim}>
      <div className="flex flex-center flex-col gap-3 p-2">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <div className="flex flex-wrap gap-2">
          {images.map((img) => (
            <div
              key={img}
              onClick={() => {
                dispatch(setBackgroundImage(img));
              }}
              className="size-20 object-cover cursor-pointer">
              <img src={img} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <Button
          variant="outlined"
          onClick={() => dispatch(setBackgroundImage(undefined))}
          color="error">
          Remove Image
        </Button>
      </div>
    </div>
  );
}

export default SelectBackgroundImage;
