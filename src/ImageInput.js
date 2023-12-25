import React, { useState } from "react";

const ImageInput = ({ onImageChange }) => {
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <label for="file" className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Upload File
    </label>
      <input
        type="file"
        id="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </>
  );
};

export default ImageInput;
