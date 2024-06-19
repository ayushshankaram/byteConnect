import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import userAtom from '../atoms/userAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import postsAtom from '../atoms/postsAtom'

const Actions = ({ post }) => {
    const user = useRecoilValue(userAtom)
    const [liked, setLiked] = useState(post.likes.includes(user?.id))
    const toast = useToast()
    const [posts, setPosts] = useRecoilState(postsAtom)
    const [liking, setLiking] = useState(false)
    const [replying, setReplying] = useState(false)
    const [reply, setReply] = useState("")

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleLikeAndUnlike = async () => {
        if (liking) return
        setLiking(true)

        if (!user) {
            toast({
                title: "Error",
                description: "You are not logged in",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        try {
            const res = await fetch("/api/posts/like/" + post._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await res.json()
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
                return;
            }

            if (!liked) {
                const updatedPosts = posts.map((p) => {
                    if (p._id === post._id) {
                        return { ...p, likes: [...p.likes, user._id] }
                    }
                    return p;
                })
                setPosts(updatedPosts)
            }
            else {
                const updatedPosts = posts.map((p) => {
                    if (p._id === post._id) {
                        return { ...p, likes: p.likes.filter((id) => id !== user._id) }
                    }
                    return p;
                })
                setPosts(updatedPosts)
            }

            setLiked(!liked)

        } catch (err) {
            console.log(err);
        } finally {
            setLiking(false)
        }
    }

    const handleReply = async () => {
        if (replying) return
        setReplying(false)

        if (!user) {
            toast({
                title: "Error",
                description: "You are not logged in",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        try {
            const res = await fetch("/api/posts/reply/" + post._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: reply }),
            })

            const data = await res.json()
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
                return;
            }

            const updatedPosts = posts.map((p) => {
                if (p._id === post._id) {
                    return { ...p, replies: [...p.replies, data] }
                }
                return p;
            })
            setPosts(updatedPosts)
            toast({
                title: "Success",
                description: "Reply sent successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            onClose()
            setReply("")
        } catch (err) {
            console.log(err);
        } finally {
            setReplying(false)
        }
    }

    return (
        <Flex flexDirection='column'>
            <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
                <svg
                    aria-label='Like'
                    color={liked ? "rgb(237, 73, 86)" : ""}
                    fill={liked ? "rgb(237, 73, 86)" : "transparent"}
                    height='19'
                    role='img'
                    viewBox='0 0 24 22'
                    width='20'
                    onClick={() => handleLikeAndUnlike()}
                >
                    <path
                        d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
                        stroke='currentColor'
                        strokeWidth='2'
                    ></path>
                </svg>

                <svg
                    aria-label='Comment'
                    color=''
                    fill=''
                    height='20'
                    role='img'
                    viewBox='0 0 24 24'
                    width='20'
                    onClick={onOpen}
                >
                    <title>Comment</title>
                    <path
                        d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
                        fill='none'
                        stroke='currentColor'
                        strokeLinejoin='round'
                        strokeWidth='2'
                    ></path>
                </svg>

                {/* <RepostSvg />
                <ShareSvg /> */}

            </Flex>

            <Flex gap={2} alignItems={"center"}>
                {/* <Text color={"gray.light"} fontSize={"sm"}>10 likes</Text> */}
                <Text color={"gray.light"} fontSize={"sm"}>{post.likes.length} likes</Text>
                <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                {/* <Text color={"gray.light"} fontSize={"sm"}>20 replies</Text> */}
                <Text color={"gray.light"} fontSize={"sm"}>{post.replies.length} replies</Text>
            </Flex>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Comment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input ref={initialRef} placeholder='Your comment goes here...' value={reply} onChange={(e) => setReply(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' size={"sm"} mr={3} isLoading={replying} onClick={handleReply}>
                            Reply
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Flex>
    )
}

export default Actions

const RepostSvg = () => {
    return (
        <svg
            aria-label='Comment'
            color=''
            fill=''
            height='20'
            role='img'
            viewBox='0 0 24 24'
            width='20'
        >
            <title>Comment</title>
            <path
                d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
                fill='none'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='2'
            ></path>
        </svg>
    )
}
const ShareSvg = () => {
    return (
        <svg
            aria-label='Comment'
            color=''
            fill=''
            height='20'
            role='img'
            viewBox='0 0 24 24'
            width='20'
        >
            <title>Comment</title>
            <path
                d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
                fill='none'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='2'
            ></path>
        </svg>
    )
}