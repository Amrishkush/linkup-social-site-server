
const asyncHandler = (requestHandler) => {
  return (req, res, next)=>{
    Promise.resolve(requestHandler(req,res, next).catch((error)=> next(error)))
  }
};
//order matters here (req, res, next)
export  {asyncHandler};