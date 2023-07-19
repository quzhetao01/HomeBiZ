import instance from "../axios.config";

const getUser = async () => {
    const user = await instance.get("/user");
    console.log(user.data);
    return user.data;
}

export default getUser;