var treeData =
  {
    "name": "QueenElizabeth",
    "icon": "https://i5.walmartimages.com/asr/5d437b89-8a29-406b-bc33-d2a15d31cdb3_1.45109a6c26040329f14cd41e2df0c74e.jpeg",
    "children": [
      {
       "name": "CharlesDiana",
       "icon": "https://images-na.ssl-images-amazon.com/images/I/51BXMCMnlpL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_SCLZZZZZZZ_.jpg",
        "children": [
          {
            "name": "WilliamKate",
            "icon": "https://www.partyrama.co.uk/wp-content/uploads/2014/02/prince-william-kate-and-baby-george-184cm-lifesize-cardboard-cutout-product-image.jpg",
          },
          {
            "name": "HarryMegan",
            "icon": "https://images-na.ssl-images-amazon.com/images/I/61KW396RtIL._AC_SX466_.jpg",
          }
        ]
      },
      {
        "name": "Camilla",
        "icon": "https://i.pinimg.com/originals/e8/37/04/e83704fa9ef3f375b54fab6043735753.jpg",
      }
    ]
  };

 let charlotte = {
    "name": "Charlotte",
    "icon": "https://media1.popsugar-assets.com/files/thumbor/70n6JUiLqm22ek19Irxbo-r8jcU/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2018/05/09/674/n/1922398/tmp_R1T5mW_31c472ee0ffa0ec5_GettyImages-950938396.jpg",
  }


  // document.querySelector('#CharlesDiana').newImage = 'https://i2.wp.com/www.celebrity-cutouts.com/wp-content/uploads/2018/05/prince-charles-cardboard-cutout.jpg?resize=450%2C500&ssl=1'

const iterateGet = (name, object) => {
  Object.keys(object).forEach(key => {
    console.log(key + name + object[key]);
    if(key == 'name' && object[key] == name) {
        return object;
     } else if(key == 'children') {
       Object.values(object[key]).forEach((c, index) => iterateGet(name, c))
    } 
  })
}
// #endregion

// #region remove
removeLocalData = function(id, arguments) {
  // TODO queen elizabeth
  let found = iterateRemove(id, treeData, null, null);
}

window.t = Element.prototype.remove;
Element.prototype.remove = function() {
    removeLocalData(this.id, arguments);
    draw(treeData);
    return window.t.apply(this, arguments);
};

const iterateRemove = (name, object, parent, index) => {
  Object.keys(object).forEach(key => {
    if(key == 'name' && object[key] == name) {
        console.log('removing');
        parent.splice(index, 1);
     } else if(key == 'children') {
       Object.values(object[key]).forEach((c, index) => iterateRemove(name, c, object[key], index))
    } 
  })
}
// #endregion


// #region append

//TODO list
insertLocalData = function(id, arguments) {
  console.log(arguments)
  let found = iterateAdd(id, treeData, arguments[0]);
}

window.f = Element.prototype.append;
Element.prototype.append = function() {
    insertLocalData(this.id, arguments);
    draw(treeData);
    return window.f.apply(this, arguments);
};

const iterateAdd = (name, object, addThisToChildren) => {
  Object.keys(object).forEach(key => {
    if(key == 'name' && object[key] == name) {
      if(!object.children) {
        object.children = [];
      }
      return object['children'].push(addThisToChildren);
    } else if(key == 'children') {
       Object.values(object[key]).forEach(c => iterateAdd(name, c, addThisToChildren))
    } 
  })
}
// #endregion

 // #region D3 styling 
// set the dimensions and margins of the diagram
var margin = {top: 80, right: 100, bottom: 60, left: 100},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

 var g = svg.append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

function draw(json) {
  svg.selectAll(".link").remove();//add this to remove the links
  svg.selectAll(".node").remove();//add this to remove the nodes

  // declares a tree layout and assigns the size
  var treemap = d3.tree()
      .size([width, height]);

  //  assigns the data to a hierarchy using parent-child relationships
  var nodes = d3.hierarchy(json, function(d) {
      return d.children;
    });

  // maps the node data to the tree layout
  nodes = treemap(nodes);

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin


  // adds the links between the nodes
  var link = g.selectAll(".link")
      .data( nodes.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", function(d) {
        return "M" + d.y + "," + d.x
          + "C" + (d.y + d.parent.y) / 2 + "," + d.x
          + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
          + " " + d.parent.y + "," + d.parent.x;
        });

  // adds each node as a group
  var node = g.selectAll(".node")
      .data(nodes.descendants())
    .enter().append("g")
      .attr("id", function(d) { return d.data.name;})
      .attr("class", function(d) { 
        return "node" + 
          (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")"; });

  node.on("click", rerenderFromHTML);

  // adds images as nodes
  node.append("image")
    .attr("xlink:href", function(d) { return d.data.icon; })
    .attr("y", "-75px")
    .attr("x", "-50px")
    .attr("width", "150px")
    .attr("height", "150px");

    node.append("rect")
    .attr("width", function(d) { return d.data.name.length * 7.5 + 30 + 'px'; })
    .attr("height", "150px");


  // adds the text to the node
  node.append("text")
    .attr("dy", "20px")
    .attr("dx", "12px")
    .text(function(d) { return d.data.name; })
}

function rerenderFromHTML(d) {
  let text = document.querySelector('#' + d.data.name);
  d.data.name = text.name || text.id;
  d.data.icon = text.newImage;
  d.data.newImage = text.newImage;
  draw(treeData);
}

function rerender() {
  console.log('rerendering');
  draw(treeData);
}


draw(treeData);


  // #endregion
