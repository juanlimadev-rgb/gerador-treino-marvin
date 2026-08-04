import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, Plus, Trash2, Upload, Dumbbell, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetPreview } from "@/components/ficha/SheetPreview";
import { emptyExercise, uid, type Block, type StudentInfo } from "@/components/ficha/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gerador de Ficha de Treino — Marvin Leonardo Personal Trainer" },
      {
        name: "description",
        content:
          "Crie fichas de treino personalizadas em A4 e exporte em PDF com a identidade Marvin Leonardo Personal Trainer.",
      },
      {
        property: "og:title",
        content: "Gerador de Ficha de Treino — Marvin Leonardo Personal Trainer",
      },
      {
        property: "og:description",
        content: "Monte blocos de treino dinâmicos e baixe a ficha em PDF pronta para impressão.",
      },
    ],
  }),
  component: Index,
});

const initialBlocks: Block[] = [
  {
    id: uid(),
    title: "TREINO A — PEITORAL E TRÍCEPS",
    exercises: [
      {
        id: uid(),
        name: "Supino reto com barra",
        sets: "4",
        reps: "10",
        rest: "90s",
        notes: "Cadência controlada na descida",
      },
      {
        id: uid(),
        name: "Crucifixo inclinado",
        sets: "3",
        reps: "12",
        rest: "60s",
        notes: "Amplitude total",
      },
      {
        id: uid(),
        name: "Tríceps corda",
        sets: "4",
        reps: "15",
        rest: "45s",
        notes: "Cotovelos fixos",
      },
    ],
  },
];

function Index() {
  const [info, setInfo] = useState<StudentInfo>({
    name: "",
    goal: "Hipertrofia & Definição",
    startDate: "",
    cycle: "4 semanas",
  });
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Referência para o container da folha A4 (para o react-to-print)
  const printRef = useRef<HTMLDivElement>(null);

  // Hook de impressão nativo do react-to-print
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `ficha-treino-${info.name.trim().toLowerCase().replace(/\s+/g, "-") || "aluno"}`,
  });

  const setField = (key: keyof StudentInfo, value: string) =>
    setInfo((prev) => ({ ...prev, [key]: value }));

  const updateBlock = (id: string, patch: Partial<Block>) =>
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  const updateExercise = (blockId: string, exId: string, patch: Record<string, string>) =>
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              exercises: b.exercises.map((e) => (e.id === exId ? { ...e, ...patch } : e)),
            }
          : b,
      ),
    );

  const addBlock = () =>
    setBlocks((prev) => [
      ...prev,
      {
        id: uid(),
        title: `TREINO ${String.fromCharCode(65 + prev.length)} — `,
        exercises: [emptyExercise()],
      },
    ]);

  const handleLogo = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoUrl(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/80 bg-card/40 backdrop-blur">
        <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold tracking-tight sm:text-lg">
                Gerador de Ficha de Treino
              </h1>
              <p className="truncate text-xs text-muted-foreground">
                Marvin Leonardo — Personal Trainer
              </p>
            </div>
          </div>
          <Button onClick={() => handlePrint()} className="shrink-0 gap-2">
            <Download className="h-4 w-4" />
            Baixar PDF
          </Button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 p-5 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
        {/* Painel de Formulários (Esquerda) */}
        <div className="space-y-5">
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Dados do Aluno
            </h2>
            <div className="mt-4 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome do aluno</Label>
                <Input
                  id="nome"
                  value={info.name}
                  placeholder="Ex: João Silva"
                  onChange={(e) => setField("name", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="objetivo">Objetivo</Label>
                <Input
                  id="objetivo"
                  value={info.goal}
                  onChange={(e) => setField("goal", e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="inicio">Data de início</Label>
                  <Input
                    id="inicio"
                    type="date"
                    value={info.startDate}
                    onChange={(e) => setField("startDate", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ciclo">Validade / ciclo</Label>
                  <Input
                    id="ciclo"
                    value={info.cycle}
                    onChange={(e) => setField("cycle", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Logo do personal</Label>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="gap-2"
                    onClick={() => fileRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" /> Enviar logo
                  </Button>
                  {logoUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="gap-2"
                      onClick={() => setLogoUrl(null)}
                    >
                      <RotateCcw className="h-4 w-4" /> Usar padrão
                    </Button>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleLogo(e.target.files?.[0])}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h2 className="truncate text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Treinos
              </h2>
              <Button size="sm" onClick={addBlock} className="shrink-0 gap-1.5">
                <Plus className="h-4 w-4" /> Bloco
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              {blocks.map((block) => (
                <div key={block.id} className="rounded-xl border border-border bg-secondary/40 p-4">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                    <Input
                      value={block.title}
                      placeholder="TREINO A — PEITORAL"
                      onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                      className="font-semibold uppercase"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="shrink-0 text-destructive hover:text-destructive"
                      onClick={() => setBlocks((prev) => prev.filter((b) => b.id !== block.id))}
                      aria-label="Excluir bloco"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-3 space-y-3">
                    {block.exercises.map((ex) => (
                      <div key={ex.id} className="rounded-lg border border-border bg-card p-3">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                          <Input
                            value={ex.name}
                            placeholder="Nome do exercício"
                            onChange={(e) =>
                              updateExercise(block.id, ex.id, { name: e.target.value })
                            }
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="shrink-0 text-muted-foreground"
                            aria-label="Remover exercício"
                            onClick={() =>
                              updateBlock(block.id, {
                                exercises: block.exercises.filter((e) => e.id !== ex.id),
                              })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          <Input
                            value={ex.sets}
                            placeholder="Séries"
                            onChange={(e) =>
                              updateExercise(block.id, ex.id, { sets: e.target.value })
                            }
                          />
                          <Input
                            value={ex.reps}
                            placeholder="Reps"
                            onChange={(e) =>
                              updateExercise(block.id, ex.id, { reps: e.target.value })
                            }
                          />
                          <Input
                            value={ex.rest}
                            placeholder="Descanso"
                            onChange={(e) =>
                              updateExercise(block.id, ex.id, { rest: e.target.value })
                            }
                          />
                        </div>
                        <Input
                          className="mt-2"
                          value={ex.notes}
                          placeholder="Observações"
                          onChange={(e) =>
                            updateExercise(block.id, ex.id, { notes: e.target.value })
                          }
                        />
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full gap-1.5"
                      onClick={() =>
                        updateBlock(block.id, { exercises: [...block.exercises, emptyExercise()] })
                      }
                    >
                      <Plus className="h-4 w-4" /> Adicionar exercício
                    </Button>
                  </div>
                </div>
              ))}
              {blocks.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Nenhum bloco de treino. Adicione o primeiro.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Preview A4 (Direita) */}
        <div className="min-w-0">
          <div className="sticky top-5 overflow-auto rounded-2xl border border-border bg-secondary/30 p-4">
            <div className="mx-auto w-fit origin-top scale-[0.55] sm:scale-75 lg:scale-[0.9] xl:scale-100">
              {/* O container com a ref envolvida garante captura completa na hora de baixar o PDF */}
              <div ref={printRef} className="shadow-2xl">
                <SheetPreview info={info} blocks={blocks} logoUrl={logoUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}