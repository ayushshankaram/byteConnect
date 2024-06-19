import { Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { IoSendSharp } from "react-icons/io5"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { conversationsAtom, selectedConversationsAtom } from "../atoms/messagesAtom"

const MessageInput = ({ setMessages }) => {
    const [messageText, setMessageText] = useState("")
    const toast = useToast()
    const selectedConversation = useRecoilValue(selectedConversationsAtom)
    const setConversations = useSetRecoilState(conversationsAtom)

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!messageText) return

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: messageText,
                    recipientId: selectedConversation.userId,
                }),
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
                return
            }
            setMessages((messages) => [...messages, data])
            setConversations((prevConvo) => {
                const updatedConversations = prevConvo.map(conversation => {
                    if (conversation._id === selectedConversation._id) {
                        return {
                            ...conversation,
                            lastMessage: {
                                text: messageText,
                                sender: data.sender
                            }
                        }
                    }
                    return conversation
                })
                return updatedConversations
            })

            setMessageText("")

        } catch (err) {
            toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <form onSubmit={handleSendMessage}>
            <InputGroup>
                <Input w={"full"} placeholder="Type a message" onChange={(e) => setMessageText(e.target.value)} value={messageText} />
                <InputRightElement>
                    <IoSendSharp />
                </InputRightElement>
            </InputGroup>
        </form>
    )
}

export default MessageInput