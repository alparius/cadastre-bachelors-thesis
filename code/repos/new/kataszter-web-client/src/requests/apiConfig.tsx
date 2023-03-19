const API_URL =
    window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1")
        ? "http://localhost:8080/api" // locally
        : window.location.origin + "/api"; // in production

export default API_URL;
