const Tour = require('../models/tourSchema');
const Guide = require('../models/guideSchema');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tours', error: error.message });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour non trouvé' });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du tour', error: error.message });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = new Tour({
      ...req.body,
      createdBy: req.user.userId // Utiliser l'ID de l'utilisateur authentifié
    });

    const savedTour = await newTour.save();

    const { createdBy, tourstate, _id } = savedTour;

    if (tourstate === 'done') {
      await Guide.updateOne(
        { _id: createdBy },
        { $push: { Tourdone: _id } }  // Ajouter à la liste des tours terminés du guide
      );
    } else if (tourstate === 'programmed') {
      await Guide.updateOne(
        { _id: createdBy },
        { $push: { Tourprogrammed: _id } }  // Ajouter à la liste des tours programmés du guide
      );
    }

    res.status(201).json(savedTour);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du tour', error: error.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: 'Tour non trouvé' });
    }

    // Vérifier si l'utilisateur qui tente de modifier le tour est bien le créateur
    if (tour.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce tour' });
    }

    // Mettre à jour le tour avec les nouvelles données
    Object.assign(tour, req.body);

    // Si l'état du tour est 'done', le déplacer de "Tourprogrammed" vers "Tourdone"
    if (tour.tourstate === 'done') {
      await Guide.updateOne(
        { _id: tour.createdBy },
        {
          $pull: { Tourprogrammed: tour._id },
          $push: { Tourdone: tour._id }
        }
      );
    }

    await tour.save();
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du tour', error: error.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: 'Tour non trouvé' });
    }

    // Vérifier si l'utilisateur qui tente de supprimer le tour est bien le créateur
    if (tour.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce tour' });
    }

    // Supprimer le tour
    await Tour.deleteOne({ _id: req.params.id });
    
    // Mettre à jour la liste des tours du guide
    await Guide.updateOne(
      { _id: tour.createdBy },
      { $pull: { Tourprogrammed: tour._id, Tourdone: tour._id } }
    );

    res.status(200).json({ message: 'Tour supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du tour', error: error.message });
  }
};

// Récupérer les tours d'un guide par ID
exports.getToursByGuideId = async (req, res) => {
  try {
    const guideId = req.params.id;
    const tours = await Tour.find({ createdBy: guideId });

    if (tours.length === 0) {
      return res.status(404).json({ message: 'Aucun tour trouvé pour ce guide' });
    }

    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tours du guide', error: error.message });
  }
};
