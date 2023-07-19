export const ErrorRegister = (data) =>{
    return {
        type:'ErrorRegister',
        data
    }
}

export const ErrorConfirmRegisterCode = (data) =>{
    return {
        type:'ErrorConfirmRegisterCode',
        data
    }
}

export const ErrorLogin = (data) =>{
    return {
        type:'ErrorLogin',
        data
    }
}

export const ErrorForgotPassword = (data) =>{
    return {
        type:'ErrorForgotPassword',
        data
    }
}

export const ErrorValidationForgotPassword = (data) =>{
    return {
        type:'ErrorValidationForgotPassword',
        data
    }
}

export const ErrorNewPassword = (data) =>{
    return {
        type:'ErrorNewPassword',
        data
    }
}

export const ErrorGetUserData = (data) =>{
    return {
        type:'ErrorGetUserData',
        data
    }
}