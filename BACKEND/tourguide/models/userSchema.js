const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true,  trim: true },
    email: {
      type: String, required: true, unique: true, trim: true
      , match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Veuillez entrer un email valide']
    },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    image_user: { type: String, default: "user.png" },
    role: { type: String, enum: ['visiteur', 'Tourist', 'Guide', 'SuperAdmin'], default: 'visiteur' }
  },
  {
    timestamps: true,
    discriminatorKey: 'role' //  Clé pour gérer l’héritage 
  }
);


// userSchema.post("save", function (req, res, next) {
//     console.log("new user was created & saved successfully");
//     next();
//   });

// 🔒 Hachage du mot de passe avant sauvegarde
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🎫 Génération du token JWT
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const User = mongoose.model('User', userSchema);

module.exports = User;
