function getTextParagraph() {
    var string_array = document.getElementsByTagName("p");
    array_len = string_array.length;
    paragraph = "";
    for (var i = 0; i < array_len; i++ )
    {
        
        var subparagraph = string_array[i].innerHTML;

        paragraph += subparagraph;
        
    }
    
    return paragraph;
}

$.post(
    'https://apiv2.indico.io/people',
    JSON.stringify({
      'api_key': "5459fe6fddd22c1b76d3dc6204928e50",
      'data': getTextParagraph(),
      'threshold': 0.01
    })
  ).then(function(res) { postProcess(res) });

  // WHERE EVERYTHING IS HAPPENING
function postProcess(data){
    var jsondata = JSON.parse(data);
    var datalen = jsondata["results"].length;
    var names = [];
    for (var i = 0; i < datalen; i++)
    {
        if(jsondata["results"][i]["text"].split(" ").length == 2){
            names[i] = jsondata["results"][i]["text"];
            
        }
        // send list to API for processing

    }
    var data = {"list": names};
    console.log(data);
    $.post(
        "https://politify.herokuapp.com/getlist",
        data
      ).then(function(res) { underlineText(res) });

}

function underlineText(name_list)
{
    console.log(name_list);
    var paragraph_array = document.getElementsByTagName("p");
    
    var array_len = paragraph_array.length;
    for (var i = 0; i < array_len; i++)
    {
        var split_paragraph = paragraph_array[i].innerHTML.split(" ");
        var split_length = split_paragraph.length;
        
        var isName = {};
        for (name in name_list)
        {
            isName[name_list[name]] = true;
        }
        
        var index_array = [];

        for (var j = 0; j < (split_length - 1); j++)
        {
           var word_pair = split_paragraph[j] + " " + split_paragraph[j+1];
           console.log(word_pair);
           if (isName[word_pair] === true)
           {
                index_array.push(j);
           }
        }
        console.log(index_array);
    }
    
}




function bold(name) {
    var list = document.getElementsByTagName("p")[0].innerHTML;
    var splits = list.split("change");
    var before = document.createTextNode(splits[0]);
    var after = document.createTextNode(splits[1]);
    var word = document.createTextNode("destroy");
    var newNode = document.createElement("b");
    newNode.appendChild(word);

    document.getElementsByTagName("p")[0].innerHTML = "";
    document.getElementsByTagName("p")[0].appendChild(before);
    document.getElementsByTagName("p")[0].appendChild(newNode);
    document.getElementsByTagName("p")[0].appendChild(after);

    
}




// var newp = document.createElement("p");
// var x = document.getElementsById("p");
// var splits = x[0].innerHTML.split(name);
// var before = document.createTextNode(splits[0]);
// var word = document.createTextNode(name);

// var wordNode = document.createElement("b");
// wordNode.appendChild(word);
// wordNode.className = "wordNode";

// var after = document.createTextNode(splits[1]);
// newp.appendChild(before);
// newp.appendChild(wordNode);
// newp.appendChild(after);

// document.getElementById("p") = newp;





//    var wordNode = document.createElement("b");
// wordNode.appendChild(word);
// wordNode.className = "wordNode";

// var after = document.createTextNode(splits[1]);


// document.getElementsByTagName("p")[0].innerHTML = before;
// document.getElementsByTagName("p")[0].innerHTML = " ";
// document.getElementsByTagName("p")[0].innerHTML = after;