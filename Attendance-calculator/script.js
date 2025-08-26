    const rowsContainer = document.getElementById("rows");
    const addRowBtn = document.getElementById("addRowBtn");

    // Function to create a row
    function createRow(sn) {
      const row = document.createElement("div");
      row.className = "attendance-row";

      row.innerHTML = `
        <div class="sn">${sn}</div>
        <input type="number" class="total" placeholder="Total Classes">
        <input type="number" class="attended" placeholder="Attended Classes">
        <input type="number" class="bunk" placeholder="Bunkable" readonly>
        <input type="text" class="percent" placeholder="Attendance %" readonly>
        <input type="number" class="needed" placeholder="Classes Needed" readonly>
      `;

      row.querySelector(".total").addEventListener("input", () => calculate(row));
      row.querySelector(".attended").addEventListener("input", () => calculate(row));

      return row;
    }

    // Function to calculate values
    function calculate(row) {
      let total = Number(row.querySelector(".total").value);
      let attended = Number(row.querySelector(".attended").value);
      let min_attendance = Number(document.getElementById("minAttendance").value) / 100;

      if (!total || !attended || attended > total || min_attendance <= 0) {
        row.querySelector(".bunk").value = "";
        row.querySelector(".percent").value = "";
        row.querySelector(".needed").value = "";
        return;
      }

      // Calculate Bunkable classes
      let bunk = 0;
      let tempTotal = total;
      let tempAttended = attended;

      while (tempAttended / tempTotal >= min_attendance) {
        tempTotal++;
        bunk++;
      }
      bunk = Math.max(bunk - 1, 0);

      // Final percentage if bunked max
      let finalAttendance = (attended / (total + bunk)) * 100;

      // Classes needed to prevent detention
      let needed = Math.ceil((min_attendance * total - attended) / (1 - min_attendance));
      if (needed < 0) needed = 0;

      row.querySelector(".bunk").value = bunk;
      row.querySelector(".percent").value = finalAttendance.toFixed(2) + "%";
      row.querySelector(".needed").value = needed;
    }

    // Add default 5 rows
    for (let i = 1; i <= 5; i++) {
      rowsContainer.appendChild(createRow(i));
    }

    // Add new row on button click
    addRowBtn.addEventListener("click", () => {
      let count = rowsContainer.children.length + 1;
      rowsContainer.appendChild(createRow(count));
    });

    const helpBtn = document.getElementById("helpBtn");
    const helpPanel = document.getElementById("helpPanel");

     helpBtn.addEventListener("click", () => {
        if (helpPanel.style.right === "0px") {
            helpPanel.style.right = "-350px";
            } 
        else {
            helpPanel.style.right = "0px";
            }           
    });