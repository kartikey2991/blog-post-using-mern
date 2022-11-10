import { expressjwt } from 'express-jwt';
import User from '../models/user';
// import { UserContext } from '../../client/context';
// import PostForm from '../../client/components/forms/PostForm';
import Post from '../models/post';

export const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

// export default {requireSignin};

export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    // console.log('POST in EDITDELETE MIDDLEWARE =>', post);
    if (req.auth._id != post.postedBy) {
      return res.status(400).send('Unauthorize');
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);
    if (user.role !== 'Admin') {
      return res.status(400).send('Unauthorized');
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
