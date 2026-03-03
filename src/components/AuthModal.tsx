import { useState } from "react";
import { setToken, clearToken } from "../auth/token";

const API_URL = import.meta.env.VITE_ATLAS_API_URL;

interface Props {
    onAuthenticated: () => void;
}

export default function AuthModal({ onAuthenticated }: Props) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!value.trim()) {
            setError("Invite code required");
            return;
        }

        const token = value.trim();

        try {
            const response = await fetch(`${API_URL}/health`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setToken(token);
                onAuthenticated();
            } else {
                clearToken();
                setError("Invalid or expired invite code");
            }
        } catch {
            clearToken();
            setError("Unable to validate token");
        }
    };

    return (
        <div style={overlayStyle}>
            <div style={cardStyle}>
                <h2>Atlas Access</h2>
                <p>Enter your invite code to continue</p>

                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={inputStyle}
                />

                <button onClick={handleSubmit} style={buttonStyle}>
                    Unlock
                </button>

                {error && <p style={errorStyle}>{error}</p>}
            </div>
        </div>
    );
}

const overlayStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
};

const cardStyle = {
    background: "white",
    padding: "2rem",
    borderRadius: "8px",
    minWidth: "320px",
    textAlign: "center" as const,
};

const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
};

const buttonStyle = {
    padding: "0.5rem 1rem",
};

const errorStyle = {
    color: "red",
    marginTop: "0.5rem",
};
