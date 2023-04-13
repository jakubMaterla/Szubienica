var haslo = "Bez pracy nie ma kołaczy";
haslo = haslo.toUpperCase();

var haslo1='';
var dlugosc = haslo.length;
var ile_skuch=0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

for (let i=0;i<dlugosc;i++)
{
    if(haslo.charAt(i)!=" ") haslo1 += "-";
    else haslo1 += " ";
}

var litery = new Array(35);

litery = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó',
    'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż'];

window.onload = start;

function wypisz_haslo()
{
    document.querySelector("#plansza").innerHTML = haslo1;
}

function start()
{
    var tresc_diva='';

    for(let i=0;i<=34;i++)
    {
        tresc_diva += '<div class="litera" onclick="sprawdz('+i+')" id="lit'+ i +'">'+litery[i]+'</div>';
        if ((i+1)%7==0) tresc_diva += '<div style="clear: both"></div>'
    }

    document.querySelector("#alfabet").innerHTML = tresc_diva;

    wypisz_haslo();
}

String.prototype.ustawZnak = function (miejsce,znak)
{
    if(miejsce>this.length-1) return this.toString();
    else return this.substr(0, miejsce) + znak + this.substr(miejsce+1)
}

function sprawdz(nr)
{
    var trafiona = false;
    var element = "lit"+nr;

    for(i=0;i<dlugosc;i++)
    {
        if(haslo.charAt(i) == litery[nr])
        {
            haslo1 = haslo1.ustawZnak(i, litery[nr]);
            trafiona = true;
        }

    }

    if (trafiona)
    {
        yes.play();
        $("#"+element).addClass('trafiona');
        $("#"+element).removeClass('litera');
        wypisz_haslo();
    }
    else
    {
        no.play();
        document.getElementById(element).style.backgroundColor = "#330000" ;
        document.getElementById(element).style.color = "#C00000" ;
        document.getElementById(element).style.border = "3px solid #C00000" ;
        document.getElementById(element).style.cursor = "default" ;

        document.getElementById(element).setAttribute("onclick", ";");

        //skucha
        ile_skuch++;
        var obraz = "img/s"+ile_skuch+".jpg";
        document.querySelector("#szubienica").innerHTML = '<img src="'+obraz+'" alt="" >'
        
    }

    if (haslo==haslo1)
    {
        document.getElementById("alfabet").innerHTML = "Tak jest! Podano prawidłowe hasło: "+haslo+'<br/><br/><span class="reset"' +
            ' onclick="location.reload()">JESZCZE RAZ?</span>';
    }

    if (ile_skuch>=9)
    {
        document.getElementById("alfabet").innerHTML = "Przegrana! Prawidłowe hasło: "+haslo+'<br/><br/><span class="reset"' +
            ' onclick="location.reload()">JESZCZE RAZ?</span>';
    }


}