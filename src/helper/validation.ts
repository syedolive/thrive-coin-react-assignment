import { LoginValidation } from './../lib/LoginValidation';
import validate from 'validate.js'

const loginValidationConstraints = {
    email: {
        email: {
            message: 'doesn\'t look like a valid email',
        },
    },
    password: {
        length: {
            minimum: 8,
            tooShort: 'should be minimum %{count} characters',
        },
    },
}

export const validateLogin = async (email: string, password: string): Promise<undefined | LoginValidation> => {
    return await validate({email, password}, loginValidationConstraints);
}