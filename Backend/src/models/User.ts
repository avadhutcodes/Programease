import mongoose, {Schema, Document} from "mongoose";

 export  enum codestatus {
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
    Result: string;
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
    },

    Result: {
        type: String,
        required: false 
    }
    
})

const User = mongoose.model<User>("User", userSchema);

export default User;
