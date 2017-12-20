//var translate = {
//    fr: {
//        // header
//        title: '',
//        search: '',
//        // landing items
//        news: '',
//        top: '',
//        love: '',
//        // filters
//        all: '',
//        action: '',
//        horror: '',
//        animation: '',
//        comedy: ''
//    },
//    en: {
//        // header
//        title: '',
//        search: '',
//        // landing items
//        news: '',
//        top: '',
//        love: '',
//        // filters
//        all: '',
//        action: '',
//        horror: '',
//        animation: '',
//        comedy: ''
//    }
//}
//
//function getAllUrlParams(url) {
//  // get query string from url (optional) or window
//  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
//
//  // we'll store the parameters here
//  var obj = {};
//
//  // if query string exists
//  if (queryString) {
//
//    // stuff after # is not part of query string, so get rid of it
//    queryString = queryString.split('#')[0];
//
//    // split our query string into its component parts
//    var arr = queryString.split('&');
//
//    for (var i=0; i<arr.length; i++) {
//      // separate the keys and the values
//      var a = arr[i].split('=');
//
//      // in case params look like: list[]=thing1&list[]=thing2
//      var paramNum = undefined;
//      var paramName = a[0].replace(/\[\d*\]/, function(v) {
//        paramNum = v.slice(1,-1);
//        return '';
//      });
//
//      // set parameter value (use 'true' if empty)
//      var paramValue = typeof(a[1])==='undefined' ? true : a[1];
//
//      // (optional) keep case consistent
//      paramName = paramName.toLowerCase();
//      paramValue = paramValue.toLowerCase();
//
//      // if parameter name already exists
//      if (obj[paramName]) {
//        // convert value to array (if still string)
//        if (typeof obj[paramName] === 'string') {
//          obj[paramName] = [obj[paramName]];
//        }
//        // if no array index number specified...
//        if (typeof paramNum === 'undefined') {
//          // put the value on the end of the array
//          obj[paramName].push(paramValue);
//        }
//        // if array index number specified...
//        else {
//          // put the value at that index number
//          obj[paramName][paramNum] = paramValue;
//        }
//      }
//      // if param name doesn't exist yet, set it
//      else {
//        obj[paramName] = paramValue;
//      }
//    }
//  }
//
//  return obj;
//}

function capture(){
    var canvas = document.getElementById('can');
    var video = document.getElementById('videoPlayer');
    canvas.getContext('2d').drawImage(video, 0, 0, 1280, 720);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* initialisation du player video */
//var video = new videoPlayer('.player', {
//    // Parameters
//    autoplay: false,
//    loop: false,
//    defaultVolume: 60
//}, data.films);

/* variables */
var lang = '';
var filter = 'all';

var filters_btn = document.querySelectorAll('.filter-btn');

var movieContainer = document.querySelector('.movieContainer');
var imgContainer = '';

var videos_thumbnails = document.querySelector('.video-thumbnail');

var modal = document.querySelector('.modal');

var closeModalBtn = document.querySelector('.closeModal');

var voteSaved = false;
var note = 0;
var voteMsg = document.querySelector('p.voteMsg');

var film = {};

closeModalBtn.addEventListener('click', function(e){
    e.preventDefault();
    closeModal();
    
    voteSaved = false;
    note = 0;
    voteMsg.textContent = '';
    
    film = {};
});

filters_btn.forEach(function(els){
    els.addEventListener('click', function(e){
        e.preventDefault();
        
        if(els.getAttribute('data') != filter){
            var length = filters_btn.length;
            
            for (var i = 0; i < length; i++) {
                   filters_btn[i].classList.remove('active');
            }
            
            filter = els.getAttribute('data');
            els.classList.add('active');

            setThumbnails(data.films);
        }
    });
});

setThumbnails(data.films);

async function setThumbnails(element) {
    if(movieContainer.innerHTML != ''){
        imgContainer = document.querySelectorAll('.imgContainer');
        
        imgContainer.forEach(function(els){
            els.classList.add('hidden');
        });
        
        await sleep(300);
    }
    
    movieContainer.innerHTML = '';
    
    element.forEach(function(e){
        var html = '<div class="imgContainer video-thumbnail hidden" data="'+e.id+'" style="background: url(./data/thumbnails/'+e.id+'.jpg);"><div class="overlay"><span>'+e.title+'</span></div></div>';
        
        if(filter == 'all'){
            movieContainer.innerHTML += html;
        }else if(filter == 'action' && e.category == 'Action'){
            movieContainer.innerHTML += html;
        }else if(filter == 'horror' && e.category == 'Horror / Thriller'){
            movieContainer.innerHTML += html;
        }else if(filter == 'animation' && e.category == 'Animation'){
            movieContainer.innerHTML += html;
        }else if(filter == 'comedy' && e.category == 'Comedy'){
            movieContainer.innerHTML += html;
        }
    });
    
    await sleep(300);
    
    imgContainer = document.querySelectorAll('.imgContainer');
    
    imgContainer.forEach(function(els){
        els.classList.remove('hidden');
    });
    
    var videos_thumbnails = document.querySelectorAll('.video-thumbnail');
        
    videos_thumbnails.forEach(function(els){
        els.addEventListener('click', function(e){
            videoID = e.path[1].getAttribute('data');
            openModal(videoID);
        });
    });
}
        
/* on definie la langue */
//if(getAllUrlParams().lang == 'en'){
//    lang = 'en'
//}else{
//    lang = 'fr'
//}

/* Open modal */
async function openModal(videoID){
    document.body.style.overflow = 'hidden';
    modal.style.display = 'initial';
    
    for(var i = 0; i < marks.length; i++){
        marks[i].classList.remove('active');
    }
    
    await sleep(100);
    
    modal.style.opacity = 1;
    
    var video = {};
    
    data.films.forEach(function(el){
        if(el.id == videoID){
            video = el;
            return el;
        }
    });
    
    film = {
        title: document.querySelector('.filmTitle'),
        time: document.querySelector('.filmTime'),
        don: document.querySelector('.don'),
        type: document.querySelector('.filmType'),
        authorText: document.querySelector('.filmAuthorText'),
        author: document.querySelector('.filmAuthor'),
        year: document.querySelector('.filmYear'),
        desc: document.querySelector('.filmDescription'),
        note: document.querySelector('.filmNote')
    }
    
    film.title.textContent = video.title;
    film.time.textContent = video.duration;
//    film.don.textContent = '';
//    film.type.textContent = video.title;
//    film.authorText.textContent = video.title;
//    film.author.textContent = video.title;
//    film.year.textContent = video.title;
//    film.desc.textContent = video.title;
//    film.note.textContent = video.title;
    console.log(video.id);
}

/* Close modal */
async function closeModal(){
    modal.style.opacity = 0;
    
    await sleep(300);
    
    document.body.style.overflow = '';
    modal.style.display = 'none';
}

/* Vote */
var marks = document.querySelectorAll('.markUser');

for(var i = 0; i < marks.length; i++){
    marks[i].addEventListener('mouseover', function(e){
        if(voteSaved === false){
            note = e.srcElement.getAttribute('data');

            for(var i = 0; i < note; i++){
                marks[i].classList.add('active');
            }
        }
    });

    marks[i].addEventListener('mouseout', function(e){
        if(voteSaved === false){
            for(var i = 0; i < note; i++){
                marks[i].classList.remove('active');
            }
        }
    });
    
    marks[i].addEventListener('click', function(e){
        if(voteSaved === false){
            voteSaved = true;
            note = e.srcElement.getAttribute('data');

            for(var i = 0; i < note; i++){
                marks[i].classList.add('active');
            }
            
            voteMsg.textContent = 'Note enregistrée !';
        }
    });
}

//video.set('a5dMxYp');