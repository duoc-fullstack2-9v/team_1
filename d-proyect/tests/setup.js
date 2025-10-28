import "@testing-library/jest-dom"
import { vi } from "vitest"

// Mock global para funciones del navegador que pueden causar errores
globalThis.alert = vi.fn()
globalThis.scrollTo = vi.fn()

// Mock para imágenes y archivos estáticos (evita errores de importaciones de imágenes)
vi.mock("/\\.(jpg|jpeg|png|gif|svg)$/", () => ({
  default: "",
}))
