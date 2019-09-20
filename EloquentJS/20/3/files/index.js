const filesUrl = window.location.href.match(/.*\//)[0];

const select = document.querySelector('select');
const page = document.querySelector('#page');

const files = fetch(filesUrl)
    .then((response) => response.text())
    .then((response) => response.split('\n'));

files.then((arr) => {
    arr.forEach((val, index) => {
        const node = document.createElement('option');

        node.value = val;
        node.textContent = val;

        select.appendChild(node);
    });

    pageSwitchTo(select, page, 0);
});

select.onchange = selectOnChange;

function selectOnChange(e) {
    const el = e.target;
    const index = el.selectedIndex;

    pageSwitchTo(el, page, index);
}

function pageSwitchTo(select, textarea, index) {
    const value = select.childNodes[index].value;
    const url = filesUrl + value;

    fetch(url)
        .then((response) => response.text())
        .then((response) => (textarea.value = response));
}

function post(e) {
    const url = filesUrl + select.childNodes[select.selectedIndex].value;

    fetch(url, {
        body: page.value,
        method: 'PUT',
    }).then(() => {
        if (url === window.location.href) window.location.reload();
    });

    e.preventDefault();
}
