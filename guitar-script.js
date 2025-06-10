const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const scales = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  locrian: [0, 1, 3, 5, 6, 8, 10],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
  melodicMinor: [0, 2, 3, 5, 7, 9, 11],
};

const fretMarkers = [3, 5, 7, 9, 12];

const defaultTunings = {
  6: ['E', 'A', 'D', 'G', 'B', 'E'],
  7: ['B', 'E', 'A', 'D', 'G', 'B', 'E'],
  8: ['F#', 'B', 'E', 'A', 'D', 'G', 'B', 'E']
};

const tuningPresets = {
  standard: {
    6: ['E', 'A', 'D', 'G', 'B', 'E'],
    7: ['B', 'E', 'A', 'D', 'G', 'B', 'E'],
    8: ['F#', 'B', 'E', 'A', 'D', 'G', 'B', 'E']
  },
  dropD: {
    6: ['D', 'A', 'D', 'G', 'B', 'E'],
    7: ['A', 'E', 'A', 'D', 'G', 'B', 'E'],
    8: ['E', 'A', 'E', 'A', 'D', 'G', 'B', 'E']
  },
  dropC: {
    6: ['C', 'G', 'C', 'F', 'A', 'D'],
    7: ['G', 'C', 'G', 'C', 'F', 'A', 'D'],
    8: ['D', 'G', 'C', 'G', 'C', 'F', 'A', 'D']
  },
  openG: {
    6: ['D', 'G', 'D', 'G', 'B', 'D']
  },
  openD: {
    6: ['D', 'A', 'D', 'F#', 'A', 'D']
  }
};

function updateStringCount() {
  const stringCount = parseInt(document.getElementById('stringCount').value);
  const fretboard = document.getElementById('fretboard');
  fretboard.innerHTML = '';

  const tuning = defaultTunings[stringCount] || defaultTunings[6];

  for (let i = 0; i < stringCount; i++) {
    const stringWrapper = document.createElement('div');
    stringWrapper.className = 'string-wrapper';

    const select = document.createElement('select');
    select.className = 'tuning-input';

    notes.forEach(note => {
      const option = document.createElement('option');
      option.value = note;
      option.textContent = note;
      if (tuning[i] === note) option.selected = true;
      select.appendChild(option);
    });

    select.addEventListener('change', generateFretboard);
    stringWrapper.appendChild(select);

    const stringRow = document.createElement('div');
    stringRow.className = 'string-row';

    for (let fret = 0; fret <= 12; fret++) {
      const fretDiv = document.createElement('div');
      fretDiv.className = 'fret';

      if (fretMarkers.includes(fret) && i === 0) {
        const marker = document.createElement('div');
        marker.className = 'fretboard-marker';
        fretDiv.appendChild(marker);
      }

      stringRow.appendChild(fretDiv);
    }

    stringWrapper.appendChild(stringRow);
    fretboard.appendChild(stringWrapper);
  }

  generateFretboard();
}

function generateFretboard() {
  const root = document.getElementById('rootNote').value;
  const scale = document.getElementById('scale').value;
  const scaleNotes = scales[scale].map(i => notes[(notes.indexOf(root) + i) % 12]);
  const tuningInputs = document.querySelectorAll('.tuning-input');
  const stringRows = document.querySelectorAll('.string-row');

  tuningInputs.forEach((input, i) => {
    const startIndex = notes.indexOf(input.value);
    const stringRow = stringRows[i];

    Array.from(stringRow.children).forEach((fretDiv, fret) => {
      const note = notes[(startIndex + fret) % 12];
      fretDiv.classList.remove('active');
      fretDiv.textContent = '';

      if (scaleNotes.includes(note)) {
        fretDiv.classList.add('active');
        fretDiv.textContent = note;
      }

      const marker = fretDiv.querySelector('.fretboard-marker');
      if (marker) fretDiv.appendChild(marker); // Keep marker centered
    });
  });
}

document.getElementById('rootNote').addEventListener('change', generateFretboard);
document.getElementById('scale').addEventListener('change', generateFretboard);
document.getElementById('stringCount').addEventListener('change', updateStringCount);

window.addEventListener('DOMContentLoaded', updateStringCount);
