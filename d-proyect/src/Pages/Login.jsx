import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    const passwordValid = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)
    setIsValid(emailValid && passwordValid)
  }, [formData])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (formData.email === "valeska.pincheira091@gmail.com" && formData.password === "Val123456") {
        alert("¡Inicio de sesión exitoso! Redirigiendo...")
        navigate("/")
      } else {
        alert("¡Error el correo electrónico o contraseña son erróneos!")
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <section className="login-page">
      <div className="container">
        <div className="login-card">
          <div className="card-header">
            <h2 className="card-title">Iniciar Sesión</h2>
            <p className="card-subtitle">Disfruta de los mejores helados</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <div className="input-with-icon">
                  <i className="bi bi-envelope input-icon"></i>
                  <input
                    id="email"
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-with-icon">
                  <i className="bi bi-lock input-icon"></i>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
                <small className="form-hint">Mínimo 8 caracteres, una mayúscula y un número</small>
              </div>

              <div className="form-options">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe">Recordar mi cuenta</label>
                </div>
                <a href="#" className="forgot-password">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button type="submit" className="btn-dooc btn-block" disabled={!isValid || isLoading}>
                {isLoading ? (
                  <>
                    <i className="bi bi-arrow-repeat animate-spin"></i>
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </button>

              <Link to="/registro">
                <button type="button" className="btn-outline btn-block">
                  Registro de usuario
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
