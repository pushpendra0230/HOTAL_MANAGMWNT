import axios from "axios";

export const uploadImageToCloudinary = async (formData) => {
    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dwvnxedxq/image/upload",
            formData
        );
        console.log("Cloudinary Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Cloudinary upload error", error);
        throw error;
    }
};