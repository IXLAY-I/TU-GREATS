

function login(event) {
  const boxLogin = event.target.closest('.BoxLogin');
  
  const id = boxLogin.querySelector('#ID').value;
  const password = boxLogin.querySelector('#password').value;

  const data = {
    ID: id,
    password: password,
  };
  axios.post('http://127.0.0.1:3000/users/login', data)
    .then(response => {
        if (response.data.message === 'Successful') {
            localStorage.setItem("id", document.getElementById('ID').value)
            localStorage.setItem("name", response.data.data);
            alert("Login successfully")
            window.location.href = 'main.html';
        } else {
          alert("Wrong, Try again")
        }
    })
    .catch(error => {
        alert("Wrong, Try again")
    });
}

{
  let selectedDate = '';
  let selectedTime = '';

  document.querySelectorAll('.btnDate').forEach(button => {
    button.addEventListener('click', function() {
      selectedDate = this.getAttribute('data-date');
      // alert('Selected date: ' + selectedDate);
    });
  });

  document.querySelectorAll('.btnTime').forEach(button => {
    button.addEventListener('click', function() {
      selectedTime = this.getAttribute('data-time');
      // alert('Selected time: ' + selectedTime);
    });
  });
  
  function register() {
    const ID = localStorage.getItem('id');
    const examcenter = document.getElementById('examcenter').value;

    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and time.');
      return;
    }
    
    const data = {
      ID: ID,
      Examcenter: examcenter,
      Date: selectedDate,
      Time: selectedTime,
      Coupon: false
    };
    var checkbox = document.getElementById("checkbox");
    if (checkbox.checked) {
      axios.post('http://127.0.0.1:3000/users/register', data)
        .then(response => {
            if (response.data.message === 'Successful') {
                window.location.href = 'main.html';
                
            } else {
                // location.reload();
            }
        })
        .catch(error => {
            alert("Wrong, Try again")
        });
    } else {
      alert("Please accept user privacy")
    }
  }
}

function history() {
  const data = {
    ID: localStorage.getItem('id')
  };

  axios.post('http://127.0.0.1:3000/users/history', data)
    .then(response => {
      if (response.data.message === 'Successful') {
        const iddata = response.data;
        const ID = iddata || [];

        // Check if the table exists; if not, create it
        let table = document.getElementById("historyT");
        if (!table) {
          table = document.createElement("table");
          table.id = "historyT";
          table.style.width = "80%";
          table.style.margin = "20px auto";
          table.style.borderCollapse = "collapse";

          // Add the table to the DOM (e.g., inside a container)
          document.body.appendChild(table);
        }

        // Clear the table's existing rows
        table.innerHTML = "";

        // Create the table header
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const headers = ["เลขนักศึกษา", "ชื่อ-สกุล", "รอบ", "วันหมดอายุ", "เช็คคะแนน"];
        headers.forEach(headerText => {
          const th = document.createElement("th");
          th.textContent = headerText;
          th.style.border = "1px solid black";
          th.style.padding = "8px";
          th.style.textAlign = "center";
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create the table body
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        // Populate the table with data rows
        ID.round.forEach((room, index) => {
          const row = document.createElement("tr");
          row.id = "historyT" + index;

          const idCell = document.createElement("td");
          const nameCell = document.createElement("td");
          const roundCell = document.createElement("td");
          const statusCell = document.createElement("td");
          const connectCell = document.createElement("td");

          idCell.textContent = localStorage.getItem('id');
          nameCell.textContent = localStorage.getItem('name');
          roundCell.textContent = room.round;
          statusCell.textContent = ID.date[index]?.date || "N/A";

          // Create the link for the action
          const link = document.createElement("a");
          link.href = "/score.html";
          link.textContent = "คลิกเพื่อดูคะแนน";
          link.onclick = function (event) {
            takedata(this);
            // event.preventDefault(); // Prevent default navigation
          };
          connectCell.appendChild(link);

          // Append cells to the row
          row.appendChild(idCell);
          row.appendChild(nameCell);
          row.appendChild(roundCell);
          row.appendChild(statusCell);
          row.appendChild(connectCell);

          // Append the row to the tbody
          tbody.appendChild(row);
        });
        console.error("Failed to fetch history:", response.data.message);
      }
    })
    .catch(error => {
      console.error("Error fetching history:", error);
    });
}

function showforum() {
  axios.post('http://127.0.0.1:3000/users/show_forums')

  .then(response => {
    console.log(response.data)
      if (response.data.message === 'Successful') {
        console.log("as")
        // Define the table body where the row will be added
        const tbody = document.querySelector('tbody');
        const forum = response.data.data || []
        forum.forEach(dat => {
          const tr = document.createElement('tr');
          tr.id = dat.ForumID;

          // Create the first cell and set its content
          const td1 = document.createElement('td');
          td1.textContent = dat.text;

          // Create the second cell with the heart icon and like count
          const td2 = document.createElement('td');
          const heartIcon = document.createElement('i');
          heartIcon.className = 'fa-regular fa-heart';
          heartIcon.setAttribute('onclick', `ForumLike('${dat.ForumID}')`);
          td2.appendChild(heartIcon);
          td2.innerHTML += ' '+dat.likes; // Add the like count

          // Create the third cell with the comment icon and comment count
          const td3 = document.createElement('td');
          const commentIcon = document.createElement('i');
          commentIcon.className = 'fa-regular fa-comment-dots';
          
          // Add event listener to navigate to forum-comment.html
          td3.addEventListener('click', () => {
            console.log('Navigating to forum-comment.html');
            window.location.assign('forum-comment.html'); // Use window.location.assign for redirection
          });
          td3.appendChild(commentIcon);
          td3.innerHTML += ' '+dat.answer; // Add the comment count

          // Append all cells to the row
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);

          // Append the row to the table body
          tbody.appendChild(tr);
        });

      } else {
        alert("Wrong, Try again")
      }
  })
  .catch(error => {
      alert("Wrong, Try again")
  });
}

function addforum() {
  const data = {
    ID: localStorage.getItem('id'),
    Text: document.getElementById('forumtext').value,
  }

  axios.post('http://127.0.0.1:3000/users/forums', data)
  .then(response => {
      if (response.data.message === 'Successful') {
        location.reload();
      } else {
        alert("Wrong, Try again")
      }
  })
  .catch(error => {
      alert("Wrong, Try again")
  });
}

function ForumLike(ID) {
  const data = {
    ForumID: ID
  }
  axios.post('http://127.0.0.1:3000/users/ForumLike', data)
    .then(response => {
        if (response.data.message === 'Successful') {
        } else {
          alert("Wrong, Try again")
        }
    })
    .catch(error => {
        alert("Wrong, Try again")
    });
}

function score() {
  document.getElementById("studentID").innerHTML += localStorage.getItem("id");
  document.getElementById("round").innerHTML += localStorage.getItem("round");
  document.getElementById("name").innerHTML += localStorage.getItem("name");
  document.getElementById("expire").innerHTML += localStorage.getItem("expire");

}

function showscore() {
  const data = {
    ID: localStorage.getItem('id')
  }

  axios.post('http://127.0.0.1:3000/users/show_score', data)
  .then(response => {
    if (response.data.message === 'Successful') {
      console.log(response.data)
      const teamleader = response.data.teamleader || []
      const tu100 = response.data.tu100 || []
      const tu101 = response.data.tu101 || []
      const tu102 = response.data.tu102 || []
      const tu103 = response.data.tu103 || []
      const tu106 = response.data.tu106 || []

      teamleader.forEach((C, i) => {

        document.getElementById("L").innerHTML = document.getElementById("L").innerHTML.replace("0", C.L)
        if (C.L == 3) {
          document.getElementById("L").setAttribute('data-score', '3')
        }
        document.getElementById("M").innerHTML = document.getElementById("M").innerHTML.replace("0", C.M)
        if (C.M == 3) {
          document.getElementById("M").setAttribute('data-score', '3')
        }

      })

      tu100.forEach((C, i) => {

        document.getElementById("D").innerHTML = document.getElementById("D").innerHTML.replace("0", C.D)
        if (C.D == 3) {
          document.getElementById("D").setAttribute('data-score', '3')
        }
        document.getElementById("V").innerHTML = document.getElementById("V").innerHTML.replace("0", C.V)
        if (C.Z == 3) {
          document.getElementById("V").setAttribute('data-score', '3')
        }
        document.getElementById("G").innerHTML = document.getElementById("G").innerHTML.replace("0", C.G)
        if (C.G == 3) {
          document.getElementById("G").setAttribute('data-score', '3')
        }
        if (C.Exempt == "true") {
          document.getElementById("TU100").classList.add('all-green')        }

      })
      
      tu101.forEach((C, i) => {

        document.getElementById("H").innerHTML = document.getElementById("H").innerHTML.replace("0", C.H)
        if (C.H == 3) {
          document.getElementById("H").setAttribute('data-score', '3')
        }
        document.getElementById("Z").innerHTML = document.getElementById("Z").innerHTML.replace("0", C.Z)
        if (C.Z == 3) {
          document.getElementById("Z").setAttribute('data-score', '3')
        }
        document.getElementById("Y").innerHTML = document.getElementById("Y").innerHTML.replace("0", C.Y)
        if (C.Y == 3) {
          document.getElementById("Y").setAttribute('data-score', '3')
        }
        document.getElementById("C").innerHTML = document.getElementById("C").innerHTML.replace("0", C.C)
        if (C.C == 3) {
          document.getElementById("C").setAttribute('data-score', '3')
        }
        document.getElementById("T").innerHTML = document.getElementById("T").innerHTML.replace("0", C.T)
        if (C.T == 3) {
          document.getElementById("T").setAttribute('data-score', '3')
        }
        if (C.Exempt == "true") {
          document.getElementById("TU101").classList.add('all-green')        }
      })

      tu102.forEach((C, i) => {

        document.getElementById("U").innerHTML = document.getElementById("U").innerHTML.replace("0", C.U)
        if (C.U == 3) {
          document.getElementById("U").setAttribute('data-score', '3')
        }
        document.getElementById("A").innerHTML = document.getElementById("A").innerHTML.replace("0", C.A)
        if (C.A == 3) {
          document.getElementById("A").setAttribute('data-score', '3')
        }
        document.getElementById("P").innerHTML = document.getElementById("P").innerHTML.replace("0", C.P)
        if (C.P == 3) {
          document.getElementById("P").setAttribute('data-score', '3')
        }
        if (C.Exempt == "true") {
          document.getElementById("TU102").classList.add('all-green')        }
      })

      tu103.forEach((C, i) => {
        document.getElementById("I").innerHTML = document.getElementById("I").innerHTML.replace("0", C.I)
        if (C.I == 3) {
          document.getElementById("I").setAttribute('data-score', '3')
        }
        document.getElementById("S").innerHTML = document.getElementById("S").innerHTML.replace("0", C.S)
        if (C.S == 3) {
          document.getElementById("S").setAttribute('data-score', '3')
        }
        document.getElementById("O").innerHTML = document.getElementById("O").innerHTML.replace("0", C.O)
        if (C.O == 3) {
          document.getElementById("O").setAttribute('data-score', '3')
        }
        if (C.Exempt == "true") {
          document.getElementById("TU103").classList.add('all-green')
        }
      })

      tu106.forEach((C, i) => {
        document.getElementById("R").innerHTML = document.getElementById("R").innerHTML.replace("0", C.R)
        if (C.R == 3) {
          document.getElementById("R").setAttribute('data-score', '3')
        }
        document.getElementById("B").innerHTML = document.getElementById("B").innerHTML.replace("0", C.B)
        if (C.B == 3) {
          document.getElementById("B").setAttribute('data-score', '3')
        }
        document.getElementById("W").innerHTML = document.getElementById("W").innerHTML.replace("0", C.W)
        if (C.W == 3) {
          document.getElementById("W").setAttribute('data-score', '3')
        }
        document.getElementById("E").innerHTML = document.getElementById("E").innerHTML.replace("0", C.E)
        if (C.E == 3) {
          document.getElementById("E").setAttribute('data-score', '3')
        }
        document.getElementById("F").innerHTML = document.getElementById("F").innerHTML.replace("0", C.F)
        if (C.F == 3) {
          document.getElementById("F").setAttribute('data-score', '3')
        }
        if (C.Exempt == "true") {
          document.getElementById("TU106").classList.add('all-green')
        }
      })

    }
  })
}

function QA() {
  axios.post('http://127.0.0.1:3000/users/show_question')
  .then(response => {
    if (response.data.message === 'Successful') {
      const dataqa = response.data.data
      const ques = dataqa || [];

      ques.forEach((q, index) => {
        const qaid = "q"+(index+1);
        const question = document.getElementById(qaid);
        document.getElementById(qaid+"a").innerHTML = "Q"+(index+1)+" : "+q.Question;
        document.getElementById(qaid+"c").innerHTML = q.Answer;
      });
    }
  })
}

function sendQA() {
  const data = {
    Text: document.getElementById("textqa").value
  };
  axios.post('http://127.0.0.1:3000/users/Question', data)
  .then(response => {
    if (response.data.message === 'Successful') {
      location.reload();
    }
  })

}


function logout() {

  localStorage.clear();

}