"use client";

import { Profile } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface BusinessHoursProps {
  profile: Profile;
}

export function BusinessHours({ profile }: BusinessHoursProps) {
  const [isOpen, setIsOpen] = useState(false);

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

  const getCurrentStatus = () => {
    const now = new Date();
    const currentDay = now
      .toLocaleDateString("pt-BR", { weekday: "long" })
      .toLowerCase();
    const currentTime = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const todaySchedule = schedule.find(
      (item) => item.day.toLowerCase() === currentDay
    );

    if (
      !todaySchedule ||
      !todaySchedule.isOpen ||
      !todaySchedule.open ||
      !todaySchedule.close
    ) {
      return {
        isOpen: false,
        status: "Fechado",
        class: "bg-red-500/10 text-red-500 border-red-500/20",
      };
    }

    const openTime = todaySchedule.open.slice(0, 5);
    const closeTime = todaySchedule.close.slice(0, 5);

    if (currentTime >= openTime && currentTime <= closeTime) {
      return {
        isOpen: true,
        status: "Aberto",
        class: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      };
    }

    return {
      isOpen: false,
      status: "Fechado",
      class: "bg-red-500/10 text-red-500 border-red-500/20",
    };
  };

  const status = getCurrentStatus();

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-6 hover:bg-transparent"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-bold text-xl">
                Horário de Funcionamento
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className={status.class}>
                {status.status}
              </Badge>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
              />
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dia</TableHead>
                  <TableHead className="text-right">Horário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((item) => {
                  const isCurrent =
                    new Date()
                      .toLocaleDateString("pt-BR", { weekday: "long" })
                      .toLowerCase() === item.day.toLowerCase();

                  return (
                    <TableRow
                      key={item.day}
                      className={`
                        ${isCurrent ? "bg-primary/5 font-medium" : ""}
                        ${!item.isOpen ? "text-muted-foreground" : ""}
                      `}
                    >
                      <TableCell className="font-medium">
                        {item.day}
                        {isCurrent && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Hoje
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.isOpen && item.open && item.close ? (
                          <span>
                            {formatTime(item.open)} - {formatTime(item.close)}
                          </span>
                        ) : (
                          <span>Fechado</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
