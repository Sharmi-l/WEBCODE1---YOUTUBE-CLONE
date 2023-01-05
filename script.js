

// my api key
// AIzaSyB8q0zVk8Z4MM4epT9dAJfS_oCc-rFImi4

// channel list:

// GET https://www.googleapis.com/youtube/v3/channels



let menubarLists = document.getElementsByClassName("shortcuts");
let sidebar = document.getElementsByClassName("sidebar");

menubarLists.onclick = function() {

    sidebar.classList.toggle("small-sidebar")
}


// Fetch API for  Retrieve channel information and Uploaded videos and system-generated playlists

let videosUpload = document.getElementsByClassName("video-container");

let API_key = "AIzaSyB8q0zVk8Z4MM4epT9dAJfS_oCc-rFImi4";

let video_http = "https://www.googleapis.com/youtube/v3/videos?";


let channel_http = "https://www.googleapis.com/youtube/v3/channels";


fetch(video_http + new URLSearchParams({
    key: API_key,
    part:'Snippet',
    chart :'mostPopular',
    maxResults : 25,
    regionCode : 'IN'
}))
.then(res => res.json())
.then(data => {
    // console.log(data);
    data.items.forEach(item => {
        getChannel(item);
    })
})
.catch(error =>console.log(error));


const getChannel =(video_info) => { 
    fetch(channel_http + new URLSearchParams({
       key : API_key,
       part : 'snippet',
       id : video_info.snippet.channelId
    }))
    .then(res => res.json())
    .then (data =>{
    //    console.log(data);
    //    video_data = data.items[0].snippet.thumbnails.default.url;
       video_info.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
       console.log(video_info);
       Card_design(video_info);
    })

}

const  Card_design = (data)=>{
    videosUpload.innerHTML += 
    `
    <div class="videos" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'" >
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail">
    <img src="${data.channelThumbnail}" class="channel-icon1">
    <div class="info">
        <h4 class="title">${data.snippet.title}</h4>
        <p class="channel-name">${data.snippet.channelTitle}</p>
    </div>
    </div>`
    
}  
    

//Search-bar:

const input_search = document.querySelector('.search');
const searchIcon_click = document.querySelector('.search-icon');
let searchLink = "https://www.youtube.com/results?search_query=";

searchIcon_click.addEventListener('click', () => {
   if(input_search.value.length){
       location.href = searchLink + input_search.value;
   }
})




const Userid = 'UCwJ0ddm6BweKtQxyRCi66sQ';
 

 let detailData = ()=>{
   fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${Userid}&key=${api_key}`)
     .then(response => {
         return response.json()
     })
     .then(data => {
         console.log(data);
         subscriberCount.value = data["items"][0].statistics.subscriberCount;
         viewdetails.value = data["items"][0].statistics.viewCount;
         videocount.value = data["items"][0].statistics.videoCount;
         
     })
 }
 detailData();

