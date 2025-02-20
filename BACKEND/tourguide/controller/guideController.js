const Guide = require('../models/guideSchema');
const bcrypt = require('bcryptjs');


module.exports.createGuide = async (req, res) => {
    try {
        const guide = new Guide(req.body); 
        await guide.save(); 
        res.status(201).json({ message: 'Guide créé avec succès', guide });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du guide', error });
    }
};


module.exports.updateGuide = async (req, res) => {
    try {
        let guide = await Guide.findById(req.params.id);
        if (!guide) {
            return res.status(404).json({ message: 'Guide non trouvé' });
        }

        // Mettre à jour les autres champs
        Object.assign(guide, req.body);

        // Vérifier si le mot de passe a été modifié
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            guide.password = await bcrypt.hash(req.body.password, salt);
        }

        // Sauvegarder les modifications (le `pre('save')` fonctionne ici)
        await guide.save();

        res.status(200).json({ message: 'Guide mis à jour avec succès', guide });

    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du guide', error });
    }
};



module.exports.deleteGuide = async (req, res) => {
    try {
        const guide = await Guide.findByIdAndDelete(req.params.id);
        if (!guide) {
            return res.status(404).json({ message: 'Guide non trouvé' });
        }
        res.status(200).json({ message: 'Guide supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du guide', error });
    }
};


module.exports.getGuideById = async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id).populate('oldTours resources contacts partners newTour');//afficher tous pas seulement id
        if (!guide) {
            return res.status(404).json({ message: 'Guide non trouvé' });
        }
        res.status(200).json(guide);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du guide', error });
    }
};


module.exports.getAllGuides = async (req, res) => {
    try {
        const guides = await Guide.find().populate('oldTours resources contacts partners newTour');
        res.status(200).json(guides);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des guides', error });
    }
};

module.exports.getGuideWithReferenceIDsOnly = async (req, res) => {
  try {
      const guide = await Guide.findById(req.params.id);
      if (!guide) {
          return res.status(404).json({ message: "Guide not found" });
      }

      // Construire une nouvelle réponse en gardant tout sauf les références avec seulement leurs ID
      const response = {
          ...guide.toObject(), // Convertit le document Mongoose en objet JS
          oldTours: guide.oldTours.map(id => id.toString()), 
          resources: guide.resources.map(id => id.toString()), 
          contacts: guide.contacts.map(id => id.toString()), 
          partners: guide.partners.map(id => id.toString()), 
          newTour: guide.newTour ? guide.newTour.toString() : null 
      };

      res.json(response);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
