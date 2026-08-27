import mongoose, {Schema, Document} from "mongoose";

enum codestatus {
    processing = "processing",
    completed = "completed"
}

enum languageoptions {
    cpp = "cpp",
    javascript = "javascript",
    python = "python"
}

interface User extends Document {
    code: string;
    status: codestatus;
    language: languageoptions;
}

const userSchema = new Schema<User> ({
    code: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: Object.values(codestatus),
        required: true
    },

    language: {
        type: String,
        enum: Object.values(languageoptions),
        required: true
    }
    
})

const User = mongoose.model<User>("User", userSchema);

export default User;
