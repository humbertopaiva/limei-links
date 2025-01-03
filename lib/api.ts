import { z } from 'zod';
import { API_TOKEN, API_BASE_URL } from './constants';

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
};

const ProductSchema = z.object({
  produto: z.object({
    nome: z.string(),
    preco: z.string(),
    descricao: z.string(),
    imagem: z.string().nullable(),
  }),
});

const LinkSchema = z.object({
  status: z.string(),
  texto: z.string(),
  url: z.string(),
  tipo_link: z.string(),
  ordem: z.number(),
});

const ProfileSchema = z.object({
  id: z.string(),
  status: z.string(),
  nome: z.string(),
  endereco: z.string(),
  telefone: z.string(),
  whatsapp: z.string(),
  email: z.string(),
  cor_primaria: z.string(),
  cor_secundaria: z.string(),
  abertura_segunda: z.string(),
  fechamento_segunda: z.string(),
  abertura_terca: z.string(),
  fechamento_terca: z.string(),
  abertura_quarta: z.string(),
  fechamento_quarta: z.string(),
  abertura_quinta: z.string(),
  fechamento_quinta: z.string(),
  abertura_sexta: z.string(),
  fechamento_sexta: z.string(),
  abertura_sabado: z.string(),
  fechamento_sabado: z.string(),
  dias_funcionamento: z.array(z.string()),
  opcoes_pagamento: z.array(z.string()),
  facebook: z.string(),
  instagram: z.string(),
  tiktok: z.string(),
  twitter: z.string(),
  linkedin: z.string(),
  adicionais: z.array(z.string()),
  tags: z.array(z.string()),
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
      `${API_BASE_URL}/produtos_vitrine?filter[empresa][slug][_eq]=${slug}&fields=produto.nome,produto.preco,produto.descricao,produto.imagem`
    ),
    fetchWithAuth(
      `${API_BASE_URL}/links_vitrine?filter[empresa][slug][_eq]=${slug}&fields=status,texto,url,tipo_link,ordem`
    ),
    fetchWithAuth(
      `${API_BASE_URL}/perfil_empresa?filter[empresa][slug][_eq]=${slug}&fields=id,status,nome,endereco,telefone,whatsapp,email,cor_primaria,cor_secundaria,abertura_segunda,fechamento_segunda,abertura_terca,fechamento_terca,abertura_quarta,fechamento_quarta,abertura_quinta,fechamento_quinta,abertura_sexta,fechamento_sexta,abertura_sabado,fechamento_sabado,dias_funcionamento,opcoes_pagamento,facebook,instagram,tiktok,twitter,linkedin,adicionais,tags,imagem_01,imagem_02,imagem_03,imagem_04,imagem_05,imagem_06,logo,banner`
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