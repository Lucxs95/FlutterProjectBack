// Supposons que ce code se trouve dans un fichier de routes, par exemple cartRoutes.js

const express = require('express');
const router = express.Router();
const Cart = require('./Cart'); // Importez le modèle Cart
const Activity = require('./Activity'); // Assurez-vous que le chemin d'accès est correct

// Endpoint pour ajouter une activité au panier
router.post('/add', async (req, res) => {
    const { userId, activityId } = req.body; // Obtenir l'userId et l'activityId de la requête

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // Si l'utilisateur n'a pas de panier, en créer un
            cart = new Cart({ userId, activities: [activityId] });
        } else {
            // Sinon, ajouter l'activité au panier existant
            cart.activities.push(activityId);
        }
        await cart.save(); // Sauvegarder le panier mis à jour
        res.status(200).json({ message: 'Activity added to cart', cart });
    } catch (error) {
        console.error('Error adding activity to cart:', error);
        res.status(500).json({ message: 'Error adding activity to cart' });
    }
});

module.exports = router;
