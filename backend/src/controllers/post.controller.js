import { Post } from "../models/post.model.js";

// Create a post
const createPost = async (req, res) => {
	try {
		const { name, description, age } = req.body;

		if (!name || !description || !age) {
			return res.status(400).json({ message: "All fields are required!" });
		}

		const post = await Post.create({ name, description, age });

		res.status(201).json({ message: "Post Created Successfully!", post });
	} catch (error) {
		// console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Read all posts
const getPosts = async (req, res) => {
	try {
		const posts = await Post.find();
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error", error });
	}
};

// Update post
const updatePost = async (req, res) => {
	try {
		// basic validation to check if the body is empty

		// { name: x, description: y, age: z } -> [name, description, age]
		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({ message: "No Data provided for update" });
		}

		const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		if (!post) {
			return res.status(404).json({ message: "Post Not Found" });
		}

		res.status(200).json({ message: "Post Updated Successfully!", post });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error", error });
	}
};

// Delete post
const deletePost = async (req, res) => {
	try {
		const deleted = await Post.findByIdAndDelete(req.params.id);

		if (!deleted) {
			return res.status(404).json({ message: "Post Not Found" });
		}

		res.status(200).json({ message: "Post Succesfully Deleted" });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error", error });
	}
};

export { createPost, getPosts, updatePost, deletePost };
