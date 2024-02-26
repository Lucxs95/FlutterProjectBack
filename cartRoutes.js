const express = require('express');
const router = express.Router();
const Cart = require('./Cart');
const Activity = require('./Activity');

router.post('/add', async (req, res) => {
    const {userId, activityId} = req.body;

    try {
        let cart = await Cart.findOne({userId});
        if (!cart) {
            cart = new Cart({userId, activityId});
        } else {
            cart.activities.push(activityId);
        }
        await cart.save();
        res.status(200).json({message: 'Activité ajoutée au panier', cart});
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'une activité au panier:', error);
        res.status(500).json({message: 'Erreur lors de l\'ajout d\'une activité au panier'});
    }
});
router.get('/:userId', async (req, res) => {
    const {userId} = req.params;

    try {
        const cart = await Cart.findOne({userId}).populate('activities');
        if (!cart) {
            return res.status(404).json({message: 'Panier introuvable\n'});
        }
        res.status(200).json(cart.activities);
    } catch (error) {
        console.error('Erreur lors de la récupération du panier:', error);
        res.status(500).json({message: 'Erreur lors de la récupération du panier'});
    }
});
router.post('/remove', async (req, res) => {
    const {userId, activityId} = req.body;

    try {
        const cart = await Cart.findOne({userId});
        if (!cart) {
            return res.status(404).json({message: 'Panier introuvable'});
        }

        cart.activities = cart.activities.filter(id => id.toString() !== activityId);
        await cart.save();

        res.status(200).json({message: 'Activité supprimée du panier', cart});
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'activité du panier:', error);
        res.status(500).json({message: 'Erreur lors de la suppression de l\'activité du panier'});
    }
});

router.post('/removeAll', async (req, res) => {
    const {userId} = req.body;

    try {
        const cart = await Cart.findOne({userId});
        if (!cart) {
            return res.status(404).json({message: 'Panier introuvable'});
        }

        cart.activities = [];
        await cart.save();

        res.status(200).json({message: 'Toutes les activités supprimées du panier', cart});
    } catch (error) {
        console.error('Erreur lors de la suppression de toutes les activités du panier:', error);
        res.status(500).json({message: 'Erreur lors de la suppression de toutes les activités du panier'});
    }
});

router.post('/clear', async (req, res) => {
    const {userId} = req.body;

    try {
        const cart = await Cart.findOne({userId});
        if (!cart) {
            return res.status(404).json({message: 'Panier introuvable'});
        }

        cart.activities = [];
        await cart.save();

        res.status(200).json({message: 'Panier vidé', cart});
    } catch (error) {
        console.error('Erreur lors de la suppression du panier:', error);
        res.status(500).json({message: 'Erreur lors de la suppression du panier'});
    }
});

module.exports = router;
