import jwt from 'jsonwebtoken';

// NOTE: Token verification is directly implemented here.
// In future, refactor this by using a middleware for token verification.
//by the way i creating a middleware for token verification which can also be used.

export const shouldbelogin = async (req, res) => {
    // Fetch the token from cookies
    const token = req.cookies.token; 

    // If no token is found, return 401
    if (!token) return res.status(401).json({ message: "Not authenticated!" });

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
            // If token is invalid, return 401
            return res.status(401).json({ message: "Token not valid!" });
        }

        // If token is valid, send an authenticated response
        console.log("authanticated");
        return res.status(200).json({ message: "You are authenticated!" });
        
    });
};


export const shouldbeadmin =  async(req , res) => {
    
    const token = req.cookies.token; 

    // If no token is found, return 401
    if (!token) return res.status(401).json({ message: "Not authenticated!" });

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
            // If token is invalid, return 401
            return res.status(401).json({ message: "Token not valid!" });
        }
        if(!payload.isAdmin){
            return res.status(401).json({ message: "You are not an admin!" });
        }

        // If token is valid, send an authenticated response
        console.log("authanticated");
        return res.status(200).json({ message: "You are authenticated!" });
        
    });
}