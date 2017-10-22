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
      'threshold': 0.1
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

    if (names.length > 0)
    {
        $.post(
            "https://politify.herokuapp.com/getlist",
            data
        ).then(function(res) { underlineText(res) });
    }
}

function underlineText(name_list)
{
    var paragraph_array = document.getElementsByTagName("p");
    
    var array_len = paragraph_array.length;
  
    // For each paragraph
    for (var i = 0; i < array_len; i++)
    {
        if(paragraph_array[i].innerHTML.includes("<em>"))
        {
            continue;
        }
        else if(paragraph_array[i].innerHTML.includes("&nbsp;"))
        {
            continue;
        }
        else if(paragraph_array[i].innerHTML.includes("<strong>"))
        {
            continue;
        }
        else if(paragraph_array[i].className.includes("interstitial"))
        {
            continue;
        }
        var split_paragraph = paragraph_array[i].innerHTML.split(" ");
        console.log(split_paragraph);
        var split_length = split_paragraph.length;
        
        var isName = {};
       
        var name_len = name_list["results"].length;
        //here, strip words before sending in
        for (var j = 0; j < name_len; j++)
        {
            // curr_word = name_list["results"][j];
            // console.log(curr_word);
            isName[name_list["results"][j]] = true;
            
        }
        
        
        var index_array = [];

        for (var j = 0; j < (split_length - 1); j++)
        {
           if (split_paragraph[j].includes("&nbsp;"))
           {
              split_paragraph[j] = split_paragraph[j].replace(/&nbsp;/, " ");
            //   console.log(split_paragraph[j]);
           }
           else if (split_paragraph[j+1].includes("&nsbp;"))
           {
               split_paragraph[j+1] = split_paragraph[j+1].replace(/&nbsp;/, " ");
            //    console.log(split_paragraph[j+1]);
           }
         

           var word_pair = split_paragraph[j] + " " + split_paragraph[j+1];
           
        //    console.log("word1 after pair call");
        //    console.log(split_paragraph[j]);
           console.log(word_pair);
            word_pair = word_pair.replace(/[^\w\s]|_/g, "");
            console.log(word_pair);

           if (isName[word_pair] == true)
           {
                index_array.push(j);
           }
    
        }
        var subindex = 0;
        var new_p = document.createElement("p");
        var sub = "";
        var clean_p = document.createElement("p");
        for (var k = 0; k < split_length; k++)
        {
            console.log(split_paragraph[k]);
            
            if (k == index_array[subindex])
            {
                // console.log("in word condition");
                var newNode = document.createElement("b");
                newNode.className = "special-links";
                var word = document.createTextNode(split_paragraph[k] + " " + split_paragraph[k+1] + " ");
                newNode.appendChild(word);
                var subNode = document.createTextNode(sub);
                new_p.appendChild(subNode);
                new_p.appendChild(newNode);
                sub = "";
                subindex++;
                k++;
            }
            else{
                sub += (split_paragraph[k] + " ");
            }
            
        }
        var subNode = document.createTextNode(sub);
        new_p.appendChild(subNode);
        
        
        
        if (new_p.innerHTML.includes(new_p.innerHTML.match(/&lt;a.*&gt;.*&lt;\/a&gt;/)))
        {
            var middle = new_p.innerHTML.match(/&lt;a.*&gt;(.*)&lt;\/a&gt;/)[1];
            console.log(middle);
            console.log("match");
            // console.log(new_p.innerHTML.match(/&lt;a.*&gt;(.*)&lt;\/a&gt;/));
            var test= new_p.innerHTML.match(/&lt;a.*&gt;.*&lt;\/a&gt;/);
            // console.log(test);
            var fixed_text= new_p.innerHTML.replace(new_p.innerHTML.match(/&lt;a.*&gt;.*&lt;\/a&gt;/)[0], middle);
             console.log(fixed_text);
            // console.log(sub);
            var raw_text = new_p.innerHTML;
            // var clean_text = raw_text.replace()

            var fixed_node = document.createTextNode(fixed_text);
            clean_p.appendChild(fixed_node);
            // clean_p = document.createTextNode(fixed_text);
            // console.log(clean_p);
            // console.log(clean_p.innerHTML);
            console.log("special html");
            document.getElementsByTagName("p")[i].innerHTML = clean_p.innerHTML;
        }
        else{
            console.log("regular html");
            document.getElementsByTagName("p")[i].innerHTML = new_p.innerHTML;
        }
        // document.getElementsByTagName("p")[i].innerHTML = new_p.innerHTML;
        // document.getElementsByTagName("p")[i].innerHTML = clean_p.innerHTML;
        
        


        
    }
    
}




// function bold(name) {
//     var list = document.getElementsByTagName("p")[0].innerHTML;
//     var splits = list.split("Elizabeth Warren");
//     var before = document.createTextNode(splits[0]);
//     var after = document.createTextNode(splits[1]);
//     var word = document.createTextNode("destroy");
//     var newNode = document.createElement("b");
//     newNode.appendChild(word);

//     document.getElementsByTagName("p")[0].innerHTML = "";
//     document.getElementsByTagName("p")[0].appendChild(before);
//     document.getElementsByTagName("p")[0].appendChild(newNode);
//     document.getElementsByTagName("p")[0].appendChild(after);

    
// }




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


// <a.*>(.*)<\/a>