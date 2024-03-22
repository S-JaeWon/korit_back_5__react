import instance from "../util/instance"

export const oAuth2MergeRequest = async (data) => {
    return await instance.post("/auth/oauth2/merge", data);
}