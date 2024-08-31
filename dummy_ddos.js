console.log("Hello there. My name is JS.")

// arrLen -> Amount of buttons available to testing
const arrLen = 20
var numba = Array(arrLen).fill().map((_) => -1)

const rootURI = "http://localhost:6969"

var loading = document.getElementsByClassName("loading")
document.getElementById("reset").setAttribute("disabled", "")

setTimeout(() => {
    loading[0].remove()

    LoadButtons()

    document.getElementById("reset").removeAttribute("disabled")
}, 250)


/**
* @param {string} btn_id_name
* @param {function} btn_function
* @param {string} btn_text
* @param {string} btn_description
* @param {string} url
* @param {string} url_short_name
* |>
* If url is an empty string it will not do any checks on it
*/
function NewButton(btn_id_name, btn_function, btn_text, btn_description, url, url_short_name) {
    var main_body = document.getElementById("main_body")

    var btn_body = document.createElement("div")
    var new_btn = document.createElement("button")
    new_btn.id = btn_id_name
    new_btn.onclick = btn_function
    new_btn.innerText = btn_text

    btn_body.appendChild(new_btn)

    var description = document.createElement("h2")
    var url_element = (url) ? `<a href="${url}">${url_short_name}</a>` : ""
    description.innerHTML = btn_description + " " + url_element

    var root = document.createElement("div")
    root.className = "root"
    root.id = "f" + btn_id_name

    main_body.appendChild(btn_body)
    main_body.appendChild(description)
    main_body.appendChild(root)
}

function LoadButtons() {
    NewButton("btn1", Btn1, "Check JS code.", "Here are some responses fro clicking me:", "", "")
}

function Reset() {
    console.log("Hello there I am reset button.")

    const roots = document.getElementsByClassName("root")
    var i = 0
    while (i < roots.length) {
        roots[i].innerHTML = ""
        i++
    }
    console.clear()
    numba = numba.map((_) => -1)
}

function Btn1() {
    const el = document.getElementById("fbtn1")
    const nw = document.createElement("p")

    if (numba[0] % 5 == 4) {
        el.innerHTML = ''
    }
    numba[0]++

    nw.innerText = `Hello there. I am no.${numba[0]}!`

    el.appendChild(nw)

}

function GetResponse() { // Get any response from server.
    const el = document.getElementById("fbtn2")
    const ne = document.createElement("p")

    if (numba[1] % 5 == 4) {
        el.innerHTML = ''
    }
    numba[1]++

    fetch(rootURI + "/").then((resp) => {
        if (!resp.ok) {
            const err = `HTTP error: ${resp.status}`
            ne.innerText = err
            el.appendChild(ne)
            throw new Error(err)
        }
        return resp.text()
    }).then((txt) => {
        console.log(`Got: ${txt}`)

        ne.innerText = txt
        el.appendChild(ne)
    }).catch((r) => {
        console.log(r)

        ne.innerText = r
        el.appendChild(ne)
    })
}


function JSON_Send_n_Get() { // Try sending JSON to server and getting something back
    const el = document.getElementById("fbtn3")
    const ne = document.createElement("p")

    if (numba[2] % 5 == 4) {
        el.innerHTML = ''
    }
    numba[2]++

    console.log(
        JSON.stringify({
            txt: "JS is terrible"
        }),
    )

    fetch(rootURI + "/where", {
        method: "POST",
        body: JSON.stringify({
            numba: 0b10010
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode: "cors"
    }).then((resp) => {
        if (!resp.ok) {
            ne.innerText = "Error: " + resp.statusText
            el.appendChild(ne)
        }
        return resp.json()
    }).then((data) => {
        console.log(JSON.stringify(data))

        ne.innerText = JSON.stringify(data)
        el.appendChild(ne)
    }).catch((error) => {
        console.log(error)
    })
}
