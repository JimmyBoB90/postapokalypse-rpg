
function senden() {
  const input = document.getElementById('charakterInput').value;
  const ausgabe = document.getElementById('ausgabe');
  ausgabe.innerHTML = '<p><em>Analyse wird durchgeführt...</em></p>';

  // Platzhalter für GPT-Anbindung
  setTimeout(() => {
    ausgabe.innerHTML = `<h2>Dein Charakter</h2>
      <p><strong>Beschreibung:</strong> ${input}</p>
      <p><strong>Startwaffe:</strong> Ziegelspalter – ein rostiger Türrahmen, umwickelt mit Draht.</p>
      <p><strong>Status:</strong> Hungrig, müde, entschlossen</p>`;
  }, 2000);
}
