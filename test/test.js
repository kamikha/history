
let states = [],truerep,kol,numTrue;
getLS();
let view = {
    finishState:false,
    printfMessage : function(message){
        let messageArea= document.querySelector('#messageArea');
        messageArea.innerHTML=message;
    },
    testTrue:function(numberReponse){
        model.TrueReponse();
        localStorage.setItem('numTrue', JSON.stringify(model.numberTrue));
        model.numberTrue[model.quantityReponses]=true;
        let reponseTrue=document.querySelector("#"+numberReponse);
        reponseTrue.setAttribute('class','testTrue')
        reponseTrue.selected="selected";
    },
    testFalse : function(numberReponse){
        
        let reponseFalse=document.querySelector("#"+numberReponse);
        reponseFalse.setAttribute('class','testFalse')
        reponseFalse.selected="selected";
    },
    End:function(){
        this.finishState=true;
        document.querySelector("#background-test-1").style.display="none";
        document.querySelector("#background-test-2").style.display="none";
        document.querySelector("#background-test-3").style.display="none";
        document.querySelector("#background-test-4").style.display="none";
        document.querySelector("#submitButton").style.display="none";
        document.querySelector("#nextButton").style.display="none";
        document.querySelector("#resetButton").style.marginTop="300px";
        let reponseFin=document.querySelector("#messageArea");
        reponseFin.style.display="none";
        let question = document.querySelector('#question');
        question.style.display="none";
        let reponseFinish=document.querySelector("#messageAreaFinish");
            if(localStorage.getItem('repTrue')!=undefined)
            {
                model.reponsesTrue=JSON.parse(localStorage.getItem('repTrue'));
            
            }
        localStorage.setItem('numTrue', JSON.stringify(model.numberTrue));
        let procent=Math.round((model.getTrueReponses()/(model.reponses.length-1))*100);
        reponseFinish.innerHTML=("Твой результат:"+procent+"%");
        reponseFinish.setAttribute('class','finishScreen');
        let resetButton=document.querySelector('#resetButton');
        resetButton.style.display="block"
        resetButton.setAttribute('class','resetButton1');
    }
    };
    view.printfMessage('Варианты ответов:');
  let model = {
      reponsesTrue:truerep,
      reponses :[3,2,1,2,4,1,3,4,3,1,2,3,1,2,4,1],
      quantityReponses :kol,
      numberTrue :numTrue,
      quantityquestions:4,
      submitState :states,
      allPhrases:[
            ["Остерман А.И.","Голицын Д.М.","Меньшиков А.Д.","Толстой П.А."],
            ["1725-1730","1727-1730 ","1727-1735","1729-1735"],
            ["кондиции","протекции","указ","контрибуции"],
            ["Меньшиков А.Д., Бирон Э.","Остерман А.И., Бирон Э.","Миних Б.Х., Остерман А.И.","Бирон Э., Миних Б.Х."],
            ["Остерман А.И.","Миних Б.Х.","Голицын Д.М.","Бирон Э."],
            ["П.И. Шувалов","А.П. Бестужев-Рюмин","И.И. Шувалов","М.В. Ломоносов"],
            ["Петр III","Анна Иоанновна","Елизавета Петровна","Екатерина I"],
            ["5 лет","3 года","6 месяцев","2 месяца"],
            ["5 лет","10 лет","20 лет","25 лет"],
            ["Манифест о вольности дворянства","Указ о вольных хлебопашцах","Манифест о трехдневной барщине","Указ о единонаследии"],
            ["Павла I","Екатерины II ","Александра I","Николая I "],
            ["вступление России в Семилетнюю войну","окончание русско-турецкой войны","дворцовый переворот в пользу Елизаветы Петровны ","ссылка А.Д. Меньшикова"],
            ["Белградский","Ясский","Сан-Стефанский","Бухарестский"],
            ["40 лет","37 лет","35 лет","32 года"],
            ["с началом правления Петра I","с началом правления Екатерины I","с окончанием правления Екатерины II","со смертью Петра I "]
      ],
        questions:[
        "Кто был во главе Верховного Тайного Совета при Екатерине I?",
        "Годы правления Петра II ",
        "Как назывался документ, который ограничивал власть Анны Иоанновны?",
        "Кто из государственных деятелей являлись приближенными Анны Иоанновны?",
        "Кто стал регентом Ивана VI после смерти Анны Иоанновны?",
        "Какой государственный деятель при правлении Елизаветы Петровны занимался социально-экономическими и политическими преобразованиями?",
        "Кто из императоров эпохи дворцовых переворотов утвердил учреждение Московского университета?",
        "В каком возрасте Иван VI вступил на престол?",
        "Как долго правила Елизавета Петровна?",
        "Какой документ стал главным в истории правления Петра III?",
        "Эпоха дворцовых переворотов завершилась воцарением?",
        "Какое из событий произошло в 1741 г.?",
        "Какой мирный договор был подписан в результате русско-турецкой войны 1735-1739 гг.?",
        "Эпоха дворцовых переворотов длилась ",
        "Начало эпохи дворцовых переворотов связано ..."
        ],
      TrueReponse:function(){
          this.reponsesTrue++;
      },
      getTrueReponses : function(){
          let num=0;
          for(let i = 0 ; i< this.numberTrue.length ; i++){
            console.log(this.numberTrue[i]);
            if(this.numberTrue[i] == true)num++;
          }
          console.log(num);
        return num;
      },
      nextquestion:function(){
        let question = document.querySelector('#question');
        question.innerHTML = (this.questions[this.quantityReponses]);
        let test = document.querySelectorAll('.info-text');
        this.isFinal();
        if(view.finishState == false){
            for(let i = 0 ; i<this.quantityquestions ; i++){ 
                
                test[i].innerHTML=(this.allPhrases[this.quantityReponses][i]);
            }
        }
      },
      reponse:function(rep){
        let reponseClass=('background-test-'+rep);
            if(rep==this.reponses[this.quantityReponses]){
                view.testTrue(reponseClass);
                view.printfMessage('Молодец, правильный ответ');
                
                return true;
            }
        view.testFalse(reponseClass);
        view.printfMessage('Неверно, правильный ответ:'+this.reponses[this.quantityReponses]);
        return false;
      },
      parseReponse:function(per){
          
          let reponseClass='background-test-'+per;
          if(this.reponse(per)){
              view.testTrue(reponseClass);
              return true;
          }
          view.testFalse(reponseClass)
          return false;
      },
        get_quenttityReponses:function(){
            return this.quantityReponses;
        },
        get_reponses:function(){
            return this.reponses;
        },    
        quantityReponsesPlus:function(){
            this.quantityReponses++;
        },
        isFinal:function(){
            if(this.quantityReponses==(this.reponses.length-1)){
                view.End();
            }
        },
        checkCheck:function(){
            let radioCheckTrue=document.querySelectorAll('.testTrue');
            let radioCheckFalse=document.querySelectorAll('.testFalse');
            if(radioCheckFalse>0 || radioCheckTrue>0)return false;
        
            if (this.submitState[this.quantityReponses] == true)return true;
            return false;
        },
  };
 controller = {
   
    clickButton : function(){
      
        let submitButton=document.querySelector('#submitButton');
       // if(this.checkCheck())
        submitButton.onclick=this.processTest;
    },
    processTest:function(){
       if(model.submitState[model.get_quenttityReponses()]==false){
        if(model.submitState[model.quantityReponses]==true){
            model.reponse(j);
            model.parseReponse(j);
            setLS();
            
            return true;  
        }
        for(let i = 0 ; i< model.quantityquestions ; i++){
           let j=i+1;
            let radioCheck=document.querySelector('#test-'+j);
              if(radioCheck.checked){
                model.submitState[model.get_quenttityReponses()] = true;
                console.log(model.submitState);
                localStorage.setItem('lastRep', JSON.stringify(j));
                localStorage.setItem('sumbit', JSON.stringify(model.submitState));
                model.reponse(j);
                
                console.log("parserep")
                //model.parseReponse(j);
                setLS();
                return true;
            }
           

        }
       }
    },
    numbersButton:function(){
        
        let numberButtons=document.querySelectorAll('.number');
        for(let i = 0 ; i< numberButtons.length ; i++){
            let but = numberButtons[i];
            console.dir(but);
           but.addEventListener("click", ()=>{
            kol = i+1;
            model.quantityReponses = kol;
           // location.reload();
            console.log(kol);
           })
           //numberButtons.onclick=this.nextButtonProcess(i);
           // console.dir(numberButtons[i]);
        } 
    },
    nextButtonProcess:function(but){
        col = but;
        console.log(but);
        location.reload();

    },
    resetButton:function(){
        
        let resetButton=document.querySelector('#resetButton');
        resetButton.onclick=this.resetButtonProcess;
    },
    resetButtonProcess:function(){
        //localStorage.clear();
        localStorage.removeItem('quan');
        localStorage.removeItem('sumbit');
        localStorage.removeItem('repTrue');
        localStorage.removeItem('lastRep');
        localStorage.removeItem('numTrue');

        kol = 0,truerep=0,states=[false,false,false,false,false,false,false],numTrue=[false,false,false,false,false,false,false]
        location.reload();
    },

    nextButton:function(){
        
        let nextButton=document.querySelector('#nextButton');
        
        nextButton.onclick=this.nextButtonProcess;
    },
    nextButtonProcess : function(){
       
        if(model.checkCheck()){
            setLS();
            model.isFinal();
        model.quantityReponsesPlus();
        model.nextquestion();
        view.printfMessage('Варианты ответов:');
        model.submitState[model.get_quenttityReponses()] =false;
        let radioCheckTrue=document.querySelectorAll('.testTrue');
        let radioCheckFalse=document.querySelectorAll('.testFalse');
        for(let i = 0;i<radioCheckTrue.length;i++){
            radioCheckTrue[i].classList.remove('testTrue');
        }
        for(let i = 0;i<radioCheckFalse.length;i++){
            radioCheckFalse[i].classList.remove('testFalse');
        }
      let radioCheck=document.getElementsByName('test');
        for(let i = 0;i<model.quantityquestions;i++){
            if(radioCheck[i].checked){
                radioCheck[i].checked=false;
            }
        }
        }
    }
 }
function setLS(){
  localStorage.setItem('quan', JSON.stringify(model.quantityReponses));
    localStorage.setItem ("sumbit",JSON.stringify(model.submitState));
    localStorage.setItem('repTrue', JSON.stringify(model.reponsesTrue));
    localStorage.setItem('numTrue', JSON.stringify(model.numberTrue));
}
function getLS(){
    if(localStorage.getItem('quan')!=undefined){
    kol= JSON.parse(localStorage.getItem('quan'))+1;
    }
    else{
        kol=0;
    }
    if(localStorage.getItem('sumbit')!=undefined){
    states=JSON.parse(localStorage.getItem ("sumbit"));
        }
    else{
        states=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
    }
    if(localStorage.getItem('numTrue')!=undefined){
        numTrue=JSON.parse(localStorage.getItem ("numTrue"));
    }
    else{
        numTrue=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
    }
    if(localStorage.getItem('repTrue')!=undefined){
         truerep=JSON.parse(localStorage.getItem ("repTrue"));
     }
    else{
        truerep=0;
    }
}


model.nextquestion();
 controller.clickButton();
 controller.nextButton();
 controller.resetButton();
 model.isFinal();
// controller.numbersButton();
 var output = '';
 for (var i = 0, length = localStorage.length; i < length; i++) {
   output += 'Ключ: ' + localStorage.key(i) + "; Значение: " + localStorage.getItem(localStorage.key(i));
 }
 //console.log(output);
 document.querySelector("#hiddenButton").onclick = ()=>{
    if(forma.hidden==false){
    forma=document.querySelector(".test-form");
    one = document.querySelector(".imp-1");
    
    forma.hidden=true;
    forma.style.display = "none";
    console.log(forma.getAttribute("class"));
    
setTimeout(function(){
    forma.hidden=true;
    forma.style.display = "none";
    one.style.marginTop ="50px";
    forma.style.height="0px";
    console.log(forma.offsetHeight);
},300);
}
}

document.querySelector(".test").onclick = (event)=>{
    
    forma=document.querySelector(".test-form");
    one = document.querySelector(".imp-1");
    if(forma.hidden==true){
    console.log(forma.getAttribute("class"));
   
    event.preventDefault();
    document.location.href="#test-form";
    
    forma.style.display = "block";
    forma.hidden=false;
    let hid = document.querySelector(".hid-form");
    hid.hidden=true;
    let start = Date.now();   let timer = setInterval(function() {
      let timePassed = Date.now() - start;
      if (timePassed >= 1500) {
        clearInterval(timer); // закончить анимацию через 2 секунды
        return;
      } draw(timePassed);
    }, 50);
    function draw(timePassed) {
        one.style.marginTop = 50 + timePassed / 2.5 + 'px';
        
      //  forma.style.marginLeft= timePassed / 150 -1000+"px";
        forma.style.opacity= timePassed / 1500;
        forma.style.height=timePassed /1.5 + "px";
    }
    setTimeout(function(){
        let start1 = Date.now();   let timer1 = setInterval(function() {
        let timePassed1 = Date.now() - start1;
        if (timePassed1 >= 2000) {
          clearInterval(timer1); // закончить анимацию через 2 секунды
          return;
        } draw(timePassed1);
      }, 50);
      function draw(timePassed1) {
          forma.style.opacity= timePassed1 /2000;
        
      }},1000)
    
setTimeout(function(){
    
   hid.hidden=false;
    one.style.marginTop ="50px"
   
    console.log(forma.offsetHeight);
},2700);
    }
}
function link(){
    for(let i = 1 ; i<=6 ; i++){
        document.querySelector(".name-"+i).onclick=function(event){
            event.preventDefault();
            document.location.href="#imp-"+i;  
        }
    }
    
}
link();
document.querySelector(".name-1").onclick=function(){
    document.location.href="#imp-1";  
}

$(function(){
    $("a[href^='#']").click(function(){
            var _href = $(this).attr("href");
            $("html, body").animate({scrollTop: 0+"px"});
            return false;
    });
});
/*
$(function(){

    $('.some_link').on('click', function(e){
        let _href = $(this).attr("href");
      // let href =  _href.replace(/#/g,'');
     //  let hr = "."+href;
      //  console.log($(_href).offset().top);
      console.log($(_href).offset().top);
      $('html,body').stop().animate({ scrollTop: $(_href).offset().top },3000);
      e.preventDefault();
    });
    
    });*/