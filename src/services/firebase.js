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

const updateAlbum = async (album) => {
  auth()

  // depois de remover as informações redundantes do banco será possível aplicar o método set() para todos os casos
  if (await getAlbum(album.id)) {
    ref.child(album.id).update(album)
  } else {
    ref.child(album.id).set(album)
  }
}

export { getAlbum, updateAlbum }