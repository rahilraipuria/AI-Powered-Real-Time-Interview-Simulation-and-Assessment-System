import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};
//register new user
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password, role } = req.body;
  if (
    [fullName, username, email, password, role].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  const user = await User.create({
    username: username,
    email: email,
    password: password,
    role: role,
    profile: {
      name: fullName,
      expertise: [],
      bio: "",
      experience: [],
      edication: [],
    },
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registerd successfully"));
});

//user login
const loginUser = asyncHandler(async (req, res) => {
  //console.log(req.body)
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email: email });
  //console.log('User Found:', user);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Incorrect user password");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In successfully"
      )
    );
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

//get user details
const userDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "Not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User Details Fetched Successfully"));
});

//get list of experts
const experts = asyncHandler(async (_, res) => {
  const listOfExperts = await User.find({ role: "Expert" }).select(
    "-password -refreshToken"
  );
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { listOfExperts },
        "List Of users fetched successfully!"
      )
    );
});

//get list of candidates
const candidates = asyncHandler(async (_, res) => {
  const listOfCandidates = await User.find({ role: "Candidate" }).select(
    "-password -refreshToken"
  );
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { listOfCandidates },
        "List Of users fetched successfully!"
      )
    );
});

//update user profile
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { expertise, bio, experience, education } = req.body;

  const updatedUser=await User.findByIdAndUpdate(userId, {
    $set: {
      "profile.bio": bio,
      "profile.expertise": expertise,
      "profile.experience": experience,
      "profile.education": education,
    },
  },
    {new:true,runValidators:true}
        
  );

  if(!updatedUser){
    throw new ApiError(404,"User Not Found")
  }

  return res
  .status(200)
  .json(new ApiResponse(200,{updatedUser},"User Profile Updated Successfully"))
});

export {
  registerUser,
  loginUser,
  logoutUser,
  userDetails,
  experts,
  candidates,
  updateProfile
};
