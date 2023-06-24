import React, { useRef, useEffect } from "react";

export default function BarChart() {
    const canvasRef = useRef(null);

    const chartData = [
        { id: 1, label: "Apples", value: 10 },
        { id: 2, label: "Oranges", value: 20 },
        { id: 3, label: "Bananas", value: 15 },
    ];

    const width = 200;
    const height = 200;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Calculate the maximum value in the chartData array
        const maxDataValue = Math.max(...chartData.map((item) => item.value));

        // Calculate the width of each bar
        const barWidth = width / chartData.length;

        // Set the font and text alignment for the y-axis labels
        ctx.font = "12px Arial";
        ctx.textAlign = "center";

        // Loop through the chartData array and draw each bar
        chartData.forEach((item, index) => {
            // Calculate the height of the bar based on the data value
            const barHeight = (item.value / maxDataValue) * height;

            // Calculate the x and y coordinates of the top-left corner of the bar
            const x = index * barWidth;
            const y = height - barHeight;

            // Draw the bar
            ctx.fillStyle = "blue";
            ctx.fillRect(x, y, barWidth, barHeight);

            // Draw the y-axis label
            ctx.fillStyle = "red";
            ctx.fillText(item.value, x + barWidth / 2, y - 5);
        });
    }, [chartData]);

    return <canvas ref={canvasRef} width={width} height={height} />;
}