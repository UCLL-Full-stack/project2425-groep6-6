
import jwt from 'jsonwebtoken';
import {Secret} from "jsonwebtoken"
import { Role } from '../types';
//delete => moet in .env file maar ik kan er niet aan om 1 of andere reden
const secret = process.env.JWT_SECRET;

const generateSWTtoken = (username: string, role: string): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'restaurant'};
    const signedjwt = jwt.sign({username, role}, secret!, options);
    return signedjwt;

}


export{generateSWTtoken}