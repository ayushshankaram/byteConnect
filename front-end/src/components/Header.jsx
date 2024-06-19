import { Button, Flex, Link, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import userAtom from "../atoms/userAtom"
import { RxAvatar } from "react-icons/rx"
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom"
import { FiLogOut } from "react-icons/fi"
import useLogout from "../hooks/useLogout";
import { BsChatDotsFill, BsChatText } from "react-icons/bs";
import authScreenAtom from "../atoms/authAtom";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const user = useRecoilValue(userAtom)
    const logout = useLogout()
    const hoverBg = useColorModeValue("gray.500", "gray.300");
    const iconColor = useColorModeValue("black", "white");
    const hoverIconColor = useColorModeValue("white", "black");

    return (
        <div>
            <Flex justifyContent={user ? "space-between" : "space-between"} mt={6} mb={12}>
                {user ? (
                    <Flex alignItems={"center"} gap={4}>
                        <Link as={RouterLink} to={"/"} _hover={{ borderRadius: '50%', transform: 'scale(1.5)', transition: "all 0.5s"  }}>
                            <IoHomeSharp size={24} />
                        </Link>
                        <Link as={RouterLink} to={`/${user.username}`} _hover={{ borderRadius: '50%', transform: 'scale(1.5)', transition: "all 0.5s"  }}>
                            <RxAvatar size={24} />
                        </Link>
                    </Flex>

                ) : (
                    <Link as={RouterLink} to={"/auth"} >
                        <Button size={24} onClick={() => { setAuthScreen("login") }} >Login</Button>
                    </Link>
                )}


                {colorMode === "dark" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width={27} onClick={toggleColorMode} cursor={"pointer"} viewBox="0 0 20 20" id="Light"><path d="M19 9.199h-.98c-.553 0-1 .359-1 .801 0 .441.447.799 1 .799H19c.552 0 1-.357 1-.799 0-.441-.449-.801-1-.801zM10 4.5A5.483 5.483 0 0 0 4.5 10c0 3.051 2.449 5.5 5.5 5.5 3.05 0 5.5-2.449 5.5-5.5S13.049 4.5 10 4.5zm0 9.5c-2.211 0-4-1.791-4-4 0-2.211 1.789-4 4-4a4 4 0 0 1 0 8zm-7-4c0-.441-.449-.801-1-.801H1c-.553 0-1 .359-1 .801 0 .441.447.799 1 .799h1c.551 0 1-.358 1-.799zm7-7c.441 0 .799-.447.799-1V1c0-.553-.358-1-.799-1-.442 0-.801.447-.801 1v1c0 .553.359 1 .801 1zm0 14c-.442 0-.801.447-.801 1v1c0 .553.359 1 .801 1 .441 0 .799-.447.799-1v-1c0-.553-.358-1-.799-1zm7.365-13.234c.391-.391.454-.961.142-1.273s-.883-.248-1.272.143l-.7.699c-.391.391-.454.961-.142 1.273s.883.248 1.273-.143l.699-.699zM3.334 15.533l-.7.701c-.391.391-.454.959-.142 1.271s.883.25 1.272-.141l.7-.699c.391-.391.454-.961.142-1.274s-.883-.247-1.272.142zm.431-12.898c-.39-.391-.961-.455-1.273-.143s-.248.883.141 1.274l.7.699c.391.391.96.455 1.272.143s.249-.883-.141-1.273l-.699-.7zm11.769 14.031l.7.699c.391.391.96.453 1.272.143.312-.312.249-.883-.142-1.273l-.699-.699c-.391-.391-.961-.455-1.274-.143s-.248.882.143 1.273z" fill="#ffffff" ></path></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width={27} onClick={toggleColorMode} cursor={"pointer"} viewBox="0 0 20 20" id="light"><path d="M19 9.199h-.98c-.553 0-1 .359-1 .801 0 .441.447.799 1 .799H19c.552 0 1-.357 1-.799 0-.441-.449-.801-1-.801zM10 4.5A5.483 5.483 0 0 0 4.5 10c0 3.051 2.449 5.5 5.5 5.5 3.05 0 5.5-2.449 5.5-5.5S13.049 4.5 10 4.5zm0 9.5c-2.211 0-4-1.791-4-4 0-2.211 1.789-4 4-4a4 4 0 0 1 0 8zm-7-4c0-.441-.449-.801-1-.801H1c-.553 0-1 .359-1 .801 0 .441.447.799 1 .799h1c.551 0 1-.358 1-.799zm7-7c.441 0 .799-.447.799-1V1c0-.553-.358-1-.799-1-.442 0-.801.447-.801 1v1c0 .553.359 1 .801 1zm0 14c-.442 0-.801.447-.801 1v1c0 .553.359 1 .801 1 .441 0 .799-.447.799-1v-1c0-.553-.358-1-.799-1zm7.365-13.234c.391-.391.454-.961.142-1.273s-.883-.248-1.272.143l-.7.699c-.391.391-.454.961-.142 1.273s.883.248 1.273-.143l.699-.699zM3.334 15.533l-.7.701c-.391.391-.454.959-.142 1.271s.883.25 1.272-.141l.7-.699c.391-.391.454-.961.142-1.274s-.883-.247-1.272.142zm.431-12.898c-.39-.391-.961-.455-1.273-.143s-.248.883.141 1.274l.7.699c.391.391.96.455 1.272.143s.249-.883-.141-1.273l-.699-.7zm11.769 14.031l.7.699c.391.391.96.453 1.272.143.312-.312.249-.883-.142-1.273l-.699-.699c-.391-.391-.961-.455-1.274-.143s-.248.882.143 1.273z"></path></svg>

                )}

                {user ? (
                    <Flex alignItems={"center"} gap={4}>
                        <Link as={RouterLink} to={`/chat`} _hover={{ borderRadius: '35%', transform: 'scale(1.5)', transition: "all 0.5s"  }} >
                            <BsChatDotsFill size={20} />
                        </Link>
                        <Button size={"xs"} onClick={logout} _hover={{ transform: 'scale(1.5)', transition: "all 0.5s"  }} >
                            <FiLogOut size={20} />
                        </Button>
                    </Flex>
                ) : (
                    <Link as={RouterLink} to={"/auth"} >
                        <Button size={24} onClick={() => { setAuthScreen("signup") }} >Signup</Button>
                    </Link>
                )}
            </Flex>
        </div>
    )
}

export default Header