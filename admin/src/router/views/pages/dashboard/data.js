// function getDaysInMonth(month, year) {
//   const date = new Date(year, month, 1)
//   const days = []
//   let idx = 0
//   while (date.getMonth() === month && idx < 15) {
//     const d = new Date(date)
//     days.push(d.getDate() + ' ' + d.toLocaleString('en-us', { month: 'short' }))
//     date.setDate(date.getDate() + 1)
//     idx += 1
//   }
//   return days
// }

function getDaysInMonth(day, month, year, query) {
  const date = new Date(year, month, day)
  const lastWeek = new Date()
  lastWeek.setDate(lastWeek.getDate() - (query - 1))
  const days = []
  let idx = 0
  while (date.getMonth() === month && idx < query) {
    const d = new Date(lastWeek)
    days.push(d.getDate() + ' ' + d.toLocaleString('en-us', { month: 'short' }))
    lastWeek.setDate(lastWeek.getDate() + 1)
    idx += 1
  }

  return days
}
const now = new Date()
const labels = getDaysInMonth(
  now.getDate(),
  now.getMonth(),
  now.getFullYear(),
  7
)
const revenueAreaChart = {
  chartOptions: {
    chart: {
      toolbar: {
        show: true,
      },
    },
    tooltip: {
      theme: 'dark',
      x: { show: false },
    },
    stroke: {
      curve: 'smooth',
      width: 4,
    },
    zoom: {
      enabled: true,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
    },
    colors: ['#43d39e'],
    xaxis: {
      type: 'string',
      categories: labels,
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter(val) {
          return val.toFixed(0)
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
  },
  noData: {
    text: 'LOADING..',
    align: 'center',
    verticalAlign: 'middle',
    style: {
      color: '#01573d',
      fontSize: '20px',
    },
  },
  series: [],
}

const targetsBarChart = {
  chartOptions: {
    colors: ['#5369f8', '#43d39e', '#f77e53', '#ffbe0b'],
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisBorder: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: '#f3f4f7',
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return '$ ' + val + ' thousands'
        },
      },
    },
  },
  series: [
    {
      name: 'Net Profit',
      data: [35, 44, 55, 57, 56, 61],
    },
    {
      name: 'Revenue',
      data: [52, 76, 85, 101, 98, 87],
    },
  ],
}

const salesDonutChart = {
  chartOptions: {
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
        expandOnClick: false,
      },
    },
    colors: ['#5369f8', '#43d39e', '#f77e53', '#ffbe0b'],
    legend: {
      show: true,
      position: 'right',
      horizontalAlign: 'left',
      itemMargin: {
        horizontal: 6,
        vertical: 3,
      },
    },
    labels: ['Clothes 44k', 'Smartphons 55k', 'Electronics 41k', 'Other 17k'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: (value) => {
          return value + 'k'
        },
      },
    },
  },
  series: [44, 55, 41, 17],
}

const ordersData = [
  {
    id: '#98754',
    product: 'ASOS Ridley High',
    name: 'Otto B',
    price: '$79.49',
    status: 'Pending',
  },
  {
    id: '#98753',
    product: 'Marco Lightweight Shirt',
    name: 'Mark P',
    price: '$125.49',
    status: 'Delivered',
  },
  {
    id: '#98752',
    product: 'Half Sleeve Shirt',
    name: 'Dave B',
    price: '$35.49',
    status: 'Declined',
  },
  {
    id: '#98751',
    product: 'Lightweight Jacket',
    name: 'Shreyu N',
    price: '$49.49',
    status: 'Delivered',
  },
  {
    id: '#98750',
    product: 'Marco Shoes',
    name: 'Rik N',
    price: '$69.49',
    status: 'Declined',
  },
]

export { revenueAreaChart, targetsBarChart, salesDonutChart, ordersData }
