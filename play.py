import urllib.request
import requests
from bs4 import BeautifulSoup as BS
import re

names = set([x.lower() for x in "Mitch McConnell|Ralph Abraham|Alma Adams|Robert Aderholt|Pete Aguilar|Rick Allen|Justin Amash|Mark Amodei|Jodey Arrington|Brian Babin|Don Bacon|Jim Banks|Lou Barletta|Andy Barr|Nanette Barragán|Joe Barton|Karen Bass|Joyce Beatty|Ami Bera|Jack Bergman|Donald Beyer|Andy Biggs|Gus Bilirakis|Mike Bishop|Rob Bishop|Sanford Bishop|Diane Black|Marsha Blackburn|Rod Blum|Earl Blumenauer|Lisa Blunt Rochester|Suzanne Bonamici|Madeleine Bordallo|Mike Bost|Brendan Boyle|Kevin Brady|Robert Brady|Dave Brat|Jim Bridenstine|Mo Brooks|Susan Brooks|Anthony Brown|Julia Brownley|Vern Buchanan|Ken Buck|Larry Bucshon|Ted Budd|Michael Burgess|Cheri Bustos|G. Butterfield|Bradley Byrne|Ken Calvert|Michael Capuano|Salud Carbajal|Tony Cárdenas|André Carson|Earl Carter|John Carter|Matt Cartwright|Kathy Castor|Joaquin Castro|Steve Chabot|Liz Cheney|Judy Chu|David Cicilline|Katherine Clark|Yvette Clarke|Wm. Clay|Emanuel Cleaver|James Clyburn|Mike Coffman|Steve Cohen|Tom Cole|Chris Collins|Doug Collins|James Comer|Barbara Comstock|K. Conaway|Gerald Connolly|John Conyers|Paul Cook|Jim Cooper|J. Correa|Jim Costa|Ryan Costello|Joe Courtney|Kevin Cramer|Eric Crawford|Charlie Crist|Joseph Crowley|Henry Cuellar|John Culberson|Elijah Cummings|Carlos Curbelo|Warren Davidson|Danny Davis|Rodney Davis|Susan Davis|Peter DeFazio|Diana DeGette|John Delaney|Rosa DeLauro|Suzan DelBene|Val Demings|Jeff Denham|Charles Dent|Ron DeSantis|Mark DeSaulnier|Scott DesJarlais|Theodore Deutch|Mario Diaz-Balart|Debbie Dingell|Lloyd Doggett|Daniel Donovan|Michael Doyle|Sean Duffy|Jeff Duncan|John Duncan|Neal Dunn|Keith Ellison|Tom Emmer|Eliot Engel|Anna Eshoo|Adriano Espaillat|Ron Estes|Elizabeth Esty|Dwight Evans|Blake Farenthold|John Faso|A. Ferguson|Brian Fitzpatrick|Charles Fleischmann|Bill Flores|Jeff Fortenberry|Bill Foster|Virginia Foxx|Lois Frankel|Trent Franks|Rodney Frelinghuysen|Marcia Fudge|Tulsi Gabbard|Matt Gaetz|Mike Gallagher|Ruben Gallego|John Garamendi|Thomas Garrett|Greg Gianforte|Bob Gibbs|Louie Gohmert|Jimmy Gomez|Vicente Gonzalez|Jenniffer González-Colón|Bob Goodlatte|Paul Gosar|Josh Gottheimer|Trey Gowdy|Kay Granger|Garret Graves|Sam Graves|Tom Graves|Al Green|Gene Green|H. Griffith|Raúl Grijalva|Glenn Grothman|Brett Guthrie|Luis Gutiérrez|Colleen Hanabusa|Karen Handel|Gregg Harper|Andy Harris|Vicky Hartzler|Alcee Hastings|Denny Heck|Jeb Hensarling|Jaime Herrera Beutler|Jody Hice|Brian Higgins|Clay Higgins|J. Hill|James Himes|George Holding|Trey Hollingsworth|Steny Hoyer|Richard Hudson|Jared Huffman|Bill Huizenga|Randy Hultgren|Duncan Hunter|Will Hurd|Darrell Issa|Sheila Jackson Lee|Pramila Jayapal|Hakeem Jeffries|Evan Jenkins|Lynn Jenkins|Bill Johnson|Eddie Johnson|Henry Johnson|Mike Johnson|Sam Johnson|Walter Jones|Jim Jordan|David Joyce|Marcy Kaptur|John Katko|William Keating|Mike Kelly|Robin Kelly|Trent Kelly|Joseph Kennedy|Ro Khanna|Ruben Kihuen|Daniel Kildee|Derek Kilmer|Ron Kind|Peter King|Steve King|Adam Kinzinger|Stephen Knight|Raja Krishnamoorthi|Ann Kuster|David Kustoff|Raúl Labrador|Darin LaHood|Doug LaMalfa|Doug Lamborn|Leonard Lance|James Langevin|Rick Larsen|John Larson|Robert Latta|Brenda Lawrence|Al Lawson|Barbara Lee|Sander Levin|Jason Lewis|John Lewis|Ted Lieu|Daniel Lipinski|Frank LoBiondo|David Loebsack|Zoe Lofgren|Billy Long|Barry Loudermilk|Mia Love|Alan Lowenthal|Nita Lowey|Frank Lucas|Blaine Luetkemeyer|Ben Luján|Michelle Lujan Grisham|Stephen Lynch|Thomas MacArthur|Carolyn Maloney|Sean Maloney|Kenny Marchant|Tom Marino|Roger Marshall|Thomas Massie|Brian Mast|Doris Matsui|Kevin McCarthy|Michael McCaul|Tom McClintock|Betty McCollum|A. McEachin|James McGovern|Patrick McHenry|David McKinley|Cathy McMorris Rodgers|Jerry McNerney|Martha McSally|Mark Meadows|Patrick Meehan|Gregory Meeks|Grace Meng|Luke Messer|Paul Mitchell|John Moolenaar|Alexander Mooney|Gwen Moore|Seth Moulton|Markwayne Mullin|Stephanie Murphy|Tim Murphy|Jerrold Nadler|Grace Napolitano|Richard Neal|Dan Newhouse|Kristi Noem|Richard Nolan|Donald Norcross|Ralph Norman|Eleanor Norton|Devin Nunes|Tom O'Halleran|Pete Olson|Beto O'Rourke|Steven Palazzo|Frank Pallone|Gary Palmer|Jimmy Panetta|Bill Pascrell|Erik Paulsen|Donald Payne|Stevan Pearce|Nancy Pelosi|Ed Perlmutter|Scott Perry|Scott Peters|Collin Peterson|Chellie Pingree|Robert Pittenger|Stacey Plaskett|Mark Pocan|Ted Poe|Bruce Poliquin|Jared Polis|Bill Posey|David Price|Mike Quigley|Aumua Amata Radewagen|Jamie Raskin|John Ratcliffe|Tom Reed|David Reichert|James Renacci|Kathleen Rice|Tom Rice|Cedric Richmond|Martha Roby|David Roe|Harold Rogers|Mike Rogers|Dana Rohrabacher|Todd Rokita|Francis Rooney|Thomas Rooney|Jacky Rosen|Peter Roskam|Ileana Ros-Lehtinen|Dennis Ross|Keith Rothfus|David Rouzer|Lucille Roybal-Allard|Edward Royce|Raul Ruiz|C. Ruppersberger|Bobby Rush|Steve Russell|John Rutherford|Paul Ryan|Tim Ryan|Gregorio Sablan|Linda Sánchez|Mark Sanford|John Sarbanes|Steve Scalise|Janice Schakowsky|Adam Schiff|Bradley Schneider|Kurt Schrader|David Schweikert|Austin Scott|David Scott|Robert Scott|F. Sensenbrenner|José Serrano|Pete Sessions|Terri Sewell|Carol Shea-Porter|Brad Sherman|John Shimkus|Bill Shuster|Michael Simpson|Kyrsten Sinema|Albio Sires|Louise Slaughter|Adam Smith|Adrian Smith|Christopher Smith|Jason Smith|Lamar Smith|Lloyd Smucker|Darren Soto|Jackie Speier|Elise Stefanik|Chris Stewart|Steve Stivers|Thomas Suozzi|Eric Swalwell|Mark Takano|Scott Taylor|Claudia Tenney|Bennie Thompson|Glenn Thompson|Mike Thompson|Mac Thornberry|Patrick Tiberi|Scott Tipton|Dina Titus|Paul Tonko|Norma Torres|David Trott|Niki Tsongas|Michael Turner|Fred Upton|David Valadao|Juan Vargas|Marc Veasey|Filemon Vela|Nydia Velázquez|Peter Visclosky|Ann Wagner|Tim Walberg|Greg Walden|Mark Walker|Jackie Walorski|Mimi Walters|Timothy Walz|Debbie Wasserman Schultz|Maxine Waters|Bonnie Watson Coleman|Randy Weber|Daniel Webster|Peter Welch|Brad Wenstrup|Bruce Westerman|Roger Williams|Frederica Wilson|Joe Wilson|Robert Wittman|Steve Womack|Rob Woodall|John Yarmuth|Kevin Yoder|Ted Yoho|David Young|Don Young|Lee Zeldin|Ted Cruz|Elizabeth Warren|Chris Christie|Bernie Sanders".split('|')])


def is_congress(name):
    return name in names


def get_d(name):
    print(name)
    if name not in names:
        return
    joined_name = '+'.join(name.split())
    r = urllib.request.urlopen("https://www.govtrack.us/search?q=" + joined_name).read()
    soup = BS(r)
    # print(soup)
    links = soup.find_all("li")
    true_link = None
    for link in links:
        if '/congress/members/' in str(link):
            true_link = str(link)[5:]
            break
    start_index = true_link.index('/congress/members')
    end_index = true_link.index('>')
    final = true_link[start_index:end_index - 1]
    prefix = 'http://www.govtrack.us'
    final_link = prefix + final
    r = urllib.request.urlopen(final_link).read()
    soup = BS(r)
    d = {
        'is_congress': 'yes'
    }
    pic = prefix + '/' + soup.find_all('img')[0]['src']
    d['pic'] = pic
    h1 = soup.find_all('h1')[0].text
    d['name'] = h1.strip()
    p = ' '.join(soup.find_all('p')[0].text.split())
    pp = p.split(',')
    pp.reverse()
    pp = ' '.join(pp)
    d['title'] = pp
    p = soup.find_all('p')
    p.reverse()
    for p_ in p:
        if 'roll call votes' in str(p_):
            pp = str(p_)
            break
    start_index = pp.index('which is')
    pp = pp[start_index + 9:]
    end_index = pp.index('%')
    pp = pp[:end_index + 1]
    d['vote_miss_rate'] = pp
    rows = soup.find_all('tr')[1:]
    votes = []
    i = 0
    for row in rows:
        if i == 10:
            break
        x = [y.strip() for y in row.text.split('\n') if len(y.split()) > 0]
        votes.append({
            'vote' : x[0],
            'bill': x[1],
            'result': x[2]
        })
        i += 1
    votes = votes[:10]
    d['votes'] = votes
    api_key = '607e6931003de61a68a4ca507dc0c64f'
    # call = 'http://www.opensecrets.org/api/?method=candSummary&cid=N00007360&cycle=2012&apikey=' + api_key
    call = 'https://duckduckgo.com/html/?q=opensecret+' + joined_name
    r = requests.get(call)
    parsed = BS(r.text)
    first_link = parsed.findAll('div', {'class': re.compile('links_main*')})[0].a['href']
    start_index = first_link.index('uddg=')
    first_link = urllib.parse.unquote(first_link[start_index + 5:])
    req = urllib.request.Request(first_link, headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urllib.request.urlopen(req).read()
    soup = BS(webpage)
    trs = soup.find_all('tr')[5:]
    contributors = [x.text for x in trs[:5]]
    industries = [x.text for x in trs[6:11]]
    for i, row in enumerate(contributors):
        new_row = str(row).split('\n')
        name_ = new_row[1]
        money = new_row[2]
        contributors[i] = [name_, money]
        new_row = industries[i].split('\n')
        name_ = new_row[1]
        money = new_row[2]
        industries[i] = [name_, money]
    d['contributers'] = contributors
    d['industries'] = industries
    r = urllib.request.urlopen(final_link).read()
    soup = BS(r)
    key_bills = [x.text for x in soup.find_all('section')[2].find_all('li')]
    d['key_bills'] = key_bills
    return d