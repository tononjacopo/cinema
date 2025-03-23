
    /*=== header ===*/
    document.addEventListener('DOMContentLoaded', function() {
        let lastScrollTop = 0;
        const header = document.querySelector('header');

        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                // L'utente sta scorrendo verso il basso
                header.classList.remove('show');
            } else {
                // L'utente sta scorrendo verso l'alto
                header.classList.add('show');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Per evitare valori negativi
        }, false);
    });





    /*=== acquisto rapido===*/
    document.addEventListener('DOMContentLoaded', function() {
        const section = document.querySelector('#acquisto-rapido');
        const shrinkOnScroll = 100; // Altezza di scorrimento dopo la quale ridurre l'altezza

        window.addEventListener('scroll', function() {
            if (window.scrollY > shrinkOnScroll) {
                section.classList.add('full');
            }
        });


        const dropdowns = document.querySelectorAll('.dropdown');
        const cinemaDropdown = document.querySelector('.dropdown:nth-of-type(1) .select');
        const filmDropdown = document.querySelector('.dropdown:nth-of-type(2) .select');
        const dataDropdown = document.querySelector('.dropdown:nth-of-type(3) .select');
        const orariDropdown = document.querySelector('.dropdown:nth-of-type(4) .select');
        const cercaLink = document.querySelector('#choose-link'); // Aggiornato

        function checkCinemaAndFilmSelection() {
            const cinemaSelected = cinemaDropdown.querySelector('.selected').innerText !== 'CINEMA';
            const filmSelected = filmDropdown.querySelector('.selected').innerText !== 'FILM';

            if (cinemaSelected && filmSelected) {
                dataDropdown.classList.remove('disabled');
                if (orariDropdown.classList.contains('disabled')) {
                    cercaLink.classList.add('disabled');
                } else {
                    cercaLink.classList.remove('disabled');
                }
            } else {
                dataDropdown.classList.add('disabled');
                orariDropdown.classList.add('disabled'); // disable time dropdown if date dropdown is disabled
                cercaLink.classList.add('disabled');
            }
        }

        // Function to check if date is selected
        function checkDateSelection() {
            const dataSelected = dataDropdown.querySelector('.selected').innerText !== 'DATA';

            if (dataSelected) {
                orariDropdown.classList.remove('disabled');
                if (orariDropdown.querySelector('.selected').innerText !== 'ORARI') {
                    cercaLink.classList.remove('disabled');
                } else {
                    cercaLink.classList.add('disabled');
                }
            } else {
                orariDropdown.classList.add('disabled');
                cercaLink.classList.add('disabled');
            }
        }

        // Initial check
        checkCinemaAndFilmSelection();
        checkDateSelection();

        // Function to check if all dropdowns are selected
        function checkDropdowns() {
            const cinemaSelected = cinemaDropdown.querySelector('.selected').innerText !== 'CINEMA';
            const filmSelected = filmDropdown.querySelector('.selected').innerText !== 'FILM';
            const dataSelected = dataDropdown.querySelector('.selected').innerText !== 'DATA';
            const orariSelected = orariDropdown.querySelector('.selected').innerText !== 'ORARI';

            return cinemaSelected && filmSelected && dataSelected && orariSelected;
        }


        /*funzioonamento dropdown*/
        // Loop through all dropdown elements
        dropdowns.forEach(dropdown => {
            // Get inner elements from each dropdown
            const select = dropdown.querySelector('.select');
            const caret = dropdown.querySelector('.caret');
            const menu = dropdown.querySelector('.menu');
            const options = dropdown.querySelectorAll('.menu li');
            const selected = dropdown.querySelector('.selected');

            // Add a click event to the select element
            select.addEventListener('click', (event) => {
                // Prevent clicking on disabled dropdowns
                if (select.classList.contains('disabled')) {
                    event.stopPropagation();
                    return;
                }

                // Add the clicked select styles to the select element
                select.classList.toggle('select-clicked');
                // Add the rotate styles to the caret element
                caret.classList.toggle('caret-rotate');
                // Add the open styles to the menu element
                menu.classList.toggle('menu-open');
            });

            // Loop through all option elements
            options.forEach(option => {
                // Add a click event to the option element
                option.addEventListener('click', () => {
                    // Change selected inner text to clicked option inner text
                    selected.innerText = option.innerText;
                    selected.id = option.id;
                    // Remove the clicked select styles to the select element
                    select.classList.remove('select-clicked');
                    // Remove the rotate styles to the caret element
                    caret.classList.remove('caret-rotate');
                    // Remove the open styles to the menu element
                    menu.classList.remove('menu-open');
                    // Remove active class from all option elements
                    options.forEach(option => {
                        option.classList.remove('active');
                    });
                    // Add active class to clicked option element
                    option.classList.add('active');

                    // Check if selections are valid to enable/disable dropdowns
                    checkCinemaAndFilmSelection();
                    checkDateSelection();
                    updateSearchButtonState(); // Aggiornato
                });
            });

            // Add click event to the entire window
            window.addEventListener("click", e => {
                // Get the dropdown size and position
                const size = dropdown.getBoundingClientRect();
                if (
                    e.clientX < size.left ||
                    e.clientX > size.right ||
                    e.clientY < size.top ||
                    e.clientY > size.bottom
                ) {
                    // Remove the clicked select styles to the select element
                    select.classList.remove('select-clicked');
                    // Remove the rotate styles to the caret element
                    caret.classList.remove('caret-rotate');
                    // Remove the open styles to the menu element
                    menu.classList.remove('menu-open');
                }
            });
        });

        function updateLinkHref() {
            const selectedFilm = filmDropdown.querySelector('.selected').innerText;
            if (selectedFilm !== 'FILM') {
                const filmId = filmDropdown.querySelector('.selected').id;
                const url = `page-film/${filmId.toLowerCase()}/index.html`;
                cercaLink.setAttribute('href', url);
            }
        }

        function updateSearchButtonState() {
            if (checkDropdowns()) {
                cercaLink.classList.remove('disabled');
                updateLinkHref();
            } else {
                cercaLink.classList.add('disabled');
            }
        }

        // Function to handle search button click
        function handleSearchButtonClick(event) {
            if (!checkDropdowns()) {
                event.preventDefault(); // Prevent default action (going to link)
            }
        }

        // Attach click event listener to the search button
        cercaLink.addEventListener('click', handleSearchButtonClick);


        /*=== visualizzazione scelta from html===*/

    });








    /*=== slider ===*/

    //Get elements from the DOM
    const container = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const arrLeft = document.querySelector('.arrow-left');
    const arrRight = document.querySelector('.arrow-right');
    const dots = document.querySelectorAll('.dot');

    //Offset value for the slides container
    let offset = 0;
    //Slide ID on increment
    let slideIncrement = 0;
    //Slide ID on decrement
    let slideDecrement = slides.length - 1;

    //Function to update dots
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === slideIncrement) {
                dot.classList.add('active');
            }
        });
    }

    //Function to move to the next slide
    function moveNext() {
        arrRight.disabled = true;
        offset = slides[0].offsetWidth;
        container.style.transition = "ease-in-out 700ms";
        container.style.left = -offset + 'px';
        setTimeout(() => {
            container.style.transition = "none";
            slides[slideIncrement].style.order = slides.length - 1;
            container.style.left = 0;
            slideIncrement++;
            slideDecrement = slideIncrement - 1;
            if (slideIncrement === slides.length) {
                slideIncrement = 0;
                slides.forEach(slide => {
                    slide.style.order = "initial";
                });
            }
            arrRight.disabled = false;
            updateDots();
        }, 700);
    }

    //Add click event to right arrow
    arrRight.addEventListener('click', () => {
        clearInterval(autoPlayInterval);
        moveNext();
        startAutoPlay();
    });

    //Add click event to left arrow
    arrLeft.addEventListener('click', () => {
        clearInterval(autoPlayInterval);
        arrLeft.disabled = true;
        offset = slides[0].offsetWidth;
        container.style.transition = "none";
        if (slideDecrement < 0) {
            slides.forEach(slide => {
                slide.style.order = "initial";
            });
            slideDecrement = slides.length - 1;
        }
        slides[slideDecrement].style.order = "-1";
        container.style.left = -offset + 'px';
        setTimeout(() => {
            container.style.transition = "ease-in-out 700ms";
            container.style.left = 0;
        }, 1);
        setTimeout(() => {
            slideDecrement--;
            slideIncrement = slideDecrement + 1;
            arrLeft.disabled = false;
            updateDots();
        }, 700);
        startAutoPlay();
    });

    //Function to start the autoplay
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(moveNext, 3000); // Cambia il valore 3000 per modificare l'intervallo di autoplay
    }

    //Start autoplay on load
    startAutoPlay();



/*==search bar==*/

    const search = document.querySelector('#search');
    const clearIcon = document.querySelector('#clear-icon');
    const panels = document.querySelectorAll('.title-locandine');
    const maxColumns = 5; // Massimo numero di colonne per riga

    clearIcon.style.display = 'none';

    // Aggiungi un evento di input
    search.addEventListener('input', () => {
        // Mostra o nascondi l'icona di cancellazione in base al valore della ricerca
        clearIcon.style.display = search.value !== "" ? "inline-block" : "none";

        // Resto della tua funzionalità di ricerca
        const inputText = search.value.toLowerCase();
        panels.forEach(panel => {
            const panelHeadingText = panel.textContent.toLowerCase();
            const isVisible = panelHeadingText.includes(inputText);
            panel.parentElement.parentElement.style.display = isVisible ? "table-row" : "none";
        });

        // Aggiorna il layout dei pannelli
        updatePanelLayout();
    });

    // Aggiungi un evento di click all'icona di cancellazione
    clearIcon.addEventListener('click', () => {
        search.value = ""; // Cancella l'input di ricerca
        clearIcon.style.display = "none"; // Nascondi l'icona di cancellazione
        panels.forEach(panel => {
            panel.parentElement.parentElement.style.display = "table-row"; // Mostra tutti i pannelli
        });

        // Ripristina il layout dei pannelli
        updatePanelLayout();
    });

    function updatePanelLayout() {
        let visiblePanelsCount = 0;
        panels.forEach(panel => {
            if (panel.parentElement.parentElement.style.display !== "none") {
                visiblePanelsCount++;
            }
        });

        const emptyColumns = maxColumns - (visiblePanelsCount % maxColumns);
        const panelWidthPercentage = 100 / maxColumns;
        panels.forEach(panel => {
            if (panel.parentElement.parentElement.style.display !== "none") {
                panel.parentElement.parentElement.style.width = `${panelWidthPercentage}%`;
            } else {
                panel.parentElement.parentElement.style.width = `calc(${panelWidthPercentage}% + ${100 / maxColumns / emptyColumns}%)`;
            }
        });
    }


