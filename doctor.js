// =========== Doctor adding ==============
const doctors = [
    {
      firstName: "Mirvari",
      lastName: "Muradova",
      speciality: "Dentist",
      birthDate: "2003-10-13",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      firstName: "Ali",
      lastName: "Ahmadov",
      speciality: "Cardioloq",
      birthDate: "1998-05-21",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      firstName: "Leyla",
      lastName: "Hüseynova",
      speciality: "Nevropotoloq",
      birthDate: "1995-07-03",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ];
  
  const doctorContainer = document.querySelector(".doctors-container");
  
  doctors.forEach((doc) => {
    const doctable = document.querySelector(".doctor-table");
  
    const doctbody = document.querySelector(".doc-tbody");
  
    const tr = document.createElement("tr");
  
    const tdimg = document.createElement("td");
    const image = document.createElement("img");
    image.src = doc.image;
    image.alt = `${doc.firstName}` + `${doc.lastName}`;
    tdimg.appendChild(image);
  
    const tdname = document.createElement("td");
    tdname.textContent = `${doc.firstName}`;
  
    const tdsurname = document.createElement("td");
    tdsurname.textContent = `${doc.lastName}`;
  
    const tdspeciality = document.createElement("td");
    tdspeciality.textContent = `${doc.speciality}`;
  
    const tdbirthdate = document.createElement("td");
    tdbirthdate.textContent = `${doc.birthDate}`;
  
    const tdupdate = document.createElement("td");
    tdupdate.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  
    const tdremove = document.createElement("td");
    tdremove.innerHTML = '<i class="fa-solid fa-trash"></i>';
  
    tr.appendChild(tdimg);
    tr.appendChild(tdname);
    tr.appendChild(tdsurname);
    tr.appendChild(tdspeciality);
    tr.appendChild(tdbirthdate);
    tr.appendChild(tdupdate);
    tr.appendChild(tdremove);
    doctbody.appendChild(tr);
    doctable.appendChild(doctbody);
    doctorContainer.appendChild(doctable);
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
    
    // Input dəyərlərini formData obyektinə əlavə et
    formData.append("Name", document.getElementById("doctorName").value);
    formData.append("Surname", document.getElementById("doctorSurname").value);
    formData.append("Speciality", document.getElementById("doctorSpeciality").value);
    formData.append("Birthdate", document.getElementById("doctorBirthdate").value);
    formData.append("University", document.getElementById("doctorUniversity").value);
    formData.append("Experience", parseInt(document.getElementById("doctorExperience").value));
    formData.append("Value", parseInt(document.getElementById("doctorValue").value));
    formData.append("HospitalId", parseInt(document.getElementById("doctorHospitalID").value));

    // Şəkil faylını əlavə et
    const imageFile = document.getElementById("doctorImage").files[0]; 
    if (imageFile) {
        formData.append("Image", imageFile);
    }

    // console.log("Göndərilən data:", [...formData]); // Konsolda yoxlamaq üçün

    try {
        const response = await fetch("http://localhost:5217/api/Doctor", {
            method: "POST",
            body: formData, // JSON.stringify() etməyə ehtiyac yoxdur
        });

        if (response.ok) {
            alert("Doctor added successfully!");
            document.getElementById("addDoctorForm").reset(); // Formu sıfırla
        } 
        else {
            console.log(response);
            alert("Error adding doctor.");
        }
    } catch (error) {
        alert(error);
        console.error("Error:", error);
    }
});


