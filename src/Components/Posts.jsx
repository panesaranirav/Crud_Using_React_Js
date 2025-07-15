import React, { useState } from "react";
import { deletePost, getPost } from "../Api/PostApi";
import { useEffect } from "react";
import "../App.css";
import Form from '../Components/Form'

const Posts = () => {
  const [data, setData] = useState([]);
  const [UpdateDataApi , setUpdateDataApi] =useState({})

  const getPostData = async () => {
    const res = await getPost();
    console.log(res.data);
    setData(res.data);
  };
  useEffect(() => {
    getPostData();
  }, []);

  // delete data
  const handleDeletePost = async(id)=>{
     try {
      const res = await deletePost(id)
      if(res.status === 200){
        const newUpdatedPosts = data.filter((curPost)=>{
          return curPost.id !== id;
        })
        setData(newUpdatedPosts)
      }else{
        console.log("fail to delete data:",res.status);
      }
     } catch (error) {
      console.log(error)
     }
  }
  //update data
 const  handleUpdatePost =(curEle) => setUpdateDataApi(curEle)


  return (
  <>
  <div className="form-sec">
    <Form data={data} setData={setData} UpdateDataApi={UpdateDataApi} setUpdateDataApi={setUpdateDataApi} />
  </div>
    <div className="posts">
      <ol>
        {data.map((curEle) => {
          const { id, body, title } = curEle;
          return (
            <li key={id}>
              <p>Title:-  {title}</p>
              <p>Body:-  {body}</p>
              <div className="posts-btn">
                <button className="Edit-btn" onClick={()=>handleUpdatePost(curEle)}>UPDATE</button>
                <button className="Delete-btn" onClick={()=>handleDeletePost(id)}>DELETE</button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  </>
  );
};

export default Posts;
