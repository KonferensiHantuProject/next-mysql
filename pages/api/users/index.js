import { prisma } from "@/config/db";

export default async function handler(req, res){

    switch(req.method){

        case "GET" :
            return await getUser(req, res);

        case "POST" :
            return await addUser(req, res);
    }
}

// Get User
const getUser = async(req, res) => {

    try{
        const result = await prisma.user.findMany();
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json(error);
    }
}

// Add user
const addUser = async (req, res) => {
    try{

        const data = {
            username: "John",
            email: "john@gmail.com"
        }

        const result = await prisma.user.create({
            data: data
        })

        return res.status(200).json({success: true})
    }catch(error){
        return res.status(500).json({error})
    }
}