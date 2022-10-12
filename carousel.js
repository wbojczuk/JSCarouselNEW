"use strict";

const triCarousel = {

    shadows: false,

    cards: [
        {
            title: "Github",
            subtitle: "subtitle",
            image: null,
            link: "https://github.com/wbojczuk"
        },
        {
            title: "dev",
            subtitle: "subtitle",
            image: null,
            link: "https://williambojczuk.dev"
        },
        {
            title: "wbojczuk",
            subtitle: "subtitle",
            image: null,
            link: "https://williambojczuk.com/"
        },
        {
            title: "animation",
            subtitle: "subtitle",
            image: null,
            link: "https://wbojczuk.github.io/animationstorm"
        },
        {
            title: "realm shooter",
            subtitle: "subtitle",
            image: null,
            link: "https://realmshooter"
        },
    ],


    init: ()=>{
        // SET UP CARD TEMPLATE
        const cardTemplate = document.createElement("a");
        cardTemplate.className = "tri-carousel-card";
        cardTemplate.target = "_blank";
        const cardTitle = document.createElement("div");
        cardTitle.className = "tri-carousel-card-title";
        const cardSubtitle = document.createElement("div");
        cardSubtitle.className = "tri-carousel-card-subtitle";
        
        cardTemplate.append(cardTitle);
        cardTemplate.append(cardSubtitle);
        
        if(triCarousel.shadows){
            const cardShadow = document.createElement("div");
            cardShadow.className = "tri-carousel-card-shadow";
            cardTemplate.append(cardShadow);
        }
        const cards = triCarousel.cards;
        const cardsIndex = cards.length - 1;

        // REFERENCES
        const cardContainer = document.querySelector(".tri-carousel-center");
        let mIndex = randInt(0, cardsIndex);
        let lIndex = (mIndex > 0) ? (mIndex - 1) : cardsIndex;
        let rIndex = (mIndex < cardsIndex) ? (mIndex + 1) : 0;
        let ready = true;


        // INITIAL SET UP
        const mainCard = cardTemplate.cloneNode(true);
        mainCard.querySelector(".tri-carousel-card-title").textContent = cards[mIndex].title;
        mainCard.classList.add("main-card");
        mainCard.href = cards[mIndex].link;
        cardStyles(mainCard);
        

        const leftCard = cardTemplate.cloneNode(true);
        leftCard.querySelector(".tri-carousel-card-title").textContent = cards[lIndex].title;
        leftCard.classList.add("left-card");
        leftCard.href = cards[lIndex].link;
        cardStyles(leftCard);

        const rightCard = cardTemplate.cloneNode(true);
        rightCard.querySelector(".tri-carousel-card-title").textContent = cards[rIndex].title;
        rightCard.classList.add("right-card");
        rightCard.href = cards[rIndex].link;
        cardStyles(rightCard);
        

        const tempCard = cardTemplate.cloneNode(true);
        tempCard.classList.add("temp-card");
        cardStyles(tempCard);
        

        cardContainer.append(leftCard);
        cardContainer.append(mainCard);
        cardContainer.append(rightCard);
        cardContainer.append(tempCard);


        // RIGHT ARROW LISTENER
        document.querySelector(".tri-carousel-rarrow").addEventListener("click", ()=>{
            if(ready){
                const right = cardContainer.querySelector(".right-card");
                const left = cardContainer.querySelector(".left-card");
                const main = cardContainer.querySelector(".main-card");
                const temp = cardContainer.querySelector(".temp-card");

                // SHIFT INDEXES
                rIndex = mIndex;
                mIndex = lIndex;
                lIndex = (lIndex > 0)? (lIndex - 1) : cardsIndex;
                

                // WHAT WILL TEMP BE??
                temp.querySelector(".tri-carousel-card-title").textContent = cards[lIndex].title;
                temp.classList.remove("temp-card");
                temp.classList.add("left-card");
                left.classList.remove("left-card");
                left.classList.add("main-card");
                main.classList.remove("main-card");
                main.classList.add("right-card");
                right.classList.remove("right-card");
                right.classList.add("temp-card");
                cardContainer.querySelector(".right-card").href = cards[rIndex].link;
                cardContainer.querySelector(".left-card").href = cards[lIndex].link;
                cardContainer.querySelector(".main-card").href = cards[mIndex].link;
                cardStyles(temp);
                cardStyles(left);
                cardStyles(main);
                cardStyles(right);
                

                ready = false;
                setTimeout(()=>{ready = true;},600);
            }
        });

        // LEFT ARROW LISTENER
        document.querySelector(".tri-carousel-larrow").addEventListener("click", ()=>{
            if(ready){
                const right = cardContainer.querySelector(".right-card");
                const left = cardContainer.querySelector(".left-card");
                const main = cardContainer.querySelector(".main-card");
                const temp = cardContainer.querySelector(".temp-card");

                // SHIFT INDEXES
                lIndex = mIndex;
                mIndex = rIndex;
                rIndex =  (rIndex < cardsIndex)? (rIndex + 1) : 0;
                

                // WHAT WILL TEMP BE??
                temp.querySelector(".tri-carousel-card-title").textContent = cards[rIndex].title;
                temp.classList.remove("temp-card");
                temp.classList.add("right-card");
                left.classList.remove("left-card");
                left.classList.add("temp-card");
                main.classList.remove("main-card");
                main.classList.add("left-card");
                right.classList.remove("right-card");
                right.classList.add("main-card");
                cardContainer.querySelector(".right-card").href = cards[rIndex].link;
                cardContainer.querySelector(".left-card").href = cards[lIndex].link;
                cardContainer.querySelector(".main-card").href = cards[mIndex].link;
                cardStyles(temp);
                cardStyles(left);
                cardStyles(main);
                cardStyles(right);
                

                ready = false;
                setTimeout(()=>{ready = true;},400);
            }
        });
         
        //FUNCTIONS

        function cardStyles(elem){
            if(elem.classList.contains("right-card")){
                elem.style.zIndex = "2";
                elem.style.transform = "translateX(110%) scale(0.5)";
            }else if(elem.classList.contains("left-card")){
                elem.style.zIndex = "2";
                elem.style.transform = "translateX(-110%) scale(0.5)";
            } else if(elem.classList.contains("main-card")){
                elem.style.zIndex = "5";
                elem.style.transform = "translateX(0) scale(1)";
            } else if(elem.classList.contains("temp-card")){
                elem.style.zIndex = "-10";
                elem.style.transform = "translateX(0) scale(0)";
            }
        }

        function randInt(min, max){
            return Math.floor(Math.random() * ((max + 1) - min) + min);
        }
    }
};

triCarousel.init();