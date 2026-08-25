"use client";

import * as React from "react";
import { useId, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../core/Button";
import { Field } from "../forms/Field";
import { Input } from "../forms/Input";
import { Select } from "../forms/Select";
import { Textarea } from "../forms/Textarea";
import { zodResolver } from "@/lib/zod-resolver";
import { inquirySchema, type InquiryInput, type InquiryValues } from "@/lib/inquiry-schema";
import { sendInquiry } from "@/app/actions/send-inquiry";

interface Props {
  eventTypes: string[];
  submitLabel: string;
  onSent: () => void;
}

/** Obramowanie pola z błędem — reszta stylu zostaje z design systemu. */
const errorStyle: React.CSSProperties = { borderColor: "var(--line-error)" };

export function InquiryForm({ eventTypes, submitLabel, onSent }: Props) {
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const uid = useId();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InquiryInput, unknown, InquiryValues>({
    resolver: zodResolver(inquirySchema),
    // Walidujemy dopiero po pierwszej próbie wysyłki — czerwone pola przy pierwszym
    // przejściu przez formularz zniechęcają, zanim ktokolwiek zdąży się pomylić.
    mode: "onTouched",
    defaultValues: { typ: eventTypes[0] ?? "" },
  });

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    startTransition(async () => {
      const result = await sendInquiry(values);

      if (result.ok) {
        onSent();
        return;
      }

      // Serwer waliduje tą samą schemą, ale mógł odrzucić coś, czego klient nie
      // wychwycił — wtedy przypinamy błąd do konkretnego pola.
      if (result.fieldErrors) {
        for (const [name, message] of Object.entries(result.fieldErrors)) {
          setError(name as keyof InquiryInput, { type: "server", message });
        }
      }
      setFormError(result.message ?? "Nie udało się wysłać. Spróbuj ponownie albo zadzwoń.");
    });
  });

  /** Spina kontrolkę z komunikatem: obramowanie, aria-invalid i aria-describedby. */
  const field = (name: keyof InquiryInput) => {
    const error = errors[name]?.message as string | undefined;
    return {
      error,
      errorId: `${uid}-${name}-error`,
      control: {
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? `${uid}-${name}-error` : undefined,
        style: error ? errorStyle : undefined,
      },
    };
  };

  const f = {
    data: field("data"),
    typ: field("typ"),
    goscie: field("goscie"),
    miasto: field("miasto"),
    godziny: field("godziny"),
    budzet: field("budzet"),
    imie: field("imie"),
    telefon: field("telefon"),
    email: field("email"),
    wiadomosc: field("wiadomosc"),
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="bc-grid"
      style={{ marginTop: 26, "--cols": "1fr 1fr", gap: "var(--field-gap)" } as React.CSSProperties}
    >
      {/* Pułapka na boty — niewidoczna dla ludzi, obecna w DOM dla skryptów. */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} {...register("firma")} />

      <Field label="Data wydarzenia" htmlFor="f-date" error={f.data.error} errorId={f.data.errorId}>
        <Input id="f-date" type="date" {...f.data.control} {...register("data")} />
      </Field>

      <Field label="Typ wydarzenia" htmlFor="f-type" error={f.typ.error} errorId={f.typ.errorId}>
        <Select id="f-type" {...f.typ.control} {...register("typ")}>
          {eventTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </Field>

      <Field label="Liczba gości" htmlFor="f-guests" error={f.goscie.error} errorId={f.goscie.errorId}>
        <Input id="f-guests" type="number" min={1} placeholder="np. 120" {...f.goscie.control} {...register("goscie")} />
      </Field>

      <Field label="Miejsce / miasto" htmlFor="f-city" error={f.miasto.error} errorId={f.miasto.errorId}>
        <Input id="f-city" placeholder="np. Wrocław" {...f.miasto.control} {...register("miasto")} />
      </Field>

      <Field label="Godziny obsługi" htmlFor="f-hours" error={f.godziny.error} errorId={f.godziny.errorId}>
        <Input id="f-hours" placeholder="np. 16:00 – 22:00" {...f.godziny.control} {...register("godziny")} />
      </Field>

      <Field label="Budżet" htmlFor="f-budget" error={f.budzet.error} errorId={f.budzet.errorId}>
        <Input id="f-budget" placeholder="orientacyjnie" {...f.budzet.control} {...register("budzet")} />
      </Field>

      <Field label="Imię" htmlFor="f-name" error={f.imie.error} errorId={f.imie.errorId}>
        <Input id="f-name" autoComplete="given-name" {...f.imie.control} {...register("imie")} />
      </Field>

      <Field label="Telefon" htmlFor="f-phone" error={f.telefon.error} errorId={f.telefon.errorId}>
        <Input id="f-phone" type="tel" autoComplete="tel" placeholder="opcjonalnie" {...f.telefon.control} {...register("telefon")} />
      </Field>

      <Field label="E-mail" htmlFor="f-mail" span="full" error={f.email.error} errorId={f.email.errorId}>
        <Input id="f-mail" type="email" autoComplete="email" {...f.email.control} {...register("email")} />
      </Field>

      <Field label="Wiadomość" htmlFor="f-msg" span="full" error={f.wiadomosc.error} errorId={f.wiadomosc.errorId}>
        <Textarea
          id="f-msg"
          rows={4}
          placeholder="Cokolwiek, co pomoże nam przygotować wycenę"
          {...f.wiadomosc.control}
          {...register("wiadomosc")}
        />
      </Field>

      <div style={{ gridColumn: "1 / -1" }}>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Wysyłam…" : submitLabel}
        </Button>
        {formError ? (
          <p role="alert" style={{ fontSize: 14, color: "var(--text-error)", margin: "12px 0 0", fontWeight: 600 }}>
            {formError}
          </p>
        ) : null}
      </div>
    </form>
  );
}
