import { AddIcon } from "@chakra-ui/icons"
import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure, useMediaQuery, useToast } from "@chakra-ui/react"
import { useRef, useState } from "react"
import usePreviewImg from "../hooks/Previewimg"
import { BsFillImageFill } from "react-icons/bs"
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import postsAtom from "../atoms/postsAtom"
import { useParams } from "react-router-dom"

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText, setPostText] = useState('');
    const toast = useToast();
    const imageRef = useRef(null)
    const user = useRecoilValue(userAtom)
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useRecoilState(postsAtom)
    const [postButtonAdjust] = useMediaQuery("(min-width: 1024px)")
    const username = useParams()

    const handleTextChange = (e) => {
        const inputText = e.target.value;

        if (inputText.length > 288) {
            setPostText(inputText.slice(0, 288))
        }
        else {
            setPostText(inputText)
        }

    }

    const handleCreatePost = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl })
            })

            const data = await res.json()

            if (data.error) {
                toast({
                    title: "Error",
                    description: "Error while posting",
                    // description: { data.error },
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
                return;
            }
            toast({
                title: "Success",
                description: "Your post is uploaded",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            if (username === user.username) {
                setPosts([data, ...posts])
            }
            onClose()
            setPostText("")
            setImgUrl("")
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Button
                position={"fixed"}
                bottom={10}
                right={postButtonAdjust ? 10 : 3}
                leftIcon={<AddIcon />}
                bg={useColorModeValue("gray.300", "gray.dark")}
                onClick={onOpen}
            >
                {postButtonAdjust && ""}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Textarea placeholder="What's on your mind ?" value={postText} onChange={handleTextChange} />
                            <Text fontSize='xs' fontWeight={"bold"} textAlign={'right'} m={'1'} color={"gray.500"}>
                                {500 - postText.length}/500
                            </Text>
                            <Input
                                type="file"
                                hidden
                                ref={imageRef}
                                onChange={handleImageChange}
                            />

                            <BsFillImageFill
                                style={{ marginLeft: "5px", cursor: "pointer" }}
                                size={16}
                                onClick={() => imageRef.current.click()}
                            />
                        </FormControl>

                        {imgUrl &&
                            <Flex mt={5} w={"full"} position={"relative"}>
                                <Image src={imgUrl} alt="Selected img" />
                                <CloseButton
                                    onClick={() => {
                                        setImgUrl("")
                                    }}
                                    bg={"gray.200"}
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                />
                            </Flex>
                        }

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatePost