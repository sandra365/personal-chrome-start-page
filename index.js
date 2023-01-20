//a. think through data flow and file structure
//b. refactor code (split it into modules)
const noteInput = document.getElementById("note-input");
let notes = getLocalStorageItem('notes') !== null 
    ? getLocalStorageItem('notes')
    : [];

async function updateImageData() {
    try {
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
        if (!res.ok) {
            throw Error("Cannot load background image");
        }
        const data = await res.json();
        const username = data.user.name.split(' ').map(word => {
            const wordArr = word.split('');
            wordArr[0] = wordArr[0].toUpperCase();
            return wordArr.join('');
        }).join(' ');
        const imageData = {
            imageUpdateDate: getCurrentDate(),
            imageUrl: data.urls.full,
            author: username,
        };
        setLocalStorageItem('imageData', imageData);
    } catch (e) {
        console.error(e);//test this later
        const imageUrl = 'https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080';
        const author = 'Dodi Achmad';
        const imageData = {
            imageUpdateDate: getCurrentDate(),
            imageUrl: imageUrl,
            author: author,
        };
        setLocalStorageItem('imageData', imageData);
    }
}

function getCurrentDate() {
    const date = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const currentDate = date.toLocaleDateString(undefined, options);
    return currentDate;
}

function setLocalStorageItem(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

function getLocalStorageItem(key) {
    const localStorageItem = localStorage.getItem(key);
    return JSON.parse(localStorageItem);
}

function renderBackground() {
    const imageData = getLocalStorageItem('imageData');
    document.body.style.backgroundImage = `url(${imageData.imageUrl})`;
    document.getElementById("author").textContent = `${imageData.author}`;
}

async function refreshBackground() {
    await updateImageData();
    renderBackground();
}

document.getElementById("refresh").addEventListener("click", async() => {
        await refreshBackground();
    });

function renderTime() {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"});
}

async function renderWeather(position) {
    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`);
        if (!res.ok) {
            throw Error("Weather data not available");
        }
        const data = await res.json();
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weather").innerHTML = `
            <div class="temperature">
                <img src=${iconUrl} />
                <p>${Math.round(data.main.temp)}º</p>
            </div>
            <p class="location">${data.name}</p>
        `;
    } catch(err) {
        console.error(err);
    }
}

async function renderQoute() {
    try {
        const res = await fetch("https://api.goprogram.ai/inspiration");
        if (!res.ok) {
            throw new Error("Cannot load quote");
        }
        const data = await res.json();
        document.getElementById("quote").innerHTML = `
            <blockquote>
                &ldquo;${data.quote}&rdquo; &mdash;
                    <footer>
                        ${data.author}
                    </footer>
            </blockquote>
        `;
    } catch(err) {
        console.log(err);
        document.getElementById("quote").innerHTML = `
        <blockquote>&ldquo;It is in the heart that makes a man rich. 
            He is rich according to what he is, not according to what he has.&rdquo; &mdash; 
            <footer>Henry Ward Beecher</footer></blockquote>
        `;
    }
}

noteInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addNote(event.target.value);
    }
});

function addNote(text) {
    const noteObj = {
        id: Date.now().toString(),
        text: text,
    };
    notes.push(noteObj);
    setLocalStorageItem('notes', notes);//does it 'reset' notes object in local storage?
    renderNotes();
    noteInput.value = '';
}

function renderNotes() {
    if (notes) {
        let notesDiv = '';
        notes.forEach(note => {
            const { id, text } = note;
            const noteHtml = `
            <div id="${id}" class="note">
                <p>&#x2022;&nbsp;${text}</p>
                <img class="delete-btn" src="delete-icon.png" alt="Delete note">
            </div>
            `;
            notesDiv += noteHtml;
        });
        document.getElementById("notes-bottom").innerHTML = notesDiv;
        const deleteBtnCollection = document.getElementsByClassName("delete-btn");
        Array.from(deleteBtnCollection).forEach(btn => {
            btn.addEventListener("click", (e) => {deleteNote(e)});
        });
    }
}

function deleteNote(e) {
    const noteId = e.target.parentElement.id;
    notes = notes.filter(el => el.id !== noteId);
    setLocalStorageItem('notes', notes);
    renderNotes();
}

async function run() {
    const dateToday = getCurrentDate();
    const bgUpdateDate = getLocalStorageItem('imageData') !== null 
        ? getLocalStorageItem('imageData').imageUpdateDate 
        : undefined;
    if (!bgUpdateDate || bgUpdateDate !== dateToday) {
        await updateImageData();
    }
    renderBackground();

    setInterval(renderTime, 1000);

    navigator.geolocation.getCurrentPosition(async(position) => {await renderWeather(position)});

    await renderQoute();
    setInterval(renderQoute, 60*60*1000);//will it work like it supposed to?(because callback is async)/works not as expected

    renderNotes();
    
}

run();
