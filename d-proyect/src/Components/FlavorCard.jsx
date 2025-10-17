export default function FlavorCard({ name, description, image, badge }) {
  return (
    <div className="flavor-card">
      <img src={image || "/placeholder.svg"} className="flavor-image" />
      <div className="flavor-content">
        <h5 className="flavor-name">{name}</h5>
        <p className="flavor-description">{description}</p>
        <span className="flavor-badge">{badge}</span>
      </div>
    </div>
  )
}
