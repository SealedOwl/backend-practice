import { User } from "../models/user.model.js";

// register user
const registerUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		// basic validation
		if (!username || !email || !password) {
			return res.status(400).json({ message: "All fields are required!" });
		}

		// check if user exists already
		const existing = await User.findOne({ email: email.toLowerCase() });
		if (existing) {
			return res.status(400).json({ message: "User already exists!" });
		}

		// create user
		const user = await User.create({
			username,
			email: email.toLowerCase(),
			password,
		});

		res.status(201).json({
			message: "User registered",
			user: { id: user._id, email: user.email, username: user.username },
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

// login user
const loginUser = async (req, res) => {
	try {
		// check if user already exists
		const { email, password } = req.body;

		const user = await User.findOne({ email: email.toLowerCase() });

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		// compare passwords
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			// console.log("Plain password:", password);
			// console.log("Hashed password from DB:", user.password);
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		res.status(200).json({
			message: "User Logged In",
			user: {
				id: user._id,
				email: user.email,
				username: user.username,
			},
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// logout user
const logoutUser = async (req, res) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });

		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json({ message: "Logout Successful" });
	} catch (error) {}
};

export { registerUser, loginUser, logoutUser };
