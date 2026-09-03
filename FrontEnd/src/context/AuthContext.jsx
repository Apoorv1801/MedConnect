import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const USERS_KEY = "medconnect_users";
const SESSION_KEY = "medconnect_session";

// NOTE: this is a frontend-only mock. Storing plaintext passwords in
// localStorage is fine for prototyping, but a real implementation must
// hash passwords server-side and issue a JWT — never store or return
// the password itself to the client.

function readUsers() {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    const signup = ({ name, email, phone, password }) => {
        const users = readUsers();

        if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
            return {
                success: false,
                error: "An account with this email already exists.",
            };
        }

        // role is hardcoded to "patient" for now — doctor/lab/hospital signup
        // will be a separate flow once those dashboards exist.
        const newUser = { name, email, phone, password, role: "patient" };
        users.push(newUser);
        writeUsers(users);

        const session = { name, email, phone, role: "patient" };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setCurrentUser(session);

        return { success: true };
    };

    const login = ({ email, password }) => {
        const users = readUsers();
        const match = users.find(
            (u) =>
                u.email.toLowerCase() === email.toLowerCase() &&
                u.password === password
        );

        if (!match) {
            return { success: false, error: "Incorrect email or password." };
        }

        const session = {
            name: match.name,
            email: match.email,
            phone: match.phone,
            role: match.role,
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setCurrentUser(session);

        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem(SESSION_KEY);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}