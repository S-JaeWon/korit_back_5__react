import instance from "../util/instance";

export const getAllBookTypeRequest = async () => {
    return await instance.get("/admin/book/option/types");
}

export const getAllCategoryRequest = async () => {
    return await instance.get("/admin/book/option/categories");
}