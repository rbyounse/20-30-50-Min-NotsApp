const nots_continer = document.querySelector(".NotsContiner");
const InputNot = document.querySelector(".InputNoteName");

const AddNoteBtn = document.querySelector(".AddNoteBtn");

let HolderData = [
    {
        Name: "SSSSSSS",
    },
    {
        Name: "fefefd2",
    },
    {
        Name: "fef3r3",
    },
    {
        Name: "efef",
    },
];

const Render = (Data, Continer) => {
    let x = "";
    for (i = 0; i < Data.length; i++) {
        x =
            x +
            `<div class="Note">
                <p>${Data[i].Name}</p>
            </div>`;
    }
    Continer.innerHTML = x;
};
const addNote = (Input) => {
    HolderData.push({
        Name: Input.value,
    });
    Render(HolderData, nots_continer);
    storelocaly(HolderData);
};
const storelocaly = (array) => {
    if (localStorage.getItem("data") && !array) {
        HolderData = JSON.parse(localStorage.getItem("data"));
    } else if (array) {
        localStorage.setItem("data", JSON.stringify(array));
    }
};

storelocaly();
Render(HolderData, nots_continer);
