/* eslint-disable no-unused-vars */
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const HomePage = () => {
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const getFeedPosts = async () => {
            setLoading(true);
            setPosts([]);
            try {
                const res = await fetch("/api/posts/feed");
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.log(err);
                toast({
                    title: "Error",
                    description: err.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };
        getFeedPosts();
    }, [toast, setPosts]);

    return (
        <>
            {loading ? (
                <Flex justify="center">
                    <Spinner size="xl" />
                </Flex>
            ) : posts.length === 0 ? (
                <h1>You don't follow anyone</h1>
            ) : (
                posts.map((post) => <Post key={post._id} post={post} postedBy={post.postedBy} />)
            )}
        </>
    );
};

export default HomePage;
