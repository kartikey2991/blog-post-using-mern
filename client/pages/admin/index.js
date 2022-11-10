import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context';
import AdminRoute from '../../components/routes/AdminRoute';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
// import post from '../../../server/models/post';

// import { imageSource } from '../../functions';
// import { findPeople } from '../../../server/controllers/auth';

const Admin = () => {
  const [state, setState] = useContext(UserContext);

  //posts
  const [posts, setPosts] = useState([]);

  //route
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      fashionFeed();
    }
  }, [state && state.token]);

  const fashionFeed = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      // console.log('user posts =>' ,data);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm('Are you sure?');
      if (!answer) return;
      const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
      toast.error('Post deleted');
      fashionFeed();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminRoute>
      <div className='container-fluid'>
        <div className='row py-5 text-light bg-default-image'>
          <div className='col text-white text-center '>
            <h1 className='regg'>ADMIN</h1>
          </div>
        </div>

        <div className='row py-4'>
          <div className='col-md-8 offset-md-2 '>
            {posts &&
              posts.map((p) => (
                <div key={p._id} className='d-flex justify-content-between'>
                  <div dangerouslySetInnerHTML={{ __html: p.content }}></div>
                  <div>
                    <div
                      onClick={() => handleDelete(p)}
                      className='text-danger'
                    >
                      Delete
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;
