
function senden() {
  const input = document.getElementById('charakterInput').value;
  const ausgabe = document.getElementById('ausgabe');
  ausgabe.innerHTML = '<p><em>Analyse wird durchgeführt...</em></p>';

async function senden() {
  const input = document.getElementById('charakterInput').value;
  const ausgabe = document.getElementById('ausgabe');
  ausgabe.innerHTML = '<p><em>Analyse wird durchgeführt...</em></p>';

  const apiKey = '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'; // z. B. 'sk-abc123...'

  const systemPrompt = `
Du bist der Spielleiter eines postapokalyptischen Rollenspiels im Stil von "The Road". 
Ein Spieler beschreibt seinen Charakter frei. Du liest seine Beschreibung und schätzt realistisch 7 Charakterwerte ein:
Verstand, Stärke, Ausdauer, Instinkt, Empathie, Willenskraft, Wissen (1–5 Punkte, maximal 25 insgesamt).
Dann gibst du ihm eine zufällige improvisierte Waffe. Alles stimmungsvoll und erzählerisch. Keine Tabellen.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4", // oder "gpt-3.5-turbo" wenn du sparen willst
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input }
      ],
      temperature: 0.8
    })
  });

  const data = await response.json();
  const gptAntwort = data.choices[0].message.content;

  ausgabe.innerHTML = `<h2>Dein Charakter</h2><p>${gptAntwort.replace(/\n/g, "<br>")}</p>`;
}

