import { atom } from "recoil";

export const conversationsAtom = atom({
    key: 'conversationsAtom',
    default: [],
})

export const selectedConversationsAtom = atom({
    key: "selectedConversationAtom",
    default: {
        _id: "",
        userId: "",
        username: "",
        userProfilePic: ""
    }
})