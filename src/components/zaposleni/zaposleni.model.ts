export type ZaposleniSifra = {
  zaposleniId: number;
  imeIPrezime: string;
  email: string;
  sifra: string;
  brojTelefona: string;
  datumZaposlenja: Date;
  maticniBroj: bigint;
};

export type Zaposleni = Omit<ZaposleniSifra, 'sifra'>;
