document.addEventListener('DOMContentLoaded', function() {

    /**
     * TODO: Initialiser l'état de la facture dès que la page est chargée
     * - Sélectionner toutes les lignes du tableau
     * - Appeler updateItemTotal sur chaque ligne pour recalculer les totaux existants
     * - Appeler updateInvoiceTotal pour afficher le total global correct
     */

    // Ces références seront réutilisées dans plusieurs fonctions
    const invoiceTable = document.getElementById('invoiceTable').getElementsByTagName('tbody')[0];
    const invoiceTotal = document.getElementById('invoiceTotal');



    /**
     * Fonction pour mettre à jour le total d'un article (ligne du tableau)
     * TODO:
     * - Récupérer les inputs .quantity et .unitPrice à l'intérieur de `row`
     * - Convertir leurs valeurs en nombres (parseFloat / Number)
     * - Calculer le total (quantité * prix)
     * - Mettre à jour la cellule .itemTotal avec un format à deux décimales
     * - Retourner le total calculé afin de pouvoir le réutiliser
     */
    function updateItemTotal(row) {
        const quantityInput = row.querySelector('.quantity');
        const priceInput = row.querySelector('.unitPrice');

        const quantity = Number(quantityInput.value);
        const price = Number(priceInput.value);

        const total = quantity * price;

        const itemTotal = row.querySelector('.itemTotal');

        itemTotal.textContent = total.toFixed(2);

        return total;
    }

    /**
     * Fonction pour mettre à jour le total global de la facture
     * TODO:
     * - Parcourir toutes les lignes du corps du tableau
     * - Utiliser updateItemTotal(row) pour récupérer chaque total (ou lire la cellule .itemTotal)
     * - Additionner tous les totaux de lignes
     * - Mettre à jour le texte de `invoiceTotal` avec la somme formatée en deux décimales
     */
    function updateInvoiceTotal() {
        const rows = invoiceTable.querySelectorAll('tr');

        let invoiceSum = 0;

        rows.forEach(function(row) {

            invoiceSum += updateItemTotal(row);

        });

        invoiceTotal.textContent = invoiceSum.toFixed(2);
    }

    /**
     * Fonction pour ajouter une nouvelle ligne d'article dans la facture
     * TODO:
     * - Créer un nouvel élément <tr>
     * - Ajouter les cellules nécessaires (nom, inputs quantité/prix, total)
     * - Veiller à ce que les inputs aient les mêmes classes que les autres lignes
     * - Ajouter des écouteurs d'événement sur les inputs pour recalculer les totaux en direct
     * - Insérer la nouvelle ligne dans `invoiceTable`
     * - Appeler updateInvoiceTotal pour recalculer le total global après l'ajout
     */
    let articleCount = 4;

    function addNewItem() {
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>Aarticle ${articleCount++}</td>

            <td>
                <input type="number" value="1" class="quantity" min="0">
            </td>

            <td>
                <input type="number" value="0" class="unitPrice" min="0" step="0.01">
            </td>

            <td class="itemTotal">0.00</td>
        `;

        const quantityInput = newRow.querySelector('.quantity');
        const priceInput = newRow.querySelector('.unitPrice');

        quantityInput.addEventListener('input', function() {
            updateInvoiceTotal();
        });

        priceInput.addEventListener('input', function() {
            updateInvoiceTotal();
        });

        invoiceTable.appendChild(newRow);

        updateInvoiceTotal();
    }

    const existingRows = invoiceTable.querySelectorAll('tr');

    existingRows.forEach(function(row) {

        const quantityInput = row.querySelector('.quantity');
        const priceInput = row.querySelector('.unitPrice');

        quantityInput.addEventListener('input', function() {
            updateInvoiceTotal();
        });

        priceInput.addEventListener('input', function() {
            updateInvoiceTotal();
        });

    });
    
    updateInvoiceTotal();

    window.addNewItem = addNewItem;
    /**
     * Bonus facultatif si les TODO précédents sont terminés:
     * - Ajouter un bouton "Supprimer" sur chaque ligne
     * - Lorsque l'utilisateur clique dessus, retirer la ligne et recalculer le total via updateInvoiceTotal
     */
 
});