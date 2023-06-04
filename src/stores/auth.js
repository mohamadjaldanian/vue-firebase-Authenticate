import { defineStore } from 'pinia'

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();


export const useUsers = defineStore('users', {
  state: () => {
    return {
      status: '',
      token: localStorage.getItem('token') || '',
      user: {}
    }
  },
  actions: {
    loginUser(email, password) {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            this.$state.user = userCredential.user;
            localStorage.setItem('token', userCredential.user.uid);
            localStorage.setItem('user', userCredential.user.email);
            resolve(userCredential)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(error)
          });
      });
    },
    signupUser(email, password) {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            this.$state.user = userCredential.user;
            localStorage.setItem('token', userCredential.user.uid);
            localStorage.setItem('user', userCredential.user.email);
            resolve(userCredential)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(error)
          });
      });
    },
    singoutUser() {
      return new Promise((resolve, reject) => {
        signOut(auth)
          .then((userCredential) => {
            this.$state.user = '';
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            resolve(userCredential)
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(error)
          });
      });
    }
  },
})
