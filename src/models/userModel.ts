import { Schema, model } from 'mongoose';
import { QuizEntry } from './quizModel';
import { quizEntrySchema } from './quizModel';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    quiz : QuizEntry[];
};

const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    email: {type: String, required: true },
    password: { type: String, required: true },
    quiz: { type: [quizEntrySchema], default: []}
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
        }
    next()
});

const User = model<IUser>('User', userSchema)

export { User, IUser }; 