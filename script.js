// 1. Vérification de la Météo en direct d'Abidjan
async function verifierMeteo() {
    const alerteBox = document.getElementById('alerteMeteo');
    const tempDisplay = document.getElementById('temp');
    
    try {
        // Coordonnées GPS d'Abidjan : 5.36, -4.00
        const resp = await fetch('https://api.open-meteo.com/v1/forecast?latitude=5.36&longitude=-4.00&current_weather=true');
        const data = await resp.json();
        
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        
        tempDisplay.innerText = `${temp}°C`;

        // Si code météo >= 51, cela signifie qu'il y a de la pluie (bruine, forte pluie, etc.)
        if (code >= 51) {
            alerteBox.innerHTML = `
                <div class="bg-blue-600 text-white p-4 rounded-2xl mb-6 shadow-lg flex items-center gap-4 animate-pulse">
                    <i class="fas fa-cloud-showers-heavy text-3xl"></i>
                    <div>
                        <p class="font-bold">Il pleut à Babi ! 🌧️</p>
                        <p class="text-[10px] opacity-90">Attention : Les tarifs Yango et Taxis compteurs sont en hausse (x1.5).</p>
                    </div>
                </div>
            `;
        }
    } catch (e) {
        tempDisplay.innerText = "Abidjan";
    }
}

// 2. Calcul des frais comparés
function calculer() {
    const montant = document.getElementById('montant').value;
    const resultDiv = document.getElementById('resultats');
    
    if (montant <= 0 || !montant) {
        alert("Veuillez entrer un montant correct.");
        return;
    }

    // Tarifs types 2026 (À ajuster si les opérateurs changent)
    const wave = Math.ceil(montant * 0.01); // 1% fixe
    const orange = (montant <= 5000) ? 50 : Math.ceil(montant * 0.01); // Exemple simplifié
    const mtn = (montant <= 5000) ? 50 : Math.ceil(montant * 0.01);

    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div class="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm flex justify-between items-center transition hover:scale-105">
            <div><p class="text-sm font-bold">Wave</p><p class="text-[10px] text-slate-400">Dépôt gratuit</p></div>
            <p class="text-lg font-black text-blue-600">${wave} FCFA</p>
        </div>
        <div class="bg-white p-4 rounded-xl border-l-4 border-orange-500 shadow-sm flex justify-between items-center transition hover:scale-105">
            <div><p class="text-sm font-bold text-orange-600">Orange Money</p><p class="text-[10px] text-slate-400">Transfert national</p></div>
            <p class="text-lg font-black text-orange-600">${orange} FCFA</p>
        </div>
        <div class="bg-white p-4 rounded-xl border-l-4 border-yellow-500 shadow-sm flex justify-between items-center transition hover:scale-105">
            <div><p class="text-sm font-bold text-yellow-600">MTN MoMo</p><p class="text-[10px] text-slate-400">Via code USSD</p></div>
            <p class="text-lg font-black text-yellow-600">${mtn} FCFA</p>
        </div>
    `;
}

// Lancer la météo au chargement
window.onload = verifierMeteo;
