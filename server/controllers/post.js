import Post from "../models/post"
export const createPost = async(req,res) =>{
    // console.log("post =>" ,req.body);
    const {content} = req.body;
        if(!content.length){
            return res.json({
                error:'Content is required',
            });
        }
    // console.log(user);
    try{
        const post = new Post({content,postedBy:req.auth._id});
        post.save();
        res.json(post);
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
}