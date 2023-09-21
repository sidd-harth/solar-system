console.log('We are inside client.js');

/* on page load  */
window.onload = function() {
    const planet_id = document.getElementById("planetID").value
    console.log("onLoad - Request Planet ID - " + planet_id)

    fetch("/os", {
            method: "GET"
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
            thrownewError('Request failed');
        }).catch(function(error) {
            console.log(error);
        })
        .then(function(data) {
            document.getElementById('hostname').innerHTML = `Pod - ${data.os} `
          //  document.getElementById('environment').innerHTML = ` Env - ${data.env}  `
        });
};



const btn = document.getElementById('submit');
if (btn) {
    btn.addEventListener('click', func);
}

function func() {
    const planet_id = document.getElementById("planetID").value
    console.log("onClick Submit - Request Planet ID - " + planet_id)

    fetch("/planet", {
            method: "POST",
            body: JSON.stringify({
                id: document.getElementById("planetID").value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(function(res2) {
            if (res2.ok) {
                return res2.json();
            }
            thrownewError('Request failed.');
        }).catch(function(error) {
            alert("Ooops, We have 8 planets.\nSelect a number from 0 - 8")
            console.log(error);
        })
        .then(function(data) {
            document.getElementById('planetName').innerHTML = ` ${data.name} `

            const element = document.getElementById("planetImage");
            const image = ` ${data.image} `
            element.style.backgroundImage  = "url("+image+")"

            const planet_description = ` ${data.description} `
            document.getElementById('planetDescription').innerHTML = planet_description.replace(/(.{80})/g, "$1<br>");

          
        });

}