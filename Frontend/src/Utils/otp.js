export const generateOTP=()=>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}


export const isValidOTP=(otp)=>{
    return /^\d{6}$/.test(otp);
}