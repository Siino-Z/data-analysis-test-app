function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file!');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  fetch('backend/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        displayData(data.rows, data.columns);
        drawChart(data.rows);
      }
    })
    .catch(error => console.error('Error:', error));
}

function displayData(rows, columns) {
  const tableHead = document.querySelector('#dataTable thead tr');
  const tableBody = document.querySelector('#dataTable tbody');
  tableHead.innerHTML = columns.map(col => `<th>${col}</th>`).join('');
  tableBody.innerHTML = rows
    .map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`)
    .join('');
}

function drawChart(rows) {
  const labels = rows.map(row => row[0]); // Assuming the first column is a category
  const values = rows.map(row => parseFloat(row[1])); // Assuming the second column is numerical data

  const ctx = document.getElementById('dataChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'KPI Values',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
