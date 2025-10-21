import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define user schema
const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true, 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true 
        },
        password: { 
            type: String, 
            required: true,
            minlength: 8
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// pre-save hook to hash a password
userSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error){
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
