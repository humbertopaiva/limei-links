import { Card } from "@/components/ui/card";
import { ExternalLink, MapPin, Store } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <div className="">
      <div className="text-center">
        {/* Divisor */}
        <div className="w-full h-px bg-border  my-4" />

        <div className="flex flex-col justify-center items-center gap-4">
          <Image src="/limei-1.png" alt="logo limei" width={80} height={60} />

          {/* Copyright */}
          <p className="text-xs text-orange-600">
            © {new Date().getFullYear()} Limei. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
