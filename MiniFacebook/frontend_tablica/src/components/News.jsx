import React from 'react'
import '../style/news.css'
export default function News() {
    return (
        <div className = 'newsContainer'>
           <article>
               <p>
                Na początku chciałem tu wstawić jakąś podstronę, potem koncept się zmienił (tysięczny raz chyba), a podstrony usunąć nie mogę, bo symetria.
                Zdecydowałem się więc trochę napisać o tej aplikacji.
               </p>
               <p>
                   Jak widać jest to taki mini facebook. Opcji jest całkiem sporo, z czego jestem dumny. Czy można to zbugować i zepsuć? Owszem... Jednak nie powiem jak. Nie byłoby to jakoś
                   specjalnie inwazyjne dla aplikacji. Zauważyłem jeden błąd związany z nie użyciem wunkcji asynchronicznej gdzie jest ona potrzebna.
               </p>
               <p>
                   Możliwości serwera trzymającego dane są ograniczone (serwer to zwyczajne dwa pliki JSON, manipulowane excpressem). Więc nici z własnego profilowego ;(
               </p>
           </article>
        </div>
    )
}
