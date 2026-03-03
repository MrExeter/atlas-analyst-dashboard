export const getToken = (): string | null =>
    sessionStorage.getItem("atlas_token");

export const setToken = (token: string) =>
    sessionStorage.setItem("atlas_token", token);

export const clearToken = () =>
    sessionStorage.removeItem("atlas_token");