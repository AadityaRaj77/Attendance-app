const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: {
            type: String, required: function () {
                return (this.role !== "admin")
            }
        },
        role: { type: String, required: true, enum: [user, admin] }
    }
)

module.exports = mongoose.model("User", userSchema);
