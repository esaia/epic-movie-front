import {
  Movie,
  commentForm,
  likes,
  loginDataType,
  notification,
  recoveryPassType,
  registerUserType,
} from "global";
import axiosAPI from "./axios";
import axios from "axios";

export const fetchQuotes = async (
  pageParam: { pageParam: number },
  searchQuery?: string
) => {
  const { data } = await axiosAPI.get("/quotes", {
    params: { page: pageParam, searchQuery: searchQuery },
  });
  return data;
};

export const fetchQuote = async (id: string | undefined) => {
  const { data } = await axiosAPI.get("/quotes/" + id);
  return data;
};

export const fetchMovies = async (movieQuery?: string): Promise<Movie[]> => {
  const { data } = await axiosAPI.get("/movies", {
    params: { searchQuery: movieQuery },
  });
  return data;
};

export const fetchMovie = async (
  id: string | string[] | undefined
): Promise<Movie> => {
  const { data } = await axiosAPI.get(`/movies/${id}`);
  return data;
};

export const addQuote = async (formData: FormData) => {
  return await axiosAPI.post("/quotes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addMovie = (formData: FormData) => {
  return axiosAPI.post("/movies", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const updateMovie = async (
  formdata: FormData,
  id: string | string[] | undefined
) => {
  return axiosAPI.post(`/movies/${id}`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const editQuote = async (formData: FormData, id: number) => {
  const { data } = await axiosAPI.post(`quotes/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteQuoteRequest = async (quoteID: number) => {
  try {
    const res = await axiosAPI.delete(`/quotes/${quoteID}`);

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMovieRequest = async (id: string | string[] | undefined) => {
  try {
    await axiosAPI.delete(`movies/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const getAllgenres = () => {
  return axiosAPI.get("/genres");
};

export const fetchNotifcations = async (): Promise<notification[]> => {
  const { data } = await axiosAPI.get("/notifications");
  return data;
};

export const seenNotificationRequest = async (id: number) => {
  try {
    await axiosAPI("/seen/" + id);
  } catch (error) {
    console.error(error);
  }
};

export const postComment = async (comment: commentForm) => {
  const { data } = await axiosAPI.post("/comments", comment);
  return data;
};

export const postLike = async (likesData: likes) => {
  const { data } = await axiosAPI.post("/like", likesData);
  return data;
};

export const deleteLike = async (id: number | undefined) => {
  const { data } = await axiosAPI.delete("/like/" + id);
  return data;
};

export const logoutRequest = async () => {
  await axiosAPI.get("/logout");
};

export const addCsrf = async () => {
  await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`, {
    headers: { Accept: "application/json" },
    withCredentials: true,
  });
};

export const storeUser = async (user: registerUserType) => {
  return await axiosAPI.post("/register", user);
};

export const updateUserRequest = async (
  formData: FormData,
  uid: number | undefined
) => {
  const { data } = await axiosAPI.post(`/updateUser/${uid}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return data;
};

export const recoverPass = (data: recoveryPassType) => {
  return axiosAPI.post("/update-password", data);
};

export const forgetPassword = (email: string) => {
  return axiosAPI.post("/forgot-password", { email });
};

export const loginUser = async (user: loginDataType) => {
  return await axiosAPI.post("/login", user);
};

export const getUser = async () => {
  return await axiosAPI.get("/user");
};
