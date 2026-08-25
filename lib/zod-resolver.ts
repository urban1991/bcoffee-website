import type { FieldValues, Resolver } from "react-hook-form";
import type { z } from "zod";

/**
 * Most między zodem a React Hook Form.
 *
 * Zamiast `@hookform/resolvers`: ten pakiet ciągnie opcjonalny łańcuch
 * `@typeschema/*`, który wymaga zoda 3, a Sanity 6 przypina w tym projekcie
 * zoda 4 — instalacja kończy się konfliktem peer dependencies. Całe potrzebne
 * zachowanie to przepisanie `issues` na mapę błędów RHF, więc tańiej jest
 * utrzymać te kilkanaście linii niż wymuszać `--legacy-peer-deps` na całym drzewie.
 */
export function zodResolver<TOut extends FieldValues, TIn extends FieldValues>(
  schema: z.ZodType<TOut, TIn>,
): Resolver<TIn, unknown, TOut> {
  return async (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (!path) continue;
      // Pierwszy błąd na pole wystarczy — użytkownik i tak poprawia po kolei.
      if (!errors[path]) errors[path] = { type: issue.code, message: issue.message };
    }

    return { values: {}, errors: errors as never };
  };
}
