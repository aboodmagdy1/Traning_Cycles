import mongoose,{Document} from "mongoose";

interface UserDoc extends Document{
    name : string;
    phone : number;
    email:string;
    password:string;
}

const UserSchema = new mongoose.Schema({
    name:{type :String,required:true},
    phone: { type: Number, required: true },
    email: { type: String, required: true ,unique:true},
    password: { type: String, required: true },
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