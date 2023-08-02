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
export const SuccessGetUserData = (data,follower_count,followers_count,post_count) =>{
    return {
        type:'SuccessGetUserData',
        data,
        follower_count,
        followers_count,
        post_count
    }
}
export const SuccessChangeProfil = (data) =>{
    return {
        type:'SuccessChangeProfil',
        data
    }
}

export const SuccessChangeUserPassword = (data) =>{
    return {
        type:'SuccessChangeUserPassword',
        data
    }
} 
export const SuccessChangeEmail = (data) =>{
    return {
        type:'SuccessChangeEmail',
        data
    }
}

export const SuccessChangeEmailPassword = (data) =>{
    return {
        type:'SuccessChangeEmailPassword'
    }
}

export const SuccessChangeEmailCode = (data) =>{
    return {
        type:'SuccessChangeEmailCode',
        data
    }
}

export const SuccessChangeAvatar = (data) =>{
    return {
        type:'SuccessChangeAvatar',
        data
    }
}

export const SuccessSearch = (data) =>{
    return {
        type:'SuccessSearch',
        data
    }
}

export const SuccessGetSinglPage = (data) =>{
    return {
        type:'SuccessGetSinglPage',
        data
    }
}

export const SuccessAddDeleteFollow = (data) =>{
    return {
        type:'SuccessAddDeleteFollow',
        data
    }
}
export const SucessGetFollowersAction = (data) =>{
    return {
        type:'SucessGetFollowersAction',
        data
    }
}

export const SuccessDeleteOtherPople = (data) =>{
    return{
        type:'SuccessDeleteOtherPople',
        data
    }
}

export const SuccessGetFollower = (data) =>{
    return {
        type:'SuccessGetFollower',
        data
    }
}

export const SuccessGetSinglePageChat = (data) =>{
    return {
        type:'SuccessGetSinglePageChat',
        data
    }
}

export const SuccessNewMessageAction = (data) =>{
    return {
        type:'SuccessNewMessageAction',
        data
    }
}

export const SuccessGetMyChatRoom = (data) =>{
    return{
        type:'SuccessGetMyChatRoom',
        data
    }
}

export const SuccessLogout = () =>{
    return {
        type:'SuccessLogout'
    }
}

export const SuccessCreatePost = (data) =>{
    return {
        type:'SuccessCreatePost',
        data
    }
}

export const SuccessGetPosts = (data) =>{
    return {
        type:'SuccessGetPosts',
        data
    }
} 