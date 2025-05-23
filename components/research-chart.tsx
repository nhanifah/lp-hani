"use client"

import { Bar } from "@/components/ui/chart"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function ResearchChart() {
  const data = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Publications",
        data: [1, 2, 1, 2, 2],
        backgroundColor: "rgba(44, 94, 46, 0.7)",
        borderColor: "rgba(44, 94, 46, 1)",
        borderWidth: 1,
      },
      {
        label: "Citations",
        data: [3, 8, 15, 24, 35],
        backgroundColor: "rgba(224, 231, 215, 0.7)",
        borderColor: "rgba(224, 231, 215, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
    </div>
  )
}
