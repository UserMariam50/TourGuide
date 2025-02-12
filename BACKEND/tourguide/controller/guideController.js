const Guide = require('../models/guideSchema');

exports.getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find().select('-password');
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findOne({ _id: req.params.id }).select('-password');
    if (!guide) return res.status(404).json({ message: "Guide non trouvé !" });

    res.status(200).json(guide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGuide = async (req, res) => {
  try {
    const { username, email, image_user } = req.body;

    let guide = await Guide.findOne({ _id: req.params.id });
    if (!guide) return res.status(404).json({ message: "Guide non trouvé !" });

    guide.username = username || guide.username;
    guide.email = email || guide.email;
    guide.image_user = image_user || guide.image_user;

    await guide.save();
    res.status(200).json({ message: "Guide mis à jour avec succès !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findOneAndDelete({ _id: req.params.id });
    if (!guide) return res.status(404).json({ message: "Guide non trouvé !" });

    res.status(200).json({ message: "Guide supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createGuide = async (req, res) => {
  try {
    const { username, email, password, image_user } = req.body;

    const existingUser = await Guide.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

    const guide = new Guide({
      username,
      email,
      password,
      image_user,
      role: 'guide'
    });

    await guide.save();

    const token = guide.generateAuthToken();

    res.status(201).json({ token, guide });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
