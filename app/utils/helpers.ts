import axios from "axios";

export const loginApiCall = async (email: string, password: string) => {
  try {
    //TODO - make api call to login endpoint
    // const response = await axios.post("https://your-api-endpoint.com/login", {
    //   email,
    //   password,
    // });
    const response = {
      status: 200,
      data: {
        message: "Login successfull",
        data: {
          email,
          password,
        },
      },
      error: false,
    };

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const registerApiCall = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    //TODO - make api call to login endpoint
    // const response = await axios.post("https://your-api-endpoint.com/login", {
    //   email,
    //   password,
    // });
    const response = {
      status: 200,
      data: {
        message: "Register successfull",
        data: {
          email,
          password,
          username,
        },
      },
      error: false,
    };

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
