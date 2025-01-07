import { cn } from "@/utils/cn";
import MenuPopover from "@/components/popoverMenu";
import { useDispatch } from "react-redux";
import { setBackgroundImage } from "@/redux/slice/theme";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import useBackgroundImage, {
  getImagesFromStorage,
  saveImageToStorage,
} from "@/utils/image";
import { v4 as uuidv4 } from "uuid";

import abstract from "@/assets/img/abstract.jpg";
import autumn from "@/assets/img/autumn.jpg";
import bananas from "@/assets/img/bananas.jpg";
import clouds from "@/assets/img/clouds.jpg";
import colors from "@/assets/img/colors.jpg";
import flowers from "@/assets/img/flowers.jpg";
import mountains from "@/assets/img/mountains.jpg";
import ocean from "@/assets/img/ocean.jpg";
import rose from "@/assets/img/rose.jpg";
import space from "@/assets/img/space.jpg";
import wood from "@/assets/img/wood.jpg";

const defaultImages = [
  { id: "abstract", data: abstract },
  { id: "autumn", data: autumn },
  { id: "bananas", data: bananas },
  { id: "clouds", data: clouds },
  { id: "colors", data: colors },
  { id: "flowers", data: flowers },
  { id: "mountains", data: mountains },
  { id: "ocean", data: ocean },
  { id: "rose", data: rose },
  { id: "space", data: space },
  { id: "wood", data: wood },
];

function SelectBackgroundImage() {
  const image = useBackgroundImage();
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
  const [images, setImages] = useState<{ id: string; data: string }[]>([
    ...defaultImages,
  ]);
  const dispatch = useDispatch();
  const inpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadImages = async () => {
      const storedImages = await getImagesFromStorage();
      const imageArray = Object.entries(storedImages).map(([id, data]) => ({
        id,
        data,
      }));
      setImages([...images, ...imageArray]);
    };
    loadImages();
  }, []);

  const triggerInput = () => inpRef.current?.click();
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    for (const file of fileArray) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageId = uuidv4();
        const imageData = reader.result as string;
        await saveImageToStorage(imageId, imageData);
        setImages((prev) => [...prev, { id: imageId, data: imageData }]);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClick = (id: string) => {
    const img = defaultImages.find((p) => p.id === id);
    const imageURL = img ? img.data : `storageId/${id}`;
    dispatch(setBackgroundImage(imageURL));
  };

  const dim = "w-96 max-h-96";
  return (
    <div className={dim}>
      <div className="flex flex-center flex-col gap-3 p-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          hidden
          ref={inpRef}
        />
        <div className="flex flex-wrap gap-2">
          {images.map(({ data, id }) => (
            <div
              key={id}
              onClick={() => handleClick(id)}
              className="size-20 object-cover cursor-pointer">
              <img src={data} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <Button variant="contained" onClick={() => triggerInput()}>
          Upload
        </Button>
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
