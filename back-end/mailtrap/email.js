import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { mailTrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email,verificationToken)=>{
    const recipient = [{email}];
    try {
        const response = await mailTrapClient.send({
            from:sender,
            to:recipient,
            subject:"Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification"
        })
        console.log("email sent successfully",response);
    } catch (error) {
        console.log(`Error sending verification`,error);
        
        throw new Error(`Error sending verification email: ${error}`)
        
    }
}

export const sendWelcomeEmail = async  (email,name) =>{
    const recipient = [{email}];
    try {
        const response = await mailTrapClient.send({
            from:sender,
            to:recipient,
            template_uuid: "ddbcee22-1065-4edd-9399-a2304362755a",
            template_variables: {
              "company_info_name": "Auth company",
              "name": name
            }
        })
        console.log("Email sent successfully",response)
    } catch (error) {
        console.log("error senting mail",error)
        throw new Error(`Error senting mail : ${error}`);     
    }
}

export const sendPasswordResetEmail = async (email,resetUrl) =>{
    const recipient = [{email}]
    try {
        const response = await mailTrapClient.send({
            from:sender,
            to:recipient,
            subject:"Reset your password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetUrl),
            category:"Password Reset"
        })
    } catch (error) {
        console.error(`Error sending reset email:${error}`);
        throw new Error(`Error sending password reset email:${error}`);
        

    }
}
export const sendResetSuccessEmail = async (email) =>{
    const recipient = [{email}];
    try {
        const response = await mailTrapClient.send({
            from:sender,
            to:recipient,
            subject:"Password reset successfull",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password reset",
        })
        console.log("Reset email sent successfully")
    } catch (error) {
        console.error(`Error sending password success email`,error);
        throw new Error(`Error sending password reset success email ${error}`);
    }
}