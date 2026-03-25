let modeActuel = 'direct';

function setMode(mode) {
    modeActuel = mode;
    document.getElementById('btn-direct').classList.toggle('active', mode === 'direct');
    document.getElementById('btn-dates').classList.toggle('active', mode === 'dates');
    
    document.getElementById('annees-direct').style.display = mode === 'direct' ? 'block' : 'none';
    document.getElementById('dates-grid').style.display = mode === 'dates' ? 'grid' : 'none';
}

function format(nb) {
    return Math.round(nb).toLocaleString('fr-FR') + " FCFA";
}

function calculer() {
    let indice = parseFloat(document.getElementById('indice').value);
    if (!indice) return alert("Saisissez un indice valide.");

    let annees = 0;
    if (modeActuel === 'direct') {
        annees = parseFloat(document.getElementById('annees-direct').value);
    } else {
        let d1 = new Date(document.getElementById('date-debut').value);
        let d2 = new Date(document.getElementById('date-fin').value);
        if (isNaN(d1) || isNaN(d2) || d2 <= d1) return alert("Vérifiez les dates.");
        annees = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24 * 365.25));
    }

    if (!annees || annees <= 0) return alert("Années de service invalides.");
    if (annees > 40) annees = 40; // Plafond légal à 80%

    let enfants = parseInt(document.getElementById('enfants').value) || 0;
    enfants = Math.min(Math.max(enfants, 0), 4);

    let taux = annees * 2;
    let base = (indice * 2331 * taux) / 100;
    let maj = enfants * 17912;
    let total = base + maj;

    document.getElementById('res-annees').innerText = annees + " ans";
    document.getElementById('res-taux').innerText = taux + " %";
    document.getElementById('res-base').innerText = format(base);
    document.getElementById('res-maj').innerText = format(maj);
    document.getElementById('res-annuel').innerText = format(total);
    document.getElementById('res-mensuel').innerText = format(total / 12);

    document.getElementById('result-box').style.display = 'block';
    document.getElementById('result-box').scrollIntoView({ behavior: 'smooth' });
}
