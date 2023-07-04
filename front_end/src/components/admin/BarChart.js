import axios from "axios";
import React, { useRef, useEffect } from "react";
import { useState } from "react";


const BarChart = () => {


    const canvasRef = useRef(null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/student_status');
            if (result.status === 200) {
                const studentWith = result.data.student_with;
                const studentWithout = result.data.student_without;
                const studentProject = result.data.student_project;

                setChartData([
                    { label: "Avec stage", value: studentWith, color: "#87CEEB" },
                    { label: "Sans stage", value: studentWithout, color: "#B0E0E6" },
                    { label: "Projet académique", value: studentProject, color: "blue" }
                ]);
            }
        };
        fetchData();
    }, []);
    const width = 400;
    const height = 300;

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const maxBarHeight = height - 20;
            const barWidth = width / chartData.length;
            let maxBarValue = 0;

            // Find the maximum bar value to scale the bars
            chartData.forEach((item) => {
                if (item.value > maxBarValue) {
                    maxBarValue = item.value;
                }
            });

            chartData.forEach((item, index) => {
                const barHeight = (item.value / maxBarValue) * maxBarHeight;
                const x = index * barWidth + barWidth / 2;
                const y = height - barHeight - 20;

                // Draw the bar
                ctx.fillStyle = item.color;
                ctx.fillRect(index * barWidth, y, barWidth, barHeight);

                // Draw the label
                ctx.font = "12px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
                ctx.letterSpacing = 1;
                ctx.fillText(item.label, x, y + barHeight / 2);

                ctx.fillText(item.value, x, height - 5);
            });
        }
    }, [chartData, width, height]);

    return <canvas ref={canvasRef} width={width} height={height} />;
};

export default BarChart;