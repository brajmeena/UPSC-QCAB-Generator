/* =========================================
GLOBAL STATE
========================================= */

let database = [];

let filteredDatabase = [];

let selectedQuestions = [];

/* =========================================
INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

```
function saveDatabase(){

    localStorage.setItem(

        "qcabDatabase",

        JSON.stringify(
            database
        )

    );

}
/* =========================================
   DATABASE STORAGE
========================================= */

async function loadDatabase(){

    const localData =

        localStorage.getItem(
            "qcabDatabase"
        );



    if(localData){

        database =
            JSON.parse(
                localData
            );



        filteredDatabase =
            [...database];



        populateFilters();

        renderQuestions();

        return;
    }



    const response =

        await fetch(
            "data/questions.json"
        );



    database =
        await response.json();



    filteredDatabase =
        [...database];



    populateFilters();

    renderQuestions();

}
/* =========================================
   EXPORT DATABASE
========================================= */

function exportDatabase(){

    const jsonString =

        JSON.stringify(

            database,

            null,

            2

        );



    const blob =

        new Blob(

            [jsonString],

            {

                type:
                "application/json"

            }

        );



    const url =

        URL.createObjectURL(
            blob
        );



    const link =

        document.createElement(
            "a"
        );



    link.href = url;

    link.download =
        "questions.json";



    link.click();



    URL.revokeObjectURL(
        url
    );

}
/* =========================================
   IMPORT BUTTON
========================================= */

function openJsonImporter(){

    document

        .getElementById(
            "jsonFileInput"
        )

        .click();

}
/* =========================================
   IMPORT DATABASE
========================================= */

function importDatabase(
    event
){

    const file =

        event.target.files[0];



    if(!file){

        return;
    }



    const reader =

        new FileReader();



    reader.onload =

        function(e){

            try{

                const importedData =

                    JSON.parse(
                        e.target.result
                    );



                database =

                    importedData;



                filteredDatabase =

                    [...database];



                saveDatabase();



                populateFilters();

                renderQuestions();



                alert(
                    "Database imported."
                );

            }

            catch(error){

                alert(
                    "Invalid JSON file."
                );

            }

        };



    reader.readAsText(
        file
    );

}
<div class="question-footer">

    <span class="question-marks">

        ${question.marks} Marks

    </span>

    <div>

        <button
            class="edit-btn"
        >

            Edit

        </button>

        <button
            class="add-btn"
        >

            Add

        </button>

    </div>

</div>

loadSelectionsFromStorage();

bindEvents(){
document
    .getElementById(
        "importQuestionsBtn"
    )
    .addEventListener(
        "click",
        importQuestions
    );

document
    .getElementById(
        "generatePdfBtn"
    )
    .addEventListener(
        "click",
        generateQCAB
    );

document
    .getElementById(
        "exportJsonBtn"
    )
    .addEventListener(
        "click",
        exportDatabase
    );

document
    .getElementById(
        "importJsonBtn"
    )
    .addEventListener(
        "click",
        openJsonImporter
    );

document
    .getElementById(
        "jsonFileInput"
    )
    .addEventListener(
        "change",
        importDatabase
    );
};
```

});

/* =========================================
EVENT BINDINGS
========================================= */

function bindEvents(){

```
document
    .getElementById("applyFilterBtn")
    .addEventListener(
        "click",
        applyFilters
    );

document
    .getElementById("resetFilterBtn")
    .addEventListener(
        "click",
        resetFilters
    );

document
    .getElementById("searchBox")
    .addEventListener(
        "input",
        applyFilters
    );
```

}

/* =========================================
LOAD DATABASE
========================================= */

async function loadDatabase(){

```
try{

    const response =
        await fetch(
            "data/questions.json"
        );

    database =
        await response.json();

    filteredDatabase =
        [...database];

    populateFilters();

    renderQuestions();

}

catch(error){

    console.error(error);

    alert(
        "Failed to load questions.json"
    );
}
```

}

/* =========================================
POPULATE FILTERS
========================================= */

function populateFilters(){

```
populateDropdown(
    "yearFilter",
    uniqueValues(
        database,
        "year"
    )
);

populateDropdown(
    "topicFilter",
    uniqueValues(
        database,
        "topic"
    )
);

populateDropdown(
    "subtopicFilter",
    uniqueValues(
        database,
        "subtopic"
    )
);
```

}

function populateDropdown(
elementId,
values
){

```
const dropdown =
    document.getElementById(
        elementId
    );

values.forEach(value => {

    const option =
        document.createElement(
            "option"
        );

    option.value = value;

    option.textContent = value;

    dropdown.appendChild(option);

});
```

}

function uniqueValues(
array,
key
){

```
return [

    ...new Set(

        array.map(
            item => item[key]
        )

    )

].sort();
```

}

/* =========================================
FILTERING
========================================= */

function applyFilters(){

```
const year =
    document
        .getElementById(
            "yearFilter"
        )
        .value;

const paper =
    document
        .getElementById(
            "paperFilter"
        )
        .value;

const topic =
    document
        .getElementById(
            "topicFilter"
        )
        .value;

const subtopic =
    document
        .getElementById(
            "subtopicFilter"
        )
        .value;

const search =
    document
        .getElementById(
            "searchBox"
        )
        .value
        .toLowerCase();



filteredDatabase =

    database.filter(question => {

        const matchesYear =

            !year ||

            String(
                question.year
            ) === year;

        const matchesPaper =

            !paper ||

            question.paper === paper;

        const matchesTopic =

            !topic ||

            question.topic === topic;

        const matchesSubtopic =

            !subtopic ||

            question.subtopic === subtopic;

        const matchesSearch =

            !search ||

            JSON.stringify(
                question
            )
            .toLowerCase()
            .includes(
                search
            );

        return (

            matchesYear &&
            matchesPaper &&
            matchesTopic &&
            matchesSubtopic &&
            matchesSearch

        );

    });



renderQuestions();
```

}

function resetFilters(){

```
document
    .getElementById(
        "yearFilter"
    )
    .value = "";

document
    .getElementById(
        "paperFilter"
    )
    .value = "";

document
    .getElementById(
        "topicFilter"
    )
    .value = "";

document
    .getElementById(
        "subtopicFilter"
    )
    .value = "";

document
    .getElementById(
        "searchBox"
    )
    .value = "";

filteredDatabase =
    [...database];

renderQuestions();
```

}

/* =========================================
RENDER QUESTIONS
========================================= */

function renderQuestions(){

```
const container =

    document.getElementById(
        "questionList"
    );

container.innerHTML = "";



filteredDatabase.forEach(question => {

    const card =
        createQuestionCard(
            question
        );

    container.appendChild(
        card
    );

});



document
    .getElementById(
        "questionCount"
    )
    .textContent =

    filteredDatabase.length +

    " Questions";
```

}

/* =========================================
QUESTION CARD
========================================= */

function createQuestionCard(
question
){

```
const card =
    document.createElement(
        "div"
    );

card.className =
    "question-card";



card.innerHTML = `

    <div class="question-meta">

        <span>

            ${question.year}

        </span>

        <span>

            ${question.paper}

        </span>

    </div>

    <div class="question-text">

        ${question.question}

    </div>

    <div class="question-footer">

        <span class="question-marks">

            ${question.marks} Marks

        </span>

        <button
            class="add-btn"
            data-id="${question.id}"
        >

            Add

        </button>

    </div>

`;



card
    .querySelector(
        ".add-btn"
    )
    .addEventListener(
        "click",
        () => {

            addToSelection(
                question
            );

        }
    );



return card;
```

}

/* =========================================
SELECTED QUESTIONS
========================================= */

function addToSelection(
question
){

```
const alreadyExists =

    selectedQuestions.some(

        item =>

            item.id ===

            question.id

    );



if(alreadyExists){

    return;

}



selectedQuestions.push(
    question
);



saveSelections();

renderSelections();
```

}

function removeSelection(
id
){

```
selectedQuestions =

    selectedQuestions.filter(

        question =>

            question.id !== id

    );



saveSelections();

renderSelections();
```

}

function renderSelections(){

```
const container =

    document.getElementById(
        "selectedQuestions"
    );



container.innerHTML = "";



selectedQuestions.forEach(

    question => {

        const tag =
            document.createElement(
                "div"
            );

        tag.className =
            "selected-tag";

        tag.innerHTML = `

            ${question.qno}

            <span
                style="
                margin-left:8px;
                cursor:pointer;
                "
            >

            ❌

            </span>

        `;



        tag
            .querySelector(
                "span"
            )
            .addEventListener(
                "click",
                () => {

                    removeSelection(
                        question.id
                    );

                }
            );



        container.appendChild(
            tag
        );

    }

);



document
    .getElementById(
        "selectedCount"
    )
    .textContent =

    selectedQuestions.length +

    " Selected";
```

}

/* =========================================
LOCAL STORAGE
========================================= */

function saveSelections(){

```
localStorage.setItem(

    "qcabSelectedQuestions",

    JSON.stringify(
        selectedQuestions
    )

);
```

}

function loadSelectionsFromStorage(){

```
const saved =

    localStorage.getItem(

        "qcabSelectedQuestions"

    );



if(!saved){

    return;

}



selectedQuestions =

    JSON.parse(
        saved
    );



renderSelections();
```
  
/* =========================================
   BULK IMPORT
========================================= */

function importQuestions(){

    const textarea =

        document.getElementById(
            "bulkInput"
        );



    const text =

        textarea.value.trim();



    if(!text){

        alert(
            "Please paste questions first."
        );

        return;
    }



    const importedQuestions =

        parseBulkQuestions(
            text
        );



    if(
        importedQuestions.length === 0
    ){

        alert(
            "No valid questions found."
        );

        return;
    }



    importedQuestions.forEach(

        question => {

            addImportedQuestion(
                question
            );

        }

    );



    textarea.value = "";



    renderSelections();



    alert(

        importedQuestions.length +

        " question(s) imported."

    );

}

function parseBulkQuestions(
    text
){

    const questions = [];



    const lines =

        text
            .split("\n")
            .filter(
                line =>
                line.trim()
            );



    lines.forEach(

        line => {

            const match =

                line.match(

                    /(Q?\d+)\.\s*(.*?)\s*\[(\d+)\]/i

                );



            if(!match){

                return;
            }



            const qno =

                match[1];



            const questionText =

                match[2]
                    .trim();



            const marks =

                Number(
                    match[3]
                );



            questions.push({

                id:
                    Date.now() +
                    Math.random(),

                qno,

                question:
                    questionText,

                marks,

                paper:
                    "Custom",

                topic:
                    "Custom",

                subtopic:
                    "Custom",

                year:
                    new Date()
                        .getFullYear(),

                source:
                    "Custom"

            });

        }

    );



    return questions;

}

function addImportedQuestion(
    question
){

    const alreadyExists =

        selectedQuestions.some(

            item =>

                item.question ===

                question.question

        );



    if(alreadyExists){

        return;
    }



    selectedQuestions.push(
        question
    );

}

/* =========================================
   PDF CONFIG
========================================= */

const PDF_CONFIG = {

    LEFT_MARGIN_X: 25,

    RIGHT_MARGIN_X: 185,

    TOP_MARGIN_Y: 15,

    BOTTOM_MARGIN_Y: 282,

    QUESTION_X: 30,

    QUESTION_Y: 25,

    FOOTER_Y: 288

};
    
/* =========================================
   PAGE ALLOCATION
========================================= */

function getPageCount(
    marks
){

    if(marks <= 10){

        return 2;
    }

    if(marks <= 15){

        return 3;
    }

    return 4;

}

/* =========================================
   GENERATE QCAB
========================================= */

function generateQCAB(){

    if(
        selectedQuestions.length === 0
    ){

        alert(
            "Select at least one question."
        );

        return;
    }



    const { jsPDF } =

        window.jspdf;



    const pdf =

        new jsPDF({

            orientation:"portrait",

            unit:"mm",

            format:"a4"

        });



    let pageNumber = 1;



    selectedQuestions.forEach(

        (question,index) => {

            const pages =

                getPageCount(
                    question.marks
                );



            for(
                let page=0;
                page<pages;
                page++
            ){

                if(
                    !(index===0 && page===0)
                ){

                    pdf.addPage();
                }



                drawPageLayout(

                    pdf,

                    pageNumber

                );



                if(page===0){

                    drawQuestionPage(

                        pdf,

                        question

                    );
                }



                pageNumber++;

            }

        }

    );



    pdf.save(
        "QCAB.pdf"
    );

}
/* =========================================
   PAGE LAYOUT
========================================= */

function drawPageLayout(
    pdf,
    pageNumber
){

    const width =

        pdf.internal
            .pageSize
            .getWidth();

    const height =

        pdf.internal
            .pageSize
            .getHeight();



    pdf.setDrawColor(0);



    pdf.line(

        PDF_CONFIG.LEFT_MARGIN_X,

        PDF_CONFIG.TOP_MARGIN_Y,

        PDF_CONFIG.LEFT_MARGIN_X,

        PDF_CONFIG.BOTTOM_MARGIN_Y

    );



    pdf.line(

        PDF_CONFIG.RIGHT_MARGIN_X,

        PDF_CONFIG.TOP_MARGIN_Y,

        PDF_CONFIG.RIGHT_MARGIN_X,

        PDF_CONFIG.BOTTOM_MARGIN_Y

    );



    drawMarginText(
        pdf
    );



    drawFooter(

        pdf,

        pageNumber

    );



    if(

        document
            .getElementById(
                "watermarkToggle"
            )
            .checked

    ){

        drawWatermark(
            pdf
        );

    }

}
    /* =========================================
   MARGIN WARNING
========================================= */

function drawMarginText(
    pdf
){

    pdf.setFontSize(8);



    pdf.text(

        [

            "Candidates",

            "must not",

            "write on",

            "this margin"

        ],

        188,

        25

    );

}
    /* =========================================
   FOOTER
========================================= */

function drawFooter(
    pdf,
    pageNumber
){

    const width =

        pdf.internal
            .pageSize
            .getWidth();



    pdf.setFontSize(8);



    pdf.text(

        "XXX-X-GS/0000",

        12,

        PDF_CONFIG.FOOTER_Y

    );



    pdf.text(

        String(
            pageNumber
        ),

        width/2,

        PDF_CONFIG.FOOTER_Y

    );

}
    /* =========================================
   QUESTION PAGE
========================================= */

function drawQuestionPage(
    pdf,
    question
){

    pdf.setFontSize(11);



    pdf.text(

        question.qno,

        8,

        25

    );



    const wrappedQuestion =

        pdf.splitTextToSize(

            question.question,

            130

        );



    pdf.text(

        wrappedQuestion,

        PDF_CONFIG.QUESTION_X,

        PDF_CONFIG.QUESTION_Y

    );



    const lastLineY =

        PDF_CONFIG.QUESTION_Y +

        (

            wrappedQuestion.length - 1

        ) * 5;



    pdf.text(

        `${question.marks} Marks`,

        160,

        lastLineY

    );

}
    /* =========================================
   WATERMARK
========================================= */

function drawWatermark(
    pdf
){

    pdf.setTextColor(
        220
    );



    pdf.setFontSize(
        20
    );



    pdf.text(

        "Brajmohan",

        55,

        160,

        {

            angle:45

        }

    );



    pdf.setTextColor(
        0
    );

}
    function editQuestion(
    id
){

    const question =

        database.find(

            q => q.id === id

        );



    const newText =

        prompt(

            "Edit Question",

            question.question

        );



    if(!newText){

        return;
    }



    question.question =
        newText;



    saveDatabase();



    renderQuestions();

}
    

}
