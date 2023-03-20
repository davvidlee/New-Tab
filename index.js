    //DISPLAY WELCOME MESSAGE
    updateTime;
    setInterval(updateTime, 1000);
        //DISPLAY TIME
        function updateTime(){
            const d = new Date();
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
    
            hours = hours % 12;
            hours = hours ? hours : 12;
    
            minutes = minutes < 10 ? '0'+minutes : minutes;
    
            let strTime = hours + ':' + minutes + ' ' + ampm;
            document.getElementById('time').textContent = strTime;
    
            y = d.getFullYear();
            m = d.getMonth() + 1;
            date = d.getDate();
            let strDate = m + "/" + date + "/" + y;
            //document.getElementById("date").innerHTML=strDate;
        }
    //Sidebar
    
    document.getElementById("navOpen").addEventListener("click", openNav, false);
    function openNav() {
        document.getElementById("mySidenav").style.width = "75px";
        document.getElementById("timeSearch").style.marginLeft = "85px";
        document.getElementById("calendarID").style.marginLeft = "43%";
    }
    document.getElementById("navClose").addEventListener("click", closeNav, false);
    
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("timeSearch").style.marginLeft = "40px";
        document.getElementById("calendarID").style.marginLeft = "40%";
    }
    
    
    document.getElementById("cButton").addEventListener("click", showColors);
    function showColors(){
        document.getElementById("colorsDrop").classList.toggle("show");
      }
    document.getElementById("beginTime").addEventListener("click", showBeginning);
    function showBeginning(){
        document.getElementById("beginDrop").classList.toggle("show");
      }
      document.getElementById("endTime").addEventListener("click", showEnd);
      function showEnd(){
          document.getElementById("endDrop").classList.toggle("show");
        }
    function showPopUp() {
        var popup = document.getElementById("popup");
        popup.style.display = "flex";
    }
    document.getElementById("popClose").addEventListener("click",delPopUp);
    function delPopUp(){
        document.getElementById("popup").style.display = "none";
    }
    
    var color;
    var end;
    var id;
    var events = [];
    var businessStartHours = 8;
    
    var timeslotInterval = 31;
    var eventContainer = document.getElementsByClassName("event-container")[0];
    var maindims = eventContainer.getBoundingClientRect();
    var start = 1;
    var eventsByTime= {};
    var cols = 4;
    var closest;
    var clr = document.getElementsByClassName("clr");
    for(i = 0; i < clr.length; i++){
        clr[i].addEventListener("click", function(e) {
            color = e.target.value;
            document.getElementById("cButton").innerHTML = e.target.innerHTML;
            document.getElementById("cButton").style.backgroundColor = color;
            showColors();
        });
    }
    var beginT = document.getElementsByClassName("t");
    for(i = 0; i < beginT.length; i++){
        beginT[i].addEventListener("click", function(e) {
            start = e.target.value;
            console.log(start);
            document.getElementById("beginTime").value = e.target.innerHTML;
            showBeginning();
        });
    }
    var beginE = document.getElementsByClassName("t2");
    for(i = 0; i < beginE.length; i++){
        beginE[i].addEventListener("click", function(e) {
            end = e.target.value;
            document.getElementById("endTime").value = e.target.innerHTML;
            showEnd();
        });
    }
    document.getElementById("closebtn").addEventListener("click", function(e){
        id = document.getElementById("eventInput").value;
        addItem();
        document.getElementById("eventInput").value = "";
        document.getElementById("cButton").innerHTML = "Color";
        document.getElementById("cButton").style.backgroundColor = "black";
        delPopUp();
    })
    delPopUp();
    
    document.getElementById("events").addEventListener("click", function(e) {
        if (e.target.id !== "events") return;
        if (document.getElementById("popup").style.display == "flex") return;
    
        timeList = document.getElementsByClassName("time");
        time_y = []
        for(i = 0; i < timeList.length; i++){
            time_y.push(timeList[i].getBoundingClientRect().top);
        }
        closest = time_y.reduce((a, b) => {
            return Math.abs(b - e.y) < Math.abs(a - e.y) ? b : a;
        });
        for(i = 0; i < timeList.length; i++){
            if(closest == timeList[i].getBoundingClientRect().top){
                closest = timeList[i].className;
            }
        }
        closest = closest.split("-")[1];
        start = closest/100;
        showPopUp();
        document.getElementById("beginTime").value = fixTimeToTwelve(start);
    });
    function fixTimeToTwelve(time){
        if(time <= 11.5){
            var timeStr = time.toString();
            if(timeStr.includes(".5")){
                timeStr = timeStr + ":" + "30" + " AM";
            }
            else{
                timeStr = timeStr + ":" + "00" + " AM";
            }
            
        }
        else if(time >= 12 && time < 13){
            var timeStr = time.toString();
            if(timeStr.includes(".5")){
                timeStr = timeStr + ":" + "30" + " PM";
            }
            else{
                timeStr = timeStr + ":" + "00" + " PM";
            }
        }
        else{
            var timeStr = time.toString()
            var hour = timeStr;
            hour = parseInt(hour)-12;
            if(timeStr.includes(".5")){
                timeStr = (hour-.5) + ":" + "30" + " PM";
            }
            else{
                timeStr = hour + ":" + "00" + " PM";
            }
        }
        return timeStr
    }
    function fixTimeToTwentyFour(time){
        if(time.includes("AM")){
            var timeStr = time.toString();
            timeStr = timeStr.replace(":","").replace(" AM","");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
        }
        else if(time.includes("12")){
            var timeStr = time.toString();
            timeStr = timeStr.replace(":","").replace(" AM","");
        }
        else{
            var timeStr = time.toString()
            timeStr = timeStr.replace(":","").replace(" PM","");
            var hour = timeStr.substring(0,timeStr.length-2);
            hour = 12 + parseInt(hour);
            timeStr = hour.toString() + timeStr.substring(timeStr.length-2);
        }
        return parseInt(timeStr)
    }
    function addItem(){
        console.log(start + "  " + end)
        const evt = {
            id: id,
            starttime: start,
            endtime: end,
            name: start,
            cols: cols,
            color: color
          };
        eventContainer.innerHTML = "";
        events = [];
        events.push(evt);
        processEvents();
        loadEvents();
    }
    function processEvents() {
        events.forEach(evt => {
            const cell = getCell(evt.starttime);
              // check if exist
            if (!eventsByTime[evt.cols]) {
                eventsByTime[evt.cols] = {};
                eventsByTime[evt.cols][cell] = [];
              }
          
              if (!eventsByTime[evt.cols][cell]) {
                eventsByTime[evt.cols][cell] = [];
              }
              eventsByTime[evt.cols][cell].push(evt);
            });
          }
    function getCell(starttime) {
        const h = +starttime;
        return h - businessStartHours;
    }
    function renderEvent(evt) {
            var oneEvent = document.createElement("div");
            var eventStatus = document.createElement("div");
            var eventName = document.createElement("div");
            var eventTime = document.createElement("div");
            eventName.innerHTML = `${evt.id}`;
            eventTime.innerHTML = `${evt.time}`;
          
            oneEvent.appendChild(eventStatus);
            oneEvent.appendChild(eventName);
            oneEvent.appendChild(eventTime);
            eventName.setAttribute("class", "event-name");
            eventTime.setAttribute("class", "event-name");
            eventStatus.setAttribute("class", "event-status");
            oneEvent.setAttribute("class", "slot");
            oneEvent.setAttribute("id", "slot");
          
            oneEvent.style.justifyContent = "center";
            oneEvent.style.alignItems = "center";
            /**
             * if two events have same start time
             */
            eventName.style.color = "#000";
            eventName.style.fontSize = "25px";
            eventName.style.position = "relative";
            eventTime.style.color = "#000";
            eventTime.style.position = "relative";
    
            oneEvent.style.background = evt.color;
            oneEvent.style.width = evt.width + "%";
            oneEvent.style.left = evt.left + "%";
            oneEvent.style.zIndex = evt.zindex;
            oneEvent.style.height = getHeight(evt.starttime, evt.endtime) + "px";
            oneEvent.style.borderRadius = "10px";
            // 100 / ((8-colPos))
            oneEvent.style.gridArea = ""
            oneEvent.style.gridRow = getRowPosition(evt.starttime);
            oneEvent.style.display = "flex";
            oneEvent.style.flexDirection = "column";
            /* add to event container */
            eventContainer.appendChild(oneEvent);
          }
          function getRowPosition(starttime) {
            const t = +starttime;
            const temp = (t-8)*60;
            const rowPos = Math.floor(temp/30)+1;
            
            return rowPos;
          }
          function getHeight(starttime, endtime) {
            var duration = Math.abs(starttime - endtime);
            return duration*34.5;
          }
          function loadEvents() {
            //sortEvents();
            //console.log(eventsByDay);
            Object.keys(eventsByTime).forEach(e => {
                const eventsForThisTime = eventsByTime[e];
                const percW = 0;
                Object.keys(eventsForThisTime).forEach(c => {
                    const events = eventsForThisTime[c];
                    var totalEventsPerCell = events.length;
                    var offset = 0;
                    var percW2 = percW;
                    for (var i = 0; i < events.length; i++) {
                    var event = events[i];
            
                    const colPos = 1;
                    var perc = 98/totalEventsPerCell;
                    var wMultiplier = 1.5;
                    // for last one is just percW
                    event["width"] = perc;
                    event["left"] = percW2;
                    console.log(event.starttime)
                    event["time"] = `${fixTimeToTwelve(event.starttime)} - ${fixTimeToTwelve(event.endtime)}`;
                    renderEvent(event);
            
                    ++offset;
                    percW2+=perc;
                    }
            });
        });
      }
    