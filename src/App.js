import React, { useState } from "react";
import ImageInput from "./ImageInput";
import Header from "./Header";
import SubmitImage from "./SubmitImage";

function App() {
  const [selectedImage, setSelectedImage] = useState("");
  const [parsedData, setParsedData] = useState("");

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <Header />
      <div className="App flex items-top justify-center mt-8">
        <div className="container mx-auto flex justify-between gap-4">
          <div className="w-1/2">
            <div className="w-[100%] h-[50vh] bg-gray-200 p-4 border border-solid border-gray-500 rounded-lg">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="mx-auto h-[100%]"
                />
              )}
            </div>
            <div className="mt-4 flex flex-row justify-around">
              <ImageInput onImageChange={handleImageChange} />
              {selectedImage && (
                <SubmitImage
                  image={selectedImage}
                  imageDataSetter={setParsedData}
                />
              )}
            </div>
          </div>

          <div className="w-1/2 h-[50vh] bg-gray-200 p-4 border border-solid border-gray-500 rounded-lg">
            Second Container
            {}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
