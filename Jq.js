
$(document).ready(() => {
      //Variables
      let sentenceIndex = 0;
      let letterIndex = 0;
      let keyCount = 0;
      let wordCount = 54;
      let mistakeCount = 0;
      let keyTimer = 0;
      let timeStart = 0;
      let timeEnd = 0;

      //Hide keyboard on page load 
    $(`#keyboard-upper-container`).hide(); 
    //Hide Buttons
    $(`#tryAgain, #yesNoBtns, #yesBtn, #noBtn`).hide(); 


     //Entire First Sentence 
     let currentSentence = sentences[0]; 
     // First letter of first sentence
     let currentLetter = currentSentence[0]; 
     
     
    $('#target-letter').text(currentLetter); 
    $('#sentence').append(sentences[sentenceIndex]); 


    // Sentences Arr
    const sentences = [
        `ten ate neite ate nee enet ite ate inet ent eate`,
        `Too ato too nOt enot one totA not anot tOO aNot`, 
        `oat itain oat tain nate eate tea anne inant nean`,
        `itant eate anot eat nato inate eat anot tain eat`, 
        `nee ene ate ite tent tiet ent ine ene ete ene ate` 
    ];


    //Capitalized Keyboard
    $(document).on(`keydown`, (event) => { 
        if(event.which === 16 || event.which === 20) { 
            //Show Capital
            $(`#keyboard-upper-container, #keyboard-lower-container`).toggle(); 
        }
    })
    .on(`keyup`, (event) => { 
        if(event.which === 16 || event.which === 20) { 
            //Show Lower
            $(`#keyboard-lower-container, #keyboard-upper-container`).toggle(); 
        }
        $(`.highlight`).removeClass(`highlight`); 
    })

    // Keycount ++
    $(document).on(`keypress`, (event) => { 
        keyCount++; 
        
        let keyCode = event.which;
        $(`#$keyCode`).addClass(`highlight`); 
        if(keyTimer < 1) {
            timeStart = event.timeStamp; 
            keyTimer++; 
        }

        let currentSentence = sentences[sentenceIndex]; 
        let currentLetter = currentSentence[letterIndex];

        letterIndex++; // Add 1 to letterIndex
        let nextLetter = currentSentence[letterIndex]; 
        // Place nextLetter in #target-letter
        $(`#target-letter`).text(nextLetter); 
        // slide #yellow-block left: 17.5 pixels
        $(`#yellow-block`).animate({ left: `+=20px` }, { duration: 100, easing: `linear` }); 

        // if(not last sentence of sentences[])
        if(sentenceIndex < sentences.length) { 
            // if(not last letter of currentSentence)
            if(letterIndex < currentSentence.length) { 
                if(keyCode === currentLetter.charCodeAt()) { 
                    $(`#feedback`).append(`<span class='glyphicon glyphicon-ok'></span>`); 
                } else if (keyCode !== currentLetter.charCodeAt()) { 
                    $(`#feedback`).append(`<span class='glyphicon glyphicon-remove'></span>`); 
                    mistakeCount++; 
                }
            } else if(sentenceIndex < sentences.length - 1) { 
                $(`#feedback`).empty();
                sentenceIndex++; 

                $(`#sentence`).text(sentences[sentenceIndex]); 
                $(`#target-letter`).text(sentences[sentenceIndex].charAt(0)); 
                // Resets letterIndex to 0
                letterIndex = 0; 

                $(`#yellow-block`).animate({ left: `15px`}, { duration: 100, easing: `linear` }); 
            } else if(sentenceIndex < sentences.length) { 
                timeEnd = event.timeStamp; 
                let difference = timeEnd - timeStart;
                let seconds = difference / 1000;
                let minutes = (difference / 1000) / 60;
                
                let grossWordsPerMinute = (keyCount / 5) / minutes;
                
                let netSpeed = ((keyCount / 5) - mistakeCount) / minutes;
                
                let accuracy = (netSpeed / grossWordsPerMinute) * 100;

                // Empty #sentence, #target-letter, #feedback <div> tags
                $(`#sentence, #target-letter, #feedback`).empty(); 
                // Hide #yellow-block, #keyboard-upper-container, #keyboard-lower-container and #space-key-container
                $(`#yellow-block, #keyboard-upper-container, #keyboard-lower-container, #space-key-container`).hide(); 
                let scores = `
                    <strong>Word Count:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${wordCount}</span><br>
                    <strong>Typed Entries:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${keyCount}</span><br>
                    <strong>Uncorrected Errors:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${mistakeCount}</span><br>
                    <strong>Seconds:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${seconds.toFixed(2)}</span><br>
                    <strong>Minutes:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${minutes.toFixed(2)}</span><br>
                    <strong>Gross WPM:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${grossWordsPerMinute.toFixed(2)}</span><br>
                    <strong>Net Speed:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${netSpeed.toFixed(2)}</span><br>
                    <strong>Accuracy:</strong> <span style="background-color: rgba(255, 201, 4, 0.500); border-radius: 0.25rem;">${accuracy.toFixed(2)}%</span>
                `;

                $(`#sentence`)
                    .addClass(`text-center mt-4`)
                    .append(scores) 
                    .hide()
                    .delay(250)
                    .fadeIn(250);

                $(`#tryAgain, #yesNoBtns, #yesBtn, #noBtn`)
                    .hide()
                    .delay(500)
                    .fadeIn(1500);

                $(`#yesBtn`).on('click', () => {
                    // Reloads page .on('click')
                    location.reload(); 
                })

                $(`#noBtn`).on('click', () => { 
                    $(`#tryAgain, #yesNoBtns, #yesBtn, #noBtn`)
                        .delay(500)
                        .fadeOut(1500) 
                })
            } 


        } 
    })

})