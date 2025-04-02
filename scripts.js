

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:5156/api/Patients", {
            method: "GET", // Use GET method
        });

        // Check if the response is OK (status 200)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response as JSON
        const result = await response.json();
        console.log(result); // Log the response to see its structure

        // Extract patients from the `$values` property
        const patients = result.$values; 

        if (Array.isArray(patients)) {
            const patientContainer = document.querySelector(".patients");
            const patienttable = document.querySelector(".patienttable");

            patients.forEach(element => {
                const tr = document.createElement("tr");
                tr.setAttribute("data-id", element.id); // Hər pasiyentin ID-sini tr elementinə əlavə edirik

                tr.classList.add("trpatient");

                const tdimg = document.createElement("td");
                const tdname = document.createElement("td");
                const tdsurname = document.createElement("td");
                const tdbirthdate = document.createElement("td");
                const tdediticon = document.createElement("td");
                

                const tddeleteicon = document.createElement("td");
                
                const image = document.createElement("img");
                image.src = element.image || "./images/default-profile-image.png";  
                image.alt = `${element.name} ${element.surname}`;
                image.classList.add("img-patient");

                tdimg.appendChild(image);

                const pname = document.createElement("p");
                pname.textContent = `${element.name}`; // Use 'name' property
                tdname.appendChild(pname);

                const psurname = document.createElement("p");
                psurname.textContent = `${element.surname}`; // Use 'surname' property
                tdsurname.appendChild(psurname);

                const pbirthdate = document.createElement("p");
                pbirthdate.textContent = `${element.birthDate}`; // Use 'birthDate' property
                tdbirthdate.appendChild(pbirthdate);

                const icon = document.createElement("span");
                icon.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
                tdediticon.appendChild(icon);

                // Edit ikonuna klik edildikdə yönləndirmə
                   icon.addEventListener("click", function () {
                   const patientId = tr.getAttribute("data-id"); // Pasiyentin ID-sini götürürük
                    if (patientId) {
                         window.location.href = `editpatient.html?id=${patientId}`; // URL-ə ID-ni əlavə edirik
                        }
                          });

                const icondelete = document.createElement("span");
                icondelete.innerHTML = '<i class="fa-solid fa-trash"></i>';

                icondelete.addEventListener("click", async function () {
                    const patientId = tr.getAttribute("data-id"); // ID-ni götürürük
                
                    if (!patientId) {
                        alert("Xəta! ID tapılmadı.");
                        return;
                    }
                
                    const confirmDelete = confirm("Bu pasiyenti silmək istədiyinizə əminsiniz?");
                    if (!confirmDelete) return;
                
                    try {
                        const response = await fetch(`http://localhost:5156/api/Patients/${patientId}`, {
                            method: "DELETE",
                        });
                
                        if (!response.ok) {
                            throw new Error(`Silmə zamanı xəta baş verdi! Status: ${response.status}`);
                        }
                
                        alert("Pasiyent uğurla silindi!");
                        tr.remove(); // HTML-dən həmin pasiyenti silirik
                
                    } catch (error) {
                        alert(error);
                        console.error("Silmə zamanı xəta:", error);
                    }
                });
                

                tddeleteicon.appendChild(icondelete);

                tr.appendChild(tdimg);
                tr.appendChild(tdname);
                tr.appendChild(tdsurname);
                tr.appendChild(tdbirthdate);
                tr.appendChild(tdediticon);
                tr.appendChild(tddeleteicon);
                patienttable.appendChild(tr);
            });
        } else {
            throw new Error("Patients data is not an array");
        }
    } catch (error) {
        alert(error);
        console.error("Error:", error);
    }
});


const modal = document.getElementById("addDoctorModal");
  const addBtn = document.getElementById("addDoctor_btn");
  const closeModal = document.getElementById("closeModal");

  addBtn.onclick = function() {
      modal.style.display = "flex";
  }
  closeModal.onclick = function() {
      modal.style.display = "none";
  }
  window.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  }



  document.getElementById("addDoctorForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Formun default submit edilməsini dayandırırıq

    const formData = new FormData();
    

    const name = document.getElementById("Name").value.trim();
    const surname = document.getElementById("Surname").value.trim();
    const fin = document.getElementById("FIN").value.trim();
    const birthdate = document.getElementById("Birthdate").value.trim();
    const phone = document.getElementById("Phone").value.trim();
    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("Password").value.trim();
    const gender = document.querySelector('input[name="Gender"]:checked');

    const finRegex = /^[A-Z0-9]{7}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const phoneRegex = /^\+994(50|51|55|70|77|99)\d{7}$/;


    if (!name || !surname || !fin || !birthdate || !phone || !email || !password || !gender) {
        alert("Bütün sahələri doldurun!");
        return;
    }

    if (!finRegex.test(fin)) {
        alert("FIN kodu 7 simvoldan ibarət olmalıdır (böyük hərf və ya rəqəm)!");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Email düzgün formatda deyil!");
        return;
    }
 
    if (!passwordRegex.test(password)) {
        alert("Şifrə ən azı 8 simvol olmalı, 1 böyük hərf, 1 kiçik hərf və 1 rəqəm içerməlidir!");
        return;
    }

    if (!phoneRegex.test(phone)) {
        alert("Telefon nömrəsi düzgün formatda deyil! (+99450xxxxxxx)");
        return;
    }


    // Input dəyərlərini formData obyektinə əlavə et
    formData.append("Name", name);
    formData.append("Surname", surname);
    formData.append("FIN", fin);
    formData.append("Birthdate", birthdate);
    formData.append("Phone", phone);
    formData.append("Email", email);
    formData.append("Password", password);
    formData.append("Gender", gender.value);


    // Şəkil faylını əlavə et
    const imageFile = document.getElementById("patientImage").files[0]; 
    if (imageFile) {
        formData.append("ImagePath", imageFile);
    }

    console.log("Göndərilən data:", [...formData]);

    try {
        const response = await fetch("http://localhost:5156/api/Patients", {
            method: "POST",
            body: formData,
        });
        const result = await response.text();
        console.log(result);

        if (response.ok) {
            alert("Patient added successfully!");
            document.getElementById("addDoctorForm").reset();
        } else {
            alert("Error adding doctor.");
        }
    } catch (error) {
        alert(error);
        console.error("Error:", error);
    }
});

// Submit düyməsini deaktiv etmək üçün yoxlama funksiyası
function checkFormValidity() {
    const name = document.getElementById("Name").value.trim();
    const surname = document.getElementById("Surname").value.trim();
    const fin = document.getElementById("FIN").value.trim();
    const birthdate = document.getElementById("Birthdate").value.trim();
    const phone = document.getElementById("Phone").value.trim();
    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("Password").value.trim();
    const gender = document.querySelector('input[name="Gender"]:checked');
    
    // const submitBtn = document.getElementById("submitBtn");
    
    // if (!name || !surname || !fin || !birthdate || !phone || !email || !password || !gender ||
    //     !/^[A-Z0-9]{7}$/.test(fin) ||
    //     !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ||
    //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password) ||
    //     !/^\+994(50|51|55|70|77|99)\d{7}$/.test(phone)) {
    //     submitBtn.disabled = true;
    // } else {
    //     submitBtn.disabled = false;
    // }
}

// Hər input dəyişəndə formun keçərliliyini yoxlayırıq
document.querySelectorAll("#addDoctorForm input").forEach(input => {
    input.addEventListener("input", checkFormValidity);
});

document.querySelector(".search-btn").addEventListener("input", function () {
    let searchValue = this.value.trim().toLowerCase(); // Axtarış dəyərini götür və kiçik hərfə çevir
    let patientRows = document.querySelectorAll(".trpatient"); // Bütün xəstə sətirlərini götür

    patientRows.forEach(row => {
        let name = row.querySelector("td:nth-child(2) p").textContent.toLowerCase();
        let surname = row.querySelector("td:nth-child(3) p").textContent.toLowerCase();

        if (name.includes(searchValue) || surname.includes(searchValue)) {
            row.style.display = ""; // Əgər uyğun gəlirsə, göstər
        } else {
            row.style.display = "none"; // Uyğun gəlmirsə, gizlət
        }
    });
});
