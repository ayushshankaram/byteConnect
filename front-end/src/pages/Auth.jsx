import { useRecoilValue } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import LoginCard from '../components/LoginCard';
import SignUpCard from '../components/SignUpCard';

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);

    return (
        <>
            {authScreenState === "login" ? <LoginCard /> : <SignUpCard />}
        </>
    );
};

export default AuthPage;
