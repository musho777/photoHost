export const SuccessRegister = (data) =>{
    return {
        type:'SuccessRegister',
        data,
    }
}
export const SuccessConfirmRegisterCode = () =>{
    return {
        type:'SuccessConfirmRegisterCode'
    }
}

export const SuccessLogin = (data) =>{
    return {
        type:'SuccessLogin',
        data
    }
}
export const SuccessForgotPassword = (data) =>{
    return {
        type:'SuccessForgotPassword',
        data
    }
}

export const SuccessValidForgotPassowrd = (data) =>{
    return {
        type:'SuccessValidForgotPassowrd',
        data
    }
}

export const SuccessNewPassword = (data) =>{
    return {
        type:'SuccessNewPassword',
        data
    }
}
export const SuccessGetUserData = (data) =>{
    return {
        type:'SuccessGetUserData',
        data
    }
}
export const SuccessChangeProfil = (data) =>{
    return {
        type:'SuccessChangeProfil',
        data
    }
}