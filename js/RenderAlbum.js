let albums = [];
axios.get(`${host}/music/album`)
    .then(res => {
        res.data.map(item => {
            albums.push(item);
            
            document.getElementById('renderMusic').innerHTML += `
                <div class="col-md-3 content-grid last-grid" onclick="clickDetailAlbum('${item._id}')" data-id=${item._id}    >
                    <a class="linkGenreDetails"><img src="${host}/imageDATA/${item.image}" title="${item.name}"></a>
                    <div class="inner-info album"><a>
                        <h5>${item.name}</h5>
                    </a></div>
                </div>
            `
        })
        console.log(albums);
    })
    .catch();
console.log('AlBUMS',albums)




    

// // /<div class="col-md-3 content-grid last-grid">
// <a class="linkGenreDetails"><img src="${host}/imageDATA/${item.artworkImage}" title="${item.name}"></a>
// <div class="inner-info album"><a>
//     <h5>${item.name}</h5>
// </a></div>
// </div>




//Back
function handleBack() {
    let renderMusicBlock = document.getElementById('renderMusic');
    let titleBlock = document.querySelector(".tittle-head");//title album
    titleBlock.innerHTML=`
            <h3 class="tittle album-detail">All Albums</h3>
            <div class="clearfix"> </div>
        `
    renderMusicBlock.innerHTML = ``;
    
    albums.map(item => {
        renderMusicBlock.innerHTML += `
            <div class="col-md-3 content-grid last-grid" onclick="clickDetailAlbum('${item._id}')" data-id=${item._id}    >
                <a class="linkGenreDetails"><img src="${host}/imageDATA/${item.image}" title="${item.name}"></a>
                <div class="inner-info album"><a>
                    <h5>${item.name}</h5>
                </a></div>
            </div>
        `
        })
        console.log(albums);
}

let listTrack;

// Click to detail -->
function clickDetailAlbum(id) { 
    console.log('CLicked',id);
    let albumClicked;
    let renderMusicBlock = document.getElementById('renderMusic');
    let titleBlock = document.querySelector(".tittle-head");//title album
    renderMusicBlock.innerHTML = ``;
    axios.get(`${host}/music/album`)
    .then(res => {
        
        albumClicked = res.data.find(item => item._id === id);
        
        listTrack = albumClicked.tracks;

        console.log('listTrack',listTrack);
        console.log('albumClicked',albumClicked.tracks);

        //<!-- Render title -->
            
        let title = `
            <h3 class="tittle album-detail">${albumClicked.name} - ${albumClicked.artist.name}</h3>
            <a class="btnBack-Wrapper" onclick="handleBack('${albums}')">
                <i class="fas fa-arrow-left"></i>
                <span class="btnBack"">Back</span>
            </a>
            <div class="clearfix"> </div>
        `
        titleBlock.innerHTML = title;

        albumClicked.tracks.map(item => {
            renderMusicBlock.innerHTML += `
                <div class="col-md-3 browse-grid">
                    <a><img src="${host}/imageDATA/${item.artworkImage}" onclick="listenNow('${item._id}')" title="${item.name}"></a>
                    <a onclick="listenNow('${item._id}')" class="sing" style="cursor: pointer">${item.name}</a>
                    <div class="playingGIFWrapper" id="${item._id}" onclick="handlePauseResume()">
                    </div>
                    <div class="iconFavWrapper">
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
            `
        })
        console.log(albums);
    })
    .catch();
}









let check = false;
let id_play = '';
function listenNow(id) {
    console.log("clicked", id)
    isPlay(id);
    check = true;
    id_play = id;
    let playAudio = document.getElementById('audio-player');
    let baihat = listTrack.find(item => item._id == id);
    playAudio.src = `${host}/musicData/${baihat.fileName}`;
    playAudio.load();
    playAudio.play();
}
function handlePauseResume() {
    let player = document.getElementById("audio-player");
    if (check) {
        player.pause();
        check = false;
    }
    else {
        player.play();
        check = true;
    }
}
//Check isPause
function buttonPre() {
    if (check != false) {
        let currentIndex = listTrack.findIndex(item => item._id === id_play);
        if (currentIndex === 0) {
            let playAudio = document.getElementById('audio-player');
            baihat = listTrack [ listTrack.length -1 ];
            playAudio.src = `${host}/musicData/${baihat.fileName}`;
            playAudio.load();
            setTimeout(function () {
                playAudio.play();
            }, 1000);
        }
        else {
            let playAudio = document.getElementById('audio-player');
            baihat = listTrack[currentIndex - 1];
            playAudio.src = `${host}/musicData/${baihat.fileName}`;
            playAudio.load();
            playAudio.play();
        }
        isPlay(baihat._id);
        id_play = baihat._id;
    }
}
function buttonNext() {
    if (check != false) {
        let currentIndex = listTrack.findIndex(item => item._id === id_play);
        if (currentIndex === listTrack.length - 1) {
            let playAudio = document.getElementById('audio-player');
            baihat = listTrack[0];
            playAudio.src = `${host}/musicData/${baihat.fileName}`;
            playAudio.load();
            setTimeout(function () {
                playAudio.play();
            }, 1000);
        }
        else {
            let playAudio = document.getElementById('audio-player');
            baihat = listTrack[currentIndex + 1];
            playAudio.src = `${host}/musicData/${baihat.fileName}`;
            playAudio.load();
            playAudio.play();
        }
        isPlay(baihat._id);
        id_play = baihat._id;
    }
}
function isPlay(id) {
    if (id == null) return;
    for (let i = 0; i < listTrack.length; i++) {
        if (listTrack[i]._id == id) {
            let playingGIFBlock = document.getElementById(id);
            playingGIFBlock.innerHTML = `
                                    <div class="playingOverlay">
                                        <img src="https://i.gifer.com/YdBO.gif" alt="this slowpoke moves"/>                            
                                    </div>
										`
        }
        else {
            let playingGIFBlock = document.getElementById(listTrack[i]._id);
            playingGIFBlock.innerHTML = ``;
        }
    }
}
function Pause() {
    for (let i = 0; i < listTrack.length; i++) {
        if (listTrack[i]._id == id_play) {
            let playingGIFBlock = document.getElementById(id_play);
            playingGIFBlock.innerHTML = `
                                    <div class="playingOverlay">
                                        <i class="far fa-pause-circle" style="position: absolute;"></i>
                                    </div>
										`
            console.log(playingGIFBlock)
        }
        else {
            let playingGIFBlock = document.getElementById(listTrack[i]._id);
            playingGIFBlock.innerHTML = ``;
        }
    }
}
function Play() {
    for (let i = 0; i < listTrack.length; i++) {
        if (listTrack[i]._id == id_play) {
            let playingGIFBlock = document.getElementById(id_play);
            playingGIFBlock.innerHTML = `
                                    <div class="playingOverlay">
                                        <img src="https://i.gifer.com/YdBO.gif" alt="this slowpoke moves"/>                            
                                    </div>
										`
            console.log(playingGIFBlock)
        }
        else {
            let playingGIFBlock = document.getElementById(listTrack[i]._id);
            playingGIFBlock.innerHTML = ``;
        }
    }
}