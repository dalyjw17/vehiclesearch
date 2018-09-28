var form = document.querySelector('form');
var moreButton = document.querySelector('button');
var input = document.querySelector('input[type="text"]');
var result = document.querySelector('.result');
var queryItem;

function search(e) 
{
    e.preventDefault();
    queryItem = input.value;
    setup(queryItem);
    input.value = "";
}

function reset() 
{
    var node = document.querySelector('.result');
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function createCar(name, model) 
{
    var item = document.createElement('div');
    item.id = "vehicleElement";
    var makeName = document.createElement('h4');
    makeName.id = "makeText";
    var modelName = document.createElement('p');
    modelName.id = "modelText";

    var moreButton = document.createElement('button');
    moreButton.id = "moreButton";

    item.classList.add('item');
    makeName.innerHTML = name;
    modelName.innerHTML = model;
    moreButton.innerHTML = "More";
    moreButton.addEventListener('click', function() 
    {
        window.open("https://www.google.com/search?q=" + this.parentElement.childNodes[0].innerHTML + "+" + this.parentElement.childNodes[1].innerHTML);
    });

    var makeModelBlock = document.createElement('div');
    makeModelBlock.appendChild(makeName);
    makeModelBlock.appendChild(modelName);
    makeModelBlock.id = "makeModel";

    result.appendChild(item);
    item.appendChild(makeModelBlock);
    item.appendChild(moreButton);
}

function setup(queryItem) {
    reset();
    var xhttp = new XMLHttpRequest();
    var url = "https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/" + queryItem + "?format=json";
    xhttp.open("GET", url, true);
    xhttp.onload = function() 
    {
        var response = JSON.parse(this.responseText);

        response.Results.sort(function(a, b) 
        {
            if (a.Make_Name < b.Make_Name) return -1;
            if (a.Make_Name > b.Make_Name) return 1;
            if (a.Model_Name < b.Model_Name) return -1;
            if (a.Model_Name > b.Model_Name) return 1;
            return 0;
        }).map(function(cars)
        {
            createCar(cars.Make_Name,
            cars.Model_Name
            )
        })
    };
    xhttp.send();
};

form.addEventListener('submit', search)
form.addEventListener('reset', reset)