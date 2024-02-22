import postModel from "../models/post.js";

//create posts
export const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = await postModel.create(post);
    console.log(post);
    res.status(200).json({ message: "post sent succesfully", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// fetch all post
export const fetchAllPost = async (req, res) => {
  try {
    const fetchPosts = await postModel.find({});
    // res.status(200).json({ message: "succesful", fetchPosts });
    res.status(200).json(fetchPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// edit post
export const editPost = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const updatePosts = await postModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updatePosts);
    res.status(200).json({ message: "Updated succesfully", updatePosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await postModel.findByIdAndRemove(id);

    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const SinglePost = await postModel.findById(id);
    console.log(SinglePost);
    res.status(200).json({ message: "Fetch succesfully", SinglePost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
