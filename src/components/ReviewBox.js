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
  const [newTagCount, setNewTagCount] = useState(0)

  const updatedAtFormatted = new Date(updatedAt).toLocaleDateString()

  useEffect(async () => {
    const album = await getAlbum(id)

    setReview((album && album.review) || '')
    setRating((album && album.rating) || 0)
    setTags((album && album.tags) || [])
    setUpdatedAt((album && album.updatedAt) || 0)
  }, [id])

  const update = async () => {
    const newAlbum = { review, rating, tags, updatedAt: Date.now() }

    // ideal seria comparar com o álbum atual, mas 'album' retorna undefined
    // JSON.stringify(album) !== JSON.stringify(newAlbum)

    updateAlbum(id, newAlbum)
      .then(_ => setUpdatedAt(newAlbum.updatedAt))
  }

  const saveTag = (text) => {
    text.length > 0 && !tags.includes(text) && tags.push(text) && setNewTagCount(newTagCount - 1)
  }

  const addTag = () => {
    setNewTagCount(newTagCount + 1)
  }

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
        {tags.map((tag, index) => <Tag editable={false} text={tag} key={index} />)}
        {[...Array(newTagCount)].map((_, i) =>
          <Tag
            editable={true}
            key={i}
            onBlur={e => saveTag(e.target.innerText)}
          />
        )}
        <button
          className="add-tag"
          onClick={addTag}>+</button>
      </div>
      <div className="update">
        {updatedAt > 0 &&
          <span className="review-date">
            Atualizado em {updatedAtFormatted}
          </span>}
        <button
          className="save"
          onClick={update}>✓</button>
      </div>
    </div>
  )
}

export default ReviewBox