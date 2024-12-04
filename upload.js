document.getElementById('fileInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) {
    alert('Please select a file!');
    return;
  }

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const data = results.data;
      displayData(data);
      drawChart(data);
    },
    error: function (error) {
      console.error('Error parsing CSV:', error);
    },
  });
});

function displayData(data) {
  const tableHead = document.querySelector('#dataTable thead tr');
  const tableBody = document.querySelector('#dataTable tbody');

  if (data.length === 0) return;

  // Get column headers from the first row
  const columns = Object.keys(data[0]);
  tableHead.innerHTML = columns.map(col => `<th>${col}</th>`).join('');

  // Populate table rows
  tableBody.innerHTML = data
    .map(row => `<tr>${columns.map(col => `<td>${row[col]}</td>`).join('')}</tr>`)
    .join('');
}

function drawChart(data) {
  const labels = data.map(row => row.Category); // Assuming a "Category" column
  const values = data.map(row => parseFloat(row.Value)); // Assuming a "Value" column

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
