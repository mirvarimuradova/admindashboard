
document.addEventListener("DOMContentLoaded", function () {
const patients = [
    { firstName: "Mirvari", lastName: "Muradova", birthDate: "2003-10-13", image: "https://randomuser.me/api/portraits/women/1.jpg" },
    { firstName: "Ali", lastName: "Ahmadov", birthDate: "1998-05-21", image: "https://randomuser.me/api/portraits/men/2.jpg" },
    { firstName: "Leyla", lastName: "Hüseynova", birthDate: "1995-07-03", image: "https://randomuser.me/api/portraits/women/3.jpg" }
];

const patientContainer = document.querySelector(".patients");

patients.forEach(element => {
   
    const patienttable = document.querySelector(".patienttable");

  
    const tr = document.createElement("tr");
    const tdimg = document.createElement("td");
    const tdname = document.createElement("td");
    const tdsurname =document.createElement("td");
    const tdbirthdate = document.createElement("td");
    const tdediticon = document.createElement("td");
    
    const image = document.createElement("img");
    image.src = element.image;
    image.alt = `${element.firstName} ${element.lastName}`; 
    image.style.width = "100px";
    tdimg.appendChild(image);

        // Yeni `p` elementi yaradılır və məlumatlar əlavə edilir
        const pname = document.createElement("p");
        pname.textContent= `${element.firstName}`;
        tdname.appendChild(pname);

        const psurname = document.createElement("p");
        psurname.textContent= `${element.lastName}`;
        tdsurname.appendChild(psurname);

        const pbirthdate = document.createElement("p");
        pbirthdate.textContent= `${element.birthDate}`;
        tdbirthdate.appendChild(pbirthdate);
       
       
        const icon = document.createElement("span");
        icon.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'; 
        tdediticon.appendChild(icon);
   
   
        tr.appendChild(tdimg);
        tr.appendChild(tdname);
        tr.appendChild(tdsurname);
        tr.appendChild(tdbirthdate);
        tr.appendChild(tdediticon);
        patienttable.appendChild(tr);
   
});


// const hospitals = [
//     { 
//         name: "City Hospital", 
//         rating: 4.5, 
//         image: "https://via.placeholder.com/100" 
//     },
//     { 
//         name: "Grand Medical Center", 
//         rating: 4.7, 
//         image: "https://via.placeholder.com/100" 
//     },
//     { 
//         name: "MedLife Clinic", 
//         rating: 4.2, 
//         image: "https://via.placeholder.com/100" 
//     }
// ];

// const hospitalContainer = document.querySelector(".hospitals");

// if (!hospitalContainer) {
//     console.error(" Xəta: `.hospitals` elementi tapilmadi!");

// } else {
//     console.log(" `.hospitals` elementi tapildi!");
// }

// hospitals.forEach(hospital => {
//     // Kart üçün div yaradılır
//     const card = document.createElement("div");
//     card.classList.add("hospital-card");

//     // Şəkil elementi
//     const img = document.createElement("img");
//     img.src = hospital.image;
//     img.alt = hospital.name;
//     img.classList.add("hospital-img");

//     // Ad
//     const name = document.createElement("p");
//     name.textContent = hospital.name;
//     name.classList.add("hospital-name");

//     // Reytinq
//     const rating = document.createElement("p");
//     rating.innerHTML = `<i class="fa-solid fa-star"></i> ${hospital.rating}`;
//     rating.classList.add("hospital-rating");

//     // Bütün elementləri karta əlavə edirik
//     card.appendChild(img);
//     card.appendChild(name);
//     card.appendChild(rating);

//     // Kartı hospital container-ə əlavə edirik
//     hospitalContainer.appendChild(card);
// });


});

