export const userQueries = {
    showUsers: "SELECT * FROM users",
    createUser:
        "INSERT INTO users (username,password,firstname,lastname) VALUES ($1,$2,$3,$4) RETURNING *",
    authenticateUser: "SELECT password FROM users WHERE username=$1",
    showUser: "SELECT * FROM users WHERE username=$1"
};
