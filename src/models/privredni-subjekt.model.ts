export type PrivredniSubjekt = {
  maticniBroj: number
  pib: number
  nazivPrivrednogSubjekta: string
  stranica: string
  adresaId: number
}

export type PrivredniSubjektPopulated = Omit<PrivredniSubjekt, 'adresaId'> & { adresa: Adresa }

export type Adresa = {
  id: number
  ulica: string
  broj: string
  grad: Grad
}

type Grad = {
  id: number
  naziv: string
  postanskiBroj: number
  drzava: Drzava
}

type Drzava = {
  id: number
  naziv: string
  pozivniBroj: number
  clanstvoEU: boolean
}
