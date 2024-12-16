import express from 'express';
import { deleteAcc, getAcc, signupAdmin } from '../controllers/adminAccAppr.controller.js';
import adminAccAppr from '../models/adminAccAppr.model.js'; 
import Admin from '../models/admin.model.js'; 

const router = express.Router();

router.post('/signup', signupAdmin);
router.delete('/:id', deleteAcc);
router.get('/', getAcc);

router.put('/approve/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const account = await adminAccAppr.findById(id);
        if (!account) {
            return res.status(404).json({ success: false, message: 'Account not found' });
        }

        account.role = 'admin';

        // Insert
        const newAdmin = await Admin.create(account.toObject());
        console.log('Inserted into admins:', newAdmin);

        // Delete
        const deleteResult = await adminAccAppr.findByIdAndDelete(id);
        console.log('Deleted from adminaccapprs:', deleteResult);

        // Send success response
        res.json({ success: true, message: 'Account approved successfully', newAdmin });

    } catch (err) {
        console.error('Error during approval:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});


export default router;
