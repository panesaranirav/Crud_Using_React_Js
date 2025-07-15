import axios from "axios";



const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})

// get data
export const getPost = () => {
    return api.get("/posts")
}

// Delete data
export const deletePost = (id) =>{
    return api.delete(`/posts/${id}`)
} 

// post data
export const postData =(post)=>{
    return api.post("/posts" , post);
}

//put(update) data
export const updateData =(id,post)=>{ 
    return api.put(`/posts/${id}`,post)
}