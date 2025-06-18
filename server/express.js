import express, { json } from "express";
import cors from "cors";
import { compare, hash } from "bcryptjs";
import { readFile, writeFile } from "fs/promises";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get current file's directory path (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Ensure path resolution works correctly in both development and production
const USERS_FILE_PATH = process.env.USERS_FILE_PATH
  ? join(__dirname, process.env.USERS_FILE_PATH)
  : join(__dirname, "users.json");
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");

// Configure CORS with options from environment if available
const corsOptions = process.env.CORS_ORIGIN
  ? {
      origin: process.env.CORS_ORIGIN,
      optionsSuccessStatus: 200,
    }
  : {};

app.use(cors(corsOptions));
app.use(json());

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usersPath = USERS_FILE_PATH;
    const usersData = await readFile(usersPath, "utf-8");
    const users = JSON.parse(usersData);

    // Find user by email
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password with hashed password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: "false",
        error: "Invalid email or password. Create Account if not registered",
      });
    }

    return res.json({
      success: "true",
      message: "Login successful",
      user: {
        email: user.email,
        name: user.name,
        phone: user.phone,
        company: user.company,
        agency: user.agency,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: "false", error: "Internal server error" });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, phone, agency, company } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Name, email and password are required." });
    }

    const usersPath = USERS_FILE_PATH;
    const usersData = await readFile(usersPath, "utf-8");
    const users = JSON.parse(usersData);

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: "false",
        error:
          "User with same email already exists.Try Login or Different email",
      });
    }

    // Hash the password
    const passwordHash = await hash(password, BCRYPT_SALT_ROUNDS);

    // Create new user
    const newUser = {
      name,
      email,
      phone,
      company,
      agency,
      password: passwordHash,
    };

    users.push(newUser);

    // Save to file
    await writeFile(usersPath, JSON.stringify(users, null, 2), "utf-8");

    res.status(201).json({
      success: "true",
      message: "User registered successfully",
      user: { name, email, phone, company, agency },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: "false", error: "Internal server error" });
  }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export app and server for external use
export { app, server };
