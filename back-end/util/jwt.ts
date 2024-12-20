
import jwt from 'jsonwebtoken';
import {Secret} from "jsonwebtoken"
import { Role } from '../types';
//delete => moet in .env file maar ik kan er niet aan om 1 of andere reden

const generateSWTtoken = (username: string, role: Role): string => {
    const secret = process.env.JWT_SECRET;

    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'restaurant'};
    if(secret){
        const signedjwt = jwt.sign({username, role}, secret, options);
        return signedjwt;
    }
    
    throw new Error("Secret not found")
}


export{generateSWTtoken}