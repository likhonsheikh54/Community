/**
 * Simple chart library for inventory dashboard
 * Creates bar charts and other visualizations
 */

// Create a bar chart
function createBarChart(containerId, data, options = {}) {
  const container = document.getElementById(containerId)
  if (!container) return

  // Default options
  const defaultOptions = {
    height: 250,
    barSpacing: 2,
    barMinWidth: 30,
    showValues: true,
    showLabels: true,
    colors: ["#3498db"],
    animate: true,
    maxBars: 10,
  }

  // Merge options
  const chartOptions = { ...defaultOptions, ...options }

  // Clear container
  container.innerHTML = ""

  // Create chart wrapper
  const chartWrapper = document.createElement("div")
  chartWrapper.className = "chart-wrapper"
  container.appendChild(chartWrapper)

  // Create bar chart container
  const barChart = document.createElement("div")
  barChart.className = "bar-chart"
  barChart.style.height = `${chartOptions.height}px`
  barChart.style.gap = `${chartOptions.barSpacing}px`
  chartWrapper.appendChild(barChart)

  // Limit number of bars if needed
  let chartData = [...data]
  if (chartData.length > chartOptions.maxBars) {
    chartData = chartData.slice(0, chartOptions.maxBars)
  }

  // Find maximum value for scaling
  const maxValue = Math.max(...chartData.map((item) => item.value))

  // Create bars
  chartData.forEach((item, index) => {
    // Calculate bar height as percentage of max value
    const heightPercentage = (item.value / maxValue) * 100

    // Create bar element
    const bar = document.createElement("div")
    bar.className = "bar"
    bar.style.height = chartOptions.animate ? "0%" : `${heightPercentage}%`

    // Set bar color
    const colorIndex = index % chartOptions.colors.length
    bar.style.backgroundColor = chartOptions.colors[colorIndex]

    // Set minimum width
    bar.style.minWidth = `${chartOptions.barMinWidth}px`

    // Add label if enabled
    if (chartOptions.showLabels) {
      const label = document.createElement("div")
      label.className = "bar-label"
      label.textContent = item.label
      bar.appendChild(label)
    }

    // Add value if enabled
    if (chartOptions.showValues) {
      const value = document.createElement("div")
      value.className = "bar-value"
      value.textContent = item.value
      bar.appendChild(value)
    }

    // Add bar to chart
    barChart.appendChild(bar)

    // Animate bar height if enabled
    if (chartOptions.animate) {
      setTimeout(() => {
        bar.style.height = `${heightPercentage}%`
      }, 50 * index)
    }
  })

  // Add legend if colors are assigned to categories
  if (chartOptions.legend) {
    const legend = document.createElement("div")
    legend.className = "chart-legend"

    chartOptions.legend.forEach((item, index) => {
      const legendItem = document.createElement("div")
      legendItem.className = "legend-item"

      const colorBox = document.createElement("div")
      colorBox.className = "legend-color"
      colorBox.style.backgroundColor = chartOptions.colors[index % chartOptions.colors.length]

      const label = document.createElement("span")
      label.textContent = item

      legendItem.appendChild(colorBox)
      legendItem.appendChild(label)
      legend.appendChild(legendItem)
    })

    chartWrapper.appendChild(legend)
  }

  return barChart
}

// Create a pie chart (simplified version using CSS)
function createPieChart(containerId, data, options = {}) {
  const container = document.getElementById(containerId)
  if (!container) return

  // Default options
  const defaultOptions = {
    size: 200,
    colors: ["#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#9b59b6", "#1abc9c"],
    showLabels: true,
    showLegend: true,
  }

  // Merge options
  const chartOptions = { ...defaultOptions, ...options }

  // Clear container
  container.innerHTML = ""

  // Create chart wrapper
  const chartWrapper = document.createElement("div")
  chartWrapper.className = "pie-chart-wrapper"
  container.appendChild(chartWrapper)

  // Create pie chart container
  const pieChart = document.createElement("div")
  pieChart.className = "pie-chart"
  pieChart.style.width = `${chartOptions.size}px`
  pieChart.style.height = `${chartOptions.size}px`
  chartWrapper.appendChild(pieChart)

  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Create pie segments
  let cumulativePercentage = 0

  data.forEach((item, index) => {
    const percentage = (item.value / total) * 100

    // Create segment
    const segment = document.createElement("div")
    segment.className = "pie-segment"

    // Calculate segment angles
    const startAngle = cumulativePercentage * 3.6 // 3.6 = 360 / 100
    const endAngle = (cumulativePercentage + percentage) * 3.6

    // Set segment style
    segment.style.backgroundColor = chartOptions.colors[index % chartOptions.colors.length]
    segment.style.transform = `rotate(${startAngle}deg)`

    // Add segment to chart
    pieChart.appendChild(segment)

    // Update cumulative percentage
    cumulativePercentage += percentage
  })

  // Add legend if enabled
  if (chartOptions.showLegend) {
    const legend = document.createElement("div")
    legend.className = "chart-legend"

    data.forEach((item, index) => {
      const legendItem = document.createElement("div")
      legendItem.className = "legend-item"

      const colorBox = document.createElement("div")
      colorBox.className = "legend-color"
      colorBox.style.backgroundColor = chartOptions.colors[index % chartOptions.colors.length]

      const label = document.createElement("span")
      label.textContent = `${item.label} (${Math.round((item.value / total) * 100)}%)`

      legendItem.appendChild(colorBox)
      legendItem.appendChild(label)
      legend.appendChild(legendItem)
    })

    chartWrapper.appendChild(legend)
  }

  return pieChart
}

// Create a line chart
function createLineChart(containerId, data, options = {}) {
  // This is a simplified implementation
  // For a real application, consider using a library like Chart.js

  const container = document.getElementById(containerId)
  if (!container) return

  // Default options
  const defaultOptions = {
    height: 250,
    lineColor: "#3498db",
    pointColor: "#2980b9",
    fillColor: "rgba(52, 152, 219, 0.1)",
    showPoints: true,
    showLabels: true,
    animate: true,
  }

  // Merge options
  const chartOptions = { ...defaultOptions, ...options }

  // Clear container
  container.innerHTML = ""

  // Create chart wrapper
  const chartWrapper = document.createElement("div")
  chartWrapper.className = "line-chart-wrapper"
  container.appendChild(chartWrapper)

  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("width", "100%")
  svg.setAttribute("height", chartOptions.height)
  svg.setAttribute("viewBox", `0 0 ${data.length * 50} ${chartOptions.height}`)
  chartWrapper.appendChild(svg)

  // Find min and max values
  const values = data.map((item) => item.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const range = maxValue - minValue

  // Create path for line
  const pathData = data
    .map((item, index) => {
      const x = index * 50 + 25
      const y = chartOptions.height - ((item.value - minValue) / range) * (chartOptions.height - 40) - 20
      return `${index === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  // Create path element
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute("d", pathData)
  path.setAttribute("fill", "none")
  path.setAttribute("stroke", chartOptions.lineColor)
  path.setAttribute("stroke-width", "2")
  svg.appendChild(path)

  // Add points if enabled
  if (chartOptions.showPoints) {
    data.forEach((item, index) => {
      const x = index * 50 + 25
      const y = chartOptions.height - ((item.value - minValue) / range) * (chartOptions.height - 40) - 20

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      circle.setAttribute("cx", x)
      circle.setAttribute("cy", y)
      circle.setAttribute("r", "4")
      circle.setAttribute("fill", chartOptions.pointColor)
      svg.appendChild(circle)

      // Add label if enabled
      if (chartOptions.showLabels) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
        text.setAttribute("x", x)
        text.setAttribute("y", chartOptions.height - 5)
        text.setAttribute("text-anchor", "middle")
        text.setAttribute("font-size", "12")
        text.textContent = item.label
        svg.appendChild(text)

        const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text")
        valueText.setAttribute("x", x)
        valueText.setAttribute("y", y - 10)
        valueText.setAttribute("text-anchor", "middle")
        valueText.setAttribute("font-size", "10")
        valueText.textContent = item.value
        svg.appendChild(valueText)
      }
    })
  }

  return svg
}

