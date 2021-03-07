# Dashboard

* `/`
    - statystyki dzisiejszych zamówień (zdalne i lokalne)
    - listę rezerwacji i eventów zaplanowanych na dzisiaj

# Logowanie

* `/login`
    - pola na login i hasło
    - guzik do zalogowania (link do dashboardu)

# Widok dostępności stolików

* `/tables`
    - wybór daty i godziny
    - tabela z lstą rezerwacji oraz wydarzeń
        - każda kolumna = 1 stolik
        - każdy wiersz = 30 minut
        - ma przypominać widok tygdnia w kalendarzu Google, gdzie w kolumnach zamiast dni są różne stoliki
        - po kliknieciu rezerwacji lub eventu, przechodzimy na stronę szczegółów
* `/tables/booking/:id`
    - zamiera wszystkie informacje dotyczące rezerwacji 
    - umozliwia edycję i zapisanie zmian
* `/tables/booking/new`
    - j/w, bez poczatkowych informacji
* `/tables/events/:id`
    - j/w, dla eventów
* `/tables/events/new`
    - j/w, dla eventów, bez poczatkowych informacji

# Widok kelnera

* `/waiter`
    - tabela
      - w wierszach stoliki
      - w kolumnach różne rodzaje informacji (status, czas od ostatniej aktywności)
      - w ostatniej kolumnie dostępne akcje dla danego stolika
* `/waiter/order/new`
    - numer stolika (edytowalny)
    - menu produktów
    - opcje wybranego produktu
    - zamowienie (zamówione produkty z opcjami i ceną)
    - kwotę zamówienia
* `/waiter/order/:id`
    - j/w

# Widok kuchni

* `/kitchen`
    - wyświetla listę zamówień w kolejności ich złożenia
    - lista musi zawierać:
      - numer stolika (lub zamówienia zdalnego)
      - pełne informacje dot. zamówionych dań
    - na liście musi być możliwość oznaczenia zamowienia jako zrealizowane