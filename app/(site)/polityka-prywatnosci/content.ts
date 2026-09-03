import { LEGAL_SUBTITLE, type LegalDoc } from "@/lib/legal";

/**
 * Przepisane 1:1 ze starej strony (bcoffee.pl/polityka-prywatnosci, WebWave).
 *
 * Dobra wiadomość przy przeprowadzce: § 3 mówi o „dostawcy hostingu / systemu do
 * budowy strony internetowej” ogólnie, bez nazwy własnej, więc zmiana WebWave na
 * Vercela niczego tu nie unieważnia.
 *
 * UWAGA przy najbliższej aktualizacji: dokument deklaruje Google Analytics, Meta
 * Pixel, baner zgody na cookies i przekazywanie danych poza EOG. Nowa strona nie
 * ma żadnego z tych narzędzi i nie zapisuje ani jednego ciasteczka — dotyczy to
 * § 2 („Dane zbierane automatycznie”), całego § 4 oraz § 3 ust. 1 i 4 i § 5 ust. 2.
 * Tekst został przeniesiony bez zmian, bo skracanie dokumentu prawnego jest
 * decyzją właściciela. Docelowo warto go okroić — mniej deklaracji to mniej
 * obowiązków, a przy braku analityki znika też potrzeba banera cookies.
 *
 * Do dopisania, gdy ruszy formularz: odbiorcą danych staje się dostawca wysyłki
 * e-maili (Resend) oraz dostawca CMS-u (Sanity).
 */
export const politykaPrywatnosci: LegalDoc = {
  title: "Polityka prywatności",
  description:
    "Zasady przetwarzania danych osobowych użytkowników bcoffee.pl: formularz wyceny, podstawy prawne, prawa i pliki cookies.",
  subtitle: LEGAL_SUBTITLE,
  effectiveFrom: "2024-10-10",
  sections: [
    {
      heading: "§1. Postanowienia ogólne",
      blocks: [
        { kind: "para", text: "1. Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych Użytkowników strony internetowej bcoffee.pl (dalej: „Serwis”) oraz zasady wykorzystywania plików cookies." },
        { kind: "para", text: "2. Administratorem danych osobowych jest B. Coffee Wojciech Baranowski, Strzelce 4, 58-124 Marcinowice, NIP 8842756984, REGON 362425207 (dalej: „Administrator”)." },
        { kind: "para", text: "3. Kontakt z Administratorem w sprawach dotyczących ochrony danych osobowych możliwy jest telefonicznie pod numerem 604 372 787 oraz za pośrednictwem formularza kontaktowego dostępnego w Serwisie." },
        { kind: "para", text: "4. Administrator dokłada szczególnej staranności w celu ochrony interesów osób, których dane dotyczą, a w szczególności zapewnia, że dane te są przetwarzane zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) oraz ustawą o ochronie danych osobowych." },
      ],
    },
    {
      heading: "§2. Jakie dane są zbierane i w jakim celu",
      blocks: [
        { kind: "subheading", text: "Formularz kontaktowy „Szybka wycena”" },
        { kind: "para", text: "1. W przypadku skorzystania z formularza kontaktowego przetwarzane są dane podane dobrowolnie przez Użytkownika, w szczególności: imię, numer telefonu i/lub adres e-mail oraz treść zapytania (np. informacje o planowanym wydarzeniu)." },
        { kind: "para", text: "2. Dane te są przetwarzane w celu udzielenia odpowiedzi na zapytanie, przygotowania wyceny oraz ewentualnego zawarcia i realizacji umowy o świadczenie usług (podstawa prawna: art. 6 ust. 1 lit. b RODO – działania podejmowane na żądanie osoby, której dane dotyczą, przed zawarciem umowy; a w zakresie danych podanych dodatkowo – art. 6 ust. 1 lit. a RODO, tj. zgoda)." },
        { kind: "para", text: "3. Podanie danych jest dobrowolne, lecz niezbędne do uzyskania odpowiedzi na przesłane zapytanie." },
        { kind: "subheading", text: "Dane zbierane automatycznie" },
        { kind: "para", text: "1. Podczas korzystania z Serwisu mogą być automatycznie zbierane dane takie jak: adres IP, typ przeglądarki, system operacyjny, czas wizyty oraz inne dane statystyczne gromadzone za pomocą plików cookies i podobnych technologii, opisane szczegółowo w § 4." },
        { kind: "para", text: "2. Dane te przetwarzane są w celu zapewnienia prawidłowego działania Serwisu, prowadzenia statystyk odwiedzin oraz – w zakresie, w jakim Użytkownik wyraził na to zgodę – w celach marketingowych i remarketingowych (podstawa prawna: art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes Administratora, a w zakresie cookies niezbędnych do wyrażenia zgody – art. 6 ust. 1 lit. a RODO)." },
      ],
    },
    {
      heading: "§3. Komu udostępniane są dane",
      blocks: [
        { kind: "para", text: "1. Dane osobowe mogą być przekazywane podmiotom wspierającym Administratora w prowadzeniu Serwisu i działalności, w szczególności: dostawcy hostingu / systemu do budowy strony internetowej, dostawcy usług analitycznych (np. Google Analytics) oraz narzędzi marketingowych (np. Meta / Facebook Pixel), a także biuru rachunkowemu – wyłącznie w zakresie niezbędnym do realizacji celów wskazanych w § 2." },
        { kind: "para", text: "2. Dane mogą być przekazywane podmiotom uprawnionym do ich otrzymania na podstawie przepisów prawa, w tym organom państwowym." },
        { kind: "para", text: "3. Administrator nie sprzedaje danych osobowych Użytkowników podmiotom trzecim." },
        { kind: "para", text: "4. W związku z korzystaniem z narzędzi takich jak Google Analytics czy Meta Pixel dane mogą być przekazywane do państw spoza Europejskiego Obszaru Gospodarczego (np. do USA) – w takim przypadku odbywa się to w oparciu o mechanizmy zapewniające odpowiedni poziom ochrony danych, przewidziane przez dostawców tych narzędzi (np. standardowe klauzule umowne)." },
      ],
    },
    {
      heading: "§4. Pliki cookies",
      blocks: [
        { kind: "para", text: "1. Serwis wykorzystuje pliki cookies (tzw. „ciasteczka”), czyli niewielkie pliki tekstowe zapisywane na urządzeniu Użytkownika, oraz podobne technologie." },
        {
          kind: "bullets",
          items: [
            "Cookies niezbędne – konieczne do prawidłowego funkcjonowania Serwisu;",
            "Cookies analityczne/statystyczne (np. Google Analytics) – umożliwiające zbieranie informacji o sposobie korzystania z Serwisu;",
            "Cookies marketingowe/reklamowe (np. Meta/Facebook Pixel) – wykorzystywane do wyświetlania spersonalizowanych treści reklamowych oraz mierzenia skuteczności działań marketingowych na portalach społecznościowych.",
          ],
        },
        { kind: "para", text: "5. Cookies inne niż niezbędne do działania Serwisu są instalowane wyłącznie za zgodą Użytkownika, wyrażoną poprzez odpowiednie ustawienia w banerze cookies wyświetlanym przy pierwszej wizycie w Serwisie." },
        { kind: "para", text: "6. Użytkownik może w każdej chwili zmienić ustawienia dotyczące plików cookies za pomocą ustawień swojej przeglądarki internetowej, w tym zablokować lub usunąć zapisane już pliki cookies. Ograniczenie stosowania cookies może wpłynąć na niektóre funkcjonalności dostępne w Serwisie." },
      ],
    },
    {
      heading: "§5. Okres przechowywania danych",
      blocks: [
        { kind: "para", text: "1. Dane podane w formularzu kontaktowym przechowywane są przez okres niezbędny do udzielenia odpowiedzi na zapytanie, a w przypadku zawarcia umowy – przez okres jej realizacji oraz okres przedawnienia ewentualnych roszczeń i wynikający z przepisów prawa (np. podatkowych)." },
        { kind: "para", text: "2. Dane zbierane za pomocą plików cookies przechowywane są przez okres wynikający z ustawień poszczególnych narzędzi (np. Google Analytics, Meta Pixel) lub do czasu wycofania zgody / usunięcia cookies przez Użytkownika." },
      ],
    },
    {
      heading: "§6. Prawa osób, których dane dotyczą",
      blocks: [
        { kind: "para", text: "Każdej osobie, której dane są przetwarzane, przysługuje prawo do:" },
        {
          kind: "bullets",
          items: [
            "dostępu do swoich danych osobowych oraz otrzymania ich kopii;",
            "sprostowania (poprawienia) danych;",
            "usunięcia danych („prawo do bycia zapomnianym”), w zakresie przewidzianym przepisami prawa;",
            "ograniczenia przetwarzania danych;",
            "przenoszenia danych;",
            "wniesienia sprzeciwu wobec przetwarzania danych opartego na prawnie uzasadnionym interesie Administratora;",
            "cofnięcia zgody na przetwarzanie danych w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem;",
            "wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, jeśli Użytkownik uzna, że przetwarzanie jego danych narusza przepisy RODO.",
          ],
        },
        { kind: "para", text: "W celu realizacji powyższych praw należy skontaktować się z Administratorem, korzystając z danych kontaktowych wskazanych w § 1 ust. 3." },
      ],
    },
    {
      heading: "§7. Bezpieczeństwo danych",
      blocks: [
        { kind: "para", text: "1. Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające ochronę przetwarzanych danych osobowych, w szczególności przed ich udostępnieniem osobom nieupoważnionym, utratą lub zniszczeniem." },
        { kind: "para", text: "2. Administrator nie przetwarza danych w sposób zautomatyzowany, który skutkowałby podejmowaniem decyzji wywołujących skutki prawne wobec Użytkownika (profilowanie w rozumieniu art. 22 RODO nie jest stosowane)." },
      ],
    },
    {
      heading: "§8. Postanowienia końcowe",
      blocks: [
        { kind: "para", text: "1. Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności, w szczególności w związku ze zmianą przepisów prawa lub sposobu funkcjonowania Serwisu. Aktualna wersja Polityki Prywatności publikowana jest w Serwisie." },
        { kind: "para", text: "2. W sprawach nieuregulowanych niniejszą Polityką Prywatności zastosowanie mają przepisy RODO oraz właściwe przepisy prawa polskiego." },
        { kind: "para", text: "3. Polityka Prywatności wchodzi w życie z dniem 10.10.2024 r." },
      ],
    },
  ],
};
