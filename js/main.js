    const console = {
        log(string) {
            document.getElementById("game").innerHTML = document.getElementById("game").innerHTML + string + "<br>"
        },
        clear() {
            document.getElementById("game").innerHTML = ""
        }
    }



    function random(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    function modText(temp, indexToReplace, stringToPutIn)
    {
    var startString = temp.substr(0, indexToReplace);
    var endString = temp.substring(indexToReplace+1);
    return startString+stringToPutIn+endString;
    }
    var map = new Array();
    let data = {
    res: 40,
    x: 0,
    y: 0,
    xplay: 0,
    yplay: 0,
    debug: false,
    controls: false,
    showChar: false,
    char: "*",
    facing: 2,
    life: 10,
    resY: 40,
    limity:2,
    }
    var message = ""
    var phase = "intro"


    /*

        888888ba           oo dP       dP                   
        88    `8b             88       88                   
        a88aaaa8P'dP    dP dP 88 .d888b88 .d8888b. 88d888b. 
        88   `8b. 88    88 88 88 88'  `88 88ooood8 88'  `88 
        88    .88 88.  .88 88 88 88.  .88 88.  ... 88       
        88888888P `88888P' dP dP `88888P8 `88888P' dP       
                                                        
    */
    function mount(world){
        map = new Array();
        world.forEach(line => {
            map.push(line.char)
        })
        if (data.showChar){
            map[data.yplay] = modText(map[data.yplay], data.xplay, data.char)
        }
    }
    function build(res, world){
        mount(world)
        if(data.debug){
            console.log("\nx: " + data.xplay + " y: " + data.yplay + " cameraX: " + data.x + " cameraY: " + data.y + "\nmap: " + data.map)
        }
        if(buildTop)buildTop()
        let limit
        
        for (i = data.y; i < map.length&&i<data.resY+data.y; i++) {
            console.log(map[i].slice(data.x, data.x+res))
        }
        console.log("\n" + message)
    }
    function msg(msg, ms){
        console.clear()
        console.log(msg)
        setTimeout(function(){
            console.clear()
            build(data.res, data.map)
    }, ms)
    }
    function movie(world, ms, width, frames, name){
        let count = 0;
        data.x = 0;
        data.y=0
        data.xplay=0
        data.yplay=0
        phase="movie"
        data.showChar=false
        let movieCh = setInterval(function(){
            
            console.clear()
            build(width, world)
            
            count++
            data.x = data.x + width;
            if(count >= frames){clearInterval(movieCh);return movieFinish(name);}
            }, ms)
            
    }



    /*

     .88888.   .d888888  8888ba.88ba   88888888b 
    d8'   `88 d8'    88  88  `8b  `8b  88        
    88        88aaaaa88  88   88   88 a88aaaa    
    88   YP88 88     88  88   88   88  88        
    Y8.   .88 88     88  88   88   88  88        
     `88888'  88     88  dP   dP   dP  88888888P 


    */

    /*

                                            
        88            88                     
        88 88d888b. d8888P 88d888b. .d8888b. 
        88 88'  `88   88   88'  `88 88'  `88 
        88 88    88   88   88       88.  .88 
        dP dP    dP   dP   dP       `88888P' 
                                            


    */

    if (data.debug){
        movie(introJSON, 100, 17, 3, "intro")
    } else {
        movie(introJSON, 2000, 17, 3, "intro")
    }
    function movieFinish(name){
        if(name == "intro"){

            phase = "save"
            
    }}

    /*

                                            
        88                              88   
        88 88d888b. 88d888b. dP    dP d8888P 
        88 88'  `88 88'  `88 88    88   88   
        88 88    88 88.  .88 88.  .88   88   
        dP dP    dP 88Y888P' `88888P'   dP   
                    88                       
                    dP    

    */

    window.addEventListener("keypress", function (key) {
        if(!key) return;
        key.name = key.key
        if(key.name == "y" && fs.existsSync("./save.json")){
            fs.writeFile("./save.json", JSON.stringify(data), function(err){
                    if (err) throw err;
                    msg("Saved on save.json", 1000)
                })
        }


        if(data.controls){
            if(key.name == "e"){
                let y = [
                    data.map[data.yplay - 1],
                    data.map[data.yplay],
                    data.map[data.yplay + 1],
                    data.map[data.yplay]
                ]
                let x = [
                    data.xplay,
                    data.xplay + 1,
                    data.xplay,
                    data.xplay - 1
                ]
            if(y[data.facing].meta){
                if(y[data.facing].meta){
                    for(let i = 0; i < y[data.facing].meta.length; i++){
                        if(y[data.facing].meta[i].event){
                            if(y[data.facing].meta[i].event[0] == x[data.facing]){
                                eval(y[data.facing].meta[i].event[1])
                                if (data.y < 1){return}		}
                                if (data.y < 1){return}	}
                    }
                }
            }
        }

            if(key.name == "w" ){
                data.facing = 0
                if(map[data.yplay - 1].charAt(data.xplay) != " ") return;
                if(data.y > 0){
                    data.y = data.y - 1
                }
                
                data.yplay--
                console.clear()
            }

            if (key.name == "s"){ 
                data.facing = 2
                if(map[data.yplay + 1].charAt(data.xplay) != " ") return;
                console.clear()
                if(data.yplay>=data.limity&&data.y+data.resY<map.length){
                    data.y++
                }
                
                data.yplay++
            }

            if(key.name == "a" ){
                data.facing = 3
                if(map[data.yplay].charAt(data.xplay - 1) != " ") return;
                if (data.x > 0){
                    data.x = data.x - 1
                }
                data.xplay = data.xplay - 1
                console.clear()
            }
            if (key.name == "d"){ 
                data.facing = 1
                if(map[data.yplay].charAt(data.xplay + 1) != " ") return;
                console.clear()
                if (data.xplay > 9){
                    data.x++;
                }
                data.xplay++
            }

        }
        
        if (key.name=="escape") {
            console.clear()
            process.exit()
        }

            /*

                .d88888b    dP                       dP   
                88.    "'   88                       88   
                `Y88888b. d8888P .d8888b. 88d888b. d8888P 
                      `8b   88   88'  `88 88'  `88   88   
                d8'   .8P   88   88.  .88 88         88   
                 Y88888P    dP   `88888P8 dP         dP   
                                                        
                                                        
                                                    
                                                    
                .d8888b. .d8888b. 88d8b.d8b. .d8888b. 
                88'  `88 88'  `88 88'`88'`88 88ooood8 
                88.  .88 88.  .88 88  88  88 88.  ... 
                `8888P88 `88888P8 dP  dP  dP `88888P' 
                    .88                              
                 d8888P    

            */
        if (key.name == "Enter"){
                data = {
                res: 40,
                x: 0,
                y: 0,
                xplay: 3,
                yplay: 2,
                map: room1JSON,
                controls: true,
                showChar: true,
                char: "*",
                debug: data.debug,
                facing: 2,
                life: 3,
                resY: 15,
                limity:data.limity
                }
                console.clear()
                build(data.res, data.map)
                phase = "play"

            initx = data.xplay
            inity = data.yplay
            initmap = data.map
            initcx = data.x
            initcy = data.y

        }


        if (phase == "play"){
            console.clear()
            build(data.res, data.map)
            if(!data.map[data.yplay].meta) return;
            let meta = data.map[data.yplay].meta
            for (let i = 0; i < meta.length; i++){
            if(meta[i].warp){
                if (meta[i].warp[0] == data.xplay){
                    let warp = meta[i].warp
                    data.map = warp[1]
                    data.yplay = warp[2]
                    data.xplay = warp[3]
                    data.y = warp[4]
                    data.x = warp[5]
                    if(warp[6]){
                        entmap = warp[6]
                        template = warp[7]
                        loadAIMap(entmap, template, map)
                    }
                    
                    console.clear()
                    build(data.res, data.map)
                    }
                }
            }
            for (let i = 0; i < meta.length; i++){
                if(meta[i].trigger){
                    if (meta[i].trigger[0] == data.xplay){
                        if(meta[i].trigger[1]=="movie"){
                            let tr
                            tr=meta[i].trigger
                            movie(tr[2],tr[3], tr[4], tr[5], tr[6])
                            
                        }
                        eval(meta[i].trigger[1], "movie")
                        /*console.clear()
                        build(data.res, data.map)*/
                        }
                    }
                }
            }
    });
    function buildTop(){
        if(phase=="play"){
            console.log(`---------------------------`)
            console.log(`Life: ${data.life}`)
            console.log(`---------------------------`)
        }
        
    }
    console.clear()