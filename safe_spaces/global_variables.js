//Interface
//let bgd = 20;
let bgd = 230;
let mouse = false;
let mode = "categories";

// JSON
let json;
let places;
let objects;
let categories;
let furniture;
let electronics;
let miscellaneous;
let analogue;
let digital;
let analogue_in_node = [];
let dig_in_node = [];
let a_d_node_scores = [];
let heavy;
let medium;
let light;
let instruments;
let total_duration;
let list = [];
let place_dict = {};
let obj_dict = {};
let color_dict = {};
let obj_id;
let roommates = [];

// DRAW pages
let H;
let h;
let page0 = true;
let page1 = false;
let page2 = false;
let page3 = true;
let showWaves;
let showPlaces;

let page0_shape;

// Draw TIMELINE
let start;
let end;
let h_timeline;
let diam;
let total_length;
let interval_start;
let node_x_pos = [];
let nodes = [];
let nodes2 = [];
let nodes3 = [];
let nodes_Timeline = [];
let sin_col;
let selected_place_index;
let homeliness_scores = [];

// IMAGES
let img_array = [];
let k_aris;
let place_imgs = [];
let room_image;
let img_dict = {};
let object_img_dict = {};
let object_img_dict_small = {};

let foto1;
let foto2;

// Image arrays
let elec = [];
let furn = [];
let misc = [];
let inst = [];
let count;
let showInfo = false;
let info_rec;
let frame;
let active_node = false;
let showOld = true;
let button_rect;
let rest_obj_per_node = [];
let node_scores = [];
let chronological_list = [];

// DRAGING
let foto1_dragging = false;
let foto1_offsetX = 0;
let foto1_offsetY = 0;
let foto2_dragging = false;
let foto2_offsetX = 0;
let foto2_offsetY = 0;
let fx1_curr;
let fy1_curr;
let fx2_curr;
let fy2_curr;
let foto_width = 350;
let foto_height = 270;


//// Charts
let showImages = false;
let histogram = false;


let ts_b = 13;
let ts_s = 11;
let ts_ss = 10;

let objCat = true;
let selCategories = true;


