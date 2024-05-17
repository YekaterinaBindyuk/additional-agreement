import createApiClient from "./fetchWithToken";

export const fetchUser = async () => {
  const mainApi = createApiClient(
    process.env.REACT_APP_GATEWAY_API
  );
  try {
    const res = await mainApi.get("/barm/users/api/v1/info", {
      maxRedirects: 0,
    });
    if (res.data.payload) {
      localStorage.setItem("b-arm_user_info", JSON.stringify(res.data.payload));
      return res.data.payload;
    } else {
      localStorage.removeItem("b-arm_user_info");
      localStorage.removeItem("authToken");
    }
  } catch (error) {
    console.log(error)
  }
};
