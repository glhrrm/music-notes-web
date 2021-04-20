import { React, useEffect, useState } from 'react'
import Tag from './Tag'
import Rating from '@material-ui/lab/Rating'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import '../styles/components/review-box.css'
import { getAlbum, updateAlbum } from '../services/firebase'

const ReviewBox = (props) => {
  const id = props.album.id
  const title = props.album.name
  const artists = props.album.artists.map(artist => artist.name).join(', ')
  const image = props.album.images.find(image => image.width === 300).url
  const year = new Date(props.album.release_date).getFullYear()

  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0)
  const [tags, setTags] = useState([])
  const [updatedAt, setUpdatedAt] = useState(0)

  const updatedAtFormatted = new Date(updatedAt).toLocaleDateString()

  useEffect(() => {
    getAlbum(id)
      .then(album => {
        setReview(album.review || '')
        setRating(album.rating || 0)
        setTags(album.tags || [])
        setUpdatedAt(album.updatedAt || 0)
      })
  }, [id])

  // TODO: validar se é o mesmo álbum (se id for diferente, não atualiza)
  useEffect(() => {
    // const album = { id, review, rating, tags }
    // updateAlbum(album)
  }, [review, rating, tags])

  return (
    <div id="review-container">
      <div className="cover">
        <img src={image} alt="Album cover" />
      </div>
      <div className="info">
        <span className="title"><strong>{title}</strong></span>
        <span className="artists">{artists}</span>
        <span className="year">{year}</span>
      </div>
      <Rating
        name="ratingBar"
        value={rating}
        precision={0.5}
        size="large"
        onChange={e => setRating(parseFloat(e.target.value))}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />
      <textarea
        className="review"
        value={review}
        onChange={e => setReview(e.target.value)}
      />
      <div className="tags">
        {tags.map((tag, index) => <Tag text={tag} key={index} />)}
        <button
          className="add-tag"
          onClick={null}>+</button>
      </div>
      <span className="review-date">
        Atualizado em {updatedAtFormatted}
      </span>
    </div>
  )
}

export default ReviewBox