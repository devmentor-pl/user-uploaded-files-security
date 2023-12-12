document.querySelector('.uploader__input').addEventListener('change', validateFiles);

function validateFiles(e) {
  const filesCount = e.target.files.length;
  const filesSize = [...e.target.files].reduce((totalSize, file) => {
    return totalSize + file.size;
  }, 0);
  const permittedCharsRegex = /^[a-zA-Z0-9\-._\s]+$/;
  const wrongFileNames = [];
  const tooLongFileNames = [];
  const wrongFileTypes = [];

  if (filesCount > 5) {
    console.log('Przekroczono limit plików. Wgraj maksymalnie 5 plików.');
    return;
  }

  if (filesSize > 100000) {
    console.log('Przekroczono łączny limit wielkości plików.');
    return;
  }

  for (const file of e.target.files) {
    if (file.name.length > 45) {
      tooLongFileNames.push(file.name);
    }
    if (!permittedCharsRegex.test(file.name)) {
      wrongFileNames.push(file.name);
    }
    if (!file.name.includes('.csv') && !file.type === 'text/csv') {
      wrongFileTypes.push(file.name);
    }
  }

  if (tooLongFileNames.length > 0) {
    console.log(
      `Następujące pliki mają za długie nazwy: ${tooLongFileNames.join(', ')}. Dozwolona liczba znaków: 45.`
    );
    return;
  }
  if (wrongFileNames.length > 0) {
    console.log(
      `Następujące pliki zawierają niedozwolone znaki: ${wrongFileNames.join(', ')}. Dozwolone: litery, liczby, kropka, minus, podkreślnik i spacja.`
    );
    return;
  }
  if (wrongFileTypes.length > 0) {
    console.log(
      `Następujące pliki mają nieprawidłowy typ: ${wrongFileNames.join(', ')}. Wgraj pliki CSV.`
    );
    return;
  }

  // możemy zająć się obsługą plików
  const reader = new FileReader();
  // ...
}
