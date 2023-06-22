import instance from "../axios.config";

const getUser = async () => {
    const user = await instance.get("/user");
    return user.data;
}

export default getUser;