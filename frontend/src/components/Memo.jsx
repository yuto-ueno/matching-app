import axios from "axios";
import { apiURL } from "../App";

const CreateUser = () => {
  const postUri = `${apiURL}/api/users/create`;
  const data = {
    email: "ddd@gmail.com", // Ensure email is present
    password: "yourPasswordHere", // Ensure password meets length requirement
  };

  const handleCreateUser = async () => { // Use async/await for clarity
    try {
      const response = await axios.post(postUri, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("User created successfully:", response.data);
    } catch (error) {
      console.error("Error creating user:", error.response.data); // Log specific error details
    }
  };

  return (
    <div>
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default CreateUser;
