import { React, useEffect, useState } from 'react'
import Tag from './Tag'
import Rating from '@material-ui/lab/Rating'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import '../styles/components/review-box.css'

const ReviewBox = (props) => {
  const id = props.album.id
  const title = props.album.name
  const artists = props.album.artists.map(artist => artist.name).join(', ')
  const image = props.album.images.find(image => image.width === 300).url
  const year = new Date(props.album.release_date).getFullYear()

  const mockTags = ['psychedelic', 'art pop', 'women']
  
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0)
  const [tags, setTags] = useState(mockTags)

  useEffect(() => {
    const today = new Date(Date.now()).toUTCString()
    document.querySelector('.today').textContent = today
  }, [review, rating, tags])

  function addTag() {
    // TODO
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
        onChange={e => setReview(e.target.value)} />
      <div className="tags">
        {mockTags.map((tag, index) => <Tag text={tag} key={index} />)}
        <button
          className="add-tag"
          onClick={addTag}>+</button>
      </div>
      <span className="review-date">
        Atualizado em <span className="today">04/04/2021</span>
      </span>
    </div>
  )
}

export default ReviewBox