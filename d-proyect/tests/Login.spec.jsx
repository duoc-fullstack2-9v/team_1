import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Login from "@/Components/Login.jsx";


// Mocks
// 1. Mock de react-router-dom para useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: actual.Link, // Aseguramos que Link funcione normalmente
  };
});

// 2. Mockear la función global alert
const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});

// Credenciales válidas usadas en el componente Login.jsx
const VALID_EMAIL = 'valeska.pincheira091@gmail.com';
const VALID_PASSWORD = 'Val123456';

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers(); // Usamos temporizadores falsos para controlar el setTimeout
  });

  // Test que ya pasaba: renderiza correctamente los campos de correo y contraseña
  it('renderiza correctamente los campos de correo y contraseña', () => {
    renderLogin();

    // Campos de entrada
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();

    // Botones
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Registro de usuario' })).toBeInTheDocument();
  });

  // Test que ya pasaba: permite mostrar y ocultar la contraseña
  it('permite mostrar y ocultar la contraseña', () => {
    renderLogin();

    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const toggleButton = screen.getByRole('button', { name: '' }); // El botón no tiene texto visible

    // Por defecto, es 'password' (oculto)
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Clic para mostrar
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Clic para ocultar de nuevo
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  // 1. PRUEBA FALLIDA: muestra un mensaje de error si las credenciales son incorrectas
  it('muestra un mensaje de error si las credenciales son incorrectas', async () => {
    renderLogin();

    // 1. Ingresar credenciales INCORRECTAS (pero que pasan la validación de formato)
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'usuario@invalido.com' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'Mal123456' },
    });

    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    fireEvent.click(submitButton);

    // 2. Comprobar estado de carga
    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/Entrando.../i)).toBeInTheDocument();

    // 3. Avanzar el tiempo del setTimeout (1500ms)
    vi.advanceTimersByTime(1500);

    // 4. Esperar a que se muestre el mensaje de error (alert)
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        '¡Error el correo electrónico o contraseña son erróneos!'
      );
    });
    
    // 5. Verificar que NO hubo redirección
    expect(mockNavigate).not.toHaveBeenCalled();
    
    // 6. El botón debe volver a estar disponible
    expect(screen.getByRole('button', { name: 'Entrar' })).not.toBeDisabled();
  });


  // 2. PRUEBA FALLIDA: redirige si las credenciales son correctas
  it('redirige si las credenciales son correctas', async () => {
    renderLogin();

    // 1. Ingresar credenciales CORRECTAS
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: VALID_EMAIL },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: VALID_PASSWORD },
    });

    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    fireEvent.click(submitButton);

    // 2. Comprobar estado de carga
    expect(submitButton).toBeDisabled();

    // 3. Avanzar el tiempo del setTimeout (1500ms)
    vi.advanceTimersByTime(1500);

    // 4. Esperar a que se muestre el mensaje de éxito (alert)
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('¡Inicio de sesión exitoso! Redirigiendo...');
    });

    // 5. Verificar que hubo redirección a la ruta raíz ("/")
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
    
    // 6. El botón debe volver a estar disponible
    expect(screen.getByRole('button', { name: 'Entrar' })).not.toBeDisabled();
  });
  
  // Prueba extra: El botón de enviar está deshabilitado si los datos no son válidos
  it('el botón de entrar está deshabilitado con credenciales no válidas', () => {
    renderLogin();
    
    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    
    // 1. Sin ingresar nada (inválido por defecto)
    expect(submitButton).toBeDisabled();

    // 2. Ingresar solo email válido
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'test@ejemplo.com' },
    });
    expect(submitButton).toBeDisabled(); // Falla la contraseña

    // 3. Ingresar email válido y contraseña INválida (ej: sin mayúscula)
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
        target: { value: 'val123456' }, // Falla la mayúscula
    });
    expect(submitButton).toBeDisabled(); 
    
    // 4. Ingresar email válido y contraseña válida
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
        target: { value: VALID_PASSWORD },
    });
    expect(submitButton).not.toBeDisabled(); 
  });
});