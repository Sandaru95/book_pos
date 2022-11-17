const tbody = document.getElementById('tbody');

// Function onLoad()
(() => {
    let tbodyInner = ``;
    items.map(item => tbodyInner += `
        <tr><th>${items.indexOf(item) + 1}</th><td>${item.title}</td><td>${item.isbn_no}</td><td>${item.qty}</td><td>${item.price}</td><td>${Number(item.qty) * Number(item.price)}</td></tr>
    `);
    tbody.innerHTML = tbodyInner;
})();