import { PoolClient } from 'pg'

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
