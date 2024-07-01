import { Oznaka } from './oznaka.model'
import { Datumi } from './shared/datumi.model'
import { Zaposleni, ZaposleniPopulated } from './zaposleni.model'

export type JavniPozivFilters = {
  referentniBroj?: number
  nazivPoziva?: string
  datumIzdavanjaOd?: string
  datumIzdavanjaDo?: string
  datumZatvaranjaOd?: string
  datumZatvaranjaDo?: string
  procenjenaVrednostOd?: number
  procenjenaVrednostDo?: number
  privredniSubjekt?: number
}

export type JavniPoziv = {
  referentniBroj: number
  nazivPoziva: string
  datumi: Datumi
  procenjenaVrednost: number
  oznakaValute: string
  oznakaId: number
  valutaId: number
  zaposleniId: string
}

// no need to populate valuta since it is denormalized
export type JavniPozivPopulated = Omit<JavniPoziv, 'oznakaId' | 'zaposleniId'> & {
  zaposleni: Zaposleni
  oznaka: Oznaka
}

export type GetAllJavniPozivDTO = Omit<JavniPozivPopulated, 'zaposleni'> & {
  zaposleni: Pick<ZaposleniPopulated, 'imeIPrezime' | 'id' | 'privredniSubjekt'>
}
