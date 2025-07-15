import React, { useEffect, useState } from "react";
import { postData,updateData } from "../Api/PostApi";

const Form = ({ data, setData, UpdateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(UpdateDataApi).length === 0;

  useEffect(() => {
    UpdateDataApi &&
      setAddData({
        title: UpdateDataApi.title || "",
        body: UpdateDataApi.body || "",
      });
  }, [UpdateDataApi]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  //update api data
  const updatePostData = async () => {
    try {
      const res = await updateData(UpdateDataApi.id, addData);
      console.log(res);

      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curElem) => {
            return curElem.id === UpdateDataApi.id ? res.data : curElem;
          });
        });
        setAddData({title:"" , body:""})
        setUpdateDataApi({})
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "ADD+") {
      addPostData();
    } else if (action === "EDIT") {
      updatePostData();
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="all-input-div">
          <div className="inputt">
            <input
              type="text"
              name="title"
              placeholder="Enter Your Title"
              value={addData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputt">
            <input
              type="text"
              name="body"
              placeholder="Enter Your Containt"
              value={addData.body}
              onChange={handleInputChange}
            />
          </div>
          <div className="add-btn">
            <button value={isEmpty ? "ADD+" : "EDIT"}>
              {isEmpty ? "ADD+" : "EDIT"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
