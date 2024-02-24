import express from 'express'
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController'

const router = express.Router()

// Create a new user
router.post('/', createUser)

// Get all users
router.get('/', getUsers)

// Get a user by ID
router.get('/:userId', getUserById)

// Update a user by ID
router.put('/:userId', updateUser)

// Delete a user by ID
router.delete('/:userId', deleteUser)

export default router