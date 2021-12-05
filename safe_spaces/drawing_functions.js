function createTimelineNodes(y_pos){
    // Set timeline params
    total_length = end - start;
    interval_start = start;

    let y = y_pos;
    node_x_pos = [];
    node_x_pos.push(start);

    let nodes_list = [];
    for (let j =0; j< places.length; j++) {
        //create list of nodes
        nodes_list.push(new Node(interval_start, places[j], y, j));
        place_dict[places[j].id] = interval_start;
        interval_start = interval_start + total_length*(parseInt(places[j].months) /total_duration);
        node_x_pos.push(interval_start);
    }
    //console.log(nodes_list)
    return nodes_list;
}

function drawDottedLine(pos_y){
    let y = pos_y
    let line_color = 130;
    stroke(line_color);
    strokeWeight(0.9);
    let step = 3;


    for (let p = start - h; p < start - h/4 -12 ; p += 6){
        //line( start - 10, h, end, h)
        point(p, y);
    }

    for (let p = start - h/4 - 10 ; p <= end +h; p += step){
        //line( start - 10, h, end, h)
        point(p, y);
    }
    // Draw arrow
    let dy = 3;
    let py = 9;
    for (let p = end + h - 9; p <= end +h; p += step){
        point(p, y + py);
        point(p, y - py);
        py -= dy;
    }

    if (page3){
        textSize(ts_ss)
        fill(140)
        noStroke()
        text("1989", start - h + 10 , y + 15)
        text("now", end + 5 , y + 14.5)
        stroke(100)
        line(end + 5 , y + 9, end + 5 , y - 3)
    }
}

function displayMenu(y_position){
    //ellipse(40 + 60, 40 + 150 + 13, 12, 12);
    let y_pos = y_position + 55;
    let x = node_x_pos[places[0].index] - h;
    textAlign(LEFT)
    noStroke()
    textSize(ts_b);
    fill(100)
    text("Objects", x, y_pos);
    //button
    let leading = 10;

    textSize(ts_b);
    fill(0);
    // if ((dist(mouseX, mouseY, 40 + 60, 40 + 150 + leading) <= 10) || (dist(mouseX, mouseY, 40 + 60 + 20, 40 + 150 + leading) <= 10) || (dist(mouseX, mouseY, 40 + 60 + 40, 40 + 150 + leading) <= 10)) {
    //     mode = "categories";
    // } else if ((dist(mouseX, mouseY, 40 + 60, 40 + 150 +  2 *leading) <= 10) || (dist(mouseX, mouseY, 40 + 60 + 20, 40 + 150 + 2* leading) <= 10) || (dist(mouseX, mouseY, 40 + 60 + 40, 40 + 150 + 2 *leading) <= 10)){
    //     mode = "chronological";
    // }
    //ellipse(40 + 50, 40 + 150, 20, 20);
    let rec1, rec2;
    if (mode === "chronological") {
        fill(100)
       // rec1 = rect(x, 40 + 160 + leading, 120, 12)
    }else if (mode === "categories"){
        fill(100)
        //rec2 = rect(x, 40 + 140 + leading, 120, 12)
    }
    fill(100)
    text("Chronological order", x, y_pos + 15 + leading);
    text("Object Categories", x,  y_pos + 30 +  leading);
}


function displayCategories(y_position){
    textAlign(LEFT);
    fill(100);
    noStroke();
    textSize(ts_s);
    let y_pos = y_position + 100;
    let x = node_x_pos[places[0].index] - h;

    let start = y_pos + 30;
    let end = y_pos + 400;
    let step = (end - start) / objects.length;

    categories_dict = categories[0];
    counter1 = 0;

    let d = 0;
    for (let cat in categories_dict){
        if (cat === "furniture" || cat === "electronics" || cat === "instruments" || cat === "miscellaneous"){
            items_list = categories_dict[cat]

            if ((dist(mouseX, mouseY, x, start + step * counter1 +d) <= 10) || (dist(mouseX, mouseY, x + 20, start + step * counter1 +d) <= 10) || (dist(mouseX, mouseY, x + 40, start + step * counter1+d) <= 10)) {
                fill(color_dict[cat]);
                noStroke()
                if (cat === "miscellaneous") {
                    text("personal items", x, start + step * counter1 + d);
                    rect(x - 15, start + step * counter1 + d, -15, 2);
                    for (let i = 0; i < items_list.length; i++) {
                        drawWaveform(items_list[i], color_dict[cat]);
                        noStroke()
                        fill(100)
                        text(items_list[i], x + 100, start + step * counter1 + d);
                        counter1++;
                        image(object_img_dict[items_list[i]], x + 200 + 20 *counter1, start + step * counter1 + d, 20, 20)
                    }
                } else {
                    text(cat, x, start + step * counter1 + d);
                    rect(x - 15, start + step * counter1 + d, -15, 2);
                    for (let i = 0; i < items_list.length; i++) {
                        drawWaveform(items_list[i], color_dict[cat]);
                        noStroke()
                        fill(100)
                        text(items_list[i], x + 100, start + step * counter1 + d);
                        counter1++;
                        image(object_img_dict[items_list[i]], x + 200 + 20 *counter1, start + step * counter1 + d, 20, 20)
                    }
                }

            } else {
                fill(100);
                noStroke()
                if (cat === "miscellaneous") {
                    text("personal items", x, start + step * counter1 + d);
                }else {
                    text(cat, x, start + step * counter1 + d);
                }
                // for (let i=0; i < items_list.length; i++){
                //     text(items_list[i], x + 100 , start + step * counter1 + d);
                //     counter1++;
                // }
            }
            d += 10
        }

    }
}

function displayObjNames(){
    textAlign(LEFT);
    textSize(ts_s);
    let obj_list = chronological_list;
    let col;

    let start = 3 * windowHeight/ 10;
    let end = 9 * windowHeight/ 10;
    let w = windowWidth/20;
    let step = (end - start) / obj_list.length;

    for (let i = 0; i < obj_list.length; i++){
        noStroke();
        if ((dist(mouseX, mouseY, w + 20, start + step * i) <= 10) || (dist(mouseX, mouseY, w + 40, start + step * i) <= 10) || (dist(mouseX, mouseY, w + 60, start + step * i) <= 10)) {
            //col = selectColor(obj_list[i], 255);
            col = selectColor(obj_list[i]);
            fill(col);
            rect(w - 20, start + step *  i, 15, 2);
            noStroke()
            text(obj_list[i], w , start + step *i)

            drawWaveform(obj_list[i], col, 3);
        } else {
            fill(255);
            noStroke()
            text(obj_list[i], w , start + step *i)
        }
    }
}

function displayTitle(pos_x, pos_y){
    let x = pos_x;
    let y= pos_y;
    textAlign(CENTER);
    //textAlign(LEFT);
    //fill(255);
    fill(65)
    // textSize(18);
    // textStyle(BOLD);

    if (page0){
        textSize(18);
        textStyle(BOLD);
        text("My Safe Spaces", x, y);
        // text("TEXT", x, y)
        textStyle(NORMAL);
        text("A Story of Rooms and Objects", x, y + 22);
        //if (dist(mouseX, mouseY, x + 55, y - 5) <= 55){
        //fill(200);
        fill(60)
        noStroke()
        textSize(ts_s);
        rectMode(CENTER)
        //text("HERE", H/2 , y + 60, 280, 280);
        let sentence = "This is a narrative on how personal space and identity are articulated in relation to physical things. My story is weaved around objects that I held with me for years. By exposing my archive, I want to tell a story about constant movement through places, social interactions and things.";
        //text(sentence, x , y + 18 * h, 280, 200);
        text(sentence, x ,  y + 120, 280, 200);
    } else if (page1){
        textSize(18);
        text("Object Web", x, y + 22);
    } else if (page2) {
        textSize(18);
        text("Moving Through Places", x, y+ 22);
    } else if (page3) {
        textSize(18);
        text("House Evaluation", x, y+ 22);
    }
        //let d = 16;
        // let sentences = ["This is a narrative on how personal space and identity", "are articulated in relation to physical things.", "In 2006, we moved out of the place where I grew up.", "Since then, I move from one place to the next.",
        //     "My story is weaved around objects that I held with me for years.", "By exposing my archive, I want to tell a story about constant movement", "through places, social interactions and things."]
    // let sentences = ["This is a narrative on how personal space and identity are articulated in relation to physical things.", "In 2006, we moved out of the place where I grew up. Since then, I find myself moving from one place to the next.",
    //     "My story is weaved around objects that I held with me for years.", "By exposing my archive, I want to tell a story about constant movement through places, social interactions and things."]


        // for (let i = 0; i < sentences.length; i++){
        //     // text(sentences[i], x, y + 60 + d * i);
        //
        // }

        // stroke(180);
        // line(x, y + 10, x + 200, y + 10);
        // line(x, y + 65, x + 200, y + 65);
        // noStroke();
    //}
    textStyle(NORMAL);
    textAlign(CENTER, CENTER)

}

function drawWaveform(id, color, s = 0.5){
    // parameter num corresponds to object index
    let index = getKeyByValue(obj_dict, id)

    let h_p2Timeline = H/4

    place_ids = list[index];

    for(let i=0; i< place_ids.length-1; i++){
        let start_sin = place_dict[place_ids[i]];
        let end_sin = place_dict[place_ids[i+1]];
        let mid = (start_sin + end_sin)/2
        // if (count === true){
        //     console.log(start_sin, " ", end_sin)
        //     count = false;
        // }

        // console.log(start_sin)
        // console.log(end_sin)
        let a = 3;
        let epsilon = 2;

        //let amp = (end_sin - start_sin) * random(0.2, 0.8);
        //let amp = (end_sin - start_sin) + index *(epsilon);
        let amp = 3 * index

        // Set alpha based on how many nodes
        let alpha = (map(place_ids.length, 0, 15, 0, 1)) * 255;
        // Select color based on category
        let sin_color = color;
        //sin_color.setAlpha(alpha);

        noFill();
        stroke(sin_color, alpha);
        //strokeWeight(parseInt(place_ids.length/4));
        strokeWeight(s);
        beginShape();
        console.log(light)
        console.log(medium)
        console.log(heavy)
        console.log(objects)
        console.log(objects[id])
        for(let x = start_sin; x < end_sin + 4; x++) {
            let angle;
            //if(i%2==random_binary){
            if(light.indexOf(objects[index]) !== -1 || medium.indexOf(objects[index]) !== -1){
                //if(i%2===1){
                angle = map(x, start_sin, end_sin, 0, PI);
                console.log("LIGHT OR MED")
            }else{
                angle = map(x, start_sin, end_sin, 0, PI) + PI;
                console.log("HEAVY")
            }

            // map x between 0 and width to 0 and Two Pi
            var y = map(sin(angle), -a, a, h_p2Timeline - amp, h_p2Timeline + amp);
            vertex(x, y);
        }
        endShape();

        // beginShape();
        // curveVertex(start_sin, h_timeline)
        // curveVertex(mid, h_timeline +5)
        // curveVertex(end_sin, h_timeline)
        // endShape();
    }
}

function Node(start, pl, y_pos, node_num){
    let int_st = start;
    let place = pl;
    let y = y_pos;
    let index = node_num;
   // let y_positions = [20, 40, 40, 40, 20, 20, 20, 60, 60, 20, 20, 40, 40];
    this.clicked = false;


    this.display = function(){
        textAlign(CENTER);
        textSize(ts_s);
        fill(140);
        noStroke();

        // if (false){
        //     textAlign(CENTER, CENTER);
        //     push();
        //     translate(int_st, y);
        //     //rotate( PI/3 );
        //     text(place.year, 0, y_positions[index])
        //     line(0, 0, 0, y_positions[index]*5)
        //     pop();
        //     //text(place.year, 0, 0)
        // }

        textAlign(CENTER, CENTER);

        if (showInfo && this.clicked){
            fill(place.color[0], place.color[1], place.color[2]);

        }else {
            if (page2){
                fill(200)
            }else{
                fill(120);
            }

        }

        textAlign(CENTER);
        // if the distance from the mouse to the data point is within 10 pixels
        if (dist(mouseX, mouseY, int_st, y) <= diam) {
            //pg.cursor(HAND);
            selected_place_index = index
            //console.log("PLACE INDEX " + selected_place_index)
            // draw the value of this data point (using 1 decimal point)
            //textSize(ts_b);
            fill(120)
            noStroke();
            // text(place.city, int_st, y + 90);
            // text(place.id, int_st, y + 110);
            // stroke(200)
            // line(int_st - 20, y_pos + 80, int_st + 20, y + 80)
            // line(int_st, y + 80, int_st, y)
            // noStroke();
            // fill(140)
            // if (place.roommates.length !== 0) {
            //     for (let r = 0; r < place.roommates.length; r++) {
            //         text(place.roommates[r], int_st, y + 140 + 20 * r);
            //     }
            // }
            //textAlign(LEFT, CENTER);
            push();
            if (mouseY > H/2 +h){
                translate(int_st, y + 11);
            } else {
                translate(int_st, y - 11);
            }

            //rotate( - PI / 2 );
            textAlign(CENTER)
            if (index !== 0){
                text(place.year, 0, 0)
            }
            pop();
            fill(place.color[0], place.color[1], place.color[2]);


        }

        if (page2){
            stroke(180)
            strokeWeight(0.9);
            //fill(place.color[0], place.color[1], place.color[2]);
            //fill(200)
            ellipse(int_st, y + 1, 7 * diam/6 );
        }else{
            stroke(130);
            rectMode(CENTER)
            //rect(int_st, y + 1, 7, 2)
            rect(int_st, y, 2, 9)
        }

    }

    this.click = function(){
        // if clicked once
        if (dist(mouseX, mouseY, int_st, y) <= diam) {
            setImage(place.id)
            showInfo = true;
            active_node = index;
            this.clicked = true;

        }
    }
}

function setImage(place_id){
    let id = place_id;
    //
    if (place_id){
        room_image = img_dict[id];
        console.log(room_image + "in SET")
    } else {
        room_image = false;
    }
}

function selectColor(id, a = 255){
    let obj_id = id;
    let alpha = a;
    let sine_col;
    if (furniture.includes(obj_id)){
        sine_col = color(255, 0 ,0, alpha);

    }else if (electronics.includes(obj_id)){
        sine_col  = color(255, 255 ,0, alpha);

    }else if (miscellaneous.includes(obj_id)){
        sine_col  = color(0, 255, 255, alpha);

    }else if(instruments.includes(obj_id)){
        sine_col = color(0, 0, 255, alpha);

    } else {
        sine_col = color(255, 255, 255, alpha);
    }
    return sine_col;
}


function calcFirstNodes(){
    let obj_list = [];
    let obj_node = [];
    let objects_nodes = [];

    // obj in chronological order
    for(let i = 0; i < places.length; i++){
        for(let j= 0; j < places[i].objects.length; j++){
            if (obj_list.indexOf(places[i].objects[j]) === -1){
                obj_list.push(places[i].objects[j]);
                obj_node = [places[i].objects[j], parseInt(places[i].index) ];
                objects_nodes.push(obj_node);
            }
        }
    }
    //console.log(objects_nodes)
    return objects_nodes;
}

//// Page 1 ???????
function drawObjByFirstNode(){
    fill(60)
    noStroke()
    //text("New vs. Existing Items", start - h, H/4 - 120)
    textSize(ts_b)
    text("New vs Old Items", H/2, H/4 - 110)
    textSize(ts_s)
    text("New is connected to investment in the place. Old is connected to memory", H/2, H/4 -110 +15)
    /////// Rotate titles
    textSize(11)
    push();
    translate(H/6 - 10, H/4);
    rotate( -PI/2 );
    //text(place.year, 0, 0)
    text("new items", 50, 0)
    text("old items", -50, 0)
    pop();

    //text("old items", H/6 - 10, H/2 + 20)

    fill(180)
    textSize(11)
    text("?", H - 4*h , H/4 - 110 + 15/2)
    noFill()
    stroke(180)
    ellipse(H - 4*h, H/4 - 110 + 15 /2, 12, 12)
    if (dist(mouseX, mouseY, H - 4*h , H/4 - 110 + 15 /2) < 15){
        stroke(130)
        ellipse( H - 4*h , H/4 - 110 + 15 /2, 12, 12)
        noStroke()
        fill(130)
        text("?", H - 4*h , H/4 - 110 + 15/2)
        textSize(ts_ss)
        textAlign(LEFT)
        text("Press: \n H for Histogram/Gray Mode, \n O for Objects \n C for Categories", H - 4*h, H/4 - 110 + 40)
        textAlign(CENTER)
    }

    let _first_objects;
    let first_objects;
    let away_from_timeline = 10;
    let stepY = 10;
    let stepX = 8;
    node_scores = [];
    for(let i=0; i<places.length; i++){
        _first_objects = places[i].first_obj;
        first_objects = [];

        for (let k=0; k<instruments.length; k++){
            for (let j=0; j<_first_objects.length; j++){
                if (instruments[k]===_first_objects[j]){
                    first_objects.push(_first_objects[j])
                }
            }
        }
        for (let k=0; k<furniture.length; k++){
            for (let j=0; j<_first_objects.length; j++){
                if (furniture[k]===_first_objects[j]){
                    first_objects.push(_first_objects[j])
                }
            }
        }
        for (let k=0; k<electronics.length; k++){
            for (let j=0; j<_first_objects.length; j++){
                if (electronics[k]===_first_objects[j]){
                    first_objects.push(_first_objects[j])
                }
            }
        }
        for (let k=0; k<miscellaneous.length; k++){
            for (let j=0; j<_first_objects.length; j++){
                if (miscellaneous[k]===_first_objects[j]){
                    first_objects.push(_first_objects[j])
                }
            }
        }
        if (count){
            console.log(first_objects)
            count = false
        }

        let num = 0;
        let y_par = 0
        for (let j=0; j<first_objects.length; j++){
            //console.log(first_objects[j])
            if (j%6===0){y_par = 0}
            if (j%6===0 && j!==0){num++}
            let x = node_x_pos[places[i].index] + stepX*num;
            let y = H/4 - away_from_timeline - stepY*(1+y_par);
            if (first_objects[j] !== -1){
                if (showImages){
                    imageMode(CENTER)
                    let img = object_img_dict_small[first_objects[j]];
                    image( img, x, y, 10, 10)
                } else {
                    if (histogram){
                        noStroke()
                        fill(200)
                    } else {
                        noStroke()
                        if (furniture.includes(first_objects[j])) {
                            fill(color_dict["furniture"])
                        }
                        if (instruments.includes(first_objects[j])) {
                            fill(color_dict["instruments"])
                        }
                        if (miscellaneous.includes(first_objects[j])) {
                            fill(color_dict["miscellaneous"])
                        }
                        if (electronics.includes(first_objects[j])) {
                            fill(color_dict["electronics"])
                        }
                    }
                        ellipse(x, y, 5, 5)
                }
            }
            y_par++;
        }

        if (showOld){
            let _rest = rest_obj_per_node[i]
            let rest = []

            for (let k=0; k<instruments.length; k++){
                for (let j=0; j<_rest.length; j++){
                    if (instruments[k]===_rest[j]){
                        rest.push(_rest[j])
                    }
                }
            }
            for (let k=0; k<furniture.length; k++){
                for (let j=0; j<_rest.length; j++){
                    if (furniture[k]===_rest[j]){
                        rest.push(_rest[j])
                    }
                }
            }
            for (let k=0; k<electronics.length; k++){
                for (let j=0; j<_rest.length; j++){
                    if (electronics[k]===_rest[j]){
                        rest.push(_rest[j])
                    }
                }
            }
            for (let k=0; k<miscellaneous.length; k++){
                for (let j=0; j<_first_objects.length; j++){
                    if (miscellaneous[k]===_rest[j]){
                        rest.push(_rest[j])
                    }
                }
            }
            let num1 = 0;
            let y_par1 = 0
            for (let j=0; j<rest.length; j++){
                if (j%6===0){y_par1 = 0}
                if (j%6===0 && j!==0){num1++}
                let x1 = node_x_pos[places[i].index] + stepX*num1;
                let y1 = H/4 + away_from_timeline + stepY*(1+y_par1);
                if (rest[j] !== -1){
                    if (showImages){
                        imageMode(CENTER)
                        let img = object_img_dict_small[rest[j]];
                        image( img, x1, y1, 10, 10)
                    } else {
                        if (histogram){
                            noStroke()
                            fill(200)
                        } else {
                            if (furniture.includes(rest[j])) {
                                fill(color_dict["furniture"])
                            }
                            if (instruments.includes(rest[j])) {
                                fill(color_dict["instruments"])
                            }
                            if (miscellaneous.includes(rest[j])) {
                                fill(color_dict["miscellaneous"])
                            }
                            if (electronics.includes(rest[j])) {
                                fill(color_dict["electronics"])
                            }
                        }

                        ellipse(x1, y1, 5, 5)
                    }
                }
                y_par1++;
            }
        }
        node_scores.push(first_objects.length - rest_obj_per_node[i].length)
        //console.log(node_scores)
    }
    if (histogram){
        showHistogram()
    }

}

function showHistogram(){
    let v_x = [];
    let v_y = [];
    let high = H/4 - 70;
    let low = H/4 + 70;

    for(let i=0; i<places.length; i++){
        let pos_x = node_x_pos[places[i].index];
        let score_y = node_scores[i];
        let y = map(score_y, 15, -15, high, low);
        fill(places[i].color[0], places[i].color[1], places[i].color[2]);
        //fill(255, 0, 0);
        ellipse(pos_x, y, 5, 5)
        v_x.push(pos_x)
        v_y.push(y)
    }
    noFill()
    stroke(80)
    strokeWeight(1)
    beginShape()
    for (let j = 0; j<v_x.length; j++){
        vertex(v_x[j], v_y[j])
    }
    endShape()
    noStroke()

    for(let j=0; j<places.length; j++){
        fill(places[j].color[0], places[j].color[1], places[j].color[2]);
        ellipse(v_x[j], v_y[j], 5, 5)
    }

}

function drawAnalogueDigital(){
    fill(60)
    noStroke()
    //text("New vs. Existing Items", start - h, H/4 - 120)
    textSize(ts_b)
    text("Digital vs Analogue", H/2, H/2 - 110)
    textSize(ts_s)
    text("Digital connects with the outside world. Analogue links to the place.", H/2, H/2 -110 +15)
    fill(180)
    textSize(11)
    text("?", H - 4*h, H/2 - 110 + 15/2)
    noFill()
    stroke(180)
    ellipse(H - 4*h, H/2 - 110 + 15 /2, 12, 12)
    if (dist(mouseX, mouseY, H - 4*h, H/2 - 110 + 15 /2) < 13){
        stroke(130)
        ellipse(H - 4*h, H/2 - 110 + 15 /2, 12, 12)
        noStroke()
        fill(130)
        text("?", H - 4*h, H/2 - 110 + 15/2)
        textAlign(LEFT)
        textSize(ts_ss)
        text("Press: \n O for Objects \n C for Categories", H - 4*h, H/2 - 110 + 40)
        textAlign(CENTER)
    }

    /////// Rotate titles
    noStroke()
    fill(60)
    textSize(11)
    push();
    translate(H/6 - 10, H/2);
    rotate( -PI/2 );
    //text(place.year, 0, 0)
    text("digital", 40, 0)
    text("analogue", -50, 0)
    pop();

    let away_from_timeline = 10;
    let stepY = 10;
    let stepX = 8;
     noStroke()

    for (let i=0; i<places.length; i++){
        //console.log(analogue_in_node[i])
        let _analogue_in_node = analogue_in_node[i]
        let __analogue_in_node = []
        for (let k=0; k<instruments.length; k++){
            for (let j=0; j<_analogue_in_node.length; j++){
                if (instruments[k]===_analogue_in_node[j]){
                    __analogue_in_node.push(_analogue_in_node[j])
                }
            }
        }
        for (let k=0; k<furniture.length; k++){
            for (let j=0; j<_analogue_in_node.length; j++){
                if (furniture[k]===_analogue_in_node[j]){
                    __analogue_in_node.push(_analogue_in_node[j])
                }
            }
        }
        for (let k=0; k<electronics.length; k++){
            for (let j=0; j<_analogue_in_node.length; j++){
                if (electronics[k]===_analogue_in_node[j]){
                    __analogue_in_node.push(_analogue_in_node[j])
                }
            }
        }
        for (let k=0; k<miscellaneous.length; k++){
            for (let j=0; j<_analogue_in_node.length; j++){
                if (miscellaneous[k]===_analogue_in_node[j]){
                    __analogue_in_node.push(_analogue_in_node[j])
                }
            }
        }
        let num = 0;
        let y_par = 0
        for (let j=0; j<__analogue_in_node.length; j++){
            if (j%6===0){y_par = 0}
            if (j%6===0 && j!==0){num++}
            let x = node_x_pos[places[i].index] + stepX*num;
            let y = H/2 + away_from_timeline + stepY*(1+y_par);
            if (__analogue_in_node[j] !== -1){
                if (showImages){
                    imageMode(CENTER)
                    let img = object_img_dict_small[analogue_in_node[i][j]];
                    image( img, x, y, 10, 10)
                } else {
                    if (histogram) {
                        fill(200)
                    } else {
                        if (furniture.includes(__analogue_in_node[j])) {
                            fill(color_dict["furniture"])
                        }
                        if (instruments.includes(__analogue_in_node[j])) {
                            fill(color_dict["instruments"])
                        }
                        if (miscellaneous.includes(__analogue_in_node[j])) {
                            fill(color_dict["miscellaneous"])
                        }
                        if (electronics.includes(__analogue_in_node[j])) {
                            fill(color_dict["electronics"])
                        }
                    }
                    ellipse(x, y, 5, 5)
                }
            }
            y_par++;
       }

        let num1 = 0;
        let y_par1 = 0
        for (let j=0; j<dig_in_node[i].length; j++){
            if (j%6===0){y_par1 = 0}
            if (j%6===0 && j!==0){num1++}
            let x1 = node_x_pos[places[i].index] + stepX*num1;
            let y1 = H/2 - away_from_timeline - stepY*(1+y_par1);
            if (dig_in_node[i][j] !== -1){
                if (showImages){
                    imageMode(CENTER)
                    let img = object_img_dict_small[dig_in_node[i][j]];
                    image( img, x1, y1, 10, 10)
                } else {
                    if (histogram) {
                        fill(200)
                    } else {
                        if (furniture.includes(dig_in_node[i][j])) {
                            fill(color_dict["furniture"])
                        }
                        if (instruments.includes(dig_in_node[i][j])) {
                            fill(color_dict["instruments"])
                        }
                        if (miscellaneous.includes(dig_in_node[i][j])) {
                            fill(color_dict["miscellaneous"])
                        }
                        if (electronics.includes(dig_in_node[i][j])) {
                            fill(color_dict["electronics"])
                        }
                    }
                    ellipse(x1, y1, 5, 5)
                }

            }
            y_par1++;
        }
    }

        // node_scores.push(first_objects.length - rest_obj_per_node[i].length)
        // console.log(node_scores)



}

function drawHomeyness(){
    let y = 3*H/4 + 60; /// from timeline
    fill(60)
    noStroke()
    textSize(ts_b)
    text("Homeyness", H/2, 3* H/4 - 110)
    textSize(ts_s)
    text("Family, memories and investment make a place feel like home.", H/2, 3* H/4 -110 +15)
    /////// Rotate titles
    textSize(11)
    push();
    translate(H/6 - 10, 3*H/4);
    rotate( -PI/2 );
    //text(place.year, 0, 0)
    //text("digital", 40, 0)
    text("homey %", -20, 0)
    pop();

    ///// ?
    fill(180)
    textSize(11)
    text("?", H - 4*h, 3* H/4 - 110 + 15/2)
    noFill()
    stroke(180)
    ellipse(H - 4*h, 3* H/4 - 110 + 15 /2, 12, 12)
    if (dist(mouseX, mouseY, H - 4*h, 3* H/4 - 110 + 15 /2) < 13){
        stroke(130)
        ellipse(H - 4*h, 3* H/4 - 110 + 15 /2, 12, 12)
        noStroke()
        fill(130)
        text("?", H - 4*h, 3* H/4 - 110 + 15/2)
        textAlign(LEFT)
        textSize(ts_ss)
        text("Living with family or roommates, \nproximity to birthplace \nand object size type \nare considered to calculate 'Homeyness", H - 4*h - 50, 3* H/4 - 110 + 45)
    }

    fill(180)
    // 3*H/4 + 60
    for (let p = start - h/2; p < end + h/2 ; p += 10){
        stroke(200)
        line( p, 3*H/4 + 60 - 100, p+8, 3*H/4 + 60 - 100)
        //point(p, y);
    }

    noStroke()
    //text("old items", H/6 - 10, H/2 + 20)
    for (let i=0; i<places.length; i++){
        let x = node_x_pos[places[i].index] - diam/2;
        let max = 100;
        let wid = 18;
        let hei = homeliness_scores[i] * max;

        //fill(190);
        fill(places[i].color[0], places[i].color[1], places[i].color[2]);
        //fill(places[i].color[0], places[i].color[1], places[i].color[2])
        rectMode(CORNERS);
        //rect(x + diam/2, y - hei/2, wid, hei);
        if (i < places.length-1){
            let x2 = node_x_pos[places[i+1].index] - 5
            rect(x + 2, y, x2 + 4, y - hei);
        }else{
            rect(x + 2 , y , x +wid + 4, y - hei);
        }
        // homeliness_scores
    }
}


///Page 0
function drawObjInCircle(){
    let img;
    let img_small;
    let cx = H/2
    let cy = h_timeline - 3*h
    let r = 200;
    let angle = 0;
    let col;
    // stroke(128)
    // noFill()
    // ellipse(cx, cy, 2*r)

    /// Legend
    fill(160)
    noStroke()
    textSize(ts_b)
    rectMode(CENTER)

    let dy = 14;
    text("Pick an object!", cx, cy + 390)

    textAlign(LEFT)
    textSize(11)
    text("Bubbles / Life Cycles:", H/2 + 300 - 20, H/2 + 300 - dy)
    fill("#cf99cf")
    ellipse(H/2 + 300 - 10, H/2 + 300 + 12, 10)
    fill("#b082b0");
    ellipse(H/2 + 300 - 10, H/2 + 300 + 12 + dy, 10)
    fill("#6b576b");
    ellipse(H/2 + 300 - 10, H/2 + 300 + 12 + 2*dy, 10)
    fill(160)
    text("Childhood", H/2 + 300 + 20 , H/2 + 300 + 12 )
    text("Young Adulthood", H/2 + 300 + 20 , H/2 + 300 + 12 + dy)
    text("Adulthood", H/2 + 300 + 20 , H/2 + 300 + 12 + 2 * dy)


    textAlign(LEFT)
    textSize(11)
    let move_up = 270;

    text("Connections:", H/2 + 300 - 20, H/2 - dy - 6)

    rectMode(CORNER)
    rect(H/2 + 300 - 20, H/2 + 18 - dy, 12, 2)
    if(selCategories){
        fill(60)
    }else{
        fill(160)
    }
    text("Categories", H/2 + 300, H/2 + 20 - dy)
    if (mouseX >  (H/2 + 300) && mouseX < (H/2 + 370) && mouseY < (H/2 + 290 - dy - move_up +6) && mouseY > (H/2 + 290 - dy - move_up +6 - 10)){
        // fill(255, 0 , 0)
        // rect(H/2 + 300, H/2 + 280 - dy - move_up +6, 70, -10)
        selCategories = true;
        objCat = true;
    }

    let _i = 0;
    if (true){
        fill(color_dict["furniture"])
        rect(H/2 + 300 - 10, H/2 + 300 + _i*dy- move_up, 20, 3)
        fill(160)
        text("Furniture", H/2 + 300 + 20 , H/2 + 300- move_up)
        _i++
        fill(color_dict["electronics"])
        rect(H/2 + 300  - 10 , H/2 + 300 + dy - move_up, 20, 3)
        fill(160)
        text("Electronics", H/2 + 300 + 20, H/2 + 300 + _i*dy- move_up)
        //stroke(color_dict["electronics"])
        _i++
        //stroke(color_dict["miscellaneous"])
        fill(color_dict["miscellaneous"])
        rect(H/2 + 300  - 10 , H/2 + 300 + 2*dy - move_up, 20, 3)
        fill(160)
        text("Personal Objects", H/2 + 300 + 20, H/2 + 300 + _i*dy - move_up)
        _i++
        fill(160)
        fill(color_dict["instruments"])
        rect(H/2 + 300  - 10 , H/2 + 300 + 3*dy - move_up, 20, 3)
        fill(160)
        text("Instruments", H/2 + 300 + 20, H/2 + 300 + _i*dy - move_up)
        _i += 2
    }
    //rect(H/2 + 300, H/2 + 300 + _i*dy - move_up +6, 70, -10)
    if(!selCategories){
        fill(60)
    }else{
        fill(160)
    }
    rect(H/2 + 300 - 20, H/2 + 300 + _i* dy - move_up - 1, 12, 2)

    text("Co-existance", H/2 + 300, H/2 + 300 + _i* dy - move_up)
    if (mouseX >  (H/2 + 300) && mouseX < (H/2 + 370) && mouseY < (H/2 + 300 + _i* dy - move_up +6) && mouseY > (H/2 + 300 + _i* dy - move_up +6 - 10)){
        // fill(255, 0 , 0)
        //rect(H/2 + 300, H/2 + 300 + _i*dy - move_up +6, 70, -10)
        selCategories = false;
        objCat = false;
    }

    if (true){
        fill(160)
        text("Objects co-existed \nat the same place", H/2 + 300, H/2 + 300 + (_i+2)* dy - move_up )
    }



    //stroke(color_dict["instruments"])
    textAlign(CENTER)

    for (let i=0; i<chronological_list.length; i++){
        angle += 2*PI/chronological_list.length;
        img = object_img_dict[chronological_list[i]];
        img_small = object_img_dict_small[chronological_list[i]];
        imageMode(CENTER)
        fill(245)


        if (dist(mouseX, mouseY, cx + r*cos(angle-PI/2), cy+ r*sin(angle-PI/2))<= 22){
            for (let j=0; j< objects.length; j++){
                if (objects[j] === chronological_list[i]){
                    showObjInfo(j)
                    //fill(col)
                }
            }
            // draw center
            //img.resize(150, 0)
            selectCircleColor(i)
            stroke(250)
            //fill(220)
            let angle2 = 0;
            for (let j=0; j<chronological_list.length; j++){
                angle2 += 2*PI/chronological_list.length;
                if (objCat){
                    if (i !== j ){
                        strokeWeight(2);
                        if(furniture.includes(chronological_list[i]) && furniture.includes(chronological_list[j])){

                            stroke(color_dict["furniture"])
                            line(cx + (r-15)*cos(angle-PI/2), cy+(r-15)*sin(angle-PI/2), cx + (r - 15)*cos(angle2-PI/2), cy+ (r - 15)*sin(angle2-PI/2) )
                            strokeWeight(0.5)
                        }
                        if(instruments.includes(chronological_list[i]) && instruments.includes(chronological_list[j])){
                            //stroke(200)
                            stroke(color_dict["instruments"])
                            line(cx + (r-15)*cos(angle-PI/2), cy+ (r-15)*sin(angle-PI/2), cx + (r - 15)*cos(angle2-PI/2), cy+ (r - 15)*sin(angle2-PI/2) )
                        }
                        if(miscellaneous.includes(chronological_list[i]) && miscellaneous.includes(chronological_list[j])){
                            //stroke(200)
                            stroke(color_dict["miscellaneous"])
                            line(cx + (r-15)*cos(angle-PI/2), cy+ (r-15)*sin(angle-PI/2), cx + (r - 15)*cos(angle2-PI/2), cy+ (r - 15)*sin(angle2-PI/2) )
                        }
                        if(electronics.includes(chronological_list[i]) && electronics.includes(chronological_list[j])){
                            //stroke(200)
                            stroke(color_dict["electronics"])
                            line(cx + (r-15)*cos(angle-PI/2), cy+ (r-15)*sin(angle-PI/2), cx + (r - 15)*cos(angle2-PI/2), cy+ (r - 15)*sin(angle2-PI/2) )
                        }
                        strokeWeight(0.5);
                    }
                } else {
                    /// obj together in places
                    if (i !== j){
                        let _counter = 0;
                        for (let p = 0; p<places.length; p++){

                            if (places[p].objects.includes(chronological_list[i]) && places[p].objects.includes(chronological_list[j])){
                                _counter++;
                            }
                        }
                        if (_counter>0){

                            let s= _counter;
                            let w = _counter;
                            s = map(s, 0, 10, 150, 60)
                            w = map(w, 0, 13, 1, 5)
                            stroke(s)
                            strokeWeight(w)

                            //strokeWeight(_counter/6)
                            line(cx + (r-15)*cos(angle-PI/2), cy+ (r-15) *sin(angle-PI/2), cx + (r - 15)*cos(angle2-PI/2), cy+ (r - 15)*sin(angle2-PI/2) )
                        }
                    }
                }
            }
            noStroke()
            ellipse(cx, cy + 410, 110, 110)
            image(img, cx, cy + 410, 90, 90)
            stroke(250)

            strokeWeight(0.3)
            ellipse(cx + r*cos(angle-PI/2), cy+ r*sin(angle-PI/2), 35, 35)
            ellipse(cx + r*cos(angle-PI/2), cy+ r*sin(angle-PI/2), 30, 30)
            image(img_small, cx + r*cos(angle-PI/2), cy+ r*sin(angle-PI/2), 25, 25)
            strokeWeight(0.3)
            noFill()


        } else {
            // If mouse not over image
            let angle2 = 0;
            for (let j=0; j<chronological_list.length; j++) {
                angle2 += 2 * PI / chronological_list.length;
                if (objCat){
                    if (i !== j) {
                        strokeWeight(0.5)
                        if (furniture.includes(chronological_list[i]) && furniture.includes(chronological_list[j])) {
                            stroke(150)
                            //stroke(color_dict["furniture"])
                            line(cx + (r-15) * cos(angle - PI / 2), cy +(r-15) * sin(angle - PI / 2), cx + (r - 15) * cos(angle2 - PI / 2), cy + (r - 15) * sin(angle2 - PI / 2))
                            strokeWeight(0.5);
                        }
                        if (instruments.includes(chronological_list[i]) && instruments.includes(chronological_list[j])) {
                            stroke(150)
                            //stroke(color_dict["instruments"])
                            line(cx + (r-15) * cos(angle - PI / 2), cy + (r-15) * sin(angle - PI / 2), cx + (r - 15) * cos(angle2 - PI / 2), cy + (r - 15) * sin(angle2 - PI / 2))
                        }
                        if (miscellaneous.includes(chronological_list[i]) && miscellaneous.includes(chronological_list[j])) {
                            stroke(150)
                            //stroke(color_dict["miscellaneous"])
                            line(cx + (r-15) * cos(angle - PI / 2), cy + (r-15) * sin(angle - PI / 2), cx + (r - 15) * cos(angle2 - PI / 2), cy + (r - 15) * sin(angle2 - PI / 2))
                        }
                        if (electronics.includes(chronological_list[i]) && electronics.includes(chronological_list[j])) {
                            stroke(150)
                            //stroke(color_dict["electronics"])
                            line(cx + (r-15) * cos(angle - PI / 2), cy + (r-15) * sin(angle - PI / 2), cx + (r - 15) * cos(angle2 - PI / 2), cy + (r - 15) * sin(angle2 - PI / 2))
                        }
                    }
                } else {
                    /// obj together in places
                    if (i !== j && j>i){
                        let _counter = 0;
                        for (let p = 0; p<places.length; p++){

                            if (places[p].objects.includes(chronological_list[i]) && places[p].objects.includes(chronological_list[j])){
                                _counter++;
                            }
                        }
                        if (_counter>0){
                            // not hover
                            console.log("COUNTER:" + _counter)
                            //strokeWeight(_counter/4)
                            strokeWeight(1)
                            let w= map(_counter, 0, 5, 240, 190)
                            stroke(w)
                            line(cx + (r-15)*cos(angle-PI/2), cy+ (r-15) *sin(angle-PI/2), cx + (r - 15)*cos(angle2-PI/2), cy+ (r - 15)*sin(angle2-PI/2) )
                        }
                    }
                }
                stroke(250)
                strokeWeight(0.3)
                ellipse(cx + r*cos(angle-PI/2), cy+ r*sin(angle-PI/2), 35, 35)
                image(img_small, cx + r*cos(angle-PI/2), cy+ r*sin(angle-PI/2), 25, 25)
                fill(200, 120)
                ellipse(cx + r*cos(angle-PI/2), cy+ r*sin(angle-PI/2), 30, 30)
            }
        }
    }
}

function selectCircleColor(index){
    if (index <15){
        fill("#cf99cf")
    }else if (index < 26){
        fill("#b082b0");
    }else if (index <31){
        fill("#6b576b")
    }
}

function showObjInfo(ind){
    let index = ind;
    let year;
    let city;
    textAlign(CENTER)
    fill(60)
    fill(60)
    textSize(ts_b)
    textStyle(BOLD);
    text(objects[index], H/2, H/2 + 150)
    textStyle(NORMAL);
    for (let i = 0; i<places.length; i++){
        if (list[index][0] === places[i].id){
            year = places[i].year;
            city = places[i].city;
            if (year === "2006"){
                text("Bought before " + year + ", in " + city, H/2, H/2 + 180);
            }else {
                text("Bought in " + year + ", in " + city, H/2, H/2 + 180);
            }
            text("I have carried it with me in " + list[index].length + " different places.", H/2, H/2 + 200)
        }
    }
    //text( texts[objects[index]], H/2, H/2 + 340);

}



function showInfoRect(){

    if (!page2){
        if(room_image.Width >= room_image.Height){
            room_image.resizeNN(H/3, 0);
        }else{
            room_image.resizeNN(0, H/3);
        }
    } else {
        if(room_image.Width >= room_image.Height){
            room_image.resizeNN(H/4, 0);
        }else{
            room_image.resizeNN(0, H/4);
        }
    }

    let wid = room_image.Width + 2
    let hei = room_image.Height +2
    stroke(100)
    rectMode(CENTER)
    //fill(250)
    //fill("#fff9ff")
    fill("#fcfffc")
    imageMode(CENTER);

    let x;
    let y;
    let a;

    if (page2){
        x = H/2;
        y = H/2 + 2* h;
        a = 500;
    }else{
        x = H + H/2 - H/4 + 2*h;
        y = H/2;
        a = 650;
    }


    info_rec = rect(x, y, a, a);
    // stroke(100)
    // strokeWeight(2)
    fill(100)
    frame = rect(x, y , wid, hei)
    // beginShape()
    // vertex(x-a/2, y-a/2)
    // vertex(x+a/2, y-a/2)
    // vertex(x+a/2, y+a/2)
    // vertex(x+a/2, y-a/2)
    //rect(H/2, h_timeline, room_image.Width + 20, room_image.Height + 20);
    ////// RECTANGLE NOT IMPLEMENTED
    //noFill();
    fill(100)

    //frame = rect(x, y - 100, wid, hei)

    image( room_image, x, y - 100, room_image.Width, room_image.Height)
    //beginContour()
    // vertex(x-H/6, y-H/6)
    // vertex(x-H/6, y+H/6)
    // vertex(x+H/6, y+H/6)
    // vertex(x+H/6, y-H/6)
    //endContour(CLOSE)
    //endShape()
    //console.log("showInfo is TRUE")
    //stroke(100);

    //// TEXT
    textSize(11);
    textAlign(LEFT);
    noStroke();
    fill(60);
    let step_y = 14;
    text( "City:  " + places[active_node].city, x - 200, y + H/8);
    //text( "Address:" + places[active_node].id, H/2 - 150, H/2 + H/8 + step_y);
    text( "Year:  " + places[active_node].year, x - 200, y + H/8 + step_y);
    text( "Length of stay:  " + places[active_node].months + " months", x - 200, y + H/8 + 2*step_y);
    let rmt = "None";
    if (places[active_node].roommates.length !== 0) {
        for (let r = 0; r < places[active_node].roommates.length; r++) {
            if (r !== 0) {
                rmt += ", "
                rmt += places[active_node].roommates[r];
            } else {
                rmt = places[active_node].roommates[r]
            }
            //text(place.roommates[r], int_st, h - 70 + 20 * r);
        }
    }
    text( "Roommates:  " + rmt, x - 200, y + H/8 + 3*step_y);

    text("Pets: " + places[active_node].pets, x - 200, y + H/8 + 4*step_y)

    // console.log("EDWWWWW" + places[active_node].fav)
    // let ic = img_dict[places[active_node].fav]
    // image( ic, x - 400, y + H/8 + 2*step_y, 50, 50)

    //////// ++++++++ADD INFO
    // rectMode(CENTER)
    // rect( x - a/2 + 34, (y + a/2) - 30, 30, 30)
    // rect( x + a/2 - 34, (y + a/2) - 30, 30, 30)




    // Draw Arrows
    // fill(49, 152, 169);
    // let dy = 3;
    // let py = 0;
    // for (let p = x - a/2 + 28; p <= x - a/2 + 40 ; p += 3){
    //     ellipse(p, (y + a/2) - 30 + py, 2, 2);
    //     ellipse(p, (y + a/2) - 30 -py, 2, 2);
    //     py += dy;
    // }
    // let py1 = 12;
    // for (let p = x + a/2 - 40; p <= x + a/2 - 28; p += 3){
    //     ellipse(p, (y + a/2) - 30 + py1, 2, 2);
    //     ellipse(p, (y + a/2) - 30 -py1, 2, 2);
    //     py1 -= dy;
    // }
    // rectMode(CENTER)
    // stroke(220);
    // noFill();
    // rect( x - a/2 + 34, (y + a/2) - 30, 30, 30)

    ///// Draw X
    if (dist(mouseX, mouseY, x + a/2 - 31, (y - a/2) + 30) <= 22) {
        //console.log("INHERE!!!!!!!!")
        rectMode(CENTER)
        //stroke(49, 152, 169);
        stroke(200)
        noFill();
        //button_rect = rect( x + a/2 - 31, (y - a/2) + 30, 22, 22)
    }

    if (!page2){
        fill(200)
        let dy = 3;
        let py2 = 9;
        for (let p = x + a/2 - 40; p <= x + a/2 - 22; p += 3){
            ellipse(p, (y - a/2) + 30 + py2, 2, 2);
            ellipse(p, (y - a/2) + 30 -py2, 2, 2);
            py2 -= dy;
        }
    }

}


///  Fix array for Node 0!!!!!!!
function calculateHomeliness(){
    /// homeliness_scores
    for (let i=0; i<places.length; i++) {
        console.log(places[i].id)
        let score = 0;
        let place = places[i]
        for (let j = 0; j < places[i].objects.length; j++){
            let obj = places[i].objects[j];
            if (heavy.indexOf(obj)!== -1){
                score += 2
                console.log("HEAVY +2")
            } else if (medium.indexOf(obj) !== -1){
                score += 1
                console.log("MED +1")
            } else if (light.indexOf(obj) !== -1){
                score += 0
                console.log("LIGHT")
            }
            console.log(obj + " " + score)
        }
        if (place.family.indexOf("No") !== -1){
            score -= place.roommates.length;
            console.log( "FAMILY NO")
        } else if (place.family.indexOf("Yes") !== -1){
            score += 3;
            console.log( "FAMILY YES")
        } else {
            score += 1;
            console.log( "FAMILY DEMI")
        }

        //// Proximity
        if (place.city === "Athens") {
            score += 2
        }else if (place.city === "Patras"){
            score += 1
        } else if (place.city === "Cambridge"){
            score -= 1
        } else {
            score +=0
        }

        homeliness_scores.push(score);
        console.log(places[i].id + " " +score)
    }

    ///// Normalize 0-1
    let ideal = 20 /// change for Vitali score
    let worst = -5
    for (let i=0; i<homeliness_scores.length; i++){
        homeliness_scores[i] = map(homeliness_scores[i], worst,  ideal, 0, 1)
    }
    console.log(homeliness_scores)
}


p5.Image.prototype.resizeNN = function (w, h) {
    "use strict";

    // Locally cache current image's canvas' dimension properties:
    const {width, height} = this.canvas;

    // Sanitize dimension parameters:
    w = ~~Math.abs(w), h = ~~Math.abs(h);

    // Quit prematurely if both dimensions are equal or parameters are both 0:
    if (w === width && h === height || !(w | h))  return this;

    // Scale dimension parameters:
    w || (w = h*width  / height | 0); // when only parameter w is 0
    h || (h = w*height / width  | 0); // when only parameter h is 0

    const img = new p5.Image(w, h), // creates temporary image
        sx = w / width, sy = h / height; // scaled coords. for current image

    this.loadPixels(), img.loadPixels(); // initializes both 8-bit RGBa pixels[]

    // Create 32-bit viewers for current & temporary 8-bit RGBa pixels[]:
    const pixInt = new Int32Array(this.pixels.buffer),
        imgInt = new Int32Array(img.pixels.buffer);

    // Transfer current to temporary pixels[] by 4 bytes (32-bit) at once:
    for (let y = 0; y < h; ) {
        const curRow = width * ~~(y/sy), tgtRow = w * y++;

        for (let x = 0; x < w; ) {
            const curIdx = curRow + ~~(x/sx), tgtIdx = tgtRow + x++;
            imgInt[tgtIdx] = pixInt[curIdx];
        }
    }

    img.updatePixels(); // updates temporary 8-bit RGBa pixels[] w/ its current state

    // Resize current image to temporary image's dimensions:
    this.canvas.width = this.width = w, this.canvas.height = this.height = h;
    this.drawingContext.drawImage(img.canvas, 0, 0, w, h, 0, 0, w, h);

    return this;
};





