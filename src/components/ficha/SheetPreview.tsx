import type { Block, StudentInfo } from "./types";
import defaultLogo from "@/assets/marvin-logo.png";

type Props = {
  info: StudentInfo;
  blocks: Block[];
  logoUrl: string | null;
};

function formatDate(value: string) {
  if (!value) return "—";
  const [y, m, d] = value.split("-");
  if (!y || !m || !d) return value;
  return `${d}/${m}/${y}`;
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-[#f4f4f5] px-4 py-3">
      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#71717a]">{label}</p>
      <p className="mt-1 text-[13px] font-semibold text-[#18181b]">{value || "—"}</p>
    </div>
  );
}

export function SheetPreview({ info, blocks, logoUrl }: Props) {
  return (
    <div
      id="ficha-a4"
      className="sheet-a4 flex flex-col px-[54px] py-[48px]"
      style={{ fontFamily: '"DM Sans", sans-serif' }}
    >
      <header className="flex items-start justify-between gap-6">

        {/* Container expansível com tamanho de destaque para a Logo */}
          <div className="flex items-center justify-start py-1">
            <img
              src={logoUrl || defaultLogo}
              alt="Logo Personal Trainer"
              className="h-28 max-h-32 w-auto max-w-[340px] object-contain"
              crossOrigin="anonymous"
            />
          </div>
        <div className="pt-1 text-right text-[11px] leading-relaxed text-[#3f3f46]">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7c3aed]">
            Contato
          </p>
          <p className="mt-1 font-semibold">WhatsApp: (79) 99808-3397</p>
          <p>Aracaju — SE</p>
        </div>
      </header>

      <div className="mt-5 h-[3px] w-full rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#e4e4e7]" />

      <h1
        className="mt-6 text-[20px] font-bold uppercase tracking-[0.2em] text-[#18181b]"
        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
      >
        Ficha de Treino
      </h1>

      <section className="mt-4 grid grid-cols-2 gap-3">
        <InfoBox label="Aluno" value={info.name} />
        <InfoBox label="Objetivo" value={info.goal} />
        <InfoBox label="Data de início" value={formatDate(info.startDate)} />
        <InfoBox label="Ciclo / Validade" value={info.cycle} />
      </section>

      <div className="mt-7 flex-1 space-y-5">
        {blocks.map((block) => (
          <article
            key={block.id}
            className="overflow-hidden rounded-lg border border-[#e4e4e7]"
            style={{ breakInside: "avoid" }}
          >
            <div className="bg-[#18181b] px-4 py-2.5">
              <h2
                className="text-[12px] font-bold uppercase tracking-[0.16em] text-white"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                {block.title || "Treino"}
              </h2>
            </div>
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#fafafa] text-[9px] uppercase tracking-[0.1em] text-[#71717a]">
                  <th className="w-[32%] px-4 py-2 text-left font-bold">Exercício</th>
                  <th className="w-[10%] px-2 py-2 text-center font-bold">Séries</th>
                  <th className="w-[12%] px-2 py-2 text-center font-bold">Repetições</th>
                  <th className="w-[12%] px-2 py-2 text-center font-bold">Descanso</th>
                  <th className="px-4 py-2 text-left font-bold">Observações</th>
                </tr>
              </thead>
              <tbody>
                {block.exercises.map((ex, i) => (
                  <tr
                    key={ex.id}
                    className={i % 2 === 1 ? "bg-[#fafafa]" : "bg-white"}
                    style={{ borderTop: "1px solid #f0f0f1" }}
                  >
                    <td className="px-4 py-2 font-semibold text-[#18181b]">{ex.name || "—"}</td>
                    <td className="px-2 py-2 text-center text-[#3f3f46]">{ex.sets || "—"}</td>
                    <td className="px-2 py-2 text-center text-[#3f3f46]">{ex.reps || "—"}</td>
                    <td className="px-2 py-2 text-center text-[#3f3f46]">{ex.rest || "—"}</td>
                    <td className="px-4 py-2 text-[#71717a]">{ex.notes || "—"}</td>
                  </tr>
                ))}
                {block.exercises.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-4 text-center text-[#a1a1aa]">
                      Nenhum exercício adicionado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </article>
        ))}
      </div>

      <footer className="mt-8 border-t border-[#e4e4e7] pt-3 text-center text-[10px] text-[#71717a]">
        Ficha de Treino Individualizada — Marvin Leonardo Personal Trainer • Mantenha a constância!
      </footer>
    </div>
  );
}