// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import LatestBlogs from "./LatestBlogs";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/blog/myblogs",
        { withCredentials: true }
      );
      setMyBlogs(data.blogs);
    };
    fetchMyBlogs();
  }, []);

  const deleteBlogHandler = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/v1/blog/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <section className="my-blogs">
        {myBlogs && myBlogs.length > 0
          ? myBlogs.map((element) => {
              return (
                <div className="author-blog-card" key={element._id}>
                  {element.mainImage && element.mainImage && (
                    <img src={element.mainImage.url} alt="blogImg" />
                  )}
                  <span className="category">{element.category}</span>
                  <h4>{element.title}</h4>
                  <div className="btn-wrapper">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="update-btn"
                    >
                      Update It
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => deleteBlogHandler(element._id)}
                    >
                      Delete It
                    </button>
                  </div>
                </div>
              );
            })
          : "You have not posted any blog!"}
      </section>
    </>
  );
};

export default MyBlogs;
