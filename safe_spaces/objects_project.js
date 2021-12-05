function preload(){
  json = loadJSON("objects.json");

  foto1 = loadImage("data/foto1.png");
  foto2 = loadImage("data/foto2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bgd);
  objects = json.Objects[0].ids;
  console.log("OBJECTS #:" + objects)
  places = json.Places;
  categories = json.Categories;
  chronological_list = json.Objects[0].chronological;
  for (let i = 0; i < places.length; i++){
    console.log(places[i].first_obj)
  }

  furniture = categories[0].furniture;
  electronics = categories[0].electronics;
  miscellaneous = categories[0].miscellaneous;
  instruments = categories[0].instruments;
  analogue = categories[0].analogue;
  digital = categories[0].digital;
  heavy = categories[0].heavy;
  medium = categories[0].medium;
  light = categories[0].light;

  // color_dict["furniture"] = color(32, 103, 75);
  // color_dict["electronics"] = color(186, 162, 105);
  // color_dict["miscellaneous"] = color(119, 69, 87);
  // color_dict["instruments"] = color(48, 46, 43);

  color_dict["furniture"] = color("#ff4f00");
  color_dict["electronics"] = color("#860000");
  color_dict["miscellaneous"] = color("#69b73e");
  color_dict["instruments"] = color("#d9af09");

  room_image = false;

  for (let i=0; i < objects.length; i++) {
    //create dict with obj ids
    obj_dict[i] = objects[i];   // { 0: "white bed", 1: "white bookcase", ... }

    //////Load obj images to dictionary: object_img_dict[objects[i]] = image_file  ----->  { "white bed" : image, "white bookcase" : image, ... }
    let image_file;
    let image_file_small;
    let str = []
    str = objects[i].split(" ");
    //console.log(str)
    if (str.length === 1) {
      image_file = loadImage("data/objects/" + objects[i] + ".png");
      image_file_small = loadImage("data/objects/" + objects[i] + ".png");
    } else if (str.length === 2) {
      console.log("data/objects/" + str[0] + "_" + str[1] + ".png")
      image_file = loadImage("data/objects/" + str[0] + "_" + str[1] + ".png");
      image_file_small = loadImage("data/objects/" + str[0] + "_" + str[1] + ".png");
    } else if (str.length === 3) {
      image_file = loadImage("data/objects/" + str[0] + "_" + str[1] + "_" + str[2] + ".png");
      image_file_small = loadImage("data/objects/" + str[0] + "_" + str[1] + "_" + str[2] + ".png");
    }

    object_img_dict[objects[i]] = image_file;
    object_img_dict_small[objects[i]] = image_file_small;

    let element = objects[i];
    //console.log(element);
    let object_nodes = [];
    for (let j = 0; j < places.length; j++) {
      if ((places[j].objects.indexOf(element) > -1)) {
        object_nodes.push(places[j].id);
      }
    }
    //console.log(object_nodes);
    list.push(object_nodes);        // list with all places for each object
  }

  //  calculate total duration
  total_duration = 0;
  for (let j =0; j< places.length; j++){
    total_duration = total_duration + parseInt(places[j].months);
    roommates.push(places[j].roommates);
    }
  //console.log(roommates)
  sin_col = color(255, 0, 0);

  // Load Place IMGs
  for (let i = 0; i < places.length; i++) {
    ////// Place IMG height: h - 200
    ///console.log(img)
    img_dict[places[i].id] = loadImage("data/places/" + places[i].image + ".png");
    //place_imgs.push(img);

    //console.log(places[12].first_obj)
    let all = places[i].objects;
    for (let x = 0; x < places[i].first_obj.length; x++) {
      let index = all.indexOf(places[i].first_obj[x]);
      all.splice(index, 1);
    }
    rest_obj_per_node.push(all)
    console.log(rest_obj_per_node)
  }

  ////// Create list with all analogue and all dig obj per node
  /////////// KAMMENIA ME i
  for (let i = 0; i < places.length; i++){
    console.log("i" + i)
    let analogue_n = [];
    let digital_n = [];
    let a_d_score = 0;

    if (i ===0){
      places[i].objects = places[i].first_obj;
    }
    console.log(places[i])
    console.log(places[i].objects)
    for (let j = 0; j < places[i].objects.length; j++) {
      console.log(places[i].objects)
      let obj = places[i].objects[j];
      console.log("i" + i)
      if (analogue.indexOf(obj) !== -1) {
        analogue_n.push(obj)
        a_d_score -= 1;
        console.log("ANALOGUE")
        console.log(obj)
      } else if (digital.indexOf(obj) !== -1) {
        digital_n.push(obj);
        a_d_score += 2;
      }
    }
    analogue_in_node.push(analogue_n)
    dig_in_node.push(digital_n)
    console.log(analogue_in_node)
    console.log(dig_in_node)
    a_d_node_scores.push(a_d_score)
  }

  selected_place_index = 0;
  createImgCategories()

  H = windowHeight;
  h = windowHeight/24;
  start = 5/24 * H ;
  end = H - 5/24*H ;
  diam = 7.5;

  h_timeline = H/2;
  nodes = createTimelineNodes(H/4);
  nodes_Timeline = createTimelineNodes(H/4);
  nodes2 = createTimelineNodes(h_timeline);
  // nodes3 = createTimelineNodes(3*H/4);
  nodes3 = createTimelineNodes(3*H/4 + 60);
  console.log(node_x_pos)
  console.log(calcFirstNodes())
  count = true;

  calculateHomeliness();

  fx1_curr = H/3;
  fy1_curr = H/2 - 2*h;
  fx2_curr = 3 * H/4 - h;
  fy2_curr =  2 * H/3 + h;
}


function draw() {
  //background(bgd_R, bgd_G, bgd_B);
  background(bgd);
  H = windowHeight;
  h = windowHeight/24;
  fill(50);
  //stroke(255, 0, 0)
  //rect(h, h, windowHeight - 2*h, windowHeight-2*h);
  //rect(h/2, h/2, windowHeight - h, windowHeight - h);
  drawPages();

}

function drawPages(){
  textSize(ts_b)
  strokeWeight(0.5)
  stroke(200)
  rectMode(CORNERS)
  fill(240)
  //fill("#e5e0d1")
  rect(h, H - h, H/2 -h, H-2*h)
  //fill(40)
  fill(220)
  //fill("#dbcca7")
  rect(h+(H-2*h)/3, H-2*h, h+2*(H-2*h)/3, H - h)
  //fill(50)
  //fill(190)
  //fill("#bdaf8f")
  fill(160)
  //fill("#c4bdab")
  rect(h+2*(H-2*h)/3, H - 2 * h, H-h, H-h)

  /////TEXT
  textAlign(CENTER, CENTER)
  fill(90)
  text("Story", h+(H-h-h)/6, (H - h + H-2*h)/2 +2 )
  text("Objects", H/2, (H - h + H-2*h)/2 +2 )
  //text("Places", (H/2 + H - 7/24*H)/2, (H - h + H-2*h)/2 +2 )
  text("Charts", H-h-(H-h-h)/6, (H - h + H-2*h)/2 +2 )
  noFill()

  textAlign(CENTER, CENTER)
  if (page0){
    //fill(255)
    fill("#fcfffc")
    //stroke(248)
    beginShape();
    vertex(h, H - h);
    vertex(h+(H-2*h)/3, H-h)
    //line(h, H - h, 7/24*H, H-h);
    //line(7/24*H, H-h, 7/24*H, H-2*h);
    vertex(h+(H-2*h)/3, H-2*h);
    //line(7/24*H, H-2*h, H-h, H-2*h);
    vertex(H-h, H-2*h);
    vertex(H-h, h);
    vertex(h, h);
    endShape(CLOSE)

    displayTitle(H/2, 1/12 * H)  //TITLE calls text
    //displayTitle( 2 * h, 1/12 * H)  //TITLE calls text
    imageMode(CENTER)


    if (foto1_dragging) {
      fx1_curr = mouseX + foto1_offsetX;
      fy1_curr = mouseY + foto1_offsetY;
      console.log((fx1_curr + "X"))
      console.log((fx1_curr + "Y"))
    }

    if (foto2_dragging) {
      fx2_curr = mouseX + foto2_offsetX;
      fy2_curr = mouseY + foto2_offsetY;
      console.log((fx1_curr + "X2"))
      console.log((fx1_curr + "Y2"))
    }

    image(foto1, fx1_curr, fy1_curr, 350 , 270)
    // push()
    // translate( fx1_curr, fy1_curr)
    // rotate(PI/9)
    // image(foto1, 0, 0, 350 , 270)
    // pop()
    image(foto2, fx2_curr, fy2_curr , 350, 270)
    // push()
    // translate( fx2_curr, fy2_curr)
    // rotate(-PI/16)
    // image(foto2, 0, 0, 350, 270)
    // pop()
    ///// TEXT
    noStroke()
    fill(60)
    //fill("#3198a9")
    textSize(ts_b)
    text("Story",h+(H-h-h)/6, (H - h + H-2*h)/2 )
    noFill()

  }else if (page1){
    //fill(70)
    //fill(255)
    //fill("#fff8e3")
    fill("#fcfffc")
    beginShape();
    vertex(h, H - 2 * h);
    vertex(h+(H-2*h)/3, H - 2 * h);
    vertex(h+(H-2*h)/3, H - h);
    vertex(h+2*(H-2*h)/3, H - h);
    vertex(h+2*(H-2*h)/3, H - 2*h);
    vertex(H-h, H-2*h);
    vertex(H-h, h);
    vertex(h, h);
    endShape(CLOSE)
    // line(h, H-2*h, 7/24*H, H-2*h);
    // line(H/2, H-2*h, H-h, H-2*h);

    displayTitle(H/2, 1/12 * H)  //TITLE calls text
    //displayTitle( 2 * h, 1/12 * H)  //TITLE calls text
    drawObjInCircle()

    ///// TEXT
    noStroke()
    fill(60)
    textSize(ts_b)
    text("Objects", H/2, (H - h + H-2*h)/2 + 2 )

  }else if(page3){
    textSize(ts_b)
    //fill(255)
    fill("#fcfffc")
    beginShape()
    vertex(h, H - 2 * h);
    vertex(h+2*(H-2*h)/3, H - 2*h);
    vertex(h+2*(H-2*h)/3, H - h);
    vertex(H-h, H - h);
    vertex(H-h, h);
    vertex(h, h);
    endShape(CLOSE)
    //line(h, H-2*h, 9/12*H, H - 7/24*H);

    displayTitle(H/2, 1/12 * H)
    // Timeline 1
    drawDottedLine(H/4)
    nodes.forEach(n => n.display());
    drawObjByFirstNode()

    // Timeline 2
    drawDottedLine(H/2);
    nodes2.forEach(n => n.display());
    drawAnalogueDigital()


    // Timeline 3
    //drawDottedLine(3*H/4);
    drawDottedLine(3*H/4 + 60);
    drawHomeyness()
    nodes3.forEach(n => n.display());


    ///// TEXT
    noStroke()
    fill(60)
    //fill("#3198a9")
    textSize(ts_b)
    text("Charts", H-h-(H-2*h)/6, (H - h + H-2*h)/2 + 2 )
  }
  noFill()

  if (showInfo){
    showInfoRect()
  }

  // drawDottedLine(H/2);
  // nodes.forEach(n => n.display());

  for (let j=0; j<list.length; j++){
    obj_id = obj_dict[j];
    // DRAW waveform
    //let sin_col = selectColor(obj_id, alpha);
    let sin_col = color(100, 100, 100);
    //drawWaveform(obj_id, sin_col);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(bgd);
  H = windowHeight;
  h = windowHeight/24;
  start = 5/24 * H ;
  end = H - 5/24*H ;
  diam = 6;

  h_timeline = H/2;

  nodes = createTimelineNodes(h_timeline);

}

function createImgCategories() {
  for (let i = 0; i < objects.length; i++) {
    //let obj = obj_list[i];
    let img = object_img_dict[objects[i]];
    //img.resize(70, 0);
    if (furniture.includes(objects[i])) {
      furn.push(img);
    } else if (electronics.includes(objects[i])) {
      elec.push(img);
    } else if (miscellaneous.includes(objects[i])) {
      misc.push(img);
    } else if (instruments.includes(objects[i])) {
      inst.push(img);
    }
  }
}

function mouseReleased(){
  for (let i=0; i < nodes.length; i++){
    nodes[i].click();
    nodes2[i].click();
    nodes3[i].click();
  }

  // console.log("CLICK!")
  //Check rects
  if ((mouseY >= H-2*h) && (mouseY <= H-h)){
    console.log("PAGES")
    if (mouseX >= h && mouseX < (h+(H-2*h)/3)){
      page1=false;
      //page2=false;
      page3=false;
      page0=true;
      console.log("PAGE0")
    }else if (mouseX >= (h+(H-2*h)/3) && mouseX < (h+2*(H-2*h)/3)){
      page0=false;
      //page2=false;
      page3=false;
      page1=true;
      console.log("PAGE1")
    }else if (mouseX >= (h+2*(H-2*h)/3) && mouseX < H-h){
      page0=false;
      page1=false;
      //page2=false;
      page3=true;
      console.log("PAGE3")
    }
  }

  // Close Info rect
  if (showInfo) {
    let x = H + H/2 - H/4 + 2*h;
    let y = H/2;
    let a = 650;

    if ((mouseX < (x - a/2) && mouseX > (H-h)) || mouseX > (x + a/2)|| mouseY > (y + a/2) || mouseY < (y - a/2)){
      showInfo = false;
      //console.log(nodes[active_node].clicked)
      nodes[active_node].clicked = false;
    }

  ///////// X and rect
    if (dist(mouseX, mouseY, x + a/2 - 31, (y - a/2) + 30) <= 22) {
      showInfo = false;
    }

    if (page2){
      if (mouseX>H) {
        showInfo = false;
      }
    }

    //////// ARROW NOT IMPLEMENTED
    // if (mouseX >= (x - a/2 + 20) && mouseX <= (x - a/2 + 50) && mouseY <= (y + a/2 - 15) && mouseY>= ((y + a/2 - 45))) {
    //   console.log("INHERE!!!!!!!!")
    //   // rect( x + a/2 - 34, (y + a/2) - 30, 30, 30)
    //   nodes[active_node].clicked = false;
    //   if (nodes[active_node]>0 && nodes[active_node]<nodes.length-1){
    //     active_node -= 1;
    //     setImage(places[active_node].id)
    //     showInfo = true;
    //     nodes[active_node].clicked = true;
    //   }
    // }
  }

  //// DRAG
  notPressed();


  //// Page 3
  if (mouseX > (H/2 - 140/2) && mouseX < (H/2 + 140/2) && mouseY > (H/4 - 110 - 15/2) && mouseY < (H/4 -110 + 15/2)){
    showWaves = true;
    showPlaces = false;
    rect(H/2 - 80, H/4 -110, -15, 2)
  } else if (mouseX > (H/2 - 140/2) && mouseX < (H/2 + 140/2) && mouseY > (H/4 - 110 + 15 - 15/2) && mouseY < (H/4 -110 + 15 + 15/2)){
    rect(H/2 -50, H/4 -110 + 15, -15, 2)
    showWaves = false;
    showPlaces = true;
  }
}

function mousePressed(){
  if (mouseX > (fx1_curr - foto_width/2) && mouseX < (fx1_curr + foto_width/2) && mouseY > (fy1_curr - foto_height/2) && mouseY < (fy1_curr + foto_height/2)){
    foto1_dragging = true;
    foto1_offsetX = fx1_curr - mouseX;
    foto1_offsetY = fy1_curr - mouseY;
  }

  if (mouseX > (fx2_curr - foto_width/2) && mouseX < (fx2_curr + foto_width/2) && mouseY > (fy2_curr - foto_height/2) && mouseY < (fy2_curr + foto_height/2)){
    foto2_dragging = true;
    foto2_offsetX = fx2_curr - mouseX;
    foto2_offsetY = fy2_curr - mouseY;
  }

}

function notPressed(){
  foto1_dragging = false;
  foto2_dragging = false;
}


function keyPressed(){
  if (keyCode === 79){ //o
    showImages = true;
    histogram = false;
  }
  if (keyCode === 67){  // c
    showImages = false;
    histogram = false;
  }
  if (keyCode === 72){  // h
    histogram = true;
    showImages = false;
  }
}
