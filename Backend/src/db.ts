import mongoose, { Types } from "mongoose"
const db = mongoose
db.connect("mongodb+srv://admin:lakshya1234@cluster0.6eli8.mongodb.net/Brain")


const userSchema = new db.Schema({
    username: { type: String, required: true, unique: true},
    password: {type: String, required: true}
})
export const UserModel = db.model("User", userSchema);


const contentSchema = new db.Schema({
    link: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    userId: { type: Types.ObjectId, ref: 'User', required: true },
});
export const ContentModel = db.model("Content", contentSchema);




const linkSchema = new db.Schema({
    hash: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
})
export const LinkModel = db.model("Links", linkSchema);



