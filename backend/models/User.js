import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true
    },
    password: {
      type: String,
      require: true,
      trim: true
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true
    },
    token: {
      type: String
    },
    state: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.checkPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password)
}

export default model('User', userSchema)
