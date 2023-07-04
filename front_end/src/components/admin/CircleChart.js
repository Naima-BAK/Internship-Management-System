import axios from "axios";
import React, { useRef, useEffect, useState } from "react";

export default function PieChart() {

    const canvasRef = useRef(null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/student_teacher');
            if (result.status === 200) {
                const teachers = result.data.student;
                const students = result.data.teacher;
                setChartData([
                    { id: 1, label: "Enseignant", value: teachers },
                    { id: 3, label: "Etudiant", value: students },
                ]);
            }
        };
        fetchData();
    }, []);
    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const [selectedItem, setSelectedItem] = useState(null);
    const [totalValue, setTotalValue] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Calculate the total value of all data points
        const value = chartData.reduce((sum, item) => sum + item.value, 0);
        setTotalValue(value);

        // Calculate the starting angle for each data point
        let startAngle = 0;

        // Loop through the chartData array and draw each sector
        chartData.forEach((item) => {
            // Calculate the angle of the sector based on the data value
            const sectorAngle = (item.value / value) * 2 * Math.PI;

            // Set the fill color for the sector
            ctx.fillStyle = getRandomColor();

            // Draw the sector
            ctx.beginPath();
            ctx.moveTo(width / 2, height / 2);
            ctx.arc(width / 2, height / 2, radius, startAngle, startAngle + sectorAngle);
            ctx.lineTo(width / 2, height / 2);
            ctx.fill();

            // Add the label and percentage as text inside the sector
            const labelX = width / 2 + (radius / 2) * Math.cos(startAngle + sectorAngle / 2);
            const labelY = height / 2 + (radius / 2) * Math.sin(startAngle + sectorAngle / 2);
            ctx.fillStyle = "#000000";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(item.label, labelX, labelY);
            ctx.fillText(((item.value / value) * 100).toFixed(2) + "%", labelX, labelY + 15);

            // Update the starting angle for the next sector
            startAngle += sectorAngle;
        });
    }, [chartData]);

    // Helper function to generate random colors
    function getRandomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    // Event handler for mouseover events on the canvas
    function handleMouseOver(event) {
        const { offsetX, offsetY } = event.nativeEvent;

        // Calculate the distance from the center of the chart to the mouse position
        const dx = offsetX - width / 2;
        const dy = offsetY - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if the mouse is inside the chart
        if (distance <= radius) {
            // Calculate the angle of the mouse position
            const angle = Math.atan2(dy, dx) + Math.PI / 2;

            // Find the data point that corresponds to the sector containing the mouse position
            let selectedItem = null;
            let startAngle = 0;
            chartData.forEach((item) => {
                const sectorAngle = (item.value / totalValue) * 2 * Math.PI;
                if (angle >= startAngle && angle < startAngle + sectorAngle) {
                    selectedItem = item;
                }
                startAngle += sectorAngle;
            });

            // Update the state with the selected item
            setSelectedItem(selectedItem);
        } else {
            // Reset the selected item if the mouse is outside the chart
            setSelectedItem(null);
        }
    }

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height} onMouseOver={handleMouseOver} />
            {selectedItem && (
                <ul>
                    <li>{selectedItem.label}</li>
                    <li>{((selectedItem.value / totalValue) * 100).toFixed(2)}%</li>
                </ul>
            )}
        </div>
    );
}