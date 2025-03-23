document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video-trailer');
    const playButton = document.querySelector('.play-button');
    const stopButton = document.querySelector('.stop-button');
    const volumeHighButton = document.querySelector('.fa-volume-high');
    const volumeLowButton = document.querySelector('.fa-volume-low');
    const volumeMuteButton = document.querySelector('.fa-volume-xmark');
    const fullscreenButton = document.querySelector('.fullscreen-button');
    const thumbnail = document.getElementById('thumbnail');
    let isMuted = false;
    let isFullscreen = false;

    // Nascondi il pulsante di stop all'inizio
    stopButton.style.display = 'none';

    // Nascondi il pulsante di volume basso all'inizio
    volumeLowButton.style.display = 'none';
    volumeMuteButton.style.display = 'none';
    video.volume = 0.90;

    playButton.addEventListener('click', () => {
        video.play();
        thumbnail.classList.add('hidden');
        playButton.style.display = 'none';
        stopButton.style.display = 'block';
    });

    stopButton.addEventListener('click', () => {
        video.pause();
        playButton.style.display = 'block';
        stopButton.style.display = 'none';
    });

    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playButton.style.display = 'none';
            stopButton.style.display = 'block';
        } else {
            video.pause();
            playButton.style.display = 'block';
            stopButton.style.display = 'none';
        }
    });

    volumeHighButton.addEventListener('click', () => {
        video.muted = true;
        isMuted = true;
        volumeHighButton.style.display = 'none';
        volumeLowButton.style.display = 'none';
        volumeMuteButton.style.display = 'block';
    });

    volumeMuteButton.addEventListener('click', () => {
        video.muted = false;
        isMuted = false;
        video.volume = 0.4;
        volumeHighButton.style.display = 'none';
        volumeLowButton.style.display = 'block';
        volumeMuteButton.style.display = 'none';
    });

    volumeLowButton.addEventListener('click', () => {
        video.volume = 0.90;
        volumeHighButton.style.display = 'block';
        volumeLowButton.style.display = 'none';
        volumeMuteButton.style.display = 'none';
    });

    fullscreenButton.addEventListener('click', () => {
        if (isFullscreen) {
            document.exitFullscreen();
            isFullscreen = false;
        } else {
            video.requestFullscreen();
            isFullscreen = true;
        }
    });
});


const playButton = document.querySelector('.play-button');
const additionalControls = document.querySelector('.additional-controls');

playButton.addEventListener('click', () => {
    additionalControls.style.display = 'block';
});

/* <== drop down menu ==> */
//Get all dropdowns from the document
const dropdowns = document.querySelectorAll('.dropdown');

//Loop through all dropdown elements
dropdowns.forEach(dropdown => {
    //Get inner elements from each dropdown
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    //Add a click event to the select element
    select.addEventListener('click', () => {
        //Add the clicked select styles to the select element
        select.classList.toggle('select-clicked');
        //Add the rotate styles to the caret element
        caret.classList.toggle('caret-rotate');
        //Add the open styles to the menu element
        menu.classList.toggle('menu-open');
    });

    //Loop through all option elements
    options.forEach(option => {
        //Add a click event to the option element
        option.addEventListener('click', () => {
            //Change selected inner text to clicked option inner text
            selected.innerText = option.innerText;
            //Remove the clicked select styles to the select element
            select.classList.remove('select-clicked');
            //Remove the rotate styles to the caret element
            caret.classList.remove('caret-rotate');
            //Remove the open styles to the menu element
            menu.classList.remove('menu-open');
            //Remove active class from all option elements
            options.forEach(option => {
                option.classList.remove('active');
            });
            //Add active class to clicked option element
            option.classList.add('active');
        });
    });

    //Add click event to the entire window
    window.addEventListener("click", e => {
        //Get the dropdown size and position
        const size = dropdown.getBoundingClientRect();
        if (
            e.clientX < size.left ||
            e.clientX > size.right ||
            e.clientY < size.top ||
            e.clientY > size.bottom
        ) {
            //Remove the clicked select styles to the select element
            select.classList.remove('select-clicked');
            //Remove the rotate styles to the caret element
            caret.classList.remove('caret-rotate');
            //Remove the open styles to the menu element
            menu.classList.remove('menu-open');
        }
    });
});

/*=== active box orari film===*/
const boxes = document.querySelectorAll('#boxone, #boxtwo, #boxthree, #table-popup td');

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (box.classList.contains('activebox')) {
            box.classList.remove('activebox');
        } else {
            boxes.forEach(b => b.classList.remove('activebox'));
            box.classList.add('activebox');
        }
    });
});

/*=== header ===*/
document.addEventListener('DOMContentLoaded', function () {
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
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


/*===popuo orari film===*/

// Funzione per mostrare il popup

function mostraPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
}

// Funzione per chiudere il popup
function chiudiPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == document.querySelector('.popup')) {
        document.getElementById('popup').style.display = 'none';
    }
}


/*=== impostazione giorno tabella popup===*/

document.addEventListener("DOMContentLoaded", function () {
    // Funzione per ottenere il giorno corrente formattato come "VEN 12.08"
    function getFormattedDate() {
        const giorni = ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"];
        const oggi = new Date();
        const giornoSettimana = giorni[oggi.getDay()];
        const giorno = oggi.getDate().toString().padStart(2, '0');
        const mese = (oggi.getMonth() + 1).toString().padStart(2, '0');
        return `${giornoSettimana} ${giorno}.${mese}`;
    }

    // Imposta il testo aggiornato nel div
    const div = document.querySelector("#text-under-drop-container p");
    div.textContent = `SPETTACOLI IN PROGRAMMAZIONE DI ${getFormattedDate()}`;
});

document.addEventListener("DOMContentLoaded", function () {
    // Funzione per ottenere il giorno della settimana e la data formattata come "GIO 09/06"
    function getFormattedDateWithDay(date) {
        const giorniSettimana = ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"];
        const giornoSettimana = giorniSettimana[date.getDay()];
        const giorno = date.getDate().toString().padStart(2, '0');
        const mese = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${giornoSettimana} ${giorno}/${mese}`;
    }

    // Funzione per aggiornare i giorni della tabella
    function updateTableHeaders() {
        const oggi = new Date();
        const headers = document.querySelectorAll("#table-popup th");

        headers.forEach((th, index) => {
            if (index > 0) { // Salta il primo th ("DOMANI")
                const nextDate = new Date(oggi);
                nextDate.setDate(oggi.getDate() + index);
                th.textContent = getFormattedDateWithDay(nextDate);
            }
        });
    }

    // Esegui l'aggiornamento dei giorni della tabella
    updateTableHeaders();
});


    // Seleziona tutti gli elementi con la classe hover-link
    var hoverLinks = document.querySelectorAll('.hover-link');

    // Itera su ogni elemento
    hoverLinks.forEach(function(link) {
    // Aggiungi un listener per l'evento di hover
    link.addEventListener('mouseover', function () {

        var buttons = link.querySelector('.buttons');
        buttons.style.display = 'none';
        if (buttons) {
            buttons.style.display = 'flex';
        }
    });

    // Aggiungi un listener per l'evento di mouseout
    link.addEventListener('mouseout', function() {

        var buttons = link.querySelector('.buttons');
            if (buttons) {
                buttons.style.display = 'none';
            }
        });
    });

