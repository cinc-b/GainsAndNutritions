import { verify } from 'jsonwebtoken';


export default function(req, res, next){
    const token = req.cookies['auth-token'];

    if(!token){
        return res.status(401).json('Access denied!');
    }

    try{
        const verified = verify(token, process.env.TOKEN_SECRET);
        //durch die zeile kann man den user und somit auch den usernamen im req überall benutzen,
        //weils so definiert wurde von mir(in user/login) man kann a id reinschreibn und co
        req.user = verified;
        console.log("Access granted!");
        next();
    }catch(err){
        res.status(400).send('Invalid Token!');
    }
}