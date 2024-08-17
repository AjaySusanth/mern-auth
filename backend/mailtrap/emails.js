
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient,sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async(email,verificationToken) =>{
    const recipient = [{email}]
    try{
        const res = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification"
        })
        console.log("Email sent successfully",res)
    }
    catch(error){
        console.error("Error sending verification",error)
        throw new Error(`Error sending verification mail: ${error}`)
    }
}

export const sendWelcomeMail = async(name,email) => {
    const recipient = [{email}]
    
    try {
        const res = await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid: "9f227569-290e-4a59-9c17-d9e674dfed28",
            template_variables: {
                "company_info_name": "MERN-Auth",
                "name": name
            }
        })
        console.log("Welcome mail sent successfully",res)

    } catch (error) {
        console.log("Error senting welcome email",error)
        throw new Error(`Error senting welcome email: ${error}`);
        
    }
}

export const sendPasswordResetEmail = async (email,resetURL)=>{
    const recepient = [{email}]
    try{
        const res = await mailtrapClient.send({
            from:sender,
            to:recepient,
            subject:"Reset Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category:"Reset Password"
        })

        console.log("Password reset mail sent successfully",res)

    }
    catch(error){
        console.log("Error in sending password reset email ",error)
        throw new Error(`Error senting welcome email: ${error}`);
    }
}

export const sendResetSuccessEmail = async(email) =>{
    const recepient = [{email}]
    try{
        const res = await mailtrapClient.send({
            from:sender,
            to:recepient,
            subject:"Password reset successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password reset successful"
        })
        console.log("Password reset confirmation mail sent successfully",res)
    }
    catch(error){
        console.log("Error senting reset success email",error)
        throw new Error(`Error senting reset success email: ${error}`);
    }
}