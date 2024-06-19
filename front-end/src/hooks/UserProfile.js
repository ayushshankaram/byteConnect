import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const toast = useToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/profile/${username}`);
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
        setUser(data);
      } catch (err) {
        console.log("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username, toast]);

  return { loading, user };
};

export default useGetUserProfile;
