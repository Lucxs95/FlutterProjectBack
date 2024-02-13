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
            cart = new Cart({ userId, activityId });
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
router.get('/:userId', async (req, res) => {
    const { userId } = req.params; // Obtenir l'userId de la requête

    try {
        const cart = await Cart.findOne({ userId }).populate('activities');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart.activities);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Error fetching cart' });
    }
});
router.post('/remove', async (req, res) => {
    const { userId, activityId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Retirer l'activité du panier
        cart.activities = cart.activities.filter(id => id.toString() !== activityId);
        await cart.save();

        res.status(200).json({ message: 'Activity removed from cart', cart });
    } catch (error) {
        console.error('Error removing activity from cart:', error);
        res.status(500).json({ message: 'Error removing activity from cart' });
    }
});

module.exports = router;
