/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/Previewimg";
import { useNavigate } from "react-router-dom";

export default function UserProfilePage() {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    password: user.password,
  });
  const [formVisible, setFormVisible] = useState(true);

  const toast = useToast();
  const fileRef = useRef(null);
  const { handleImageChange, imgUrl } = usePreviewImg();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
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
        description: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setUser(data);
      localStorage.setItem("user-threads", JSON.stringify(data));

      setInputs({ ...inputs, password: "" });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Error updating profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      {formVisible && (
        <form onSubmit={handleSubmit}>
          <Flex align="center" justify="center" my={6}>
            <Stack
              spacing={4}
              w="full"
              maxW="md"
              bg={useColorModeValue("white", "gray.dark")}
              rounded="xl"
              boxShadow="lg"
              p={6}
              position="relative"
            >
              <IconButton
                icon={<CloseIcon />}
                size="sm"
                aria-label="Close form"
                position="absolute"
                top={2}
                right={2}
                onClick={() => {
                  setFormVisible(false);
                  navigate(`/${user.username}`);
                }}
              />
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                User Profile Edit
              </Heading>
              <FormControl id="userName">
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar size="xl" boxShadow="md" src={imgUrl || user.profilePic} />
                  </Center>
                  <Center w="full">
                    <Button w="full" onClick={() => fileRef.current.click()}>
                      Change Avatar
                    </Button>
                    <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
                  </Center>
                </Stack>
              </FormControl>
              <FormControl>
                <FormLabel>Full name</FormLabel>
                <Input
                  placeholder="Full Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={inputs.name}
                  onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={inputs.username}
                  onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="your-email@example.com"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  value={inputs.email}
                  onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Input
                  placeholder="Bio"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={inputs.bio}
                  onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                />
              </FormControl>
              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                  onClick={() => {
                    setFormVisible(false);
                    navigate(`/${user.username}`);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </form>
      )}
    </div>
  );
}
