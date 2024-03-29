import instance from "../util/instance";

export const registerBook = async (data) => {
    return await instance.post("/admin/book", data);
}

export const searchBooksRequest = async (params) => {
    return await instance.get("/admin/books", {params});
}

export const getBookCountRequest = async (params) => {
    return await instance.get("/admin/books/count", {params});
}

export const deleteBooksRequest = async (data) => {
    return await instance.delete("/admin/books", {data});
}

export const updateBookRequest = async (data) => {
    return await instance.put(`/admin/book/${data.bookId}`, data) // ${} -> `` 사용 
}

/**
 * Post요청 
 * post(주소, 
 * 데이터(객체 -> JSON, {
 *      headers: {
 *      }
 * })
 * 
 * Get요청 
 * get(주소, {
 *      headers{
 *      },
 *      params: {
 *          key: value
 *      }
 *  })
 * 
 * Delete요청
 * delete(주소, {
 *      headers: {
 *      },
 *      date: {
 *          key: value
 *      }
 * })
 */