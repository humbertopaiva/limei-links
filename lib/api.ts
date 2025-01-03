import { z } from "zod";
import { API_BASE_URL } from "./constants";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
};

// Product related schemas
const ProductSchema = z.object({
  id: z.number(),
  produto: z.object({
    nome: z.string(),
    descricao: z.string(),
    preco: z.string(),
    preco_promocional: z.string().nullable().optional(),
    estoque: z.number().optional().nullable(),
    video: z.string().nullable().optional(),
    categoria: z.number().nullable().optional(),
    empresa: z.union([z.string(), z.number()]).optional(),
    promocao: z.boolean().nullable().optional(),
    imagem: z.string().nullable().optional(),
  }),
});

// Link Schema
const LinkSchema = z.object({
  id: z.string(),
  status: z.string().optional(),
  texto: z.string(),
  url: z.string(),
  tipo_link: z.string(),
  ordem: z.number(),
});

// Company Profile Schema
const ProfileSchema = z.object({
  id: z.string(),
  status: z.string(),
  nome: z.string(),
  categoria: z.union([z.string(), z.number()]).optional(),
  usuario: z.union([z.string(), z.number()]).optional(),
  plano: z.union([z.string(), z.number()]).optional(),
  tem_delivery: z.boolean().optional(),
  endereco: z.string(),
  telefone: z.string(),
  whatsapp: z.string(),
  email: z.string(),
  cor_primaria: z.string(),
  cor_secundaria: z.string(),
  // Business hours
  abertura_segunda: z.string().nullable(),
  fechamento_segunda: z.string().nullable(),
  abertura_terca: z.string().nullable(),
  fechamento_terca: z.string().nullable(),
  abertura_quarta: z.string().nullable(),
  fechamento_quarta: z.string().nullable(),
  abertura_quinta: z.string().nullable(),
  fechamento_quinta: z.string().nullable(),
  abertura_sexta: z.string().nullable(),
  fechamento_sexta: z.string().nullable(),
  abertura_sabado: z.string().nullable(),
  fechamento_sabado: z.string().nullable(),
  abertura_domingo: z.string().nullable(),
  fechamento_domingo: z.string().nullable(),
  dias_funcionamento: z.array(z.string()),
  opcoes_pagamento: z.array(z.string()),
  // Social media
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  // Additional fields
  adicionais: z.array(z.string()),
  tags: z.array(z.string()),
  // Images
  imagem_01: z.string().nullable(),
  imagem_02: z.string().nullable(),
  imagem_03: z.string().nullable(),
  imagem_04: z.string().nullable(),
  imagem_05: z.string().nullable(),
  imagem_06: z.string().nullable(),
  logo: z.string().nullable(),
  banner: z.string().nullable(),
});

export type Product = z.infer<typeof ProductSchema>;
export type Link = z.infer<typeof LinkSchema>;
export type Profile = z.infer<typeof ProfileSchema>;

async function fetchWithAuth(url: string) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchCompanyData(slug: string) {
  const [products, links, profiles] = await Promise.all([
    fetchWithAuth(
      `${API_BASE_URL}/produtos_vitrine?filter[empresa][slug][_eq]=${slug}&fields=*,produto.*`
    ),
    fetchWithAuth(
      `${API_BASE_URL}/links_vitrine?filter[empresa][slug][_eq]=${slug}&fields=*`
    ),
    fetchWithAuth(
      `${API_BASE_URL}/perfil_empresa?filter[empresa][slug][_eq]=${slug}&fields=*`
    ),
  ]);

  const parsedProducts = z.array(ProductSchema).parse(products.data);
  const parsedLinks = z.array(LinkSchema).parse(links.data);
  const parsedProfile = z.array(ProfileSchema).parse(profiles.data)[0];

  return {
    products: parsedProducts,
    links: parsedLinks,
    profile: parsedProfile,
  };
}
