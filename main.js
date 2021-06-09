
let favoriteSongs = [
  ['Kathy', 'Dont Worry Be Happy'],
  ['Noah', 'On Melancholy Hill'],
  ['Michale', '1 800 PAIN']
];

function addSongsToList() {
  // grab table from the dom
  let songTable = document.querySelector('#songTable');

  // for each items in the song list
  for(let i = 0; i < favoriteSongs.length; i++) {
      let songRow = document.createElement('tr');
      songRow.classList.add('mdc-data-table__row');

      // Appending the Name
      let cellName = document.createElement('td');
      cellName.className = 'mdc-data-table__cell';
      let name = favoriteSongs[i][0];
      cellName.append(name);
      songRow.append(cellName);

      // #region song Appending the song
      let cellSong = document.createElement('td');
      cellSong.className = 'mdc-data-table__cell';
      let song = favoriteSongs[i][1];
      cellSong.append(song);
      songRow.append(cellSong);
      // #endregion

      // append that back to the table
      songTable.append(songRow);
  }
}
