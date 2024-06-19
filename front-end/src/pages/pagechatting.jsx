import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { conversationsAtom, selectedConversationsAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import Conversations from "../components/Conversations";
import MessageContainer from "../components/MessageContainer";

const ChatPage = () => {
  const toast = useToast();
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationsAtom
  );
  const [searchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch("/api/messages/conversations");
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

        setConversations(data);
      } catch (err) {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoadingConversations(false);
      }
    };

    getConversations();
  }, [toast, setConversations]);

  const handleConversationSearch = async (e) => {
    e.preventDefault();
    setSearchingUser(true);

    try {
      const res = await fetch(`/api/users/profile/${searchText}`);
      const searchedUser = await res.json();

      if (searchedUser.error) {
        toast({
          title: "Error",
          description: searchedUser.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const messagingYourself = searchedUser._id === currentUser._id;
      if (messagingYourself) {
        toast({
          title: "Error",
          description: "Cannot message yourself",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const conversationAlreadyExists = conversations.find(
        (conversation) =>
          conversation.participants[0]._id === searchedUser._id
      );
      if (conversationAlreadyExists) {
        setSelectedConversation({
          _id: conversationAlreadyExists._id,
          userId: searchedUser._id,
          username: searchedUser.username,
          userProfilePic: searchedUser.profilePic,
        });
        return;
      }

      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: searchedUser._id,
            username: searchedUser.username,
            profilePic: searchedUser.profilePic,
          },
        ],
      };

      setConversations((prevConvos) => [...prevConvos, mockConversation]);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    } finally {
      setSearchingUser(false);
    }
  };

  return (
    <Box
      position="absolute"
      left="50%"
      width={{ base: "100%", md: "80%", lg: "750px" }}
      transform="translateX(-50%)"
      p={4}
    >
      <Flex
        gap={4}
        flexDirection={{ base: "column", md: "row" }}
        maxW={{ sm: "400px", md: "full" }}
        mx="auto"
      >
        <Flex
          flex={30}
          gap={2}
          flexDirection="column"
          maxW={{ sm: "250px", md: "full" }}
          mx="auto"
        >
          <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
            Your Conversations
          </Text>
          <form onSubmit={handleConversationSearch}>
            <Flex alignItems="center" gap={2}>
              <Input
                placeholder="Search for a user"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button size="sm" onClick={handleConversationSearch} isLoading={searchingUser}>
                <SearchIcon />
              </Button>
            </Flex>
          </form>
          {loadingConversations ? (
            [0, 1, 2, 3, 4, 5].map((_, i) => (
              <Flex key={i} gap={4} alignItems="center" p="1" borderRadius="md">
                <SkeletonCircle size="10" />
                <Flex w="full" flexDirection="column" gap={3}>
                  <Skeleton h="10px" w="80px" />
                  <Skeleton h="8px" w="90%" />
                </Flex>
              </Flex>
            ))
          ) : (
            conversations.map((conversation) => (
              <Conversations key={conversation._id} conversation={conversation} />
            ))
          )}
        </Flex>

        {!selectedConversation._id && (
          <Flex
            flex={70}
            borderRadius="md"
            p={2}
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            height="400px"
          >
            <Text fontSize={20}>Select a conversation to start messaging</Text>
          </Flex>
        )}
        {selectedConversation._id && <MessageContainer />}
      </Flex>
    </Box>
  );
};

export default ChatPage;
