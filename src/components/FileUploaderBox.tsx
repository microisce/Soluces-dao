import { useRef, useState, ChangeEvent } from "react";

const FileUploaderBox = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <div className="image-box" onClick={handleButtonClick}>
        {selectedImage ? (
          <img src={selectedImage} alt="Uploaded" />
        ) : (
          <div className="upload-button">
            <i className="fas fa-plus"></i>
            <span>Upload Image</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploaderBox;
