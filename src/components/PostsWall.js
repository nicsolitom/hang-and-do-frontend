import axios from "axios";
import { useEffect, useState } from "react";

function PostsWall({ planId }) {
  const [posts, setPosts] = useState(null);

  console.log("POSTWALL: ", planId);
  const getPosts = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/posts/`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((fetchedPosts) => {
        // const allPosts = fetchedPosts.data;
        const filteredPosts = fetchedPosts.data.filter((post) => {
          console.log(post);
          return post.planId === planId;
        });
        setPosts(filteredPosts);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPosts();
  }, [planId]);

  return (
    <div className='posts-wall'>
      <h3>Posts from plan maker:</h3>
      {posts ? (
        posts.map((post) => {
          return (
            <div className='post-card' key={post._id} >
              <p><strong>{post.updatedAt.slice(0, 10)} | {post.updatedAt.slice(11, 16)}</strong></p>
              <p>{post.postText}</p>
            </div>
          );
        })
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default PostsWall;
