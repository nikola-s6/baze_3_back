import { QueryResult } from 'pg'
import { GetAllJavniPozivDTO, JavniPozivDetails } from '../../models/javni-poziv.model'
import { Datumi } from '../../models/shared/datumi.model'
import { ZaposleniWithPrivredniFull } from '../../models/zaposleni.model'

export function parserGetAllJavniPoziv(arr: GetAllJavniPozivDTO[], queryResult: QueryResult) {
  queryResult.rows.forEach((row: getAllJavniPozivFields) => {
    const jp: GetAllJavniPozivDTO = getBasicJP(row)
    arr.push(jp)
  })
}

function getBasicJP(row: any): GetAllJavniPozivDTO {
  return {
    referentniBroj: row.referentniBrojJP,
    nazivPoziva: row.nazivPoziva,
    datumi: row.datumi,
    procenjenaVrednost: row.procenjenaVrednost,
    oznakaValute: row.oznakaValute,
    oznaka: {
      naziv: row.nazivOznake,
      broj: row.oznakaId
    },
    valutaId: row.valutaId,
    zaposleni: {
      id: row.zaposleniId,
      imeIPrezime: row.imeIPrezime,
      privredniSubjekt: {
        maticniBroj: row.maticniBroj,
        pib: row.pib,
        nazivPrivrednogSubjekta: row.nazivPrivrednogSubjekta,
        adresaId: row.adresaId,
        stranica: row.stranica
      }
    }
  }
}

export function parseGetJavniPozivDetails(arr: JavniPozivDetails[], queryResult: QueryResult) {
  queryResult.rows.forEach((row: DetailsFields) => {
    const jp: JavniPozivDetails = {
      ...getBasicJP(row),
      opis: row.opis,
      adresaDostavljanja: row.adresaDostavljanja,
      dodatniPodaci: row.dodatniPodaci,
      dozvoljeneVarijante: row.dozvoljeneVarijante,
      podlozanProduzenju: row.podlozanProduzenju,
      obrazlozenjeProduzenja: row.obrazlozenjeProduzenja,
      oznaka: {
        broj: row.oznakaId,
        naziv: row.nazivOznake
      },
      osnovnaDelatnost: row.osnovnaDelatnost,
      zaposleni: parserZaposleniFull(row)
    }
    arr.push(jp)
  })
}

export function parserZaposleniFull(row: any): ZaposleniWithPrivredniFull {
  return {
    id: row.zaposleniId,
    imeIPrezime: row.imeIPrezime,
    email: row.email,
    brojTelefona: row.brojTelefona,
    datumZaposlenja: new Date(row.datumZaposlenja),
    // @ts-ignore
    privredniSubjekt: {
      maticniBroj: row.maticniBroj,
      pib: row.pib,
      nazivPrivrednogSubjekta: row.nazivPrivrednogSubjekta,
      stranica: row.stranica,
      adresa: {
        id: row.adresaId,
        ulica: row.ulica,
        broj: row.broj,
        grad: {
          id: row.gradId,
          naziv: row.nazivGrada,
          postanskiBroj: row.postanskiBroj,
          drzava: {
            id: row.drzavaId,
            naziv: row.nazivDrzave,
            pozivniBroj: row.pozivniBroj,
            clanstvoEU: row.clanstvoEU
          }
        }
      }
    }
  }
}

type getAllJavniPozivFields = {
  referentniBrojJP: number
  nazivPoziva: string
  datumi: Datumi
  procenjenaVrednost: number
  oznakaValute: string
  oznakaId: number
  nazivOznake: string
  valutaId: number
  zaposleniId: number
  maticniBroj: number
  pib: number
  nazivPrivrednogSubjekta: string
  imeIPrezime: string
  stranica: string
  adresaId: number
}

type DetailsFields = getAllJavniPozivFields & {
  opis: string
  dodatniPodaci: string
  dozvoljeneVarijante: boolean
  adresaDostavljanja: string
  podlozanProduzenju: boolean
  obrazlozenjeProduzenja?: string
  osnovnaDelatnost: string
  email: string
  brojTelefona: string
  datumZaposlenja: Date
  ulica: string
  broj: string
  gradId: number
  nazivGrada: string
  postanskiBroj: number
  drzavaId: number
  nazivDrzave: string
  pozivniBroj: number
  clanstvoEU: boolean
}
