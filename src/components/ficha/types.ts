export type Exercise = {
  id: string;
  name: string;
  sets: string;
  reps: string;
  rest: string;
  notes: string;
};

export type Block = {
  id: string;
  title: string;
  exercises: Exercise[];
};

export type StudentInfo = {
  name: string;
  goal: string;
  startDate: string;
  cycle: string;
};

export const uid = () => Math.random().toString(36).slice(2, 10);

export const emptyExercise = (): Exercise => ({
  id: uid(),
  name: "",
  sets: "3",
  reps: "12",
  rest: "60s",
  notes: "",
});