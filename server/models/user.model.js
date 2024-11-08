import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  ghanaCard: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^GHA-\d{9}-\d$/.test(v);
      },
      message: props => `${props.value} is not a valid Ghana Card format! Use GHA-123456789-1 format`
    }
  },
  profilePic: {
    type: String,
    default: "https://avatar.iran.liara.run/public/boy",
  },
  hasVoted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;