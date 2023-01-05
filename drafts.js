
//***************************************************************
// fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
//     .then(res => {
//         if (!res.ok) {
//             throw Error("Something went wrong")
//         }
//         return res.json()
//     })
//     .then(data => {
//         document.getElementById("crypto-top").innerHTML = `
//             <img src=${data.image.small} />
//             <span>${data.name}</span>
//         `
//         document.getElementById("crypto").innerHTML += `
//             <p>📊 € ${data.market_data.current_price.eur}</p>
//             <p>📈 € ${data.market_data.high_24h.eur}</p>
//             <p>📉 € ${data.market_data.low_24h.eur}</p>
//         `
//     })
//     .catch(err => console.error(err))


// document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
//     )`
// document.getElementById("author").textContent = `Dodi Achmad`

// function setBackground() {
//     fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
//     .then(res => {
//         if (!res.ok) {
//             throw Error("Cannot load background")
//         }
//         return res.json()
//     })
//     .then(data => {
//         const username = data.user.name.split(' ').map(word => {
//             const wordArr = word.split('')
//             wordArr[0] = wordArr[0].toUpperCase()
//   			return wordArr.join('')
//         }).join(' ')

//         document.body.style.backgroundImage = `url(${data.urls.full})`
// 		document.getElementById("author").textContent = `By: ${username}`

//         //set here object with data
//     })
//     .catch(err => {
//         console.log(err)
//         // Use a default background image/author
//         document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
//             )`
// 		document.getElementById("author").textContent = `By: Dodi Achmad`
//     })
// }

// const date = new Date();
// const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
// const imageData = {
//     imageUpdateDate: date.toLocaleDateString(undefined, options),
//     imageUrl: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080',
//     author: 'Dodi Achmad',
// };
// localStorage.setItem('imageData', JSON.stringify(imageData));

// const date = new Date();
// const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
// const imageData = {
//     imageUpdateDate: date.toLocaleDateString(undefined, options),
//     imageUrl: data.urls.full,
//     author: username,
// };
// localStorage.setItem('imageData', JSON.stringify(imageData));


// fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
// .then(res => {
//     if (!res.ok) {
//         throw Error("Cannot load background");
//     }
//     return res.json();
// })

// navigator.geolocation.getCurrentPosition(position => {
//     fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
//         .then(res => {
//             if (!res.ok) {
//                 throw Error("Weather data not available");
//             }
//             return res.json();
//         })
//         .then(data => {
//             const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
//             document.getElementById("weather").innerHTML = `
//                 <div class="temperature">
//                     <img src=${iconUrl} />
//                     <p>${Math.round(data.main.temp)}º</p>
//                 </div>
//                     <p class="location">${data.name}</p>
//             `;
//         })
//         .catch(err => console.error(err))
// });