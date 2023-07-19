export const SuccessRegister = (data) =>{
    console.log(data,2)
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