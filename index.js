document.addEventListener('DOMContentLoaded', async () => {
    const songsList = await fetchSongs();
    const genreList = new Set();
    genreList.add('all');
    songsList.forEach(song => {
        genreList.add(song.genre);
    });

    genreList.forEach(genre => {
        const option = document.createElement('option');
        option.textContent = genre;
        option.value = genre;
        genreOptionsTag.appendChild(option);
    });
    
    showSongs(songsList,'genre','all');
   
    genreOptionsTag.addEventListener('change', () => {showSongs(songsList)});

    searchSongInput.addEventListener('input', () => {
        const searchTerm = searchSongInput.value.toLowerCase();
        const filteredSongs = songsList.filter(song => song.name.toLowerCase().includes(searchTerm));
        showSongs(filteredSongs);
    })
  
    renderCurrentSong(songsList[0]);
    // console.log(songsDiv);

    prevBtn.addEventListener('click', () => {
        if (currentSong === 1) return;
        currentSong -= 1;
        const songObj = songsList.find(song => song.id === currentSong);
        renderCurrentSong(songObj);
        playMusic(songObj);
        checkBtnStatus(songsList.length);
        highlightCurrentSongById(songsList,currentSong);
    });
    nextBtn.addEventListener('click', () => {
        if (currentSong === songsList.length) return;
        currentSong += 1;
        const songObj = songsList.find(song => song.id === currentSong);
        renderCurrentSong(songObj);
        playMusic(songObj);
        checkBtnStatus(songsList.length);
        highlightCurrentSongById(songsList,currentSong);
    });    
  
    createPlaylistBtn.addEventListener('click', () => {
        if (playlistInput.value && !playlists.hasOwnProperty(playlistInput.value)) {
            createPlaylist(songsList);
        } else if (playlists.hasOwnProperty(playlistInput.value)) {
            alert('Already a playlist with the name');
        }
    });    

    addToPlaylistBtn.addEventListener('click', () => {
        if (Object.keys(playlists).length === 0) {
            alert('No playlist created...');
            return;
        }
        if (playlists[selectedPlaylist].includes(currentSong)) {
            alert('Song already in playlist');
            return;
        }
        playlists[selectedPlaylist].push(currentSong);
        renderPlaylistSong(songsList);
        addPlaylistSongListeners(songsList);
        highlightCurrentSongById(songsList, currentSong);
    });    
   
    themeChangeBtn.addEventListener('click', toggleTheme);
  });
  