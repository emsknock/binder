**This is a copy of my first peer review**
Link to repo: [Sendouc/tshakki-ai](https://github.com/Sendouc/tshakki-ai)

*Repo kloonattu 2020-10-01 klo 1900*  
Viimeisin commit: [`4ea0769`](https://github.com/Sendouc/tshakki-ai/commit/4ea0769b416fa9af7362c150be22f78dcd760268)

## Yleiskuva

Tähän asti toteutettu ohjelma vaikuttaa vallan hyvältä. Ohjelman sydän, eli AB-karsiva minimax näyttää ainakin minulle aivan oikein toteutetulta, mutta en ihan suoraan osaa alkaa arvioimaan toimiiko se odotetusti; jos en ihan väärin katsonut, niin sille ei vielä ole testejä.

React on hyvä ja TypeScriptille luonnollinen valinta UI:n toteuttamiseen — kätevää, että sille löytyy valmiiksi shakkikomponenttikin!

## Appi.tsx

Suosittelisin luettavuuden nimissä käyttämään `{ [key: KeyType]: ValueType }` -typen sijaan TS:n `Record<KeyType, ValueType>` -utility-typeä alun hakutauluissa (`nappulaKoodiNimeksi` ym), se on tarkoitettu näihin tilanteisiin. Hakutaulut kannattaisi ehkä muutenkin siirtää omaan tiedostoonsa. Sinne voisi oikeastaan laittaa myös `lauta` useState-hookin oletusarvon, esimerkiksi vakioksi nimeltä `aloitusLautaTila`. Ja vielä samaan tiedostoon saisi luontevasti utilityfunktiot merkkijonomuotoisten (serialisoitujen) nappuloiden käsittelylle, jolloin esim `.split("@")[0]` olisi paljon nopeammin ymmärrettävissä. Esimerkiksi:
```typescript
export const valitseNappulanSijainti = (n: string) => n.split("@")[1];
export const kirjoitaNappulaanSijainti = (n: string, pos: string) => n.split("@")[0] + pos;
```

[Rivillä 80](https://github.com/Sendouc/tshakki-ai/blob/master/src/Appi.tsx#L80) ei muuten tarvitse luoda kopiota laudasta: sekä `filter` että `map` eivät muuta alkuperäistä listaa ja [rivin 85](https://github.com/Sendouc/tshakki-ai/blob/master/src/Appi.tsx#L85) `return` on redundantti, sillä ?: on lauseke. Parhaassa tapauksessa siis koodi voisi näyttää esimerkiksi tältä:
```typescript
const lautaSiirronJälkeen = lauta
    .filter(nappulaRuudussa => valitseNappulanSijainti(nappulaRuudussa) !== ruutuun)
    .map(nappulaRuudussa =>
        valitseNappulanSijainti(nappulaRuudussa) === ruudusta
            ? kirjoitaNappulaanSijainti(nappulaRuudussa, ruutuun)
            : nappulaRuudussa
    );
```

## logiikka/index.ts

Tässä on mielestäni ihan perusteltua pitää `nappuloidenArvot` -taulu samassa tiedostossa, mutta suosisin siinäkin `Record`:in käyttöä.

Funktiossa `haeMahdollisetSiirrot` TS määrittää palautusmuodoksi `(Nappula | null)[][][]`:n, joka ehkä kannattaisi merkata ekspliittisesti. Jos tulkitsin oikein, se on `Lauta[]`. En myöskään näe sen palauttavan dokumentaatiokommenttinsa mukaisesti "parhaan mahdollisen siirron arvoa" — joko tämä on jäänyt kummittelemaan, tai sitten vain tulkitsin koodia väärin.

Samassa funktiossa jokaiselle nappulalle kannattaisi ehkä tehdä omat kaikki mahdolliset siirrot palauttavat funktiot, ja vain kutsua niitä. Näissä voisi olla kätevää esimerkiksi yhdistää hakutaulu ja generaattorifunktiot:
```typescript
const haeMahdollisetSiirrot = (
    lauta: Lauta,
    nappula: Nappula,
    nappulaPos: [number, number]
) => [...siirtoGeneraattorit[nappula.tyyppi]()]
```
missä siis `siirtoGeneraattorit` on hakutaulu
```typescript
const siirtoGeneraattorit: Record<
    NappulanTyyppi, 
    (lauta: Lauta, nappula: Nappula, nappulaPos: [number, number]) => Generator<Lauta>
> = {
    "KUNINGAS": function * (lauta, nappula, nappulaPos) { ... },
    ...
}
```
Nämä generaattorit kannattaa ehkä myös pistää jokainen omaan tiedostoonsa, niin index.ts:stä ei tule aivan jäätävän kokoista.

## TL;DR

Niin kuin alussa sanoin, niin vallan hyvältä näyttää. Ohjelma vaikuttaa tähän asti hyvin suunnitellulta ja ainoat parannusehdotukset mitä keksin kohdistuvat enemmänkin koodin rakenteeseen ja tyypitykseen kuin itse ohjelmalogiikkaan.

Yksi huomio kurssin kannalta on se, että toistaiseksi projektissa käytetään JS:n listoja vapaasti, eikä esimerkiksi omaa luokkaa huolehtimaan siitä että niitä käytettäisiin niin kuin ne olisivat vakiokokoisia. Esimerkiksi `[].filter` -metodin käyttö kannattaa tarkastaa ohjaajalta. Ainakin `[].push` on ymmärtääkseni kielletty ilman omaa listaimplementaatiota.