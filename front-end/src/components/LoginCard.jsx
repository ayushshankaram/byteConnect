/* eslint-disable no-unused-vars */
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import authScreenAtom from '../atoms/authAtom.js';
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom.js';

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const setUser = useSetRecoilState(userAtom)
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const toast = useToast();
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
            });
            const data = await res.json()
            // console.log(data)

            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
                return;
            }
            localStorage.setItem("user-threads", JSON.stringify(data))
            console.log(data)
            setUser(data);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Flex
            // minH={'100vh'}
            align={'center'}
            justify={'center'}
        >

            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Login
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    boxShadow={'lg'}
                    p={8}
                    w={{
                        base: "full",
                        sm: "400px",
                    }}>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input autoComplete='off' type="text" onChange={(e) => setInputs({ ...inputs, username: e.target.value })} value={inputs.username} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input autoComplete='off' type={showPassword ? 'text' : 'password'} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} value={inputs.password} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Loggin in"
                                size="lg"
                                bg={useColorModeValue('gray.600', 'gray.700')}
                                color={'white'}
                                _hover={{
                                    bg: useColorModeValue('gray.00', 'gray.800'),
                                }}
                                onClick={handleLogin}
                                isLoading={loading}
                            >
                                Login
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Dont have an account ? <Link color={'blue.400'} onClick={() => { setAuthScreen("signup") }}>Signup</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}