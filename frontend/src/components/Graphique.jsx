import React from "react";
import '../index.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: '< 10 ans',
      uv: 4000,
      Age: 2400,
      amt: 2400,
    },
    {
      name: '10 - 20 ans',
      uv: 3000,
      Age: 1398,
      amt: 2210,
    },
    {
      name: '20 - 30 ans',
      uv: 2000,
      Age: 9800,
      amt: 2290,
    },
    {
      name: '30 - 40 ans',
      uv: 2780,
      Age: 3908,
      amt: 2000,
    },
    {
      name: '40 - 50 ans',
      uv: 1890,
      Age: 4800,
      amt: 2181,
    },
    {
      name: '50 - 60 ans',
      uv: 2390,
      Age: 3800,
      amt: 2500,
    },
    {
      name: '< 60 ans',
      uv: 3490,
      Age: 4300,
      amt: 2100,
    },
  ];

const Graphique = ({item}) => (
    <div class="graph">
        <div class="title">
            <h2>Nombre de Profile en fonction de l'Age</h2>
        </div>  

        <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Age" fill="#8884d8" />
          
        </BarChart>
      </ResponsiveContainer>
         
    </div>
    );

export default Graphique;