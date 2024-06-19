/* eslint-disable no-unused-vars */
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState(null);
    const toast = useToast();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImgUrl(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            toast({
                title: "Invalid file type",
                description: "Please select an image file",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setImgUrl(null);
        }
    };

    return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
