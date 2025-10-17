import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Registro() {
  const [formData, setFormData] = useState({
    names: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isValid, setIsValid] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    let strength = 0
    const password = formData.password

    if (password.length >= 8) strength += 25
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 25
    if (password.match(/([0-9])/)) strength += 25
    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/)) strength += 25

    setPasswordStrength(strength)
  }, [formData.password])

  useEffect(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length >= 8
    const namesValid = formData.names.trim().length > 0

    setIsValid(emailValid && passwordsMatch && namesValid)
  }, [formData])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Registro exitoso:", formData)
    setShowSuccess(true)
  }

  const handleReset = () => {
    setFormData({ names: "", email: "", password: "", confirmPassword: "" })
    setShowSuccess(false)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "strength-weak"
    if (passwordStrength < 100) return "strength-medium"
    return "strength-strong"
  }

  return (
    <section className="registro-page">
      <div className="container">
        <div className="registro-card">
          <div className="card-header">
            <h2 className="card-title">Registrarse</h2>
          </div>
          <div className="card-body">
            {showSuccess ? (
              <div className="success-message">
                <h3>¡Registro exitoso!</h3>
                <p>Tu cuenta ha sido creada correctamente.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="names">Nombre</label>
                  <input
                    type="text"
                    id="names"
                    placeholder="Ingresa tu nombre"
                    value={formData.names}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Ingresa tu correo"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="password-strength">
                    <div className={`strength-bar ${getPasswordStrengthColor()}`}>
                      <div className="strength-fill" style={{ width: `${passwordStrength}%` }}></div>
                    </div>
                    <small className="form-hint">
                      La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter
                      especial.
                    </small>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirmar tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  {formData.confirmPassword && (
                    <small className={formData.password === formData.confirmPassword ? "text-success" : "text-error"}>
                      {formData.password === formData.confirmPassword
                        ? "Las contraseñas coinciden"
                        : "Las contraseñas no coinciden"}
                    </small>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-dooc btn-half" disabled={!isValid}>
                    Crear
                  </button>
                  <button type="button" className="btn-outline btn-half" onClick={handleReset}>
                    Cancelar
                  </button>
                </div>

                <div className="form-footer">
                  <small>
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/login" className="text-dooc">
                      Inicia sesión
                    </Link>
                  </small>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
