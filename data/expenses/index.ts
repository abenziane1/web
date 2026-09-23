/**
 * Base de datos de gastos. Un archivo JSON por categoría: para añadir gastos
 * solo hay que editar el JSON correspondiente (o crear uno nuevo y añadirlo aquí).
 */
import type { Expense } from "./types";
import vehiculo from "./vehiculo.json";
import telefonoInternet from "./telefono-internet.json";
import equipos from "./equipos.json";
import software from "./software.json";
import local from "./local.json";
import suministros from "./suministros.json";
import dietasViajes from "./dietas-viajes.json";
import formacion from "./formacion.json";
import seguros from "./seguros.json";
import serviciosProfesionales from "./servicios-profesionales.json";
import marketing from "./marketing.json";
import otros from "./otros.json";

export const expenses: Expense[] = [
  ...vehiculo,
  ...telefonoInternet,
  ...equipos,
  ...software,
  ...local,
  ...suministros,
  ...dietasViajes,
  ...formacion,
  ...seguros,
  ...serviciosProfesionales,
  ...marketing,
  ...otros,
] as Expense[];

export const expenseMap = Object.fromEntries(expenses.map((e) => [e.slug, e])) as Record<string, Expense>;

/** Solo las fichas con contenido propio generan página */
export const expensesWithPage = expenses.filter((e) => e.body && e.body.trim().length > 200);

export type { Expense } from "./types";
export { expenseCategories } from "./categories";
