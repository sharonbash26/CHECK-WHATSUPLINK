'use strict'


let gElCanvas
let gCtx
function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    var saved = getMemeFromStorage()
    console.log('save', saved)

}

function renderGallery() {
    var imgs = getImgs()
    var strHTML = imgs.map(img => `
    <img src="imgs1/${img.id}.jpg" onclick="goToEditor(${img.id})">`)
    document.querySelector('.gallery').innerHTML = strHTML.join('')

}

function renderMeme(imgId) {
    var meme = getMeme()
    var canvas = document.getElementById("my-canvas")
    var ctx = canvas.getContext("2d")
    var img = new Image()
    img.src = "imgs1/" + imgId + ".jpg"

    img.onload = function () {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        var elTextEdit = document.getElementById("my-text")
        elTextEdit.style.display = 'block'
        elTextEdit.addEventListener("input", function () {
            var userText = elTextEdit.value
            drawCanvas(img, userText)
            setLineTxt(userText)
        });

    }
}

function drawCanvas(img, userText) {
    var canvas = document.getElementById("my-canvas")
    var ctx = canvas.getContext("2d")
    var curCurr = getColor()
    var curSize = getFontSize()
    var curFamilyFont = getFamilyFont()
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    console.log('curr', curCurr)
    ctx.fillStyle = curCurr
    ctx.font = curSize + "px " + curFamilyFont
    ctx.fillText(userText, 50, 50)

}









function setImgId(imgId) {
    gMeme.selectedImgId = imgId
}

function noneDisplayEditor() {
    var elEditor = document.querySelector('.editor')
    elEditor.style.display = "none"
}



function goToEditor(imgId) {
    var elEditor = document.querySelector(".editor")
    elEditor.style.display = "block"
    var elPart2 = document.querySelector(".part2")
    elPart2.style.display = "block"
    var elGallerySection = document.querySelector(".gallery")
    elGallerySection.style.display = "none"
    var elH1 = document.querySelector('h1')
    elH1.style.display = "none"
    setImgId(imgId)
    renderMeme(imgId)
}





function goBack() {
    changeSaveBtn("Save")
    var elPart2 = document.querySelector(".part2")
    elPart2.style.display = "none"
    var elGallerySection = document.querySelector(".gallery")
    elGallerySection.style.display = "block"
    var elInputText = document.getElementById("my-text")
    var elH1 = document.querySelector('h1')
    elH1.style.display = "block"
    elInputText.value = ""
}
function onIncreaseFontSize() {
    var elText = document.getElementById("my-text")
    var fontSize = elText.style.fontSize
    var fontSizeNumric = parseFloat(fontSize)
    var elBtnIncrease = document.querySelector(".increaseFontSizeBtn")
    elBtnIncrease.addEventListener("click", () => {
        fontSizeNumric++
        elText.style.fontSize = fontSizeNumric + 'px'
        var newSize = fontSizeNumric
        updateFontSize(newSize)
    })
}
function updateFontSize(newSize) {

    gMeme.lines[0].size = newSize
}

function updateFontFamily(newFontFamily) {
    gMeme.lines[0].familyFont = newFontFamily
}

function changeFamilyFont() {
    var elFontSelector = document.getElementById('fontSelector')
    var selectedFamilyFont = elFontSelector.value
    var elInputText = document.getElementById('my-text')
    elInputText.style.fontFamily = selectedFamilyFont
    updateFontFamily(selectedFamilyFont)
}

function onDecreaseFontSize() {
    console.log('d')
    var elText = document.getElementById("my-text")
    var fontSize = elText.style.fontSize
    var fontSizeNumric = parseFloat(fontSize)
    var elBtnIncrease = document.querySelector(".decreaseFontSizeBtn")
    elBtnIncrease.addEventListener("click", () => {
        fontSizeNumric--
        elText.style.fontSize = fontSizeNumric + 'px'
        var newSize = fontSizeNumric
        updateFontSize(newSize)
        console.log('nu', fontSizeNumric)
    })
}

function handleColorInput(selectColor) {
    console.log('sel', selectColor)
    var elText = document.getElementById("my-text")
    elText.style.color = selectColor
    setColor(selectColor)
}
function setColor(newColor) {
    gMeme.lines[0].color = newColor
}
function changeText() {
    var elText = document.getElementById("my-text")
    var usersText = elText.value
    setLineTxt(usersText)
    console.log('gmemeeeee', gMeme)
}

function setLineTxt(userText) {
    gMeme.lines[0].txt = userText
}

// function enterToSavedProjects() {
//     var elH2 = document.querySelector(".headSaved")
//     elH2.style.display = "block"
//     displaySavedMemes()

// }



function changeSaveBtn(msg) {
    var elBtn = document.getElementById("saveButton")
    elBtn.innerText = msg
}


function save() {
    saveMemeToStorage()
    changeSaveBtn("Saved")

} 

// function displaySavedMemes(){
//     debugger
//     var savedMemes = getMemeFromStorage()
//     var savedMemesContainer = document.getElementById('saved-memes-container')
    
//     if (savedMemes && savedMemes.length > 0) {

//         savedMemes.forEach((meme,index) => {
//             // var canvas = document.createElement('canvas')
//             // canvas.id = 'saved-memes-canvas-' + index
//             // canvas.width = 400
//             // canvas.height = 400
//             // savedMemesContainer.appendChild(canvas)
//             const xPos=index*400
//             const yPos=0
//             renderSavedMems(meme.selectedImgId, meme.lines[0].txt,xPos,yPos,meme.lines[0].color,meme.lines[0].size,meme.lines[0].familyFont)
//         });
//     } else {
//         console.log("No saved memes found.")
//     }
// }


// function renderSavedMems(imgId,userText,xPos,yPos,userColor,userFontSize,userFontFamily) {
 
//     var canvas = document.getElementById('saved-memes-canvas')
//     var ctx = canvas.getContext("2d")
//     var img = new Image()
//     img.src = "imgs1/" + imgId + ".jpg"
//     console.log('imgSrc',img.src)

//         canvas.width = 5000
//         canvas.height = 5000
//         ctx.drawImage(img, xPos, yPos)
      
//             drawSavedCanvas(img, userText,userColor,userFontSize,userFontFamily,xPos,yPos)
    

// }

// function drawSavedCanvas(img, userText,userColor,userFontSize,userFontFamily,xPos,yPos) {
//     var canvas = document.getElementById("saved-memes-canvas")
//     var ctx = canvas.getContext("2d")
//     // canvas.width = img.width
//     // canvas.height = img.height
//     // ctx.drawImage(img, 0, 0)
//     ctx.fillStyle = userColor
//     ctx.font = userFontSize + "px " + userFontFamily
//     ctx.fillText(userText, xPos, yPos + img.height + userFontSize)

// }

function downloadImg(elLink) {

    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}
//last version !!!!////////
