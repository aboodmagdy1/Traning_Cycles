import mongoose,{Document} from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type :String,required:true},
    phone: { type: Number, required: true },
    email: { type: String, required: true ,unique:true},
    password: { type: String, required: true },
    resetCode:{ type: String},
    resetCodeExpiry:{ type: Date}
},{
    timestamps:true,
    toJSON:{
        transform(doc,ret){
            delete ret.__v
            delete ret.createdAt
            delete ret.updatedAt

        }
    }

})

export const User = mongoose.model("User",UserSchema)