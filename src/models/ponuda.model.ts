import { ZaposleniPopulated, ZaposleniWithPrivredniFull } from './zaposleni.model'

export type Ponuda = {
  referentniBroj: number
  datum: Date
  ukljucujeProizvodjace: boolean
  samostalna: boolean
  izjavaOIntegritetu: boolean
  cenaBezPdv: number
  cenaSaPdv: number
  valuta: Valuta
  zaposleni: ZaposleniPopulated
  referentniBrojJP?: number
}
export type Valuta = {
  id: number
  nazivValute: string
  oznakaValute: string
}

export type PonudaFull = Omit<Ponuda, 'zaposleni'> & { zaposleni: ZaposleniWithPrivredniFull } & {
  ponudeKriterijuma?: PonudaKriterijuma[]
}

export type CreatePonudaDTO = Omit<Ponuda, 'referentniBroj' | 'valuta'> & { valutaId: number } & {
  ponudeKriterijuma: Pick<
    PonudaKriterijuma,
    'jedinicaMereId' | 'kriterijumPozivaId' | 'vrednost' | 'nazivKriterijumaPoziva'
  >[]
}

export type PonudaKriterijuma = {
  referentniBrojPonude: number
  kriterijumPozivaId: number
  jedinicaMereId: number
  vrednost: number
  nazivKriterijumaPoziva: string
}
