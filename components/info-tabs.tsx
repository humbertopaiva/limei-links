"use client";

import { Profile } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown, CreditCard, MapPin } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface CompanyInfoProps {
  profile: Profile;
}

export function CompanyInfo({ profile }: CompanyInfoProps) {
  const [isHoursOpen, setIsHoursOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

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

  const formatTime = (time: string | null) => (time ? time.slice(0, 5) : "");

  const getTodayStatus = () => {
    const today = new Date()
      .toLocaleDateString("pt-BR", {
        weekday: "long",
        timeZone: "America/Sao_Paulo",
      })
      .toLowerCase();
    const todaySchedule = schedule.find(
      (item) => item.day.toLowerCase() === today
    );

    if (!todaySchedule?.isOpen) return false;

    const now = new Date();
    const [openHour, openMinute] = (todaySchedule.open || "")
      .split(":")
      .map(Number);
    const [closeHour, closeMinute] = (todaySchedule.close || "")
      .split(":")
      .map(Number);

    if (!openHour || !closeHour) return false;

    const currentTime = now.getHours() * 60 + now.getMinutes();
    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;

    return currentTime >= openTime && currentTime <= closeTime;
  };

  const isOpen = getTodayStatus();

  const openMaps = () => {
    const encodedAddress = encodeURIComponent(profile.endereco);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
  };

  const iconStyle = { color: profile.cor_primaria };

  return (
    <Card className="divide-y divide-border">
      <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-8">
        <CardTitle className="text-lg sm:text-xl font-bold flex items-center">
          Informações
        </CardTitle>
      </CardHeader>
      <Collapsible open={isLocationOpen} onOpenChange={setIsLocationOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between px-4 sm:px-8 py-4 sm:py-8 hover:bg-transparent group"
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" style={iconStyle} />
              <span className="text-sm sm:text-base lg:text-xl font-medium">
                Localização
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:text-foreground ${
                isLocationOpen ? "rotate-180" : ""
              }`}
              style={iconStyle}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-2 px-4 sm:px-8 py-8 sm:py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                {profile.endereco}
              </p>
              <Button
                variant="outline"
                onClick={openMaps}
                className="w-full sm:w-auto shrink-0"
                style={{
                  borderColor: profile.cor_primaria,
                  color: profile.cor_primaria,
                }}
              >
                Abrir no Maps
                <MapPin className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={isHoursOpen} onOpenChange={setIsHoursOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between px-4 sm:px-8 py-8 sm:py-8 hover:bg-transparent group"
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" style={iconStyle} />
              <span className="text-sm sm:text-base lg:text-xl font-medium whitespace-normal sm:text-left">
                Horários de Funcionamento
              </span>
              <Badge
                variant={isOpen ? "default" : "secondary"}
                style={{
                  backgroundColor: isOpen ? profile.cor_primaria : undefined,
                  borderColor: profile.cor_primaria,
                  color: isOpen ? "white" : profile.cor_primaria,
                }}
                className="ml-1 sm:ml-2 text-[10px] sm:text-xs lg:text-sm px-1.5 sm:px-2 lg:px-3 py-0.5"
              >
                {isOpen ? "Aberto" : "Fechado"}
              </Badge>
            </div>
            <ChevronDown
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:text-foreground ${
                isHoursOpen ? "rotate-180" : ""
              }`}
              style={iconStyle}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-2 px-4 sm:px-8 pb-6">
            <div className="space-y-3 sm:space-y-4">
              {schedule.map((item) => {
                const isToday =
                  new Date()
                    .toLocaleDateString("pt-BR", { weekday: "long" })
                    .toLowerCase() === item.day.toLowerCase();
                return (
                  <div
                    key={item.day}
                    className="flex justify-between items-center py-1 sm:py-2 text-sm sm:text-base"
                  >
                    <span className="flex items-center gap-2">
                      {item.day}
                      {isToday && (
                        <Badge
                          variant="outline"
                          style={{
                            borderColor: profile.cor_primaria,
                            color: profile.cor_primaria,
                          }}
                          className="text-xs"
                        >
                          Hoje
                        </Badge>
                      )}
                    </span>
                    <span
                      className="font-medium"
                      style={
                        isToday ? { color: profile.cor_primaria } : undefined
                      }
                    >
                      {item.isOpen && item.open && item.close
                        ? `${formatTime(item.open)} - ${formatTime(item.close)}`
                        : "Fechado"}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between px-4 sm:px-8 py-8 sm:py-8 hover:bg-transparent group"
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" style={iconStyle} />
              <span className="text-sm sm:text-base lg:text-xl font-medium">
                Formas de Pagamento
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:text-foreground ${
                isPaymentOpen ? "rotate-180" : ""
              }`}
              style={iconStyle}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-2 px-4 sm:px-8 pb-6">
            <div className="flex flex-wrap gap-2">
              {profile.opcoes_pagamento.map((option) => (
                <Badge
                  key={option}
                  variant="outline"
                  style={{
                    borderColor: profile.cor_primaria,
                    color: profile.cor_primaria,
                  }}
                  className="text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4 py-0.5 sm:py-1 lg:py-1.5 capitalize"
                >
                  {option}
                </Badge>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
