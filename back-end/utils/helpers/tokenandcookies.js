import jwt from 'jsonwebtoken';

const createTokenAndSetCookie = (id, response) => {
    const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2d',
    });

    response.cookie('jwtToken', jwtToken, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        sameSite: 'strict',
    });

    return jwtToken;
};

export default createTokenAndSetCookie;
