
import jwt from 'jsonwebtoken';
import {Secret} from "jsonwebtoken"
//delete => moet in .env file maar ik kan er niet aan om 1 of andere reden
const secret = "88cc9b1ee73b4af98f0e85363b023f15a0e0efcf97a4e2ed3c6ef63ba898203227ff2e9a8236f3f69922ddf320d5a6fbca5246928a8669c2bd68b2562f0865ff6d09f29a79f7d2b70ba30b2da28b932c0a8f2403b63c4e68f6def53fe21a421b532a41d03315f73e522c5b8427c8ada6b45cdb64e81fdc1bce406298bf53f9c1"
const generateSWTtoken = (username: string): string => {
    const signedjwt = jwt.sign(username, secret);
    return signedjwt;

}


export{generateSWTtoken}