const titleText = document.getElementById('newTitle');
const txtLyrics = document.getElementById('txtLyrics');
const fencySearch = document.getElementById('fencySearch');
const fullLyricSection = document.getElementById('fullLyricSection');

async function  fetchDataSection(url, searchValue, callType){
    try{
        if(searchValue.length){
            let  fetchResult = await fetch(url+searchValue);
            if(fetchResult.ok){
                let response = await fetchResult.json();
                console.log(response);
                if(callType == 'submit'){
                    displaySearchData(response);
                    txtLyrics.value = '';
                }
                else{
                    lyricsData(response, searchValue);
                }
            }
            else{
                if(callType=='lyrics'){
                    lyricsData({}, 'Currently no song is selected or this song has no lyrics available.');
                    fullLyricSection.innerHTML = "";
                    txtLyrics.value = '';
                }
                return;
            }
        }
        else{
            txtLyrics.value = '';
            return;
        }
    }catch(e){
        console.log(e);
    }
    
}


function displaySearchData(d){
    const data = d.data;
    let singleLyricSection = '';
    if(data.length <=0){
        fencySearch.innerHTML =
        `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-12 pl-3">
                <h3 class="lyrics-name text-center">Nothing to show.</h3>
            </div>
        </div>`
        return;
    }
    for(let i=0; i<10; i++){
        singleLyricSection += 
        `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${data[i].title_short}</h3>
                <p class="author lead">Album by <span>${data[i].artist.name}</span> <span class="text-danger pl-5">${data[i].album.title}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="fetchDataSection('https://api.lyrics.ovh/v1/${data[i].artist.name}/', '${data[i].title}', 'lyrics')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`
    }
    fencySearch.innerHTML = singleLyricSection;
    lyricsData({}, 'Currently no song is selected or this song has no lyrics available.');
    fullLyricSection.innerHTML = "";   
}

function lyricsData(d, title){
    titleText.innerText = title;
    if(d.lyrics == undefined){
        return;
    }
    else{
        fullLyricSection.innerHTML = d.lyrics;
    }
    
}
