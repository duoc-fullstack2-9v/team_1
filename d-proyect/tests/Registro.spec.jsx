import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Registro from "../src/Pages/Registro.jsx"

describe("Componente Registro", () => {
test("renderiza correctamente el título y los campos", () => {
render( <MemoryRouter> <Registro /> </MemoryRouter>
)


expect(screen.getByText("Registrarse")).toBeInTheDocument()
expect(screen.getByLabelText("Nombre")).toBeInTheDocument()
expect(screen.getByLabelText("Correo Electrónico")).toBeInTheDocument()
expect(screen.getByLabelText("Contraseña")).toBeInTheDocument()
expect(screen.getByLabelText("Confirmar Contraseña")).toBeInTheDocument()


})

test("muestra mensaje de error cuando las contraseñas no coinciden", () => {
render( <MemoryRouter> <Registro /> </MemoryRouter>
)


fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "Password123!" } })
fireEvent.change(screen.getByLabelText("Confirmar Contraseña"), { target: { value: "Diferente123!" } })

expect(screen.getByText("Las contraseñas no coinciden")).toBeInTheDocument()


})

test("habilita el botón Crear cuando los datos son válidos", async () => {
render( <MemoryRouter> <Registro /> </MemoryRouter>
)


const nameInput = screen.getByLabelText("Nombre")
const emailInput = screen.getByLabelText("Correo Electrónico")
const passwordInput = screen.getByLabelText("Contraseña")
const confirmPasswordInput = screen.getByLabelText("Confirmar Contraseña")
const createButton = screen.getByRole("button", { name: /crear/i })

fireEvent.change(nameInput, { target: { value: "Juan Pérez" } })
fireEvent.change(emailInput, { target: { value: "juan@example.com" } })
fireEvent.change(passwordInput, { target: { value: "Password123!" } })
fireEvent.change(confirmPasswordInput, { target: { value: "Password123!" } })

await waitFor(() => expect(createButton).not.toBeDisabled())


})

test("muestra el mensaje de éxito después del registro", async () => {
render( <MemoryRouter> <Registro /> </MemoryRouter>
)


fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "María" } })
fireEvent.change(screen.getByLabelText("Correo Electrónico"), { target: { value: "maria@example.com" } })
fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "Password123!" } })
fireEvent.change(screen.getByLabelText("Confirmar Contraseña"), { target: { value: "Password123!" } })

const createButton = screen.getByRole("button", { name: /crear/i })
fireEvent.click(createButton)

await waitFor(() => {
  expect(screen.getByText("¡Registro exitoso!")).toBeInTheDocument()
  expect(screen.getByText("Tu cuenta ha sido creada correctamente.")).toBeInTheDocument()
})


})

test("restablece el formulario al presionar cancelar", () => {
render( <MemoryRouter> <Registro /> </MemoryRouter>
)

fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Luis" } })
fireEvent.click(screen.getByRole("button", { name: /cancelar/i }))

expect(screen.getByLabelText("Nombre").value).toBe("")


})
})

