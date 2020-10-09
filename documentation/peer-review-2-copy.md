**This is a copy of my second peer review**
Link to repo: [Sendouc/tshakki-ai](https://github.com/Sendouc/tshakki-ai)

*Repo kloonattu 2020-10-07 klo 1510*  
Viimeisin commit: [`4ea0769`](https://github.com/Sendouc/tshakki-ai/commit/4d1ae52494b8309985a8495d3cd4ea17957f0e0b)

Minulle tuli nyt sama projekti uudestaan arvioitavaksi, joten yleiskuvasta ei ole järkeä kirjoittaa uudestaan. Logiikasta, niin kuin viimeksi kirjoitinkin, en ainakaan minä löytänyt virheitä, joten kommentoin tässä nyt vielä tyyliä.

Joudun menemään yksityiskohtaisuuksiin, jotta kirjoitettavaa löytyisi. Sanon siis etukäteen, että projekti näyttää todella hyvältä; näitä ei pidä murehtia liikaa 😊

---

Kiva nähdä, että siirtojen generointi generaattoreilla oli mielestäsi varteenotettava idea! Makuasia, mutta minusta olisi mielekästä laittaa ne vielä omaan "siirotgeneraattorit" -kansioonsa erillisinä tiedostoina. Silloin olisi paljon nopeampaa löytää tietyn nappulan generaattori, kun ei tarvitsisi kahlata pitkää siirotGeneraattorit.ts -tiedostoa läpi. Silloin tietysti pitäisi erikseen nimetä tyyppi `SiirtoGeneraattori = (...) => Generator<...>`, mutta sekin ehkä jopa toisi selkeyttä koodiin.

En tunne shakkia pelinä, joten tästä ei välttämättä ole iloa, mutta olisiko luonnollisempaa `i`:n ja `j`:n sijaan käyttää `x`:ää ja `y`:tä, silloin kun ruutuja käydään läpi silmukoissa? Koordinaatiston origohan on (oletettavasti) vasen yläkulma, mutta i ja j -nimisillä muuttujilla ei tule selväksi, onko lauta tallennettu `lauta[x][y]` vai `lauta[y][x]` -muodossa. Molempia tapoja tallettaa 2d -taulukoita on nimittäin tullut vastaan.

Logiikan työkalut -tiedostossa muuten käytetään tuota JS:n `Array.prototype.push` -metodia. Taulukoita pitäisi käyttää niin kuin ne olisivat vakiokokoisia, eli siihen pitäisi löytää joku toinen ratkaisu. Taulukon saa JS:sä alustettua johonkin kokoon ainakin kutsumalla `Array(size: number)` tai `Array.from({ length: number })`. Sitten vain indeksin avulla asettamaan arvoja.

Gitin käyttö ei tälläisessä yhden henkilön projektissa ole tarkkaa, mutta jos tällaista tekisi tiimissä, ei commitien kuuluisi sisältää toisistaan liittymättömiä muutoksia. Esimerkiksi commit [9a2911f](https://github.com/Sendouc/tshakki-ai/commit/9a2911f2b733fa12c1e97740327dfc66233bb99a) on nimetty "käytä generaattoreja", mutta kyseisessä commitissa on myös muutettu täysin otsikkoon liittymätöntä asiaa testausdokumentissa, commit [0ac4f43](https://github.com/Sendouc/tshakki-ai/commit/0ac4f435ede5d364033b3cac869502fb9adfbf11) "tornit liikkuu" sisältää mm. viidennen viikkoraportin kirjoittamisen, paketin lisäyksen package.json:iin ja kahden uuden npm -scriptin kirjoituksen. Git on hyödyllisimmillään silloin kun commitit tehdään aikaisin ja usein: kun muutokset tiedostoihin pitää mahdollisimman pieninä "checkpointeina" on paljon helpompi selvittää vian syy, kun jokin menee rikki.