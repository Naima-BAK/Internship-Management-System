import React, { useState } from "react";

function Test_password() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleShowPasswordChange = (event) => {
        setShowPassword(event.target.checked);
    };

    return (
        <form>
            <label>
                Password:
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    minLength="8"
                    required
                />
            </label>
            <label>
                Show Password
                <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={handleShowPasswordChange}
                />
            </label>
        </form>
    );
}

export default Test_password;