export const getToken = (): string | null =>
    localStorage.getItem("atlas_token");

export const setToken = (token: string) =>
    localStorage.setItem("atlas_token", token);

export const clearToken = () =>
    localStorage.removeItem("atlas_token");