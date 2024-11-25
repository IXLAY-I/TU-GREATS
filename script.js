
 
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
            localStorage.setItem("id", data.ID);
            localStorage.setItem("name", response.data.Login[0].name);
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

{
  let selectedDate = '';
  let selectedTime = '';

  document.querySelectorAll('.date-item').forEach(button => {
    button.addEventListener('click', function() {
      selectedDate = this.getAttribute('data-date');
      // alert('Selected date: ' + selectedDate);
    });
  });

  document.querySelectorAll('.Time-item').forEach(button => {
    button.addEventListener('click', function() {
      selectedTime = this.getAttribute('data-time');
      // alert('Selected time: ' + selectedTime);
    });
  });
  
  function registermain() {
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
    console.log(data);
    axios.post('http://127.0.0.1:3000/users/register', data)
      .then(response => {
          if (response.data.message === 'Successful') {
              // window.location.href = 'main.html';
              
          } else {
              // location.reload();
          }
      })
      .catch(error => {
          alert("Wrong, Try again")
      });
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
      } else {
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
            localStorage.setItem('ForumID', dat.ForumID); // Store the forum ID for use in forum-comment.html
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
          location.reload();
        } else {
          alert("Wrong, Try again")
        }
    })
    .catch(error => {
        alert("Wrong, Try again")
    });
}

function comment() {
  
  const data = {
    ForumID: localStorage.getItem('ForumID'),
    ID: localStorage.getItem('id'),
    Text: document.getElementById('commenttext').value,
  }

  axios.post('http://127.0.0.1:3000/users/forum_answer', data)
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

function showcomment() {

  axios.post('http://127.0.0.1:3000/users/show_answer')
  .then(response => {
      if (response.data.message === 'Successful') {
        console.log(response.data)
        const paragraph = document.querySelector(".section .inner-content p");

        // Edit the paragraph's content
        paragraph.textContent = response.data.data[0].text;
        response.data.data.forEach(i => {
          console.log(i);
          const commentDiv = document.createElement("div");
          commentDiv.classList.add("comment");

          // Create the h2 element for the name
          const h2 = document.createElement("h2");
          h2.textContent = "นิรนาม";

          // Create the inner content div
          const innerDiv = document.createElement("div");
          innerDiv.classList.add("inner-content");

          // Create the paragraph for the message
          const p = document.createElement("p");
          p.textContent = i.answer;

          // Append elements to the inner content div
          innerDiv.appendChild(p);

          // Append elements to the main comment div
          commentDiv.appendChild(h2);
          commentDiv.appendChild(innerDiv);

          // Append the new comment to the all-comment div
          document.querySelector(".all-comment").appendChild(commentDiv);
        });

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
        document.getElementById("M").innerHTML = document.getElementById("M").innerHTML.replace("0", C.M)
        if (C.Exempt == "true") {
          document.getElementById("tteam").innerHTML = "Team Leader"
          const style = document.createElement('style');

          style.innerHTML = `
              #MB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #LB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              .Score .line:nth-child(6) div {
                  background: rgb(57, 207, 57);
                  color: rgb(255, 255, 255);
              }    
              .Subject div:nth-child(6) {
              border: 3px solid rgb(33, 157, 35);
              color: rgb(39, 175, 96);
              }    
              .Exempt div:nth-child(6) {
              border: 3px solid  rgb(33, 157, 35);
              color: rgb(39, 175, 96);
              }
                  
          `;

          document.head.appendChild(style);
          
        }

      })

      tu100.forEach((C, i) => {

        document.getElementById("D").innerHTML = document.getElementById("D").innerHTML.replace("0", C.D)
        document.getElementById("V").innerHTML = document.getElementById("V").innerHTML.replace("0", C.V)
        document.getElementById("G").innerHTML = document.getElementById("G").innerHTML.replace("0", C.G)
        console.log(C)
        if (C.Exempt == "true") {
          document.getElementById("t100").innerHTML = "Tu100"
          const style = document.createElement('style');

          style.innerHTML = `
              #DB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #VB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #GB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }    
              .Score .line:nth-child(7) div {
                  background: rgb(57, 207, 57);
                  color: rgb(255, 255, 255);
              }    
              .Subject div:nth-child(7) {
              border: 3px solid rgb(33, 157, 35);
              color: rgb(39, 175, 96);
              }    
              .Exempt div:nth-child(7) {
              border: 3px solid  rgb(33, 157, 35);
              color: rgb(39, 175, 96);
              }
                  
          `;

          document.head.appendChild(style);
          
        }

      })
      
      tu101.forEach((C, i) => {

        document.getElementById("H").innerHTML = document.getElementById("H").innerHTML.replace("0", C.H)
        document.getElementById("Z").innerHTML = document.getElementById("Z").innerHTML.replace("0", C.Z)
        document.getElementById("Y").innerHTML = document.getElementById("Y").innerHTML.replace("0", C.Y)
        document.getElementById("C").innerHTML = document.getElementById("C").innerHTML.replace("0", C.C)
        document.getElementById("T").innerHTML = document.getElementById("T").innerHTML.replace("0", C.T)

        if (C.Exempt == "true") {
          document.getElementById("t101").innerHTML = "TU101"
          const style = document.createElement('style');

          style.innerHTML = `
              #HB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #ZB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #YB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #CB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #TB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }    
              .Score .line:nth-child(2) div {
                  background: rgb(57, 207, 57);
                  color: rgb(255, 255, 255);
              }    
              .Subject div:nth-child(2) {
              border: 3px solid rgb(33, 157, 35);
              color: rgb(39, 175, 96);
              }    
              .Exempt div:nth-child(2) {
              border: 3px solid  rgb(33, 157, 35);
              color: rgb(39, 175, 96);
              }
                  
          `;

          document.head.appendChild(style);
          
        }
      })

      tu102.forEach((C, i) => {

        document.getElementById("U").innerHTML = document.getElementById("U").innerHTML.replace("0", C.U)
        document.getElementById("A").innerHTML = document.getElementById("A").innerHTML.replace("0", C.A)
        document.getElementById("P").innerHTML = document.getElementById("P").innerHTML.replace("0", C.P)

        if (C.Exempt == "true") {
          document.getElementById("t102").innerHTML = "TU102"
          const style = document.createElement('style');

          style.innerHTML = `
              #UB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #AB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #PB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }  
              .Score .line:nth-child(5) div {
                  background: rgb(57, 207, 57);
                  color: rgb(255, 255, 255);
              }    
              .Subject div:nth-child(5) {
              border: 3px solid rgb(33, 157, 35);
              color: rgb(39, 175, 96);
              }    
              .Exempt div:nth-child(5) {
              border: 3px solid  rgb(33, 157, 35);
              color: rgb(39, 175, 96);
              }
                  
          `;

          document.head.appendChild(style);
          
        }
      })

      tu103.forEach((C, i) => {
        document.getElementById("I").innerHTML = document.getElementById("I").innerHTML.replace("0", C.I)
        document.getElementById("S").innerHTML = document.getElementById("S").innerHTML.replace("0", C.S)
        document.getElementById("O").innerHTML = document.getElementById("O").innerHTML.replace("0", C.O)

        if (C.Exempt == "true") {
          document.getElementById("t103").innerHTML = "TU103"
          const style = document.createElement('style');

          style.innerHTML = `
              #IB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #SB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #OB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }  
              .Score .line:nth-child(3) div {
                  background: rgb(57, 207, 57);
                  color: rgb(255, 255, 255);
              }    
              .Subject div:nth-child(3) {
              border: 3px solid rgb(33, 157, 35);
              color: rgb(39, 175, 96);
              }    
              .Exempt div:nth-child(3) {
              border: 3px solid  rgb(33, 157, 35);
              color: rgb(39, 175, 96);
              }
                  
          `;

          document.head.appendChild(style);
          
        }
      })

      tu106.forEach((C, i) => {
        document.getElementById("R").innerHTML = document.getElementById("R").innerHTML.replace("0", C.R)
        document.getElementById("B").innerHTML = document.getElementById("B").innerHTML.replace("0", C.B)
        document.getElementById("W").innerHTML = document.getElementById("W").innerHTML.replace("0", C.W)
        document.getElementById("E").innerHTML = document.getElementById("E").innerHTML.replace("0", C.E)
        document.getElementById("F").innerHTML = document.getElementById("F").innerHTML.replace("0", C.F)

        if (C.Exempt == "true") {
          document.getElementById("t106").innerHTML = "TU106"
          const style = document.createElement('style');

          style.innerHTML = `
              #RB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #BB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #WB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #EB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              #FB.BoxTU div:first-child {
                  background: rgb(44, 155, 0);
              }
              .Score .line:nth-child(4) div {
                  background: rgb(57, 207, 57);
                  color: rgb(255, 255, 255);
              }    
              .Subject div:nth-child(4) {
              border: 3px solid rgb(33, 157, 35);
              color: rgb(39, 175, 96);
              }    
              .Exempt div:nth-child(4) {
              border: 3px solid  rgb(33, 157, 35);
              color: rgb(39, 175, 96);
              }
                  
          `;

          document.head.appendChild(style);
          
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
