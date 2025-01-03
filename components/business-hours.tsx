import { Profile } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BusinessHoursProps {
  profile: Profile;
}

export function BusinessHours({ profile }: BusinessHoursProps) {
  const schedule = [
    {
      day: "Segunda",
      open: profile.abertura_segunda,
      close: profile.fechamento_segunda,
      isOpen: profile.dias_funcionamento.includes("segunda"),
    },
    {
      day: "Terça",
      open: profile.abertura_terca,
      close: profile.fechamento_terca,
      isOpen: profile.dias_funcionamento.includes("terca"),
    },
    {
      day: "Quarta",
      open: profile.abertura_quarta,
      close: profile.fechamento_quarta,
      isOpen: profile.dias_funcionamento.includes("quarta"),
    },
    {
      day: "Quinta",
      open: profile.abertura_quinta,
      close: profile.fechamento_quinta,
      isOpen: profile.dias_funcionamento.includes("quinta"),
    },
    {
      day: "Sexta",
      open: profile.abertura_sexta,
      close: profile.fechamento_sexta,
      isOpen: profile.dias_funcionamento.includes("sexta"),
    },
    {
      day: "Sábado",
      open: profile.abertura_sabado,
      close: profile.fechamento_sabado,
      isOpen: profile.dias_funcionamento.includes("sabado"),
    },
    {
      day: "Domingo",
      open: profile.abertura_domingo,
      close: profile.fechamento_domingo,
      isOpen: profile.dias_funcionamento.includes("domingo"),
    },
  ];

  const formatTime = (time: string | null) => {
    if (!time) return "";
    return time.slice(0, 5);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Dia</TableHead>
          <TableHead>Horário</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedule.map((item) => (
          <TableRow key={item.day}>
            <TableCell>{item.day}</TableCell>
            <TableCell>
              {item.isOpen && item.open && item.close
                ? `${formatTime(item.open)} - ${formatTime(item.close)}`
                : "Fechado"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
