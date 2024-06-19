/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, Box, Flex, Image, Text, useToast } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import Actions from "./Actions"
import { useEffect, useState } from "react"
import { formatDistanceToNowStrict } from "date-fns"
import { DeleteIcon } from "@chakra-ui/icons"
import userAtom from "../atoms/userAtom"
import { useRecoilState, useRecoilValue } from "recoil"
import postsAtom from "../atoms/postsAtom"

const Post = ({ post, postedBy }) => {
    const [liked, setLiked] = useState(false);
    const [user, setUser] = useState(null);
    const toast = useToast()
    const navigate = useNavigate();
    const currentUser = useRecoilValue(userAtom)
    const [posts, setPosts] = useRecoilState(postsAtom)

    const handleDeletePost = async (e) => {
        try {
            e.preventDefault()

            if (!window.confirm("Are you sure you want to delete the post ?")) return;
            const res = await fetch(`/api/posts/${post._id}`, {
                method: "DELETE"
            })
            const data = res.json()
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
            toast({
                title: "Success",
                description: "Post deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            setPosts(posts.filter((p) => p._id !== post._id))

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("/api/users/profile/" + postedBy)
                const data = await res.json()
                // console.log(data)

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

                setUser(data)
            } catch (err) {
                console.log(err)
                setUser(null)
            }
        }
        getUser()

    }, [postedBy, toast])

    if (!user) return null

    return (
        <Link to={`/${user.username}/post/${post._id}`}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size='md' name={user.name} src={user.profilePic} onClick={(e) => {
                        e.preventDefault()
                        navigate(`/${user.username}`)
                    }} />
                    <Box w='1px' h={"full"} bg="gray.light" my={2}></Box>
                    {/* <Box position={"relative"} w={"full"}>
                        {post.replies[0] && (
                            <Avatar
                                size='xs'
                                name="John Doe"
                                src='https://bit.ly/dan-abramov'
                                position={"absolute"}
                                top={"0px"}
                                left="15px"
                                padding="2px"
                            />
                        )}
                        {post.replies[1] && (
                            <Avatar
                                size='xs'
                                name="Ryan Florence"
                                src='https://bit.ly/ryan-florence'
                                position={"absolute"}
                                bottom={"0px"}
                                right="-5px"
                                padding="2px"
                            />
                        )}
                        {post.replies[2] && (
                            <Avatar
                                size='xs'
                                name="Kent"
                                src='https://bit.ly/kent-c-dodds'
                                position={"absolute"}
                                bottom={"0px"}
                                left="4px"
                                padding="2px"
                            />
                        )}
                    </Box> */}
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text fontSize={"sm"} fontWeight={"bold"} onClick={(e) => {
                                e.preventDefault()
                                navigate(`/${user.username}`)
                            }} >{user.username}</Text>
                            <Image src="/verified.png" w={4} h={4} ml={1} />
                        </Flex>

                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"sm"} width={36} textAlign={"right"} color={"gray.light"}>
                                {formatDistanceToNowStrict(new Date(post.createdAt))} ago
                            </Text>
                            {currentUser?._id === user._id && (
                                <DeleteIcon size={10} onClick={handleDeletePost} />
                            )}
                        </Flex>
                    </Flex>

                    <Text fontSize={"sm"}>{post.text}</Text>
                    {post.img && (
                        <Box
                            borderRadius={6}
                            overflow={"hidden"}
                            border={"1px solid"}
                            borderColor={"gray.light"}
                        >
                            <Image src={post.img} w={"full"} />
                        </Box>
                    )}

                    <Flex gap={3} my={1}>
                        <Actions post={post} />
                    </Flex>
                </Flex>
            </Flex>

        </Link>
    )
}

export default Post