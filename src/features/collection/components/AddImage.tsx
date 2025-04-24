import { useRef, useState } from 'react';
import { ReactComponent as AddIcon } from 'assets/icons/add.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

const AddImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]); // 여러 장 저장

  const handleButtonClick = () => {
    fileInputRef.current?.click(); 
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            newImages.push(reader.result);

            // 모든 파일 읽었으면 state 업데이트
            if (newImages.length === files.length) {
              setPreviewImages((prev) => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleImageRemove = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className='px-[24px] py-[76px]'>
        <input
          type="file" 
          accept="image/*"
          multiple // 여러 장 선택 가능하게
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

      <div className="flex  gap-[9px] items-center h-[98px]">
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-[78px] h-[78px] rounded-[10px] bg-[#d9d9d9] shrink-0"
        >
          <AddIcon className='mx-[18px] my-[18px]'/>
        </button>
      
        <div className='overflow-visible flex overflow-x-auto gap-[9px] h-[98px] items-center'>
          {previewImages.map((image, idx) => (
            <div key={idx} className="relative w-[78px] h-[78px] rounded-[10px] shrink-0">
              <img
                key={idx}
                src={image}
                alt={`preview-${idx}`}
                className="w-full h-full  object-cover rounded-lg"
              />
              <button
              onClick={() => handleImageRemove(idx)}
              className="absolute -top-[15px] -right-[15px]" 
              aria-label="이미지 삭제"
              >
                <CloseIcon className="w-[39px] h-[39px]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddImage;
