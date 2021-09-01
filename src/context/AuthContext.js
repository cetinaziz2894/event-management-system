import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [userInfo, setUserInfo] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(fullname, email,hesCode, password) {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      await db.collection("users").doc(user.uid).set({
        fullname,
        password,
        email,
        hesCode,
        isAttended:false
      }); 
      return user;
    } catch (err) {
      console.error(err);
      var errorCode = err.code;
      var errorMessage = err.message;
      console.log(errorCode, errorMessage);
      return {errorCode,errorMessage};
    }
  }

  async function login(email, password) {
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      return res;
    } catch (err) {
      console.error(err);
      var errorCode = err.code;
      var errorMessage = err.message;
      console.log(errorCode, errorMessage);
      return {errorCode,errorMessage};
    }
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  async function getUser(id){
    try {
      const res = await db.collection("users").doc(id).get()
      return res;
    } catch (err) {
      console.error(err);
      var errorCode = err.code;
      var errorMessage = err.message;
      console.log(errorCode, errorMessage);
      return {errorCode,errorMessage};
    }
  }

  async function changeIsAttandedStatus(id,status){
    try {
      await db.collection("users").doc(id).update({
        isAttended: !status
      })
      return "success";
    } catch (err) {
      console.error(err);
      var errorCode = err.code;
      var errorMessage = err.message;
      console.log(errorCode, errorMessage);
      return{errorCode,errorMessage};
    }
  }

  async function getParticipants(){
    try {
      const snapshot = await db.collection("users").get();
      return snapshot.docs.map(doc => doc.data());
    } catch (err) {
      console.error(err);
      var errorCode = err.code;
      var errorMessage = err.message;
      console.log(errorCode, errorMessage);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async() => {
    if(currentUser){
      const user = await getUser(currentUser?.uid);
      setUserInfo(user?.data());
      setLoading(false);
    }

  }, [currentUser])

  const value = {
    currentUser,
    userInfo,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getUser,
    changeIsAttandedStatus,
    getParticipants
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}