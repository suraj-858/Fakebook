export const host = "http://localhost:5000"
export const registerRoute = `${host}/api/user/createuser`;
export const loginRoute =  `${host}/api/user/login`;
export const avatarRoute = `${host}/api/user/avatar`;
export const getAllUser =  `${host}/api/user/getalluser`;
export const getSingleUser = `${host}/api/user/getsingleuser`;
export const coverImage = `${host}/api/user/single`;
export const userImage = `${host}/api/user/userImage`;

//routes for the post api calls

export const createPost = `${host}/api/post/createPost`;
export const getPost =  `${host}/api/post/getpost`;
export const getAllPost =  `${host}/api/post/allpost`


//routes for the user's messages

export const createMessage = `${host}/api/message/createMessage`;
export const allMessage = `${host}/api/message/getAllMessage`;