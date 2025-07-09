

async function senden() {
  const input = document.getElementById('charakterInput').value;
  const ausgabe = document.getElementById('ausgabe');
  ausgabe.innerHTML = '<p><em>Analyse wird durchgeführt...</em></p>';

  const apiKey = 'sk-DEIN_RICHTIGER_API_KEY_HIER';

  const systemPrompt = `
Du bist der Spielleiter eines postapokalyptischen Rollenspiels in Zentraleuropa, inspiriert von "The Road".
Der Spieler beschreibt seinen Charakter frei. Du analysierst die Beschreibung und gibst zurück:
- Eine erzählerische Zusammenfassung der Figur
- Eine improvisierte Startwaffe
- Die 7 Stats: Verstand, Stärke, Ausdauer, Instinkt, Empathie, Willenskraft, Wissen (1–5 Punkte, max. 25 insgesamt)
Alles atmosphärisch, kein Tabellenstil.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4", // oder "gpt-3.5-turbo"
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input }
        ],
        temperature: 0.85
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const gptAntwort = data.choices[0].message.content;
      ausgabe.innerHTML = `<h2>Dein Charakter</h2><p>${gptAntwort.replace(/\n/g, "<br>")}</p>`;
    } else {
      // API hat keine gültige Antwort zurückgegeben
      ausgabe.innerHTML = `<p><strong>Fehler:</strong> Keine gültige Antwort erhalten.<br>
      <code>${JSON.stringify(data, null, 2)}</code></p>`;
    }

  } catch (error) {
    ausgabe.innerHTML = `<p><strong>Verbindungsfehler:</strong> ${error.message}</p>`;
  }
}
