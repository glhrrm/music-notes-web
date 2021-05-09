import { React, useEffect, useRef, useState } from 'react'
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

  const album = useRef()

  useEffect(async () => {
    album.current = await getAlbum(id)

    setReview((album.current && album.current.review) || '')
    setRating((album.current && album.current.rating) || 0)
    setTags((album.current && album.current.tags) || [])
    setUpdatedAt((album.current && album.current.updatedAt) || 0)
  }, [id])

  const update = async () => {
    const { updatedAt, ...oldAlbum } = album.current || { updatedAt: 0 }
    const newAlbum = { rating, review, tags }

    if (newAlbum.rating > 0 && JSON.stringify(oldAlbum) !== JSON.stringify(newAlbum)) {
      newAlbum.updatedAt = Date.now()
      updateAlbum(id, newAlbum)
        .then(_ => setUpdatedAt(newAlbum.updatedAt))
    }
  }

  const saveTag = (text) => {
    text.length > 0
      && !tags.includes(text)
      && tags.push(text)
      && setNewTagCount(newTagCount - 1)
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
        {/* TODO: como notificar se a tag foi excluída? */}
        {tags.map((tag, i) =>
          <Tag
            editable={false}
            text={tag}
            key={i} />
        )}
        {[...Array(newTagCount)].map((_, i) =>
          <Tag
            editable={true}
            key={i}
            onBlur={e => saveTag(e.target.innerText)} />
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