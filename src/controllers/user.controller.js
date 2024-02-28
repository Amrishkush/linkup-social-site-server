import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh token."
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, fullName } = req.body;

  if (
    [email, username, password, fullName].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are require.");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "Username or email already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  //if we dont want avatar then check like this because it will give undefined so it won't be readable and required must be removed from model also
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "File is required.");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
    password,
    fullName,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something Went Wrong");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User is registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User is not registered.");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "User credentials are wrong");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

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
    .json(new ApiResponse(
        200, 
        {
            user: loggedInUser,
            accessToken,
            refreshToken
        }, 
        "User Logged in Successfully"
        ));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user , "User fetched successfully."));
});

const accessToken = "accessToken";    //other wise it will show undefined
const refreshToken = "refreshToken"
const logoutUser = asyncHandler(async(req, res)=>{
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
      accessToken: undefined
    }
  },
  {
    new: true
  }
  )
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).clearCookie(accessToken, options).clearCookie(refreshToken, options).json(new ApiResponse(201, {}, "User Logged out Successfully"))
})

export {registerUser, loginUser, logoutUser,getCurrentUser}