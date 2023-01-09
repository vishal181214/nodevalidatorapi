import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'please enter your name'] },
    cellnum: { type: String, required: [true, 'please enter phone number']},
    email: { type: String, unique: true, required: [true, 'please enter your Email'] },
    password: { type: String, required: [true, 'please enter your password'] },
    Country: { type: String, required: [true, 'please enter your country'] },
    State: { type: String, required: [true, 'please enter your State'] },
    City: { type: String, required: [true, 'please enter your City'] },
    img: { type: String, required: [true, 'please enter your Image']},
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const userInfo = mongoose.model('userInfo', userSchema);
export default userInfo;