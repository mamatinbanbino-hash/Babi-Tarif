function calculer() {
    const montant = parseFloat(document.getElementById('montant').value);
    const resultDiv = document.getElementById('resultats');
    
    if (montant <= 0 || !montant) {
        alert("Veuillez entrer un montant valide.");
        return;
    }

    // --- LOGIQUE RÉELLE CÔTE D'IVOIRE 2026 ---
    
    // Wave : 1% dès le départ (L'exception)
    const fraisWave = Math.ceil(montant * 0.01);

    // Orange, MTN, Moov : Gratuit si < 5000, sinon 1%
    const fraisStandard = (montant < 5000) ? 0 : Math.ceil(montant * 0.01);

    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div class="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm flex justify-between items-center mb-2">
            <div><p class="text-sm font-bold">Wave 🌊</p><p class="text-[10px] text-slate-400 italic">1% appliqué dès 1 FCFA</p></div>
            <p class="text-lg font-black text-blue-600">${fraisWave} FCFA</p>
        </div>
        <div class="bg-white p-4 rounded-xl border-l-4 border-orange-500 shadow-sm flex justify-between items-center mb-2">
            <div><p class="text-sm font-bold text-orange-600">Orange Money 🍊</p><p class="text-[10px] text-slate-400">${montant < 5000 ? '🔥 GRATUIT < 5000' : 'Frais standards'}</p></div>
            <p class="text-lg font-black text-orange-600">${fraisStandard} FCFA</p>
        </div>
        <div class="bg-white p-4 rounded-xl border-l-4 border-yellow-500 shadow-sm flex justify-between items-center mb-2">
            <div><p class="text-sm font-bold text-yellow-600">MTN MoMo 🟡</p><p class="text-[10px] text-slate-400">${montant < 5000 ? '🔥 GRATUIT < 5000' : 'Frais standards'}</p></div>
            <p class="text-lg font-black text-yellow-600">${fraisStandard} FCFA</p>
        </div>
        <div class="bg-white p-4 rounded-xl border-l-4 border-green-600 shadow-sm flex justify-between items-center">
            <div><p class="text-sm font-bold text-green-600">Moov Money 🟢</p><p class="text-[10px] text-slate-400">${montant < 5000 ? '🔥 GRATUIT < 5000' : 'Frais standards'}</p></div>
            <p class="text-lg font-black text-green-600">${fraisStandard} FCFA</p>
        </div>
    `;
}
