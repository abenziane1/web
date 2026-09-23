/**
 * Autores y revisores. NO inventar personas ni credenciales: sustituir los
 * placeholders por datos reales y verificables antes de publicar.
 */
export interface Person {
  id: string;
  name: string;
  role: string;
  credentials: string | null;
  bio: string;
  url: string | null;
  placeholder: boolean;
}

export const people: Person[] = [
  {
    id: "redaccion",
    name: "Equipo editorial",
    role: "Redacción",
    credentials: null,
    bio: "[PENDIENTE: descripción del equipo de redacción]",
    url: "/sobre-nosotros/",
    placeholder: true,
  },
  {
    id: "revisor-pendiente",
    name: "[PENDIENTE: revisor profesional]",
    role: "Revisión técnica",
    credentials: "[PENDIENTE: titulación / colegiación verificable]",
    bio: "[PENDIENTE]",
    url: null,
    placeholder: true,
  },
];

export const personMap = Object.fromEntries(people.map((p) => [p.id, p])) as Record<string, Person>;
