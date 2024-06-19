import { useToast } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';

const useLogout = () => {
    const toast = useToast();
    const setUser = useSetRecoilState(userAtom);

    const logout = async () => {
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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

            localStorage.removeItem("user-threads");
            setUser(null);
        } catch (err) {
            console.log(err);
            toast({
                title: "Error",
                description: "Failed to logout",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return logout;
};

export default useLogout;
