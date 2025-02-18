const Contact = require('../models/contactSchema');

// Créer un contact
module.exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    console.error(error); // Ajouter un log pour mieux suivre les erreurs côté serveur
    res.status(400).json({ message: "Erreur lors de la création du contact", error: error.message });
  }
};

// Obtenir tous les contacts
module.exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error); // Log de l'erreur
    res.status(500).json({ message: "Erreur lors de la récupération des contacts", error: error.message });
  }
};

// Obtenir un contact par son ID
module.exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact non trouvé" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error); // Log de l'erreur
    res.status(500).json({ message: "Erreur lors de la récupération du contact", error: error.message });
  }
};

// Mettre à jour un contact
module.exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) {
      return res.status(404).json({ message: "Contact non trouvé" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error); // Log de l'erreur
    res.status(500).json({ message: "Erreur lors de la mise à jour du contact", error: error.message });
  }
};

// Supprimer un contact
module.exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact non trouvé" });
    }
    res.status(200).json({ message: "Contact supprimé" });
  } catch (error) {
    console.error(error); // Log de l'erreur
    res.status(500).json({ message: "Erreur lors de la suppression du contact", error: error.message });
  }
};

// Obtenir un contact par son nom (insensible à la casse)
module.exports.getContactByName = async (req, res) => {
    try {
      const name = req.params.name; // Récupère le nom depuis les paramètres de la requête
      const contact = await Contact.findOne({ 
        name: { 
          $regex: new RegExp('^' + name + '$', 'i') // chercher nom majuscule ou minuscule ou minuscule ou les 2 au meme temps
        } 
      });
  
      if (!contact) {
        return res.status(404).json({ message: "Contact non trouvé" });
      }
  
      res.status(200).json(contact);
    } catch (error) {
      console.error(error); // Log de l'erreur
      res.status(500).json({ message: "Erreur lors de la recherche du contact", error: error.message });
    }
  };
  
  // Obtenir des contacts par rôle
module.exports.getContactsByRole = async (req, res) => {
  try {
    const role = req.params.role; // Récupère le rôle depuis les paramètres de la requête
    const contacts = await Contact.find({ role: role }); // Recherche des contacts ayant le rôle spécifié

    if (!contacts.length) {
      return res.status(404).json({ message: "Aucun contact trouvé pour ce rôle" });
    }

    res.status(200).json(contacts); // Retourne les contacts trouvés
  } catch (error) {
    console.error(error); // Log de l'erreur
    res.status(500).json({ message: "Erreur lors de la récupération des contacts par rôle", error: error.message });
  }
};


// Récupérer les contacts créés par un guide (basé sur l'ID de l'utilisateur authentifié)
module.exports.getContactsByGuide = async (req, res) => {
  try {
    // L'ID de l'utilisateur (guide) est récupéré depuis le middleware d'authentification
    const guideId = req.user._id; // L'ID de l'utilisateur est stocké dans `req.user` après décryptage du token

    // Rechercher les contacts créés par ce guide (en utilisant 'createdBy' qui fait référence à l'utilisateur)
    const contacts = await Contact.find({ createdBy: guideId });

    if (!contacts.length) {
      return res.status(404).json({ message: "Aucun contact trouvé pour ce guide" });
    }

    res.status(200).json(contacts); // Retourne les contacts trouvés
  } catch (error) {
    console.error(error); // Log de l'erreur
    res.status(500).json({ message: "Erreur lors de la récupération des contacts créés par le guide", error: error.message });
  }
};
