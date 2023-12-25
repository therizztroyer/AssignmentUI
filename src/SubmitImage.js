import React from "react";
import axios from 'axios';

const SubmitImage = ({ image, dataSetter }) => {
  const handleUpload = async () => {
    try {
      if (image) {
        console.log(image.split(',')[1])
        const formData = new FormData();
        formData.append('file', image);

        const apiKey = 'AIzaSyA_RI5beUMaGsy1hDH0BwB55MdmOIY4uqE';
        const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

        const requestData = {
            requests: [
              {
                image: {
                  content: image.split(',')[1], // Remove "data:image/jpeg;base64,"
                },
                features: [
                  {
                    type: 'TEXT_DETECTION',
                  },
                ],
              },
            ],
          };

        // Handle the response from the API
        const response = await axios.post(apiUrl, requestData);
      const text = response.data.responses[0].fullTextAnnotation.text;
      console.log(response);
      dataSetter(text);

      }
    } catch (error) {
      console.error('Error uploading file:', error);
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
