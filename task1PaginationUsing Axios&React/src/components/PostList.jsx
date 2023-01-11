import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState({});
  const [total, setTotal] = useState(0);

  const fetchData = async (page, lmt, skp) => {
    const response = await axios.get(`https://dummyjson.com/posts?limit=${lmt}&skip=${skp}`);
    const data = response.data;
    setData(data);
    setTotal(data.total);
  }

  useEffect(() => {
    fetchData(currentPage, limit, skip);
  }, [currentPage, limit, skip]);

  const previous = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
    setSkip(skip - limit);
  }

  const next = () => {
    if (currentPage === Math.ceil(total / limit)) {
      return;
    }
    setCurrentPage(currentPage + 1);
    setSkip(skip + limit);
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <ul>
        {data.posts && data.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <div>
        Page {currentPage} of {totalPages}
      </div>
      <button onClick={previous}>Previous</button>
      <button onClick={next}>Next</button>
    </div>
  );
}

export default PostList;