import { useRef, useState } from "react";
import { ReactComponent as AddIcon } from "assets/icons/button/add.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/button/delete.svg";

const AddImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setPreviewImage(null);
  };

  return (
    <>
      {/* <div className="mt-76"> */}
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
      <div className="flex flex-row gap-0 items-end">
        <div className="relative w-83 h-83 rounded-10 bg-transparent shrink-0 ">
          {previewImage ? (
            <>
              <img
                src={previewImage}
                alt="preview"
                className="absolute bottom-0 left-0 w-78 h-78 object-cover rounded-10"
              />
              <button onClick={handleImageRemove} className="absolute top-0 -right-0" aria-label="이미지 삭제">
                <DeleteIcon className="w-17 h-17" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleButtonClick}
              className="absolute bottom-0 left-0 w-78 h-78 flex justify-center items-center border border-dashed border-font-whitegrayDark rounded-10"
            >
              <AddIcon className="w-20 h-20 fill-font-whitegrayDark" />
            </button>
          )}
        </div>
        <div className="text-caption-1 text-font-whitegrayDark font-pretendard">
          <span>(</span>
          <span>{previewImage ? "1" : "0"}</span>
          <span>/1)</span>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default AddImage;
