const inp = document.getElementById("input")
const btn = document.getElementById("buttonChck")
const result = document.getElementById("result")
inp.focus()

inp.addEventListener('keypress', function check(e) {
    const key = e.keyCode;
    if (key >= 48 && key <= 57) {
        //add check if data is selected, to overrite it
        if (inp.value.length >= 9) e.preventDefault();
    } else if (key == 13) {
        btn.click()
        // start()
    } else e.preventDefault();
});

inp.addEventListener("paste", function check(e) {
    const pasted = e.clipboardData.getData('Text');
    if (isNaN(pasted)) {
        e.preventDefault()
    } else if (inp.value.length + pasted.length > 9) {
        e.preventDefault();
        inp.value += "" + pasted.slice(0, 9 - inp.value.length)
    }
})

function start() {
    if (inp.value == "" || isNaN(inp.value)) {
        inp.focus()
        return
    }
    
    if (inp.value.length > 9) inp.value = inp.value.slice(0, 9)
    while (inp.value.length < 9) inp.value = "0" + inp.value
    result.innerText = ""
    result.innerText = algo(inp.value)
    setTimeout(function () {
        inp.value = ""
        result.innerText = '';
    }, 450);

    inp.focus()
}

function algo(id) {
    const iven = parseFloat(id.slice(0, 1)) +
        parseFloat(id.slice(2, 3)) + parseFloat(id.slice(4, 5)) +
        parseFloat(id.slice(6, 7)) + parseFloat(id.slice(8, 9))

    const arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
    const odd = arr[id.slice(1, 2)] + arr[id.slice(3, 4)] +
        arr[id.slice(5, 6)] + arr[id.slice(7, 8)]

    return ((iven + odd) % 10 == 0)
}