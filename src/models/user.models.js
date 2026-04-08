import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import ncrypt from "bcrypt";
const userSchema=new Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
  },
   fullname:{
    type:String,
    required:true,
       trim:true,
    
  },
   email:{
    type:String,
    required:true,
    unique:true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    lowercase:true,
    trim:true,
    },
     avatar:{
    type:String 
    
  },
  coverImage:{
    type:String,
  
  },
watchHistory:[
  {
    type:Schema.Types.ObjectId,
    ref:"Video"
  },
],
password:{
type:String,
required:[true,"password is required"]
},
refreshToken:{
  type:String,
}
},{timestamps:true});

//.pre is  middleware that work as schema.pre("eventName", function(next) {
  // code
//   next();
// });
// (Password hashing)
userSchema.pre("save",async function(next){
  if(!this.isModified(password)) return next();
  this.password= await bcrypt.hash(this.password,10)
  next()
});
// syntax
// schema.methods.methodName = async function (parameters) {
  // logic
// }
userSchema.methods.isPasswordCorrect=async function (password){
  return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
  // jwt.sign(payload, secret, options)
  //payload {
//   _id: this._id,
//   email: this.email
// }

// secret
// process.env.ACCESS_TOKEN_SECRET
// { expiresIn: "15m" }
  jwt.sign({
     _id:this._id,
    email: this.email,
    username:this.username,
    fullname:this.fullname
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY

  }
)

  
}
userSchema.methods.generateRefreshToken=function(){
  jwt.sign({
     _id:this._id,
    
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY

  }
)

}


export const User=mongoose.model("User",userSchema);