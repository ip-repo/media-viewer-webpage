const loadLocalMediaButton = document.getElementById('load-local-media');
const mediaList = document.querySelector('.media-list');
const audioPlayer = document.querySelector('audio');
const videoPlayer = document.querySelector('video');
const imagePlayer = document.querySelector('img');
const mediaSectionTitle = document.querySelector('.media h2');

loadLocalMediaButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*,video/*,image/*';
    input.multiple = true;
    
    input.addEventListener('change', () => {
      const files = input.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
          const extension = file.name.split('.').pop().toLowerCase();
          if (extension === 'mp3' || extension === 'wav') {
            console.log()
            addMediaItem(file, 'audio');
          } else if (extension === 'mp4' || extension === 'avi' || extension === 'webm') {
            addMediaItem(file, 'video');
          } else if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
            addMediaItem(file, 'image');
          } else {
            alert('Invalid media file type.');
          }
        }
      }
    });
    input.click();
  });

mediaList.addEventListener('click', (event) => {
    const item = event.target;
    const type = item.dataset.type;
    const url = item.dataset.url;
    if (type === 'audio') {
        videoPlayer.pause();
        imagePlayer.style.display = 'none';
        audioPlayer.src = url;
        audioPlayer.style.display = 'block';
        videoPlayer.style.display = 'none';
        mediaSectionTitle.style.display = 'none';
    } else if (type === 'video') {
        audioPlayer.pause();
        imagePlayer.style.display = 'none';
        videoPlayer.src = url;
        videoPlayer.style.display = 'block';
        audioPlayer.style.display = 'none';
        mediaSectionTitle.style.display = 'none';
    } else if (type === 'image') {
        audioPlayer.pause();
        videoPlayer.pause();
        imagePlayer.src = url;
        imagePlayer.style.display = 'block';
        audioPlayer.style.display = 'none';
        videoPlayer.style.display = 'none';
        mediaSectionTitle.style.display = 'none';
    }
});

function addMediaItem(file, type) {
    const url = URL.createObjectURL(file);
    const listItem = document.createElement('li');
    listItem.textContent = file.name.substring(0, 30) + '...';
    listItem.dataset.type = type;
    listItem.dataset.url = url;
    const deleteButton = document.createElement('button');
    deleteButton.style.color = 'white';
    deleteButton.style.backgroundColor = '#5d8b84';
    deleteButton.style.border = 'solid 1px #f0e8e8';
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        audioPlayer.style.display = 'none';
        videoPlayer.style.display = 'none';
        imagePlayer.style.display = 'none';
        mediaSectionTitle.style.display = 'block';
        mediaSectionTitle.textContent = "Media section";
        document.querySelector('.toolbar h1').textContent = "Media Viewer";
        listItem.remove();
      });
    listItem.appendChild(deleteButton);
    listItem.addEventListener('click', () => {
      const mediaType = listItem.dataset.type;
      const mediaUrl = listItem.dataset.url;
      if (mediaType === 'audio') {
        audioPlayer.src = mediaUrl;
        audioPlayer.style.display = 'block';
        videoPlayer.style.display = 'none';
        imagePlayer.style.display = 'none';
      } else if (mediaType === 'video') {
        videoPlayer.src = mediaUrl;
        videoPlayer.style.display = 'block';
        audioPlayer.style.display = 'none';
        imagePlayer.style.display = 'none';
      } else if (mediaType === 'image') {
        imagePlayer.src = mediaUrl;
        imagePlayer.style.display = 'block';
        audioPlayer.style.display = 'none';
        videoPlayer.style.display = 'none';
      }
      mediaSectionTitle.textContent = file.name;
      document.querySelector('.toolbar h1').textContent = file.name;
    });
    mediaList.appendChild(listItem);
  }