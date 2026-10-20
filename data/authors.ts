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
    name: "Amin Benziane",
    role: "Autor y editor",
    credentials: null,
    bio: "Agente digitalizador del programa Kit Digital desde Berga (Barcelona). Trabaja a diario con autónomos y pequeñas empresas en su digitalización y escribe estas guías a partir de la normativa y de las fuentes oficiales de la Agencia Tributaria, la Seguridad Social y el BOE.",
    url: "/sobre-nosotros/",
    placeholder: false,
  },
];

export const personMap = Object.fromEntries(people.map((p) => [p.id, p])) as Record<string, Person>;
