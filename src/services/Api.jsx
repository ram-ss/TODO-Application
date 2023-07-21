const BASE_URL="http://localhost:4000/api/v1"

export const authEndpoints={
    REGISTER_API:BASE_URL+"/users/new",
    LOGIN_API:BASE_URL+"/users/login",
    MYPROFILE_API:BASE_URL+"/users/me",
}

export const taskEndpoints={
    CREATE_TASK_API:BASE_URL+"/task/new",
    GET_TASK_API:BASE_URL+"/task/my",
    DELETE_TASK_API:BASE_URL+"/task/id"
}