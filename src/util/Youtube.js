export function getYoutubeLink(name, artist) {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBhdxjToxjGIcG4AWCJaIh_J9sgOtjPSnI&q=${name}${artist}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.items[0].id.videoId);
      let search = data.items[0].id.videoId;
      window.open(`https://www.youtube.com/watch?v=${search}`, "_blank");
    });
}
