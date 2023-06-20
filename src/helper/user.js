import instance from "../axios.config";

const getUser = async () => {
    const user = await instance.get("/user");
    return user;
}

export default getUser;