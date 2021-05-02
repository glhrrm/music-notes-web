import firebase from '../utils/firebase'

const ref = firebase.database().ref('users/ds8n5mX56XShmTA50g1Pzjep7yU2/albums')

function auth() {
  if (!firebase.auth().currentUser) {
    const email = process.env.REACT_APP_FIREBASE_EMAIL
    const password = process.env.REACT_APP_FIREBASE_PASSWORD
    firebase.auth().signInWithEmailAndPassword(email, password)
  }
}

const getAlbum = async (id) => {
  auth()

  const snapshot = await ref.child(id).once('value')
  return snapshot && snapshot.val()
}

const updateAlbum = async (id, album) => {
  auth()

  ref.child(id).set(album)
}

export { getAlbum, updateAlbum }