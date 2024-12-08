//const API_URL = "http://localhost:3000/api";
const API_URL="http://localhost:5055/api"

console.log("URL",API_URL);

export const sendOTPRequest = async (email) => {
  const response = await fetch(`${API_URL}/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send OTP");
  }
};

export const verifyOTPRequest = async (email, otp) => {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to verify OTP");
  }

  return true;
};
