export default function TestimonialCard({ name, role, rating, comment }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="testimonial-card">
      <div className="testimonial-rating">
        {/* Renderiza estrellas llenas */}
        {[...Array(fullStars)].map((_, i) => (
          <i key={i} className="bi bi-star-fill text-warning"></i>
        ))}
        {/* Media estrella si corresponde */}
        {hasHalfStar && <i className="bi bi-star-half text-warning"></i>}
      </div>

      <p className="testimonial-comment">{comment}</p>
      <div className="testimonial-author">
        <h6 className="author-name">{name}</h6>
        <small className="author-role">{role}</small>
      </div>
    </div>
  )
}