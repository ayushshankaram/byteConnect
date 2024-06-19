import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/UserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const UserPage = () => {
    const { user, loading } = useGetUserProfile();
    const { username } = useParams();
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            setFetching(true);
            try {
                const res = await fetch(`/api/posts/user/${username}`);
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.log(err);
                setPosts([]);
            } finally {
                setFetching(false);
            }
        };

        getPosts();
    }, [username, setPosts]);

    if (!user && loading) {
        return (
            <Flex justifyContent="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (!user && !loading) return <h1>User not found</h1>;

    return (
        <>
            <UserHeader user={user} />
            {fetching ? (
                <Flex justify="center">
                    <Spinner size="xl" />
                </Flex>
            ) : posts.length === 0 ? (
                <h1>Not posted anything</h1>
            ) : (
                posts.map((post) => (
                    <Post key={post._id} post={post} postedBy={post.postedBy} />
                ))
            )}
        </>
    );
};

export default UserPage;
