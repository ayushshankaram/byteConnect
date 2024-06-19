import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import Message from "./Message"
import MessageInput from "./MessageInput"
import { selectedConversationsAtom } from "../atoms/messagesAtom"
import { useRecoilState, useRecoilValue } from "recoil"
import { useEffect, useState } from "react"
import userAtom from "../atoms/userAtom"

const MessageContainer = () => {
    const toast = useToast()
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationsAtom)
    const [loadingMessages, setLoadingMessages] = useState(true)
    const [messages, setMessages] = useState([])
    const currentUser = useRecoilValue(userAtom)

    useEffect(() => {
        const getMessages = async () => {
            setLoadingMessages(true)
            setMessages([])
            try {
                if (selectedConversation.mock) return
                
                const res = await fetch(`/api/messages/${selectedConversation.userId}`)
                const data = await res.json()

                if (data.error) {
                    toast({
                        title: "Error ho tum",
                        description: data.error,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    })
                    return
                }
                setMessages(data)
            } catch (error) {
                toast({
                    title: "Error hu mai",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            } finally {
                setLoadingMessages(false)
            }
        }

        getMessages()
    }, [toast, selectedConversation.userId])

    return (
        <Flex
            flex='70'
            bg={useColorModeValue("gray.200", "gray.dark")}
            borderRadius={"md"}
            p={2}
            flexDirection={"column"}
        >
            <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
                <Avatar src={selectedConversation.userProfilePic} size={"sm"} />
                <Text display={"flex"} alignItems={"center"}>
                    {selectedConversation.username} <Image src="/verified.png" w={4} h={4} ml={1} />
                </Text>
            </Flex>

            <Divider />

            <Flex
                flexDir={"column"} gap={4} my={4} p={2}
                height={"400px"} overflowY={"auto"}
            >
                {loadingMessages && (
                    [0, 1, 2, 3, 4].map((_, i) => (
                        <Flex key={i} gap={2} alignItems={"center"} p={1} borderRadius={"md"}
                            alignSelf={i % 2 == 0 ? "flex-start" : "flex-end"}
                        >
                            {i % 2 === 0 && <SkeletonCircle size={7} />}
                            <Flex flexDir={"column"} gap={2}>
                                <Skeleton h="8px" w={"250px"} />
                                <Skeleton h="8px" w={"250px"} />
                                <Skeleton h="8px" w={"250px"} />
                            </Flex>
                            {i % 2 === 0 && <SkeletonCircle size={7} />}
                        </Flex>
                    ))
                )}

                {!loadingMessages && (
                    messages.map((message) => (
                        <Message key={message._id} message={message} ownMessage={currentUser._id === message.sender} />
                    ))
                )}

            </Flex>


            <MessageInput setMessages={setMessages} />

        </Flex >
    )
}

export default MessageContainer