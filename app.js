function submitVideo(event){
    event.preventDefault();
   const form = document.getElementById("form");
   const name=form.name.value;
   const email=form.email.value;
   const title=form.video_title.value;
//    const video=form.video.value;


    const imageInput = form.picture;
    const image = imageInput.files[0];
    const imagePath = URL.createObjectURL(image);

    const videoInput = form.video;
    const video = videoInput.files[0];
    const videoPath = URL.createObjectURL(video);

const videosId=document.getElementById("videos");
const div=document.createElement("div");
div.classList.add("col");
div.innerHTML=`
        <div class="card h-100">
        <div class="video-inner">
            <video muted class="w-100" controls src="${videoPath}"></video>
        </div>
        <div class="card-body">
            <h5 class="card-title">${title}</h5>

        </div>
        <div class="card-footer d-flex align-items-center">
            <div class="user-img">
                <img class="img-fluid" src="${imagePath}" alt=""> 
            </div>
            <div class="user-details ms-3">
                <h5 class="user-name">${name}</h5>
                <p class="user-email">${email}</p>
            </div>
        </div>
        </div>
`
videosId.appendChild(div);


form.reset()
}
const videosId=document.getElementById("videos");


const screenWidth = window.screen.width;
const mediaQuery = window.matchMedia('(max-width: 667px)');



videosId.addEventListener("touchstart",function(){
    const videos=this.querySelectorAll(".col")
    for(var i=0;i<videos.length;i++){
        videos[i].addEventListener("click",function(event){


            const element=this;
            const videoSrc=element.querySelector("video").src;
            const title=element.querySelector(".card-title").innerText;
            const userImgSrc=element.querySelector(".user-img img").src;
            const userName=element.querySelector(".user-name").innerText
            const userEmail=element.querySelector(".user-email").innerText
            const videoInner=document.querySelector("#display-video-inner");
            videoInner.innerHTML=`
                <div id="display-videos" class="col">
                    <video class="w-100 " controls src="${videoSrc}"></video>
                    <i onclick="popupVideo('${videoSrc}')" id="popup-btn" class="fa-solid fa-photo-film position-absolute text-white"></i>
                </div>
                <div class="display-video-ditails p-3 m-2 ">
                    <h4 class="user-title">${title}</h4>
                    <div class="div d-flex align-items-center">
                        <div class="user-img">
                            <img class="img-fluid" src="${userImgSrc}" alt="">
                        </div>
                        <div class="user-details ms-3">
                            <h5 class="user-name">${userName}</h5>
                            <p class="user-email">${userEmail}</p>
                        </div>
                    </div>
                </div>
                    `
            videoInner.querySelector("video").play();
        })
    }
});
videosId.addEventListener("mouseenter",function(){

        this.querySelectorAll("video").forEach(ele=>{
            ele.addEventListener("mouseover",function(){
                this.play();
                this.playbackRate = 2;
            })
            ele.addEventListener("mouseout",function(){
                this.pause();
            })
            ele.addEventListener("click",function(event){
                displayVideo(event)
            })
        })
})


const displayVideo=(event)=>{
    const element=event.target.parentNode.parentNode;
    const videoSrc=event.target.src;
    const title=element.querySelector(".card-title").innerText;
    const userImgSrc=element.querySelector(".user-img img").src;
    const userName=element.querySelector(".user-name").innerText
    const userEmail=element.querySelector(".user-email").innerText

    console.log(videoSrc,userImgSrc)
    const videoInner=document.querySelector("#display-video-inner");
    videoInner.innerHTML=`
        <div id="display-videos" class="col">
            <video class="w-100 " controls src="${videoSrc}"></video>
            <i onclick="popupVideo('${videoSrc}')" id="popup-btn" class="fa-solid fa-photo-film position-absolute text-white"></i>
        </div>
        <div class="display-video-ditails p-3 m-2 ">
            <h4 class="user-title">${title}</h4>
            <div class="div d-flex align-items-center">
                <div class="user-img">
                    <img class="img-fluid" src="${userImgSrc}" alt="">
                </div>
                <div class="user-details ms-3">
                    <h5 class="user-name">${userName}</h5>
                    <p class="user-email">${userEmail}</p>
                </div>
            </div>
        </div>
            `
    videoInner.querySelector("video").play();
}

let isPlayingPopUp;
function popupVideo(videoSrc){
    isPlayingPopUp=true;
    const mainVideo=document.querySelector("#display-videos video");
    const cTime=mainVideo.currentTime;
    // alert(cTime)
    mainVideo.src="";
    mainVideo.pause();
   const popupelement=document.getElementById("popup-container");
   popupelement.style.display="block";

   popupelement.innerHTML=`
   <video class="w-100 "  src="${videoSrc}"></video>
   <i onclick="playPusePopup(event)" class="fa-solid fa-play position-absolute top-100 start-50 translate-middle"></i>
   <i onclick="backPopUp(event)" class="fa-sharp fa-solid fa-xmark position-absolute top-0 end-0"></i>
   `;
   popupelement.querySelector("video").play();
   popupelement.querySelector("video").currentTime=cTime;
}


function playPusePopup(event){
    if(!isPlayingPopUp){
        event.target.parentNode.querySelector("video").play();
    }
    else{
        event.target.parentNode.querySelector("video").pause();

    }
    isPlayingPopUp=!isPlayingPopUp;
}

function backPopUp(event){
    const popVideo=event.target.parentNode.querySelector("video");
    const time=popVideo.currentTime;
    const src=popVideo.src;

    const popupelement=document.getElementById("popup-container");
    popupelement.innerHTML="";
   popupelement.style.display="none";


    const mainVideo=document.querySelector("#display-videos video");
    mainVideo.src=src;
    mainVideo.currentTime=time;
    mainVideo.play();
}