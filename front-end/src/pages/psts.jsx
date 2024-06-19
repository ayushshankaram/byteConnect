import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams, useNavigate } from "react-router-dom";
import { Flex, Spinner, Avatar, Text, Image, Box, Divider, useToast } from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import Comment from "../components/Comment";
import postsAtom from "../atoms/postsAtom";
import Actions from "../components/Actions";
import useGetUserProfile from "../hooks/UserProfile";

const PostPage = () => {
    const { user, loading } = useGetUserProfile();
    const [posts, setPosts] = useRecoilState(postsAtom);
    const toast = useToast();
    const { pid } = useParams();
    const currentUser = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const currentPost = posts[0];

    useEffect(() => {
        const getPost = async () => {
            setPosts([]);
            try {
                const res = await fetch(`/api/posts/${pid}`);
                const data = await res.json();

                if (data.error) {
                    toast({
                        title: "Error",
                        description: data.error,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                    return;
                }
                setPosts([data]);
            } catch (err) {
                console.log("Error fetching post:", err);
            }
        };

        getPost();
    }, [pid, toast, setPosts]);

    const handleDeletePost = async () => {
        try {
            if (!window.confirm("Are you sure you want to delete the post?")) return;
            const res = await fetch(`/api/posts/${currentPost._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            toast({
                title: "Success",
                description: "Post deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate(`/${user.username}`);
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return (
            <Flex justifyContent="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (!currentPost) return null;

    return (
        <>
            <Flex align="center">
                <Avatar size="md" name={user.username} src={user.profilePic} />
                <Flex ml={2} align="center">
                    <Text fontSize="sm" fontWeight="bold">
                        {user.username}
                    </Text>
                    <Image src="/verified.png" w={4} h={4} ml={1} />
                </Flex>
                <Flex ml="auto" align="center">
                    <Text fontSize="sm" color="gray.light">
                        {formatDistanceToNowStrict(new Date(currentPost.createdAt))} ago
                    </Text>
                    {currentUser?._id === user._id && (
                        <DeleteIcon size={5} ml={2} cursor="pointer" onClick={handleDeletePost} />
                    )}
                </Flex>
            </Flex>

            <Text my={3}>{currentPost.text}</Text>

            <Box borderRadius={6} overflow="hidden" border="1px solid" borderColor="gray.light">
                <Image src={currentPost.img} w="full" />
            </Box>

            <Flex gap={3} my={3}>
                <Actions post={currentPost} />
            </Flex>

            <Divider my={4} />

            {currentPost.replies.map((reply) => (
                <Comment
                    key={reply._id}
                    reply={reply}
                    lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id}
                />
            ))}
        </>
    );
};

export default PostPage;
