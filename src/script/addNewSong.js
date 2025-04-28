const addSongScreen = document.querySelector('.add-song-screen')

function openModal(){
    addSongScreen.style.display = "flex"

    addSongScreen.addEventListener('click', (e) => {
        if(e.target.id === 'add-song-screen'){
            closeModal()
        }
    })
}

function closeModal(){
    addSongScreen.style.display = "none"
}





const title = document.querySelector("#title-msc")
const author = document.querySelector("#author-msc")
const song = document.getElementById('file');
const cover = document.querySelector("#img-file")
const mensagem = document.querySelector("#mensagem");


song.addEventListener('change', function() {
    const arquivo = song.files[0]; // Pega o primeiro arquivo
    
    if (arquivo) {
      const nomeArquivo = arquivo.name || '';
      
      if (arquivo.type === 'audio/mpeg' || nomeArquivo.toLowerCase().endsWith('.mp3')) {
        mensagem.textContent = arquivo.name.replace(".mp3", "");
      } 
      else {
        mensagem.textContent = 'Por favor, selecione um arquivo MP3.';
        song.value = ''; // Limpa o input
      }
    } else {
      mensagem.textContent = 'Nenhum arquivo selecionado.';
    }
  });




function createSong(title, author, song, cover){
    console.log(cover.files[0])

    const tempURl = URL.createObjectURL(song.files[0])
    const tempURlImg = URL.createObjectURL(cover.files[0])
    let infoSong = {name: title.value, author: author.value, music: tempURl, cover: tempURlImg}
    
    renderMusicInfo(infoSong) 
    musics.push(infoSong)
    console.log(musics)
}

const addSongBtn = document.querySelector("#add-song-btn")

addSongBtn.addEventListener("click", () => {
    createSong(title, author, song, cover)

    contMusics+=1


    contMusic.innerHTML = contMusics
    closeModal()
})

