import { PoolClient, QueryResult } from 'pg'

export function getZaposleniByEmail(client: PoolClient, data: { email: string }): Promise<QueryResult> {
  return client.query({
    text: 'select * from "Zaposleni" where email = $1;',
    values: [data.email]
  })
}

export function registerZaposleni(
  client: PoolClient,
  data: {
    imeIPrezime: string
    email: string
    sifra: string
    brojTelefona: string
    datumZaposlenja: string
    maticniBroj: bigint
  }
) {
  return client.query({
    text: 'insert into "Zaposleni"("imeIPrezime", email, sifra, "brojTelefona", "datumZaposlenja", "maticniBroj") values ($1, $2, $3, $4, $5, $6)',
    values: [data.imeIPrezime, data.email, data.sifra, data.brojTelefona, data.datumZaposlenja, data.maticniBroj]
  })
}
