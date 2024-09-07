export type CreateOdlukaDTO = {
  datumOdluke: Date | string
  komisijaPrviClan: number
  komisijaDrugiClan: number
  komisijaTreciClan: number
  referentniBrojJP: number
  referentniBrojPonude: number
}

export type OdlukaResult = {
  datumOdluke: Date
  komisijaPrviClan: ClanKomisije
  komisijaDrugiClan: ClanKomisije
  komisijaTreciClan: ClanKomisije
  referentniBrojJP: number
  referentniBrojPonude: number
}

type ClanKomisije = {
  zaposleniId: number
  imeIPrezime: string
  nazivPrivrdnogSubjekta: string
}
