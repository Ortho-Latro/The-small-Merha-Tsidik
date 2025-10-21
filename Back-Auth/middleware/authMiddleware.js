import { body, validationResult } from "express-validator";

// Validation middleware for signup
export const validateSignup = [
	body("email").isEmail().withMessage("Please provide a valid email address"),
	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters long"),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

// Validation middleware for login
export const validateLogin = [
	body("email").isEmail().withMessage("Please provide a valid email address"),
	body("password").notEmpty().withMessage("Password is required"),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
