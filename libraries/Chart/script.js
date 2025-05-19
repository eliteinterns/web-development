fetch('data.json')
    .then(res => res.json())
    .then(json => {
        const labels = json.labels;
        const datasets = json.datasets;

        const colors = [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
        ];

        // Bar Chart
        new Chart(document.getElementById('barChart'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets.map((d, i) => ({
                    ...d,
                    backgroundColor: colors[i % colors.length],
                    borderWidth: 1
                }))
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // Line Chart
        new Chart(document.getElementById('lineChart'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets.map((d, i) => ({
                    ...d,
                    borderColor: colors[i % colors.length],
                    backgroundColor: colors[i % colors.length].replace("0.6", "0.2"),
                    fill: true,
                    tension: 0.3
                }))
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // Pie Chart (just use the first dataset for pie)
        new Chart(document.getElementById('pieChart'), {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: datasets[0].label,
                    data: datasets[0].data,
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: true
            }
        });
    })
    .catch(err => console.error("Failed to load chart data:", err));
