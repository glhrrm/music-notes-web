import React from 'react'
import '../styles/components/album.css'

const Album = (props) => {
  const id = props.id
  const title = props.name
  const artists = props.artists.map(artist => artist.name).join(', ')
  const image = props.images.find(image => image.width === 300).url
  const year = new Date(props.release_date).getFullYear()

  return (
    <div className="album-container" onClick={props.onClick} album-id={id}>
      <div className="cover">
        <img src={image} alt="Album cover" />
      </div>
      <div className="info">
        <span><strong>{title}</strong></span>
        <span>{artists}</span>
        <span>{year}</span>
      </div>
    </div>
  )
}

export default Album