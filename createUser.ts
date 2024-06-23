import { Request, Response } from 'express';
import { User, IUser } from '../models/userModel';

// Retrieve all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Retrieve a user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: IUser = new User(req.body);
    const savedUser: IUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an existing user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser: IUser | null = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser: IUser | null = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(204).send();
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
