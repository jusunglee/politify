function create_div(d) {
  var main_div = document.createElement('div');
  main_div.className = 'info-box';
  var prof_pic_div = document.createElement('div');
  prof_pic_div.className = 'profile-pic';
  main_div.appendChild(prof_pic_div);
  var img = document.createElement('img');
  console.log(d);
  img.src = d['pic'];
  prof_pic_div.appendChild(img);
  var best_bills_div = document.createElement('div');
  best_bills_div.className = 'best-bills';
  var sp = document.createElement('b');
  sp.innerText = "Sponsored Bills"
  best_bills_div.appendChild(sp);
  prof_pic_div.appendChild(best_bills_div);
  for (var i = 0; i < d['key_bills'].length; i++) {
    if (i == 3) {
        break;
    }
    var p = document.createElement('p');
    p.innerText = d['key_bills'][i];
    best_bills_div.appendChild(p);
  }
  var top_contribs_div = document.createElement('div');
  top_contribs_div.className = 'top-contribs';
  var b = document.createElement('b');
  b.innerText = 'Top Contributers';
  top_contribs_div.appendChild(b);
  for (var i = 0; i < d['contributers'].length; i++) {
    var p = document.createElement('p');
    p.innerText = d['contributers'][i][0] + ": " + d['contributers'][i][1];
    p.className = 'contrib-p';
    top_contribs_div.appendChild(p);
  }
  
  var top_inds_div = document.createElement('div');
  top_inds_div.className = 'top-inds';
  var b2 = document.createElement('b');
  b2.innerText = 'Top Industries';
  top_inds_div.appendChild(b2);
  for (var i = 0; i < d['industries'].length; i++) {
    var p = document.createElement('p');
    p.innerText = d['industries'][i][0] + ": " + d['industries'][i][1];
    top_inds_div.appendChild(p);
    p.className = 'ind-p';
  }

  main_div.appendChild(prof_pic_div);
  var profile_bio_div = document.createElement('div');
  profile_bio_div.className = 'profile-bio';
  var h1 = document.createElement('h1');
  h1.innerText = d['name'];
  profile_bio_div.appendChild(h1);
  var h2 = document.createElement('h2');
  h2.innerText = d['title'];
  profile_bio_div.appendChild(h2);
  var h3 = document.createElement('h3');
  h3.innerText = d['vote_miss_rate'] + "  Missed Vote Rate";
  profile_bio_div.appendChild(h3);
  var spec_news_div = document.createElement('div');
  spec_news_div.className = 'spec-news';
  for (var i = 0; i < d['news'].length; i++) {
    var p = document.createElement('p');
    p.className = 'news-duh';
    p.innerText = d['news'][i];
    spec_news_div.appendChild(p);
  }
  profile_bio_div.appendChild(spec_news_div);
  main_div.appendChild(profile_bio_div);
  var voting_table_div = document.createElement('div');
  voting_table_div.className = 'voting-table';
  main_div.appendChild(voting_table_div);
  var table = document.createElement('table');
  table.className = 'actual-table';
  voting_table_div.appendChild(table);
  var h_tr = document.createElement('tr');
  table.appendChild(h_tr);
  var h_td1 = document.createElement('th');
  h_td1.innerText = 'Vote';
  var h_td2 = document.createElement('th');
  h_td2.innerText = 'Bill';
  var h_td3 = document.createElement('th');
  h_td3.innerText = 'Result';
  h_tr.appendChild(h_td1);
  h_tr.appendChild(h_td2);
  h_tr.appendChild(h_td3);
  for (var i = 0; i < d['votes'].length; i++) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    if (d['votes'][i]['vote'][0] == 'N') {
      tr.className = 'nay-tr';
      td1.className = 'td-nay';
    }
    else {
      tr.className = 'yay-tr';
      td1.className = 'td-yay';
    }
    td3.className = 'result-td';
    td1.innerText = d['votes'][i]['vote'];
    td2.innerText = d['votes'][i]['bill'];
    td3.innerText = d['votes'][i]['result'];
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
  }
  voting_table_div.appendChild(top_inds_div);
  voting_table_div.appendChild(top_contribs_div);
  main_div.id = 'spec-id-' + document.getElementsByClassName('info-box').length.toString();
  document.body.appendChild(main_div);
  console.log(main_div);
  return main_div.id;
}

var test_d = {
  "contributers": [
    [
      "Woodforest Financial Group",
      "$83,350"
    ],
    [
      "Club for Growth",
      "$41,025"
    ],
    [
      "Senate Conservatives Fund",
      "$35,342"
    ],
    [
      "Avalon Advisors",
      "$35,100"
    ],
    [
      "Herzog Contracting",
      "$35,100"
    ]
  ],
  "industries": [
    [
      "Retired",
      "$1,849,461"
    ],
    [
      "Republican/Conservative",
      "$780,587"
    ],
    [
      "Real Estate",
      "$658,815"
    ],
    [
      "Oil & Gas",
      "$643,661"
    ],
    [
      "Securities & Investment",
      "$610,550"
    ]
  ],
  "is_congress": "yes",
  "key_bills": [
    "S. 1892: A bill to provide tax relief related to Hurricanes Harvey, Irma, and Maria.",
    "S. 442: National Aeronautics and Space Administration Transition Authorization Act of 2017",
    "S.J.Res. 23: A joint resolution disapproving the rule submitted by the Department of Labor relating to drug testing of unemployment compensation applicants.",
    "S. 1297 (114th): U.S. Commercial Space Launch Competitiveness Act",
    "S. 2195 (113th): A bill to deny admission to the United States to any representative to the United Nations who has been found to have been engaged in espionage activities ...",
    "S. 1594 (113th): A bill to designate the United States courthouse located at 101 East Pecan Street in Sherman, Texas, as the Paul Brown United States Courthouse."
  ],
  "name": "Sen. Ted Cruz",
  "news": [
    "8 times Bernie Sanders made a total fool of Ted Cruz during their town hall debate",
    "Dem on Trump releasing JFK files: \u2018Does this mean Ted Cruz\u2019s father will be exposed?\u2019",
    "Ted Cruz Made A Painfully Awkward 'Curb Your Enthusiasm' Joke Last Night",
    "Ted Cruz, Who Is Not the Zodiac Killer, Acknowledges a Long-Running Joke",
    "Rick Perry rules out Senate run against Ted Cruz in 2018",
    "'Don't interrupt me when I'm interrupting you!': Ted Cruz and Bernie Sanders ribbed each other nonstop at CNN's debate",
    "Cruz totally outclassed Sanders in last night\u2019s debate"
  ],
  "pic": "http://www.govtrack.us//data/photos/412573-200px.jpeg",
  "title": " Republican Senator from Texas",
  "vote_miss_rate": "15.0%",
  "votes": [
    {
      "bill": "H.R. 5325: Legislative Branch Appropriations Act, 2017",
      "result": "Sep 28, 2016. Bill Passed 72/26.",
      "vote": "Nay"
    },
    {
      "bill": "S. 2012: Energy Policy Modernization Act of 2015",
      "result": "Apr 20, 2016. Bill Passed 85/12.",
      "vote": "Not Voting"
    },
    {
      "bill": "H.R. 22: Developing a Reliable and Innovative Vision for the Economy Act",
      "result": "Dec 3, 2015. Conference Report Agreed to 83/16.",
      "vote": "Nay"
    },
    {
      "bill": "H.R. 22: Developing a Reliable and Innovative Vision for the Economy Act",
      "result": "Jul 30, 2015. Bill Passed 65/34.",
      "vote": "Nay"
    },
    {
      "bill": "S. 1177: Every Child Achieves Act of 2015",
      "result": "Jul 16, 2015. Bill Passed 81/17.",
      "vote": "Nay"
    },
    {
      "bill": "H.R. 5771 (113th): Tax Increase Prevention Act of 2014",
      "result": "Dec 16, 2014. Bill Passed 76/16.",
      "vote": "Yea"
    },
    {
      "bill": "H.R. 3979 (113th): Carl Levin and Howard P. \u201cBuck\u201d McKeon National Defense Authorization Act for Fiscal Year 2015",
      "result": "Dec 12, 2014. Motion Agreed to 89/11.",
      "vote": "Nay"
    },
    {
      "bill": "H.J.Res. 124 (113th): Continuing Appropriations Resolution, 2015",
      "result": "Sep 18, 2014. Joint Resolution Passed 78/22.",
      "vote": "Nay"
    },
    {
      "bill": "H.R. 4302 (113th): Protecting Access to Medicare Act of 2014",
      "result": "Mar 31, 2014. Bill Passed 64/35.",
      "vote": "Nay"
    },
    {
      "bill": "H.R. 3304 (113th): National Defense Authorization Act for Fiscal Year 2014",
      "result": "Dec 19, 2013. Motion Agreed to 84/15.",
      "vote": "Nay"
    }
  ]
}

// var results = create_div(test_d);
// document.getElementsByClassName('special-links')[0].setAttribute('onclick', "nhpup.popup($('#spec-id-0').html(), {'width': 1600});");

