import type { ExpenseCategory } from "./types";

export const expenseCategories: { id: ExpenseCategory; label: string }[] = [
  { id: "vehiculo", label: "Vehículo" },
  { id: "telefono-internet", label: "Teléfono e internet" },
  { id: "equipos", label: "Ordenador y equipos" },
  { id: "software", label: "Software" },
  { id: "local", label: "Alquiler y local" },
  { id: "suministros", label: "Suministros" },
  { id: "dietas-viajes", label: "Dietas y viajes" },
  { id: "formacion", label: "Formación" },
  { id: "seguros", label: "Seguros" },
  { id: "servicios-profesionales", label: "Gestoría y profesionales" },
  { id: "marketing", label: "Publicidad y marketing" },
  { id: "otros", label: "Otros" },
];
