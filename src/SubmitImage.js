import React from "react";
import axios from "axios";
import cleanOCRData from "./Services/cleanText";

const SubmitImage = ({ image, imageDataSetter }) => {
  const handleUpload = async () => {
    try {
      if (image) {
        console.log(image.split(",")[1]);
        const formData = new FormData();
        formData.append("file", image);

        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

        const requestData = {
          requests: [
            {
              image: {
                content: image.split(",")[1], // Remove "data:image/jpeg;base64,"
              },
              features: [
                {
                  type: "TEXT_DETECTION",
                },
              ],
            },
          ],
        };

        const response = await axios.post(apiUrl, requestData);
        const text = response.data.responses[0].fullTextAnnotation.text;
        const cleanedText = cleanOCRData(text);
        console.log(cleanOCRData(text));
        imageDataSetter(cleanedText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleUpload}
    >
      Submit
    </button>
  );
};

export default SubmitImage;
