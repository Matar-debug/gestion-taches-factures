document.addEventListener('DOMContentLoaded', () => {
    const invoiceList = [];
    const invoiceListElement = document.getElementById('invoiceList');

    const clientNameInput = document.getElementById('clientName');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const dueDateInput = document.getElementById('dueDate');
    const saveInvoiceBtn = document.getElementById('saveInvoiceBtn');

    // Ajouter une facture
    saveInvoiceBtn.addEventListener('click', () => {
        const clientName = clientNameInput.value.trim();
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const dueDate = dueDateInput.value;

        if (clientName && description && !isNaN(amount) && dueDate) {
            const newInvoice = {
                clientName,
                description,
                amount: amount.toFixed(2),
                dueDate,
                status: 'En attente',
            };

            invoiceList.push(newInvoice);
            renderInvoices();

            // Réinitialiser les champs
            clientNameInput.value = '';
            descriptionInput.value = '';
            amountInput.value = '';
            dueDateInput.value = '';

            // Fermer le modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('createInvoiceModal'));
            modal.hide();
        }
    });

    // Afficher les factures
    function renderInvoices() {
        invoiceListElement.innerHTML = invoiceList.map((invoice, index) => `
            <tr>
                <td>${invoice.clientName}</td>
                <td>${invoice.amount} €</td>
                <td>${invoice.dueDate}</td>
                <td>${invoice.status}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="markAsPaid(${index})">Payer</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteInvoice(${index})">Supprimer</button>
                </td>
            </tr>
        `).join('');
    }

    // Marquer comme payé
    window.markAsPaid = (index) => {
        invoiceList[index].status = 'Payée';
        renderInvoices();
    };

    // Supprimer une facture
    window.deleteInvoice = (index) => {
        invoiceList.splice(index, 1);
        renderInvoices();
    };

    renderInvoices();
});
