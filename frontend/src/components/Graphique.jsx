import React from "react";
import '../index.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function GetGraphiqueData(all_profiles)
{
  // Initialized empty data for our Graphique
  var data = [
    {
        name: '< 10 ans',
        uv: 4000,
        Age: 0,
        amt: 2400,
      },
      {
        name: '10 - 20 ans',
        uv: 3000,
        Age: 0,
        amt: 2210,
      },
      {
        name: '20 - 30 ans',
        uv: 2000,
        Age: 0,
        amt: 2290,
      },
      {
        name: '30 - 40 ans',
        uv: 2780,
        Age: 0,
        amt: 2000,
      },
      {
        name: '40 - 50 ans',
        uv: 1890,
        Age: 0,
        amt: 2181,
      },
      {
        name: '50 - 60 ans',
        uv: 2390,
        Age: 0,
        amt: 2500,
      },
      {
        name: '< 60 ans',
        uv: 3490,
        Age: 0,
        amt: 2100,
      },
  ]
  
  // Get the age information and put in data 
  for(const profile of all_profiles.item)
  {
      if(parseInt(profile.age) <= 10 )
      {
          data[0].Age += 1;
      }
      else if(parseInt(profile.age) > 10 && parseInt(profile.age) <= 20)
      {
          data[1].Age += 1;
      }
      else if(parseInt(profile.age) > 20 && parseInt(profile.age) <= 30)
      {
          data[2].Age += 1;
      }
      else if(parseInt(profile.age) > 30 && parseInt(profile.age) <= 40)
      {
          data[3].Age += 1;
      }
      else if(parseInt(profile.age) > 40 && parseInt(profile.age) <= 50)
      {
          data[4].Age += 1;
      }
      else if(parseInt(profile.age) > 50 && parseInt(profile.age) <= 60)
      {
          data[4].Age += 1;
      }
      else if(parseInt(profile.age) > 60)
      {
          data[5].Age += 1;
      }
  }

  return data;
}

    

const Graphique = (items) => (
    <div class="graph">
        <div class="title">
            <h2>Nombre de Profile en fonction de l'Age</h2>
        </div>  
        {/* Use Rechart to display graphique */}
        <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={GetGraphiqueData(items)}
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