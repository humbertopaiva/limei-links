import { API_BASE_URL } from "./constants";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
};

// Types based on your Directus schema
export interface Product {
  produto: {
    nome: string;
    preco: string;
    descricao: string;
    imagem: string | null;
  };
}

export interface Link {
  status: string;
  texto: string;
  url: string;
  tipo_link: string;
  ordem: number;
}

export interface Profile {
  id: string;
  status: string;
  nome: string;
  endereco: string;
  telefone: string;
  whatsapp: string;
  email: string;
  cor_primaria: string;
  cor_secundaria: string;
  abertura_domingo: string | null;
  fechamento_domingo: string | null;
  abertura_segunda: string | null;
  fechamento_segunda: string | null;
  abertura_terca: string | null;
  fechamento_terca: string | null;
  abertura_quarta: string | null;
  fechamento_quarta: string | null;
  abertura_quinta: string | null;
  fechamento_quinta: string | null;
  abertura_sexta: string | null;
  fechamento_sexta: string | null;
  abertura_sabado: string | null;
  fechamento_sabado: string | null;
  dias_funcionamento: string[];
  opcoes_pagamento: string[];
  facebook: string;
  instagram: string;
  tiktok: string;
  twitter: string;
  linkedin: string;
  adicionais: string[];
  tags: string[];
  imagem_01: string | null;
  imagem_02: string | null;
  imagem_03: string | null;
  imagem_04: string | null;
  imagem_05: string | null;
  imagem_06: string | null;
  logo: string | null;
  banner: string | null;
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchCompanyData(slug: string) {
  try {
    const [products, links, profiles] = await Promise.all([
      fetchWithAuth(
        `${API_BASE_URL}/produtos_vitrine?filter[empresa][slug][_eq]=${slug}&fields=produto.nome,produto.preco,produto.descricao,produto.imagem`,
        { cache: "no-store" }
      ),
      fetchWithAuth(
        `${API_BASE_URL}/links_vitrine?filter[empresa][slug][_eq]=${slug}&fields=status,texto,url,tipo_link,ordem`,
        { cache: "no-store" }
      ),
      fetchWithAuth(
        `${API_BASE_URL}/perfil_empresa?filter[empresa][slug][_eq]=${slug}&fields=id,status,nome,endereco,telefone,whatsapp,email,cor_primaria,cor_secundaria,abertura_segunda,fechamento_segunda,abertura_terca,fechamento_terca,abertura_quarta,fechamento_quarta,abertura_quinta,fechamento_quinta,abertura_sexta,fechamento_sexta,abertura_sabado,fechamento_sabado,dias_funcionamento,opcoes_pagamento,facebook,instagram,tiktok,twitter,linkedin,adicionais,tags,imagem_01,imagem_02,imagem_03,imagem_04,imagem_05,imagem_06,logo,banner`,
        { cache: "no-store" }
      ),
    ]);

    if (!profiles.data?.length) {
      throw new Error("Company profile not found");
    }

    return {
      products: products.data || [],
      links: links.data || [],
      profile: profiles.data[0],
    };
  } catch (error) {
    console.error("Error fetching company data:", error);
    throw error;
  }
}
