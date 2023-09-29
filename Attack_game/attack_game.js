let karakterler = [
  {
    name: "Şaman",
    health: 100,
    power: 19,
    ulti: 15,
    ultiName: "Şifa ekleme",
  },
  {
    name: "Savaşçı",
    health: 120,
    power: 15,
    ulti: 20,
    ultiName: "Kılıç çevirme",
  },
  {
    name: "Sura",
    health: 125,
    power: 25,
    ulti: 32,
    ultiName: "Parmak Darbesi",
  },
  {
    name: "Ninja",
    health: 120,
    power: 17,
    ulti: 26,
    ultiName: "Ateşli ok",
  },
];
let saldiriPuani = 0;
let saldiriPuani2 = 0;
const iska = [1, 2, 3, 4, 5];
function iskalama(bot) {
  bot.health = bot.health;
}
function ultiVurus(kullanici, bot) {
  if (kullanici.name === "Şaman") {
    // Şamanın ulti gücü kendine can bastığı kadar düşmanından almasıdır.
    kullanici.health = kullanici.health + kullanici.ulti;
    bot.health = bot.health - kullanici.ulti;
  } else {
    bot.health = bot.health - kullanici.ulti;
  }

  if (bot.health < 0) {
    bot.health = 0;
  }
}
function saldir(kullanici, bot) {
  bot.health = bot.health - kullanici.power;
  if (bot.health < 0) {
    bot.health = 0;
  }
}

let userChoice = prompt(
  "Lütfen bir karakter seçiniz\n1) Şaman\n2) Savaşçı\n3) Sura\n4) Ninja"
);

let kullaniciKarakter = karakterler[userChoice - 1];
let pcKarakter = karakterler[Math.floor(Math.random() * karakterler.length)]; // random metodu 0 ile 1 arasında random bir değer verir floor da bu değeri tabana yuvarlar böylece 0 ile 3 arasında bir sayı elde etmiş oluruz böylece de pcye random bir karakter atamış olacağız.

//bilgisayarın bizle aynı karakter seçmemesi için bir sonsuz döngü kurduk eğer ki pc karakter eşittir bizim karakter olduğu sürece döngü yeniden çalışacak.
while (pcKarakter === kullaniciKarakter) {
  pcKarakter = karakterler[Math.floor(Math.random() * karakterler.length)];
}

alert("Pc'nin seçtiği karakter: " + pcKarakter.name);

while (kullaniciKarakter.health > 0 && pcKarakter.health > 0) {
  let atakSecim = prompt(
    kullaniciKarakter.name +
      "(Can: " +
      kullaniciKarakter.health +
      ")\n Saldırmak için 'saldır' yazınız."
  );

  if (atakSecim.toLowerCase() === "saldır") {
    let iskaSansi = Math.floor(Math.random() * iska.length);
    if (iskaSansi == 1) {
      iskalama(pcKarakter);
      alert("ıskaladın!" + "\nBilgisayarın canı: " + pcKarakter.health);
    } else if (saldiriPuani == 3) {
      // kritik yuklemem olsun. Her vurdugumda puan artsın.vuruş sayım 4 olunca krtik vursun.
      ultiVurus(kullaniciKarakter, pcKarakter);
      if (kullaniciKarakter.name === "Şaman") {
        alert(
          "Ulti geldi!! " +
            kullaniciKarakter.ultiName +
            "\nŞifa eklenmiş canın: " +
            kullaniciKarakter.health +
            "\nBilgisayarın canı: " +
            pcKarakter.health
        );
      } else {
        alert(
          "Ulti geldi!! " +
            kullaniciKarakter.ultiName +
            "\nBilgisayarın canı: " +
            pcKarakter.health
        );
      }

      saldiriPuani = 0;
    } else {
      saldir(kullaniciKarakter, pcKarakter);
      alert(
        "Saldırı gerçekleştirdiniz. Bilgisayarın canı: " + pcKarakter.health
      );
      saldiriPuani++;
    }

    if (pcKarakter.health > 0) {
      let iskaSansi = Math.floor(Math.random() * iska.length);
      if (iskaSansi == 1) {
        iskalama(kullaniciKarakter);
        alert(
          "Düsman Iskaladı!" + "\nKalan canınız: " + kullaniciKarakter.health
        );
      } else if (saldiriPuani2 == 3) {
        ultiVurus(pcKarakter, kullaniciKarakter);
        if (pcKarakter.name === "Şaman") {
          alert(
            "Ulti geldi!" +
              "\n Düşmanın şifa eklenmiş canı: " +
              pcKarakter.health +
              "\nKullanıcının canı:" +
              kullaniciKarakter.health
          );
        } else {
          alert(
            "Düsmana ulti geldi!! " +
              pcKarakter.ultiName +
              "\nKalan canınız: " +
              kullaniciKarakter.health
          );
        }

        saldiriPuani2 = 0;
      } else {
        saldir(pcKarakter, kullaniciKarakter);
        alert(
          "Pc saldırı gerçekleştirdi. Kalan canınız: " +
            kullaniciKarakter.health
        );
        saldiriPuani2++;
      }
    }
  } else {
    alert("yanlış bir giriş yaptınız");
  }
}

if (kullaniciKarakter.health <= 0 && pcKarakter.health <= 0) {
  alert("berabere");
} else if (kullaniciKarakter.health > 0) {
  alert("Kazandınız");
} else {
  alert("Kaybettiniz");
}
