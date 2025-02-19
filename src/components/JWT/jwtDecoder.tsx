const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1]; // Get the payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64)); // Decode and parse JSON
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
export default decodeJWT;
