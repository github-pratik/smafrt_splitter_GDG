// Firebase authentication services for SmartSplit app

import { auth } from './config';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';

// Google Sign-in provider
const googleProvider = new GoogleAuthProvider();

/**
 * Sign in with Google using popup
 * @returns {Promise} User credential
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

/**
 * Sign out the current user
 * @returns {Promise} Void
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Subscribe to auth state changes
 * @param {Function} callback Function to call with user object when auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

/**
 * Get current authenticated user
 * @returns {Object|null} Current user or null if not authenticated
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};