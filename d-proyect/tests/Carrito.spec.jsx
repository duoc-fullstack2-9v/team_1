import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import Carrito from '../src/Components/Carrito.jsx';
import { CartContext } from '../Context/CartContext';

// Mock del hook useCart y el componente Carrito
const mockSetCart = vi.fn();
const mockOnClose = vi.fn();

const mockCartEmpty = [];
const mockCartOneItem = [
  { id: 1, name: 'Helado de Vainilla', price: 500, cantidad: 1, image: 'vanilla.jpg' }
];
const mockCartMultipleItems = [
  { id: 1, name: 'Helado de Vainilla', price: 500, cantidad: 2, image: 'vanilla.jpg', nota: 'sin nueces' },
  { id: 2, name: 'Brownie', price: 350, cantidad: 3, image: 'brownie.jpg' }
];

const renderCarrito = (cartState, onClose = mockOnClose) => {
  return render(
    <CartContext.Provider value={{ cart: cartState, setCart: mockSetCart }}>
      <Carrito onClose={onClose} />
    </CartContext.Provider>
  );
};

// Mock para simular el portal
// Esto es importante para que los modales y el carrito se rendericen en el DOM
vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    createPortal: (element) => element,
  };
});

describe('Carrito Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers(); // Usar temporizadores falsos para probar setTimeout
  });

  // 1. muestra mensaje de carrito vacío
  it('muestra mensaje de carrito vacío', () => {
    renderCarrito(mockCartEmpty);
    
    expect(screen.getByText('Tu carrito está vacío 🛍️')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByText(/Total:/i)).not.toBeInTheDocument();
  });

  // 2. muestra los productos del carrito correctamente
  it('muestra los productos del carrito correctamente', () => {
    renderCarrito(mockCartMultipleItems);

    const products = screen.getAllByRole('listitem');
    expect(products).toHaveLength(2);

    expect(screen.getByText('Helado de Vainilla')).toBeInTheDocument();
    expect(screen.getByText(/Comentario: sin nueces/i)).toBeInTheDocument();
    expect(screen.getByText('Brownie')).toBeInTheDocument();
  });

  // 3. calcula y muestra el total correctamente
  it('calcula y muestra el total correctamente', () => {
    renderCarrito(mockCartMultipleItems); // (500 * 2) + (350 * 3) = 1000 + 1050 = 2050

    // Asegurarse de que el cálculo del total sea correcto
    const expectedTotal = '$2,050'; // toLocaleString()
    expect(screen.getByText(`Total: ${expectedTotal}`)).toBeInTheDocument();

    // Comprobar totales por ítem
    expect(screen.getByText('$500')).toBeInTheDocument(); // precio unitario de Vainilla
    expect(screen.getByText('$350')).toBeInTheDocument(); // precio unitario de Brownie
  });

  // 4. permite eliminar un producto al presionar el ícono de "Eliminar" o "Tacho de Basura"
  it('permite eliminar un producto al presionar el ícono', () => {
    // Renderizamos con un solo ítem, al eliminarlo, el carro debe quedar vacío
    renderCarrito(mockCartOneItem);

    // Encuentra el botón de eliminar (que tiene el texto "🗑️" o es el primer botón dentro de item-cantidad)
    const eliminarButton = screen.getByRole('button', { name: '🗑️' });
    fireEvent.click(eliminarButton);

    // Se espera que setCart haya sido llamado para filtrar el ítem con id: 1
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith(
      mockCartOneItem.filter((item) => item.id !== 1)
    );
  });

  // 5. abre y cierra el modal de edición
  it('abre y cierra el modal de edición', async () => {
    renderCarrito(mockCartOneItem);

    // Abrir modal
    const editButton = screen.getByRole('button', { name: /Editar/i });
    fireEvent.click(editButton);

    // El modal debe estar visible
    await waitFor(() => {
      expect(screen.getByRole('dialog', { name: /modal/i })).toBeInTheDocument();
      expect(screen.getByText('Helado de Vainilla')).toBeInTheDocument();
    });
    
    // Cerrar modal al hacer clic en el botón '×'
    const closeButton = screen.getByRole('button', { name: '×' });
    fireEvent.click(closeButton);

    // El modal debe desaparecer
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /modal/i })).not.toBeInTheDocument();
    });
  });

  // 6. guarda los cambios del modal
  it('guarda los cambios del modal', async () => {
    renderCarrito(mockCartOneItem);

    // 1. Abrir modal
    fireEvent.click(screen.getByRole('button', { name: /Editar/i }));

    // 2. Modificar cantidad y nota
    await waitFor(() => {
        expect(screen.getByText('Helado de Vainilla')).toBeInTheDocument();
    });
    
    // Campo de nota
    const notaTextArea = screen.getByPlaceholderText('Incluye una nota');
    fireEvent.change(notaTextArea, { target: { value: 'con extra chocolate' } });

    // Botón para aumentar cantidad
    const increaseQuantityButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(increaseQuantityButton); // Cantidad ahora debe ser 2

    // 3. Guardar cambios
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));

    // 4. Verificar que setCart fue llamado con los cambios
    await waitFor(() => {
        expect(mockSetCart).toHaveBeenCalledTimes(1);
    });
    
    // Simular el prevState para la función de actualización de estado de React
    const updaterFunction = mockSetCart.mock.calls[0][0]; 
    const newState = updaterFunction(mockCartOneItem);

    expect(newState).toEqual([
      { id: 1, name: 'Helado de Vainilla', price: 500, cantidad: 2, image: 'vanilla.jpg', nota: 'con extra chocolate' }
    ]);
    
    // El modal debe cerrarse
    expect(screen.queryByRole('dialog', { name: /modal/i })).not.toBeInTheDocument();
  });

  // 7. vacía el carrito al presionar 'Vaciar Carrito'
  it('vacía el carrito al presionar "Vaciar Carrito"', () => {
    renderCarrito(mockCartMultipleItems);

    const vaciarButton = screen.getByRole('button', { name: /Vaciar Carrito/i });
    fireEvent.click(vaciarButton);

    // 1. Verificar que setCart fue llamado con un array vacío
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith([]);

    // 2. Verificar que se llamó a onClose para cerrar el carrito
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // 8. muestra mensaje de compra realizada al finalizar pedido
  it('muestra mensaje de compra realizada al finalizar pedido', async () => {
    renderCarrito(mockCartOneItem);

    const finalizarButton = screen.getByRole('button', { name: /Finalizar pedido/i });
    fireEvent.click(finalizarButton);

    // 1. El mensaje de éxito debe aparecer
    expect(screen.getByText('¡Compra realizada con éxito! 🎉')).toBeInTheDocument();
    
    // 2. Verificar que setCart fue llamado para vaciar el carrito
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith([]);
    
    // 3. Los ítems del carrito ya no se muestran (porque el carrito se vació y el mensaje está visible)
    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    // 4. Avanzar el tiempo para simular el setTimeout
    vi.advanceTimersByTime(2500);

    // 5. Después del timeout, el mensaje debe desaparecer y onClose debe ser llamado
    await waitFor(() => {
        expect(screen.queryByText('¡Compra realizada con éxito! 🎉')).not.toBeInTheDocument();
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  // Prueba extra: El botón de '-' en un item cambia a '🗑️' cuando la cantidad es 1 y lo elimina
  it('elimina el producto si se decrementa la cantidad a 0 desde el listado', () => {
    const mockCartItem = [{ id: 1, name: 'Item', price: 10, cantidad: 1, image: 'img.jpg' }];
    renderCarrito(mockCartItem);

    // Encuentra el botón para decrementar/eliminar. Está marcado como "🗑️"
    const decrementOrDeleteButton = screen.getByRole('button', { name: '🗑️' });
    
    fireEvent.click(decrementOrDeleteButton);

    // Verifica que se llamó a cambiarCantidad con -1, lo que resulta en la eliminación
    // Nota: El componente implementa la lógica de eliminar si la cantidad es 1 al hacer clic en este botón
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith([]);
  });
});