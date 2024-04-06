const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  birthDate: String,
  image: String,
});

module.exports = mongoose.model("Users", UserSchema);
// export default mongoose.model("Users", UserSchema);
